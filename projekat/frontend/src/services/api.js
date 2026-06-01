export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/+$/, "");

function buildHeaders(token, hasBody = false) {
  const headers = {};
  if (hasBody) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
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

/* ── Auth ─────────────────────────────────────────────────── */

export function pingBackend() {
  return request("/api/auth/ping");
}

export function loginUser(payload) {
  return request("/api/auth/login", { method: "POST", body: payload });
}

export function forgotPassword(email) {
  return request("/api/auth/forgot-password", { method: "POST", body: { email } });
}

export function resetPassword(token, newPassword) {
  return request("/api/auth/reset-password", { method: "POST", body: { token, newPassword } });
}

/* ── Users ────────────────────────────────────────────────── */

export function fetchUsers(token) {
  return request("/api/users", { token });
}

export function createUser(payload, token) {
  return request("/api/users", { method: "POST", body: payload, token });
}

export function deleteUser(id, token) {
  return request(`/api/users/${id}`, { method: "DELETE", token });
}

export function updateUserProfile(id, payload, token) {
  return request(`/api/users/${id}/profile`, { method: "PATCH", body: payload, token });
}

export function changeUserPassword(id, payload, token) {
  return request(`/api/users/${id}/password`, { method: "PATCH", body: payload, token });
}

/* ── Teams ────────────────────────────────────────────────── */

export function fetchTeams(token) {
  return request("/api/teams", { token });
}

export function createTeam(payload, token) {
  return request("/api/teams", { method: "POST", body: payload, token });
}

/* ── Time Slots ───────────────────────────────────────────── */

export function fetchTimeSlots(token) {
  return request("/api/timeslots", { token });
}

export function fetchAvailableTimeSlots(token) {
  return request("/api/timeslots/available", { token });
}

export function createTimeSlot(payload, token) {
  return request("/api/timeslots", { method: "POST", body: payload, token });
}

/* ── Reservations ─────────────────────────────────────────── */

export function fetchReservations(token) {
  return request("/api/reservations", { token });
}

export function createReservation(payload, token) {
  return request("/api/reservations", { method: "POST", body: payload, token });
}

export function approveReservation(id, token) {
  return request(`/api/reservations/${id}/approve`, { method: "PATCH", token });
}

export function rejectReservation(id, token) {
  return request(`/api/reservations/${id}/reject`, { method: "PATCH", token });
}

export function cancelReservation(id, token) {
  return request(`/api/reservations/${id}/cancel`, { method: "PATCH", token });
}

export function rescheduleReservation(id, payload, token) {
  return request(`/api/reservations/${id}/reschedule`, {
    method: "PATCH",
    body: payload,
    token
  });
}

export function createRecurringReservation(payload, token) {
  return request("/api/reservations/recurring", { method: "POST", body: payload, token });
}

export function fetchReservationComments(resId, token) {
  return request(`/api/reservations/${resId}/comments`, { token });
}

export function addReservationComment(resId, content, token) {
  return request(`/api/reservations/${resId}/comments`, {
    method: "POST",
    body: { content },
    token
  });
}

/* ── Leagues ──────────────────────────────────────────────── */

export function fetchLeagues(token) {
  return request("/api/leagues", { token });
}

export function fetchLeague(id, token) {
  return request(`/api/leagues/${id}`, { token });
}

export function createLeague(payload, token) {
  return request("/api/leagues", { method: "POST", body: payload, token });
}

export function deleteLeague(id, token) {
  return request(`/api/leagues/${id}`, { method: "DELETE", token });
}

export function fetchLeagueTeams(leagueId, token) {
  return request(`/api/leagues/${leagueId}/teams`, { token });
}

export function addTeamToLeague(leagueId, teamId, token) {
  return request(`/api/leagues/${leagueId}/teams`, {
    method: "POST",
    body: { teamId },
    token
  });
}

export function removeTeamFromLeague(leagueId, teamId, token) {
  return request(`/api/leagues/${leagueId}/teams/${teamId}`, {
    method: "DELETE",
    token
  });
}

/* ── Matches & Results ────────────────────────────────────── */

export function fetchLeagueMatches(leagueId, token) {
  return request(`/api/results/leagues/${leagueId}/matches`, { token });
}

export function fetchAllMatches(token) {
  return request("/api/results/matches", { token });
}

export function createMatch(payload, token) {
  return request("/api/results/matches", { method: "POST", body: payload, token });
}

export function recordMatchResult(matchId, payload, token) {
  return request(`/api/results/matches/${matchId}`, {
    method: "PATCH",
    body: payload,
    token
  });
}

/* ── Standings ────────────────────────────────────────────── */

export function fetchStandings(leagueId, token) {
  return request(`/api/results/leagues/${leagueId}/standings`, { token });
}

/* ── Team Stats ───────────────────────────────────────────── */

export function fetchTeamStats(teamId, leagueId, token) {
  const query = leagueId ? `?leagueId=${leagueId}` : "";
  return request(`/api/teams/${teamId}/stats${query}`, { token });
}

/* ── Team Members (Roster) ────────────────────────────────── */

export function fetchTeamMembers(teamId, token) {
  return request(`/api/teams/${teamId}/members`, { token });
}

export function addTeamMember(teamId, payload, token) {
  return request(`/api/teams/${teamId}/members`, {
    method: "POST",
    body: payload,
    token
  });
}

export function removeTeamMember(teamId, userId, token) {
  return request(`/api/teams/${teamId}/members/${userId}`, {
    method: "DELETE",
    token
  });
}

export function fetchMembershipOfUser(userId, token) {
  return request(`/api/teams/by-user/${userId}`, { token });
}

/* ── Goals & Top Scorers ──────────────────────────────────── */

export function fetchMatchGoals(matchId, token) {
  return request(`/api/results/matches/${matchId}/goals`, { token });
}

export function fetchTopScorers(leagueId, token) {
  return request(`/api/results/leagues/${leagueId}/top-scorers`, { token });
}

/* ── CSV Export ───────────────────────────────────────────── */

export function exportScheduleCsv(leagueId) {
  const a = document.createElement("a");
  a.href = `${API_BASE_URL}/api/results/leagues/${leagueId}/schedule.csv`;
  a.download = "raspored.csv";
  a.click();
}

export function exportStandingsCsv(leagueId) {
  const a = document.createElement("a");
  a.href = `${API_BASE_URL}/api/results/leagues/${leagueId}/standings.csv`;
  a.download = "tabela.csv";
  a.click();
}

/* ── Notifications ────────────────────────────────────────── */

export function fetchNotifications(userId, token) {
  return request(`/api/notifications/user/${userId}`, { token });
}

export function fetchUnreadNotificationCount(userId, token) {
  return request(`/api/notifications/user/${userId}/unread-count`, { token });
}

export function markNotificationRead(id, token) {
  return request(`/api/notifications/${id}/read`, { method: "PATCH", token });
}

export function markAllNotificationsRead(userId, token) {
  return request(`/api/notifications/user/${userId}/read-all`, { method: "PATCH", token });
}
