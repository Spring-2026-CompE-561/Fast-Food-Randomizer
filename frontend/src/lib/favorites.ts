import { getAuthenticatedApiJson, postAuthenticatedApiJson } from "@/lib/api"

export async function getFavorites(): Promise<Favorite[]> {
  return getAuthenticatedApiJson("/api/v1/favorites/me");
}

export async function addFavorite(restaurant_id: number) {
  return postAuthenticatedApiJson("/api/v1/favorites/", { restaurant_id })
}

export async function removeFavorite(restaurant_id: number) {
  return fetch(`http://127.0.0.1:8000/api/v1/favorites/${restaurant_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
}