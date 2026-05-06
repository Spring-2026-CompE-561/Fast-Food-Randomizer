import { getApiJson } from "@/lib/api"

export async function getRestaurants() {
  return getApiJson("/api/v1/restaurants/")
}

export async function getRestaurantById(id: number) {
  return getApiJson(`/api/v1/restaurants/${id}`)
}