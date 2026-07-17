import { siteConfig } from "@/config/site";
import { mockAdminSnapshot, mockDashboardData } from "@/data/mock-data";
import type { AdminSnapshot, ClientSession, DashboardData } from "@/types";

const MAX_RECEIPT_BYTES = 10 * 1024 * 1024;
const RECEIPT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

function wait(ms = 450) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function request<T>(action: string, payload: Record<string, unknown>) {
  if (!siteConfig.apiUrl) {
    throw new Error("API Google Apps Script ещё не подключён");
  }

  const response = await fetch(siteConfig.apiUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload }),
    redirect: "follow",
  });

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
  isDemoMode: !siteConfig.apiUrl,

  async login(projectId: string, accessCode: string): Promise<ClientSession> {
    if (!siteConfig.apiUrl) {
      await wait();
      const validProject = mockDashboardData.projects.some(
        (project) => project.id.toLowerCase() === projectId.trim().toLowerCase(),
      );
      const validCode = accessCode.trim().toUpperCase() === "COLD-DEMO";
      if (!validProject || !validCode) {
        throw new Error("Проверьте ID проекта и код доступа");
      }
      return {
        token: "demo-client-session",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        data: mockDashboardData,
      };
    }
    return request<ClientSession>("client.login", { projectId, accessCode });
  },

  async getDashboard(token: string): Promise<DashboardData> {
    if (!siteConfig.apiUrl) {
      await wait(250);
      return mockDashboardData;
    }
    return request<DashboardData>("client.dashboard", { token });
  },

  async markInvoicePaid(token: string, invoiceId: string, file: File) {
    validateReceipt(file);
    if (!siteConfig.apiUrl) {
      await wait(700);
      return { status: "Ожидает подтверждения" as const, fileName: file.name };
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
      await wait();
      return mockAdminSnapshot;
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
      await wait(350);
      return { id: String(value.id ?? `DEMO-${Date.now()}`), ...value };
    }
    return request<Record<string, unknown>>("admin.mutate", {
      googleCredential,
      entity,
      operation,
      value,
    });
  },
};

