import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  createReservation as apiCreateReservation,
  createTeam,
  createTimeSlot as apiCreateTimeSlot,
  createUser,
  deleteUser as apiDeleteUser,
  approveReservation as apiApproveReservation,
  rejectReservation as apiRejectReservation,
  cancelReservation as apiCancelReservation,
  rescheduleReservation as apiRescheduleReservation,
  fetchAvailableTimeSlots,
  fetchReservations,
  fetchTeams,
  fetchTimeSlots,
  fetchUsers,
  loginUser,
  pingBackend,
  fetchLeagues,
  createLeague as apiCreateLeague,
  deleteLeague as apiDeleteLeague,
  fetchLeagueTeams as apiFetchLeagueTeams,
  addTeamToLeague as apiAddTeamToLeague,
  removeTeamFromLeague as apiRemoveTeamFromLeague,
  fetchLeagueMatches as apiFetchLeagueMatches,
  createMatch as apiCreateMatch,
  recordMatchResult as apiRecordMatchResult,
  fetchStandings as apiFetchStandings,
  fetchTeamStats as apiFetchTeamStats,
  fetchNotifications as apiFetchNotifications,
  fetchUnreadNotificationCount as apiFetchUnreadNotificationCount,
  markNotificationRead as apiMarkNotificationRead,
  markAllNotificationsRead as apiMarkAllNotificationsRead,
  updateUserProfile as apiUpdateUserProfile,
  changeUserPassword as apiChangeUserPassword
} from "../services/api.js";

const AppContext = createContext(null);
const AUTH_STORAGE_KEY = "sportsmanager-auth";

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function resolveCurrentUserId(auth) {
  return auth?.userId ?? auth?.id ?? auth?.user?.userId ?? auth?.user?.id ?? null;
}

export function AppProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);
  const [currentPage, setCurrentPage] = useState(
    readStoredAuth() ? "dashboard" : "login"
  );

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [loadingLeagues, setLoadingLeagues] = useState(false);

  const [backendStatus, setBackendStatus] = useState({
    loading: true,
    ok: false,
    message: "Provjera konekcije..."
  });

  const isAuthenticated = Boolean(auth?.token);
  const selectedRole = auth?.role || "GUEST";

  useEffect(() => {
    try {
      if (auth) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
      else localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch { /* ignore */ }
  }, [auth]);

  useEffect(() => {
    const run = async () => {
      try {
        const result = await pingBackend();
        setBackendStatus({ loading: false, ok: true, message: typeof result === "string" ? result : "Backend dostupan" });
      } catch (error) {
        setBackendStatus({ loading: false, ok: false, message: error?.message || "Backend nije dostupan" });
      }
    };
    run();
  }, []);

  const loadUsers = useCallback(async () => {
    if (!auth?.token) { setUsers([]); return []; }
    setLoadingUsers(true);
    try {
      const data = await fetchUsers(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setUsers(normalized);
      return normalized;
    } finally { setLoadingUsers(false); }
  }, [auth?.token]);

  const loadTeams = useCallback(async () => {
    if (!auth?.token) { setTeams([]); return []; }
    setLoadingTeams(true);
    try {
      const data = await fetchTeams(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setTeams(normalized);
      return normalized;
    } finally { setLoadingTeams(false); }
  }, [auth?.token]);

  const loadTimeSlots = useCallback(async () => {
    if (!auth?.token) { setTimeSlots([]); return []; }
    setLoadingTimeSlots(true);
    try {
      const data = await fetchTimeSlots(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setTimeSlots(normalized);
      return normalized;
    } finally { setLoadingTimeSlots(false); }
  }, [auth?.token]);

  const loadAvailableSlots = useCallback(async () => {
    if (!auth?.token) { setAvailableTimeSlots([]); return []; }
    try {
      const data = await fetchAvailableTimeSlots(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setAvailableTimeSlots(normalized);
      return normalized;
    } catch { setAvailableTimeSlots([]); return []; }
  }, [auth?.token]);

  const loadReservations = useCallback(async () => {
    if (!auth?.token) { setReservations([]); return []; }
    setLoadingReservations(true);
    try {
      const data = await fetchReservations(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setReservations(normalized);
      return normalized;
    } finally { setLoadingReservations(false); }
  }, [auth?.token]);

  const loadNotifications = useCallback(async () => {
    if (!auth?.token) { setNotifications([]); setUnreadCount(0); return []; }
    const uid = resolveCurrentUserId(auth);
    if (!uid) return [];
    try {
      const [list, countResp] = await Promise.all([
        apiFetchNotifications(uid, auth.token),
        apiFetchUnreadNotificationCount(uid, auth.token)
      ]);
      const normalized = Array.isArray(list) ? list : [];
      setNotifications(normalized);
      setUnreadCount(Number(countResp?.unread || 0));
      return normalized;
    } catch {
      setNotifications([]);
      setUnreadCount(0);
      return [];
    }
  }, [auth]);

  const loadLeagues = useCallback(async () => {
    if (!auth?.token) { setLeagues([]); return []; }
    setLoadingLeagues(true);
    try {
      const data = await fetchLeagues(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setLeagues(normalized);
      return normalized;
    } finally { setLoadingLeagues(false); }
  }, [auth?.token]);

  useEffect(() => {
    if (auth?.token) {
      loadUsers();
      loadTeams();
      loadTimeSlots();
      loadAvailableSlots();
      loadReservations();
      loadLeagues();
      loadNotifications();
    } else {
      setUsers([]);
      setTeams([]);
      setTimeSlots([]);
      setAvailableTimeSlots([]);
      setReservations([]);
      setLeagues([]);
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [auth?.token, loadUsers, loadTeams, loadTimeSlots, loadAvailableSlots, loadReservations, loadLeagues, loadNotifications]);

  useEffect(() => {
    if (!auth?.token) return undefined;
    const handle = setInterval(() => loadNotifications(), 30000);
    return () => clearInterval(handle);
  }, [auth?.token, loadNotifications]);

  const login = async (payload) => {
    const result = await loginUser(payload);
    setAuth(result);
    setCurrentPage("dashboard");
    return result;
  };

  const logout = () => {
    setAuth(null);
    setCurrentPage("login");
    setUsers([]);
    setTeams([]);
    setTimeSlots([]);
    setAvailableTimeSlots([]);
    setReservations([]);
    setLeagues([]);
  };

  const navigate = (page) => setCurrentPage(page);

  const registerUser = async (payload) => {
    const created = await createUser(payload, auth?.token);
    if (auth?.token) await loadUsers();
    return created;
  };

  const removeUser = async (id) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    await apiDeleteUser(id, auth.token);
    await loadUsers();
  };

  const registerTeam = async (payload) => {
    const created = await createTeam(payload, auth?.token);
    if (auth?.token) await loadTeams();
    return created;
  };

  const createNewTimeSlot = async (payload) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const body = {
      slotDate:     payload.slotDate,
      startTime:    payload.startTime,
      endTime:      payload.endTime,
      location:     payload.location,
      resourceName: payload.resourceName,
      sport:        payload.sport || null,
    };
    const created = await apiCreateTimeSlot(body, auth.token);
    await Promise.all([loadTimeSlots(), loadAvailableSlots()]);
    return created;
  };

  const addReservation = async (payload) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const createdByUserId = resolveCurrentUserId(auth);
    if (!createdByUserId) throw new Error("Nedostaje userId u prijavljenom korisniku.");
    const body = {
      teamId: Number(payload.teamId),
      slotId: Number(payload.slotId),
      createdByUserId: Number(createdByUserId),
      note: payload.note?.trim() || null,
      sport: payload.sport || null
    };
    const created = await apiCreateReservation(body, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots(), loadNotifications()]);
    return created;
  };

  const approveReservation = async (id) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const updated = await apiApproveReservation(id, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots(), loadNotifications()]);
    return updated;
  };

  const rejectReservation = async (id) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const updated = await apiRejectReservation(id, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots(), loadNotifications()]);
    return updated;
  };

  const cancelReservation = async (id) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const updated = await apiCancelReservation(id, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots(), loadNotifications()]);
    return updated;
  };

  const rescheduleReservation = async (id, payload) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const body = {
      newSlotId: Number(payload.newSlotId),
      note: payload.note?.trim() || null
    };
    const updated = await apiRescheduleReservation(id, body, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots(), loadNotifications()]);
    return updated;
  };

  /* ── Liga akcije ──────────────────────────────────────────── */

  const addLeague = async (payload) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const created = await apiCreateLeague({
      leagueName: payload.leagueName,
      season: payload.season,
      sport: payload.sport || null
    }, auth.token);
    await loadLeagues();
    return created;
  };

  const removeLeague = async (leagueId) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    await apiDeleteLeague(leagueId, auth.token);
    await Promise.all([loadLeagues(), loadTimeSlots(), loadAvailableSlots()]);
  };

  const getLeagueTeams = (leagueId) => {
    if (!auth?.token) return Promise.resolve([]);
    return apiFetchLeagueTeams(leagueId, auth.token);
  };

  const addTeamToLeague = async (leagueId, teamId) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    await apiAddTeamToLeague(leagueId, teamId, auth.token);
  };

  const removeTeamFromLeague = async (leagueId, teamId) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    await apiRemoveTeamFromLeague(leagueId, teamId, auth.token);
  };

  const getLeagueMatches = (leagueId) => {
    if (!auth?.token) return Promise.resolve([]);
    return apiFetchLeagueMatches(leagueId, auth.token);
  };

  const addMatch = async (payload) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const result = await apiCreateMatch({
      leagueId: payload.leagueId,
      homeTeamId: payload.homeTeamId,
      awayTeamId: payload.awayTeamId,
      matchDate: payload.matchDate,
      location: payload.location || null,
      resourceName: payload.resourceName || null,
      startTime: payload.startTime || null,
      endTime: payload.endTime || null,
      slotId: payload.slotId ? Number(payload.slotId) : null
    }, auth.token);
    // Osvjezi slotove jer je novi termin zauzet
    await Promise.all([loadTimeSlots(), loadAvailableSlots()]);
    return result;
  };

  const submitResult = async (matchId, payload) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    return apiRecordMatchResult(matchId, payload, auth.token);
  };

  const getLeagueStandings = (leagueId) => {
    if (!auth?.token) return Promise.resolve([]);
    return apiFetchStandings(leagueId, auth.token);
  };

  const getTeamStats = (teamId, leagueId) => {
    if (!auth?.token) return Promise.resolve(null);
    return apiFetchTeamStats(teamId, leagueId, auth.token);
  };

  /* ── Notifications ────────────────────────────────────────── */

  const markNotificationRead = async (id) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    await apiMarkNotificationRead(id, auth.token);
    await loadNotifications();
  };

  const markAllNotificationsRead = async () => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const uid = resolveCurrentUserId(auth);
    if (!uid) return;
    await apiMarkAllNotificationsRead(uid, auth.token);
    await loadNotifications();
  };

  /* ── Profile / Password ───────────────────────────────────── */

  const updateProfile = async (payload) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const uid = resolveCurrentUserId(auth);
    if (!uid) throw new Error("Nedostaje userId.");
    const updated = await apiUpdateUserProfile(uid, payload, auth.token);
    setAuth(prev => prev ? { ...prev, fullName: updated.fullName, email: updated.email } : prev);
    await loadUsers();
    return updated;
  };

  const changePassword = async (payload) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    const uid = resolveCurrentUserId(auth);
    if (!uid) throw new Error("Nedostaje userId.");
    await apiChangeUserPassword(uid, payload, auth.token);
  };

  const value = useMemo(
    () => ({
      auth,
      currentUser: auth,
      isAuthenticated,
      selectedRole,
      currentPage,
      backendStatus,
      users,
      teams,
      timeSlots,
      availableTimeSlots,
      reservations,
      leagues,
      loadingUsers,
      loadingTeams,
      loadingTimeSlots,
      loadingReservations,
      loadingLeagues,
      login,
      logout,
      navigate,
      loadUsers,
      loadTeams,
      loadTimeSlots,
      loadAvailableSlots,
      loadReservations,
      loadLeagues,
      registerUser,
      removeUser,
      registerTeam,
      createNewTimeSlot,
      addReservation,
      approveReservation,
      rejectReservation,
      cancelReservation,
      rescheduleReservation,
      notifications,
      unreadCount,
      loadNotifications,
      markNotificationRead,
      markAllNotificationsRead,
      getTeamStats,
      updateProfile,
      changePassword,
      addLeague,
      removeLeague,
      getLeagueTeams,
      addTeamToLeague,
      removeTeamFromLeague,
      getLeagueMatches,
      addMatch,
      submitResult,
      getLeagueStandings
    }),
    [
      auth,
      isAuthenticated,
      selectedRole,
      currentPage,
      backendStatus,
      users,
      teams,
      timeSlots,
      availableTimeSlots,
      reservations,
      leagues,
      notifications,
      unreadCount,
      loadingUsers,
      loadingTeams,
      loadingTimeSlots,
      loadingReservations,
      loadingLeagues,
      loadUsers,
      loadTeams,
      loadTimeSlots,
      loadAvailableSlots,
      loadReservations,
      loadLeagues,
      loadNotifications
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppProvider.");
  return context;
}
