import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  createTeam,
  createUser,
  fetchTeams,
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

export function AppProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);
  const [currentPage, setCurrentPage] = useState(readStoredAuth() ? "dashboard" : "login");

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);

  const [backendStatus, setBackendStatus] = useState({
    loading: true,
    ok: false,
    message: "Provjera konekcije..."
  });

  const isAuthenticated = Boolean(auth?.token);
  const selectedRole = auth?.role || "GUEST";

  useEffect(() => {
    if (auth) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
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
          message: error.message || "Backend nije dostupan"
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

  useEffect(() => {
    if (auth?.token) {
      loadUsers();
      loadTeams();
    } else {
      setUsers([]);
      setTeams([]);
    }
  }, [auth?.token, loadUsers, loadTeams]);

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

  const registerTeam = async (payload) => {
    const created = await createTeam(payload, auth?.token);
    if (auth?.token) {
      await loadTeams();
    }
    return created;
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
      loadingUsers,
      loadingTeams,
      login,
      logout,
      navigate,
      loadUsers,
      loadTeams,
      registerUser,
      registerTeam
    }),
    [
      auth,
      isAuthenticated,
      selectedRole,
      currentPage,
      backendStatus,
      users,
      teams,
      loadingUsers,
      loadingTeams,
      loadUsers,
      loadTeams
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