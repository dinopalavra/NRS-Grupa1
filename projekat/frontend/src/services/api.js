export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/+$/, "");

function buildHeaders(token, hasBody = false) {
  const headers = {};

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (typeof payload === "object" && payload?.message) ||
      (typeof payload === "object" && payload?.error) ||
      (typeof payload === "string" && payload) ||
      `HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

async function request(path, options = {}) {
  const { method = "GET", body, token } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: buildHeaders(token, Boolean(body)),
    body: body ? JSON.stringify(body) : undefined
  });

  return parseResponse(response);
}

export function pingBackend() {
  return request("/api/auth/ping");
}

export function loginUser(payload) {
  return request("/api/auth/login", {
    method: "POST",
    body: payload
  });
}

export function fetchUsers(token) {
  return request("/api/users", { token });
}

export function createUser(payload, token) {
  return request("/api/users", {
    method: "POST",
    body: payload,
    token
  });
}

export function fetchTeams(token) {
  return request("/api/teams", { token });
}

export function createTeam(payload, token) {
  return request("/api/teams", {
    method: "POST",
    body: payload,
    token
  });
}