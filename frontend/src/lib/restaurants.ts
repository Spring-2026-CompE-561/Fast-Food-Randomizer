export async function getRestaurants() {
  const res = await fetch("http://127.0.0.1:8000/api/v1/restaurants/")

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants")
  }

  return res.json()
}