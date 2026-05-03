export async function randomizeRestaurant(payload: any) {
  const res = await fetch("http://127.0.0.1:8000/api/v1/randomizer/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to randomize.")
  }

  return res.json()
}