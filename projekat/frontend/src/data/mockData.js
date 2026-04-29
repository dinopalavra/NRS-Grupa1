export const initialUsers = [
  { id: 1, fullName: "Admin User", email: "admin@sportsmanager.ba", role: "ADMIN", status: "ACTIVE" },
  { id: 2, fullName: "Liga Manager", email: "manager@sportsmanager.ba", role: "MANAGER", status: "ACTIVE" },
  { id: 3, fullName: "Amel Divovic", email: "amel@student.ba", role: "USER", status: "ACTIVE" },
  { id: 4, fullName: "Lejla Hadzic", email: "lejla@student.ba", role: "USER", status: "ACTIVE" }
];

export const initialTeams = [
  { id: 1, name: "FK Akademija", city: "Sarajevo", captain: "Amel Divovic", members: 14 },
  { id: 2, name: "KK Centar", city: "Tuzla", captain: "Lejla Hadzic", members: 10 },
  { id: 3, name: "OK Mostar", city: "Mostar", captain: "Adnan Music", members: 12 }
];

export const initialReservations = [
  { id: 1, facility: "Dvorana Skenderija", team: "FK Akademija", date: "2026-05-03", time: "18:00 - 19:30", status: "pending" },
  { id: 2, facility: "Gradski Stadion", team: "KK Centar", date: "2026-05-04", time: "20:00 - 21:30", status: "approved" },
  { id: 3, facility: "Mala Sala Dobrinja", team: "OK Mostar", date: "2026-05-06", time: "17:00 - 18:30", status: "rejected" },
  { id: 4, facility: "Arena Ilidza", team: "FK Akademija", date: "2026-05-08", time: "21:00 - 22:00", status: "approved" }
];

export const initialLeagues = [
  {
    id: 1,
    name: "Studentska liga FBiH",
    season: "2025/2026",
    standings: [
      { team: "FK Akademija", played: 8, wins: 6, draws: 1, losses: 1, points: 19 },
      { team: "KK Centar", played: 8, wins: 5, draws: 2, losses: 1, points: 17 },
      { team: "OK Mostar", played: 8, wins: 4, draws: 1, losses: 3, points: 13 },
      { team: "RK Vitez", played: 8, wins: 2, draws: 1, losses: 5, points: 7 }
    ]
  }
];

export const initialResults = [
  { id: 1, homeTeam: "FK Akademija", awayTeam: "KK Centar", score: "3 : 1", date: "2026-04-10", status: "completed" },
  { id: 2, homeTeam: "OK Mostar", awayTeam: "RK Vitez", score: "2 : 2", date: "2026-04-14", status: "completed" },
  { id: 3, homeTeam: "KK Centar", awayTeam: "OK Mostar", score: "Zakazano", date: "2026-05-11", status: "active" }
];