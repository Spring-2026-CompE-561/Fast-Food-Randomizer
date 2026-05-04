import { API_BASE_URL } from "@/lib/api"

export async function registerUser(data: {
  username: string
  email: string
  password: string
}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to register")
  }

  return res.json()
}

export async function loginUser(email: string, password: string) {
  const formData = new URLSearchParams()
  formData.append("username", email)
  formData.append("password", password)

  const res = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Invalid credentials")
  }

  return res.json()
}