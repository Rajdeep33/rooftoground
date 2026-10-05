import { createAuthClient } from "better-auth/react";

// `VITE_API_URL` already points at the API root (e.g. http://localhost:8000/api).
// Better Auth is mounted at `/api/auth` on the backend, so append `/auth`.
const apiUrl = (
  import.meta.env.VITE_API_URL ?? "http://localhost:8000/api"
).replace(/\/+$/, "");

export const authClient = createAuthClient({
  baseURL: `${apiUrl}/auth`,
});
