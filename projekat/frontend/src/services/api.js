export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function pingBackend() {
  return {
    ok: false,
    source: "mock",
    baseUrl: API_BASE_URL
  };
}