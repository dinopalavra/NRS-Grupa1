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
  fetchAvailableTimeSlots,
  fetchReservations,
  fetchTeams,
  fetchTimeSlots,
  fetchUsers,
  loginUser,
  pingBackend
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

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [loadingReservations, setLoadingReservations] = useState(false);

  const [backendStatus, setBackendStatus] = useState({
    loading: true,
    ok: false,
    message: "Provjera konekcije..."
  });

  const isAuthenticated = Boolean(auth?.token);
  const selectedRole = auth?.role || "GUEST";

  useEffect(() => {
    try {
      if (auth) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore localStorage errors
    }
  }, [auth]);

  useEffect(() => {
    const run = async () => {
      try {
        const result = await pingBackend();
        setBackendStatus({
          loading: false,
          ok: true,
          message: typeof result === "string" ? result : "Backend dostupan"
        });
      } catch (error) {
        setBackendStatus({
          loading: false,
          ok: false,
          message: error?.message || "Backend nije dostupan"
        });
      }
    };

    run();
  }, []);

  const loadUsers = useCallback(async () => {
    if (!auth?.token) {
      setUsers([]);
      return [];
    }

    setLoadingUsers(true);
    try {
      const data = await fetchUsers(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setUsers(normalized);
      return normalized;
    } finally {
      setLoadingUsers(false);
    }
  }, [auth?.token]);

  const loadTeams = useCallback(async () => {
    if (!auth?.token) {
      setTeams([]);
      return [];
    }

    setLoadingTeams(true);
    try {
      const data = await fetchTeams(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setTeams(normalized);
      return normalized;
    } finally {
      setLoadingTeams(false);
    }
  }, [auth?.token]);

  const loadTimeSlots = useCallback(async () => {
    if (!auth?.token) {
      setTimeSlots([]);
      return [];
    }

    setLoadingTimeSlots(true);
    try {
      const data = await fetchTimeSlots(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setTimeSlots(normalized);
      return normalized;
    } finally {
      setLoadingTimeSlots(false);
    }
  }, [auth?.token]);

  const loadAvailableSlots = useCallback(async () => {
    if (!auth?.token) {
      setAvailableTimeSlots([]);
      return [];
    }

    try {
      const data = await fetchAvailableTimeSlots(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setAvailableTimeSlots(normalized);
      return normalized;
    } catch (error) {
      setAvailableTimeSlots([]);
      throw error;
    }
  }, [auth?.token]);

  const loadReservations = useCallback(async () => {
    if (!auth?.token) {
      setReservations([]);
      return [];
    }

    setLoadingReservations(true);
    try {
      const data = await fetchReservations(auth.token);
      const normalized = Array.isArray(data) ? data : [];
      setReservations(normalized);
      return normalized;
    } finally {
      setLoadingReservations(false);
    }
  }, [auth?.token]);

  useEffect(() => {
    if (auth?.token) {
      loadUsers();
      loadTeams();
      loadTimeSlots();
      loadAvailableSlots();
      loadReservations();
    } else {
      setUsers([]);
      setTeams([]);
      setTimeSlots([]);
      setAvailableTimeSlots([]);
      setReservations([]);
    }
  }, [
    auth?.token,
    loadUsers,
    loadTeams,
    loadTimeSlots,
    loadAvailableSlots,
    loadReservations
  ]);

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
  };

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const registerUser = async (payload) => {
    const created = await createUser(payload, auth?.token);
    if (auth?.token) {
      await loadUsers();
    }
    return created;
  };

  const removeUser = async (id) => {
    if (!auth?.token) throw new Error("Niste prijavljeni.");
    await apiDeleteUser(id, auth.token);
    await loadUsers();
  };

  const registerTeam = async (payload) => {
    const created = await createTeam(payload, auth?.token);
    if (auth?.token) {
      await loadTeams();
    }
    return created;
  };

  const createNewTimeSlot = async (payload) => {
    if (!auth?.token) {
      throw new Error("Niste prijavljeni.");
    }

    const created = await apiCreateTimeSlot(payload, auth.token);
    await Promise.all([loadTimeSlots(), loadAvailableSlots()]);
    return created;
  };

  const addReservation = async (payload) => {
    if (!auth?.token) {
      throw new Error("Niste prijavljeni.");
    }

    const createdByUserId = resolveCurrentUserId(auth);

    if (!createdByUserId) {
      throw new Error("Nedostaje userId u prijavljenom korisniku.");
    }

    const body = {
      teamId: Number(payload.teamId),
      slotId: Number(payload.slotId),
      createdByUserId: Number(createdByUserId),
      note: payload.note?.trim() || null
    };

    const created = await apiCreateReservation(body, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots()]);
    return created;
  };

  const approveReservation = async (id) => {
    if (!auth?.token) {
      throw new Error("Niste prijavljeni.");
    }

    const updated = await apiApproveReservation(id, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots()]);
    return updated;
  };

  const rejectReservation = async (id) => {
    if (!auth?.token) {
      throw new Error("Niste prijavljeni.");
    }

    const updated = await apiRejectReservation(id, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots()]);
    return updated;
  };

  const cancelReservation = async (id) => {
    if (!auth?.token) {
      throw new Error("Niste prijavljeni.");
    }

    const updated = await apiCancelReservation(id, auth.token);
    await Promise.all([loadReservations(), loadTimeSlots(), loadAvailableSlots()]);
    return updated;
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
      loadingUsers,
      loadingTeams,
      loadingTimeSlots,
      loadingReservations,
      login,
      logout,
      navigate,
      loadUsers,
      loadTeams,
      loadTimeSlots,
      loadAvailableSlots,
      loadReservations,
      registerUser,
      removeUser,
      registerTeam,
      createNewTimeSlot,
      addReservation,
      approveReservation,
      rejectReservation,
      cancelReservation
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
      loadingUsers,
      loadingTeams,
      loadingTimeSlots,
      loadingReservations,
      loadUsers,
      loadTeams,
      loadTimeSlots,
      loadAvailableSlots,
      loadReservations
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider.");
  }

  return context;
}