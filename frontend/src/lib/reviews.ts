import {
  getAuthenticatedApiJson,
  putAuthenticatedApiJson,
} from "@/lib/api";

export async function fetchMyRestaurantTags(restaurantId: number) {
  return getAuthenticatedApiJson<{ tags: string[] }>(
    `/api/v1/reviews/me/restaurant/${restaurantId}`
  );
}

export async function putMyRestaurantTags(restaurantId: number, tags: string[]) {
  return putAuthenticatedApiJson<{ tags: string[] }, { tags: string[] }>(
    `/api/v1/reviews/me/restaurant/${restaurantId}`,
    { tags }
  );
}
