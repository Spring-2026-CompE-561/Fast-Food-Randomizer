export const API_BASE_URL = "http://127.0.0.1:8000"

export class ApiUnauthorizedError extends Error {
  constructor(message = "Your session expired. Please sign in again.") {
    super(message)
    this.name = "ApiUnauthorizedError"
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

async function readApiErrorMessage(response: Response): Promise<string | null> {
  try {
    const payload = (await response.json()) as unknown

    if (!isRecord(payload)) {
      return null
    }

    if (Array.isArray(payload.detail)) {
      const messages = payload.detail
        .map((entry) => {
          if (!isRecord(entry)) return null
          return typeof entry.msg === "string" ? entry.msg : null
        })
        .filter((entry): entry is string => entry !== null)

      return messages.length > 0 ? messages.join("; ") : null
    }

    const candidates = [payload.detail, payload.message, payload.error]

    for (const candidate of candidates) {
      if (typeof candidate === "string" && candidate.trim().length > 0) {
        return candidate
      }
    }
  } catch {
    return null
  }

  return null
}

export async function getApiJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const message = await readApiErrorMessage(response)
    throw new Error(message ?? `Failed to load ${path}`)
  }

  return (await response.json()) as T
}

export async function postApiJson<TResponse, TBody>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const message = await readApiErrorMessage(response)
    throw new Error(message ?? `Failed to save to ${path}`)
  }

  return (await response.json()) as TResponse
}