/**
 * COLDDEV API for Google Apps Script.
 *
 * Bind this project to the COLDDEV Google Sheet, run setupColddev() once,
 * then deploy as a web app. The frontend sends simple text/plain POST requests
 * so the browser does not need a preflight request.
 */

const SHEETS = {
  SETTINGS: 'Settings',
  ADMINS: 'Admins',
  CLIENTS: 'Clients',
  PROJECTS: 'Projects',
  STAGES: 'ProjectStages',
  UPDATES: 'ProjectUpdates',
  REPORTS: 'AdvertisingReports',
  INVOICES: 'Invoices',
  SERVICES: 'Services',
  PORTFOLIO: 'Portfolio',
  SESSIONS: 'Sessions',
  ACTIVITY: 'ActivityLog',
};

const HEADERS = {
  Settings: ['key', 'value'],
  Admins: ['email', 'active', 'created_at'],
  Clients: ['id', 'name', 'company', 'phone', 'telegram', 'email', 'status', 'created_at'],
  Projects: ['id', 'client_id', 'name', 'type', 'status', 'progress', 'started_at', 'deadline', 'site_url', 'preview_url', 'current_action', 'manager_comment', 'last_updated_at', 'access_hash'],
  ProjectStages: ['id', 'project_id', 'title', 'description', 'order', 'status', 'started_at', 'completed_at'],
  ProjectUpdates: ['id', 'project_id', 'title', 'description', 'date', 'category', 'image_url', 'link_url'],
  AdvertisingReports: ['id', 'project_id', 'period', 'impressions', 'clicks', 'spend', 'leads', 'budget_left', 'comment', 'screenshot_url'],
  Invoices: ['id', 'project_id', 'title', 'amount', 'created_at', 'due_at', 'status', 'comment', 'receipt_file_id', 'receipt_name'],
  Services: ['id', 'title', 'description', 'price', 'price_mode', 'button_label', 'image_url', 'active', 'order'],
  Portfolio: ['id', 'kind', 'title', 'category', 'description', 'result', 'image_url', 'url', 'published', 'order'],
  Sessions: ['token', 'project_id', 'client_id', 'expires_at', 'created_at'],
  ActivityLog: ['id', 'title', 'detail', 'date'],
};

const RECEIPT_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_RECEIPT_BYTES = 10 * 1024 * 1024;

function doGet() {
  return json({ ok: true, data: { service: 'COLDDEV API', status: 'online' } });
}

function doPost(event) {
  try {
    const input = JSON.parse(event.postData.contents || '{}');
    return json({ ok: true, data: route(input) });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: safeError(error) });
  }
}

function route(input) {
  switch (input.action) {
    case 'client.login': return clientLogin(input);
    case 'client.dashboard': return clientDashboard(input);
    case 'client.invoicePaid': return markInvoicePaid(input);
    case 'admin.snapshot': return adminSnapshot(input);
    case 'admin.mutate': return adminMutate(input);
    default: throw new Error('Неизвестное действие API');
  }
}

function clientLogin(input) {
  const projectId = String(input.projectId || '').trim().toUpperCase();
  const accessCode = String(input.accessCode || '').trim();
  if (!projectId || !accessCode) throw new Error('Нужны ID проекта и код доступа');

  const project = findOne(SHEETS.PROJECTS, 'id', projectId);
  if (!project) throw new Error('Проект не найден');
  const client = findOne(SHEETS.CLIENTS, 'id', project.client_id);
  if (!client || String(client.status) !== 'Активен') throw new Error('Доступ к проекту отключён');
  if (hash(accessCode) !== String(project.access_hash)) throw new Error('Проверьте код доступа');

  const token = Utilities.getUuid();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  append(SHEETS.SESSIONS, { token: token, project_id: projectId, client_id: client.id, expires_at: expiresAt, created_at: new Date().toISOString() });
  return { token: token, expiresAt: expiresAt, data: buildDashboard(client.id) };
}

function clientDashboard(input) {
  const session = validSession(input.token);
  return buildDashboard(session.client_id);
}

function markInvoicePaid(input) {
  const session = validSession(input.token);
  const invoiceId = String(input.invoiceId || '');
  const invoice = findOne(SHEETS.INVOICES, 'id', invoiceId);
  if (!invoice) throw new Error('Счёт не найден');
  const project = findOne(SHEETS.PROJECTS, 'id', invoice.project_id);
  if (!project || project.client_id !== session.client_id) throw new Error('Нет доступа к этому счёту');

  // A browser can lose the response after Drive has already saved the file.
  // Return the existing result so a retry is safe and never creates duplicates.
  if (String(invoice.status) === 'Ожидает подтверждения' && invoice.receipt_file_id) {
    return { status: 'Ожидает подтверждения', fileName: invoice.receipt_name || 'Чек сохранён' };
  }
  if (String(invoice.status) !== 'Ожидает оплаты') throw new Error('Этот счёт уже обработан');

  const file = input.file || {};
  if (!RECEIPT_TYPES.includes(file.type)) throw new Error('Разрешены JPG, PNG, WEBP и PDF');
  if (Number(file.size) > MAX_RECEIPT_BYTES) throw new Error('Файл должен быть меньше 10 МБ');
  if (!file.dataUrl || file.dataUrl.indexOf('base64,') === -1) throw new Error('Файл повреждён');

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error('Хранилище занято другой загрузкой. Подождите 10 секунд и попробуйте ещё раз.');
  try {
    // Re-read after taking the lock: another request may have finished while
    // this one was waiting for access to Drive.
    const latest = findOne(SHEETS.INVOICES, 'id', invoiceId);
    if (latest && String(latest.status) === 'Ожидает подтверждения' && latest.receipt_file_id) {
      return { status: 'Ожидает подтверждения', fileName: latest.receipt_name || 'Чек сохранён' };
    }
    const bytes = Utilities.base64Decode(file.dataUrl.split('base64,')[1]);
    const folder = getProjectFolder(project.id);
    const blob = Utilities.newBlob(bytes, file.type, safeFileName(file.name));
    const driveFile = folder.createFile(blob);
    update(SHEETS.INVOICES, invoiceId, { status: 'Ожидает подтверждения', receipt_file_id: driveFile.getId(), receipt_name: driveFile.getName() });
    append(SHEETS.ACTIVITY, { id: Utilities.getUuid(), title: 'Клиент сообщил об оплате', detail: invoiceId + ' · ' + project.id, date: new Date().toISOString() });
    return { status: 'Ожидает подтверждения', fileName: driveFile.getName() };
  } finally {
    lock.releaseLock();
  }
}

function adminSnapshot(input) {
  const admin = verifyGoogleCredential(input.googleCredential);
  const clients = rows(SHEETS.CLIENTS);
  const projects = rows(SHEETS.PROJECTS);
  const firstClient = clients[0] || { id: '' };
  return Object.assign(buildDashboard(firstClient.id), {
    clients: clients.map(mapClient),
    portfolio: rows(SHEETS.PORTFOLIO).map(mapPortfolio),
    activity: rows(SHEETS.ACTIVITY).sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 20),
    _admin: admin.email,
    projects: projects.map(mapProject),
    stages: rows(SHEETS.STAGES).map(mapStage),
    updates: rows(SHEETS.UPDATES).map(mapUpdate),
    reports: rows(SHEETS.REPORTS).map(mapReport),
    invoices: rows(SHEETS.INVOICES).map((row) => mapInvoice(row, true)),
    services: rows(SHEETS.SERVICES).map(mapService),
  });
}

function adminMutate(input) {
  verifyGoogleCredential(input.googleCredential);
  const sheetName = entitySheet(input.entity);
  const value = input.value || {};
  const id = String(value.id || Utilities.getUuid());
  if (input.operation === 'delete') {
    remove(sheetName, id);
    return { id: id, deleted: true };
  }
  const current = input.operation === 'update' ? (findOne(sheetName, 'id', id) || {}) : {};
  const hydrated = Object.assign({}, value, { id: id });
  if (input.entity === 'projects' && !hydrated.accessCode) hydrated.accessHash = current.access_hash || '';
  if (input.entity === 'invoices') {
    if (!hydrated.receiptFileId) hydrated.receiptFileId = current.receipt_file_id || '';
    if (!hydrated.receiptName) hydrated.receiptName = current.receipt_name || '';
  }
  const normalized = normalizeForSheet(input.entity, hydrated);
  upsert(sheetName, normalized);
  append(SHEETS.ACTIVITY, { id: Utilities.getUuid(), title: input.operation === 'create' ? 'Создана запись' : 'Обновлена запись', detail: input.entity + ' · ' + id, date: new Date().toISOString() });
  return normalized;
}

function buildDashboard(clientId) {
  const client = findOne(SHEETS.CLIENTS, 'id', clientId) || {};
  const projects = rows(SHEETS.PROJECTS).filter(row => String(row.client_id) === String(clientId));
  const projectIds = projects.map(row => String(row.id));
  const belongs = (row) => projectIds.indexOf(String(row.project_id)) !== -1;
  return {
    client: mapClient(client),
    projects: projects.map(mapProject),
    stages: rows(SHEETS.STAGES).filter(belongs).map(mapStage),
    updates: rows(SHEETS.UPDATES).filter(belongs).map(mapUpdate),
    reports: rows(SHEETS.REPORTS).filter(belongs).map(mapReport),
    invoices: rows(SHEETS.INVOICES).filter(belongs).map((row) => mapInvoice(row, false)),
    services: rows(SHEETS.SERVICES).filter(row => String(row.active) !== 'false').map(mapService),
  };
}

function verifyGoogleCredential(credential) {
  if (!credential) throw new Error('Необходим вход через Google');
  if (String(credential) === 'demo-google-credential' && getSetting('DEMO_MODE') === 'true') return { email: getSetting('ADMIN_EMAILS').split(',')[0] };
  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(credential), { muteHttpExceptions: true });
  const token = JSON.parse(response.getContentText() || '{}');
  const allowed = getSetting('ADMIN_EMAILS').split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  const clientId = getSetting('GOOGLE_CLIENT_ID');
  if (!token.email || !token.email_verified || allowed.indexOf(String(token.email).toLowerCase()) === -1) throw new Error('Google-аккаунт не входит в список администраторов');
  if (clientId && token.aud && token.aud !== clientId) throw new Error('Неверная аудитория Google-токена');
  return { email: token.email };
}

function validSession(token) {
  const session = findOne(SHEETS.SESSIONS, 'token', String(token || ''));
  if (!session || new Date(session.expires_at).getTime() < Date.now()) throw new Error('Сессия истекла, войдите снова');
  return session;
}

function setupColddev() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(name => {
    let sheet = spreadsheet.getSheetByName(name);
    if (!sheet) sheet = spreadsheet.insertSheet(name);
    if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, HEADERS[name].length).setValues([HEADERS[name]]);
  });
  const settings = rows(SHEETS.SETTINGS);
  if (!settings.length) {
    const sheet = spreadsheet.getSheetByName(SHEETS.SETTINGS);
    sheet.getRange(2, 1, 5, 2).setValues([
      ['ADMIN_EMAILS', 'yaroslav.paraonov@gmail.com'],
      ['GOOGLE_CLIENT_ID', ''],
      ['DEMO_MODE', 'true'],
      ['DRIVE_ROOT_FOLDER_ID', ''],
      ['TELEGRAM_USERNAME', 'c0lddev'],
    ]);
  }
  const admins = rows(SHEETS.ADMINS);
  if (!admins.length) append(SHEETS.ADMINS, { email: 'yaroslav.paraonov@gmail.com', active: 'true', created_at: new Date().toISOString() });
  const root = getRootFolder();
  setSetting('DRIVE_ROOT_FOLDER_ID', root.getId());
  Logger.log('COLDDEV готов. Корневая папка Drive: ' + root.getUrl());
}

function generateAccessCode() {
  const code = randomCode();
  Logger.log(code + ' · hash: ' + hash(code));
  return code;
}

function randomCode() { return Array.from({ length: 3 }, () => Math.random().toString(36).slice(2, 6).toUpperCase()).join('-'); }
function hash(value) { return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8).map(byte => (byte < 0 ? byte + 256 : byte).toString(16).padStart(2, '0')).join(''); }
function safeFileName(value) { return String(value || 'receipt').replace(/[^a-zA-Z0-9а-яА-Я._-]/g, '_').slice(0, 90); }
function safeError(error) { return error && error.message ? error.message : 'Внутренняя ошибка API'; }
function json(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }

function getSpreadsheet() { return SpreadsheetApp.getActiveSpreadsheet(); }
function getSheet(name) { const sheet = getSpreadsheet().getSheetByName(name); if (!sheet) throw new Error('Не найден лист ' + name); return sheet; }
function rows(name) { const sheet = getSheet(name); const values = sheet.getDataRange().getValues(); if (values.length < 2) return []; const headers = values[0].map(String); return values.slice(1).filter(row => row.some(value => value !== '')).map(row => headers.reduce((record, key, index) => { record[key] = row[index]; return record; }, {})); }
function append(name, record) { const sheet = getSheet(name); const headers = HEADERS[name]; sheet.appendRow(headers.map(key => record[key] === undefined ? '' : record[key])); }
function findOne(name, key, value) { return rows(name).find(row => String(row[key]) === String(value)); }
function update(name, id, patch) { const sheet = getSheet(name); const values = sheet.getDataRange().getValues(); const headers = values[0].map(String); const idIndex = headers.indexOf('id'); const rowIndex = values.findIndex((row, index) => index > 0 && String(row[idIndex]) === String(id)); if (rowIndex === -1) throw new Error('Запись не найдена'); Object.keys(patch).forEach(key => { const index = headers.indexOf(key); if (index !== -1) sheet.getRange(rowIndex + 1, index + 1).setValue(patch[key]); }); }
function upsert(name, record) { const existing = findOne(name, 'id', record.id); if (existing) update(name, record.id, record); else append(name, record); }
function remove(name, id) { const sheet = getSheet(name); const values = sheet.getDataRange().getValues(); const headers = values[0].map(String); const index = headers.indexOf('id'); const rowIndex = values.findIndex((row, offset) => offset > 0 && String(row[index]) === String(id)); if (rowIndex !== -1) sheet.deleteRow(rowIndex + 1); }
function getSetting(key) { const item = findOne(SHEETS.SETTINGS, 'key', key); return item ? String(item.value) : ''; }
function setSetting(key, value) { const sheet = getSheet(SHEETS.SETTINGS); const values = sheet.getDataRange().getValues(); const keyIndex = values[0].indexOf('key'); const valueIndex = values[0].indexOf('value'); const rowIndex = values.findIndex((row, offset) => offset > 0 && String(row[keyIndex]) === String(key)); if (rowIndex === -1) append(SHEETS.SETTINGS, { key: key, value: value }); else sheet.getRange(rowIndex + 1, valueIndex + 1).setValue(value); }
function getRootFolder() { const id = getSetting('DRIVE_ROOT_FOLDER_ID'); if (id) { try { return DriveApp.getFolderById(id); } catch (error) {} } return DriveApp.createFolder('COLDDEV_STORAGE'); }
function getProjectFolder(projectId) { const root = getRootFolder(); const folders = root.getFoldersByName(projectId); return folders.hasNext() ? folders.next() : root.createFolder(projectId); }
function entitySheet(entity) { const map = { clients: SHEETS.CLIENTS, projects: SHEETS.PROJECTS, stages: SHEETS.STAGES, updates: SHEETS.UPDATES, ads: SHEETS.REPORTS, invoices: SHEETS.INVOICES, services: SHEETS.SERVICES, portfolio: SHEETS.PORTFOLIO, cases: SHEETS.PORTFOLIO }; if (!map[entity]) throw new Error('Недопустимый раздел'); return map[entity]; }
function normalizeForSheet(entity, value) { const now = new Date().toISOString(); if (entity === 'clients') return { id: value.id, name: value.name, company: value.company, phone: value.phone, telegram: value.telegram, email: value.email, status: value.status || 'Активен', created_at: value.created_at || now }; if (entity === 'projects') return { id: value.id, client_id: value.clientId || value.client_id, name: value.title || value.name, type: value.type, status: value.status || 'В работе', progress: value.progress || 0, started_at: value.startedAt || now, deadline: value.deadline, site_url: value.siteUrl, preview_url: value.previewUrl, current_action: value.currentAction, manager_comment: value.managerComment, last_updated_at: now, access_hash: value.accessCode ? hash(String(value.accessCode)) : (value.accessHash || '') }; if (entity === 'stages') return { id: value.id, project_id: value.projectId || value.project_id, title: value.title, description: value.description, order: value.order || 0, status: value.status || 'waiting', started_at: value.startedAt, completed_at: value.completedAt }; if (entity === 'updates') return { id: value.id, project_id: value.projectId || value.project_id, title: value.title, description: value.description, date: value.date || now.slice(0, 10), category: value.category || 'Общее', image_url: value.imageUrl, link_url: value.linkUrl }; if (entity === 'ads') return { id: value.id, project_id: value.projectId || value.project_id, period: value.period || value.category, impressions: value.impressions || 0, clicks: value.clicks || 0, spend: value.spend || 0, leads: value.leads || 0, budget_left: value.budgetLeft || 0, comment: value.comment || value.description, screenshot_url: value.screenshotUrl }; if (entity === 'invoices') return { id: value.id, project_id: value.projectId || value.project_id, title: value.title, amount: value.amount || 0, created_at: value.createdAt || now, due_at: value.dueAt || value.deadline, status: value.status || 'Ожидает оплаты', comment: value.comment, receipt_file_id: value.receiptFileId, receipt_name: value.receiptName }; if (entity === 'services') return { id: value.id, title: value.title, description: value.description, price: value.price, price_mode: value.priceMode || 'fixed', button_label: value.buttonLabel || 'Обсудить', image_url: value.imageUrl, active: value.active === undefined ? true : value.active, order: value.order || 0 }; if (entity === 'portfolio' || entity === 'cases') return { id: value.id, kind: entity === 'cases' ? 'case' : 'portfolio', title: value.title, category: value.category, description: value.description, result: value.result, image_url: value.imageUrl, url: value.url, published: value.published === undefined ? true : value.published, order: value.order || 0 }; return Object.assign({}, value); }
function mapClient(row) { return { id: row.id, name: row.name, company: row.company, phone: row.phone, telegram: row.telegram, email: row.email, status: row.status, createdAt: row.created_at }; }
function mapProject(row) { return { id: row.id, clientId: row.client_id, name: row.name, type: row.type, status: row.status, progress: Number(row.progress || 0), startedAt: row.started_at, deadline: row.deadline, siteUrl: row.site_url, previewUrl: row.preview_url, currentAction: row.current_action, managerComment: row.manager_comment, lastUpdatedAt: row.last_updated_at }; }
function mapStage(row) { return { id: row.id, projectId: row.project_id, title: row.title, description: row.description, order: Number(row.order || 0), status: row.status, startedAt: row.started_at, completedAt: row.completed_at }; }
function mapUpdate(row) { return { id: row.id, projectId: row.project_id, title: row.title, description: row.description, date: row.date, category: row.category, imageUrl: row.image_url, linkUrl: row.link_url }; }
function mapReport(row) { return { id: row.id, projectId: row.project_id, period: row.period, impressions: Number(row.impressions || 0), clicks: Number(row.clicks || 0), spend: Number(row.spend || 0), leads: Number(row.leads || 0), budgetLeft: Number(row.budget_left || 0), comment: row.comment, screenshotUrl: row.screenshot_url }; }
function mapInvoice(row, includeReceiptUrl) { const invoice = { id: row.id, projectId: row.project_id, title: row.title, amount: Number(row.amount || 0), createdAt: row.created_at, dueAt: row.due_at, status: row.status, comment: row.comment, receiptName: row.receipt_name }; if (includeReceiptUrl && row.receipt_file_id) invoice.receiptUrl = 'https://drive.google.com/open?id=' + encodeURIComponent(row.receipt_file_id); return invoice; }
function mapService(row) { return { id: row.id, title: row.title, description: row.description, price: row.price === '' ? null : Number(row.price), priceMode: row.price_mode, buttonLabel: row.button_label, imageUrl: row.image_url, active: String(row.active) !== 'false', order: Number(row.order || 0) }; }
function mapPortfolio(row) { return { id: row.id, kind: row.kind, title: row.title, category: row.category, description: row.description, result: row.result, imageUrl: row.image_url, url: row.url, published: String(row.published) !== 'false', order: Number(row.order || 0) }; }
