import { postOptionalAuthenticatedApiJson } from "@/lib/api";

export async function randomizeRestaurant(payload: any) {
  return postOptionalAuthenticatedApiJson("/api/v1/randomizer/", payload);
}