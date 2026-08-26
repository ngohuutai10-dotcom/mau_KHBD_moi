import type { LessonPlan } from "../types";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface GenerateApiResponse {
  ok: boolean;
  success?: boolean;
  lessonPlan?: LessonPlan;
  error?: string;
  details?: string;
  modelUsed?: string;
}

export interface HealthApiResponse {
  ok: boolean;
  service?: string;
  status?: string;
  timestamp?: string;
}

export async function fetchJson<T>(
  url: string,
  options?: RequestInit,
  timeoutMs: number = 240000 // 4 minutes timeout for AI generation
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      signal: options?.signal || controller.signal,
      headers: {
        ...(options?.body instanceof FormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
        ...(options?.headers ?? {}),
      },
    });
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(
        "Thời gian tạo Kế hoạch bài dạy quá lâu (hơn 4 phút). Vui lòng thử lại hoặc chọn mô hình khác trong Cấu hình."
      );
    }
    console.error("NETWORK_FETCH_ERROR:", error);
    throw new ApiError(
      "Không thể kết nối đến máy chủ backend. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau."
    );
  } finally {
    clearTimeout(timeoutId);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const raw = await response.text();

  if (!response.ok) {
    let message = `Máy chủ trả lỗi ${response.status}.`;
    if (contentType.includes("application/json")) {
      try {
        const parsed = JSON.parse(raw);
        message = parsed.error || parsed.message || message;
      } catch {
        // retain default status message
      }
    } else if (raw) {
      message = raw.slice(0, 300);
    }
    throw new ApiError(message, response.status);
  }

  if (!contentType.includes("application/json")) {
    console.error("NON_JSON_RESPONSE:", raw.slice(0, 500));
    throw new ApiError("Máy chủ không trả về dữ liệu JSON hợp lệ.");
  }

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error("JSON_PARSE_ERROR:", error, raw.slice(0, 500));
    throw new ApiError("Dữ liệu backend trả về không phải JSON hợp lệ.");
  }
}

export async function checkApiHealth(): Promise<HealthApiResponse> {
  return fetchJson<HealthApiResponse>("/api/health", {
    method: "GET",
  }, 10000);
}

export async function generateKHBD(formData: FormData): Promise<LessonPlan> {
  const result = await fetchJson<GenerateApiResponse>(
    "/api/generate",
    {
      method: "POST",
      body: formData,
    },
    240000
  );

  if (!result || !result.lessonPlan) {
    throw new ApiError(
      result?.error || "Máy chủ không trả về cấu trúc Kế hoạch bài dạy hợp lệ."
    );
  }

  return result.lessonPlan;
}
