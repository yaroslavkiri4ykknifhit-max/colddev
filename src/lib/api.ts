import { siteConfig } from "@/config/site";
import type { AdminSnapshot, ClientSession, DashboardData } from "@/types";

const MAX_RECEIPT_BYTES = 10 * 1024 * 1024;
const RECEIPT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

async function request<T>(action: string, payload: Record<string, unknown>) {
  if (!siteConfig.apiUrl) {
    throw new Error("API Google Apps Script ещё не подключён");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30000);
  let response: Response;
  try {
    response = await fetch(siteConfig.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...payload }),
      redirect: "follow",
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Google отвечает слишком долго. Попробуйте ещё раз через несколько секунд.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }

  const result = (await response.json()) as {
    ok: boolean;
    data?: T;
    error?: string;
  };

  if (!result.ok || !result.data) {
    throw new Error(result.error || "Не удалось выполнить запрос");
  }

  return result.data;
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Не удалось прочитать файл"));
    reader.readAsDataURL(file);
  });
}

export function validateReceipt(file: File) {
  if (!RECEIPT_TYPES.includes(file.type)) {
    throw new Error("Разрешены JPG, PNG, WEBP и PDF");
  }
  if (file.size > MAX_RECEIPT_BYTES) {
    throw new Error("Файл должен быть меньше 10 МБ");
  }
}

export const colddevApi = {
  async login(projectId: string, accessCode: string): Promise<ClientSession> {
    if (!siteConfig.apiUrl) {
      throw new Error("Личный кабинет подключается. Напишите Ярославу в Telegram, чтобы получить доступ к проекту.");
    }
    return request<ClientSession>("client.login", { projectId, accessCode });
  },

  async getDashboard(token: string): Promise<DashboardData> {
    if (!siteConfig.apiUrl) {
      throw new Error("Личный кабинет подключается. Напишите Ярославу в Telegram, чтобы получить доступ к проекту.");
    }
    return request<DashboardData>("client.dashboard", { token });
  },

  async markInvoicePaid(token: string, invoiceId: string, file: File) {
    validateReceipt(file);
    if (!siteConfig.apiUrl) {
      throw new Error("Загрузка чека станет доступна после подключения личного кабинета.");
    }
    const dataUrl = await fileToDataUrl(file);
    return request<{ status: "Ожидает подтверждения"; fileName: string }>(
      "client.invoicePaid",
      {
        token,
        invoiceId,
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl,
        },
      },
    );
  },

  async getAdminSnapshot(googleCredential: string): Promise<AdminSnapshot> {
    if (!siteConfig.apiUrl) {
      throw new Error("Админка подключается. Укажите URL Google Apps Script в настройках сайта.");
    }
    return request<AdminSnapshot>("admin.snapshot", { googleCredential });
  },

  async adminMutation(
    googleCredential: string,
    entity: string,
    operation: "create" | "update" | "delete",
    value: Record<string, unknown>,
  ) {
    if (!siteConfig.apiUrl) {
      throw new Error("Сохранение станет доступно после подключения Google Apps Script.");
    }
    return request<Record<string, unknown>>("admin.mutate", {
      googleCredential,
      entity,
      operation,
      value,
    });
  },
};
