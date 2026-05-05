import { getAuthenticatedApiJson } from "@/lib/api"

export async function getCurrentUser() {
  return getAuthenticatedApiJson("/api/v1/users/me")
}