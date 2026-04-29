import { createContext, useContext, useMemo, useState } from "react";
import {
  initialUsers,
  initialTeams,
  initialReservations,
  initialLeagues,
  initialResults
} from "../data/mockData.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedRole, setSelectedRole] = useState("ADMIN");
  const [users, setUsers] = useState(initialUsers);
  const [teams, setTeams] = useState(initialTeams);
  const [reservations, setReservations] = useState(initialReservations);
  const [leagues] = useState(initialLeagues);
  const [results] = useState(initialResults);

  const addUser = (payload) => {
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        status: "ACTIVE",
        ...payload
      }
    ]);
  };

  const addTeam = (payload) => {
    setTeams((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        members: Number(payload.members) || 0,
        ...payload
      }
    ]);
  };

  const addReservation = (payload) => {
    setReservations((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        status: "pending",
        ...payload
      }
    ]);
  };

  const updateReservationStatus = (id, status) => {
    setReservations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const value = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      selectedRole,
      setSelectedRole,
      users,
      teams,
      reservations,
      leagues,
      results,
      addUser,
      addTeam,
      addReservation,
      approveReservation: (id) => updateReservationStatus(id, "approved"),
      rejectReservation: (id) => updateReservationStatus(id, "rejected")
    }),
    [currentPage, selectedRole, users, teams, reservations, leagues, results]
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