import { getAuthenticatedApiJson } from "@/lib/api"

export async function getHistory() {
  return getAuthenticatedApiJson("/api/v1/history/me")
}