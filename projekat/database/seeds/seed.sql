INSERT INTO users (full_name, email, username, password_hash, role, active)
VALUES
('Admin User', 'admin@sportsmanager.ba', 'admin', 'hashed_password', 'ADMIN', TRUE),
('Captain User', 'captain@sportsmanager.ba', 'captain', 'hashed_password', 'CAPTAIN', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO teams (team_name, created_by, status)
VALUES
('FK Developeri', 1, 'ACTIVE'),
('FC Backend', 2, 'ACTIVE')
ON CONFLICT DO NOTHING;