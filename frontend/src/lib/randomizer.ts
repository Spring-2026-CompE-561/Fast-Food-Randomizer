import { postApiJson } from "@/lib/api"

export async function randomizeRestaurant(payload: any) {
  return postApiJson("/api/v1/randomizer/", payload)
}