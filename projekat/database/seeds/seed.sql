INSERT INTO users (fullname, email, username, passwordhash, role, active)
VALUES
('Admin User', 'admin@sportsmanager.ba', 'admin', 'admin123', 'ADMIN', TRUE),
('Liga Manager', 'manager@sportsmanager.ba', 'manager', 'manager123', 'MANAGER', TRUE),
('Amel Divovic', 'amel@student.ba', 'amel', 'amel123', 'USER', TRUE)
ON CONFLICT (username) DO NOTHING;

INSERT INTO teams (teamname, city, captainname, memberscount, status)
VALUES
('FK Akademija', 'Sarajevo', 'Amel Divovic', 14, 'ACTIVE'),
('KK Centar', 'Tuzla', 'Lejla Hadzic', 10, 'ACTIVE'),
('OK Mostar', 'Mostar', 'Adnan Music', 12, 'ACTIVE')
ON CONFLICT DO NOTHING;

INSERT INTO timeslots (slotdate, starttime, endtime, location, resourcename, availabilitystatus)
VALUES
('2026-05-03', '18:00', '19:30', 'Dvorana Skenderija', 'Termin 1', 'AVAILABLE'),
('2026-05-04', '20:00', '21:30', 'Gradski Stadion', 'Termin 2', 'AVAILABLE'),
('2026-05-06', '17:00', '18:30', 'Mala Sala Dobrinja', 'Termin 3', 'AVAILABLE')
ON CONFLICT DO NOTHING;

INSERT INTO leagues (leaguename, season, status)
VALUES
('Studentska liga FBiH', '2025/2026', 'ACTIVE')
ON CONFLICT DO NOTHING;

INSERT INTO matches (leagueid, hometeamid, awayteamid, matchdate, status, homescore, awayscore)
VALUES
(1, 1, 2, '2026-05-15', 'SCHEDULED', NULL, NULL),
(1, 2, 3, '2026-05-18', 'SCHEDULED', NULL, NULL)
ON CONFLICT DO NOTHING;