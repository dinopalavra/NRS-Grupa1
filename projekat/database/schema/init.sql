CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    passwordhash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS teams (
    teamid SERIAL PRIMARY KEY,
    teamname VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    captainname VARCHAR(100) NOT NULL,
    memberscount INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS timeslots (
    slotid SERIAL PRIMARY KEY,
    slotdate DATE NOT NULL,
    starttime TIME NOT NULL,
    endtime TIME NOT NULL,
    location VARCHAR(100) NOT NULL,
    resourcename VARCHAR(100) NOT NULL,
    availabilitystatus VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE'
);

CREATE TABLE IF NOT EXISTS reservations (
    reservationid SERIAL PRIMARY KEY,
    teamid INTEGER NOT NULL REFERENCES teams(teamid),
    slotid INTEGER NOT NULL REFERENCES timeslots(slotid),
    createdby INTEGER NOT NULL REFERENCES users(userid),
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    note VARCHAR(500),
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leagues (
    leagueid SERIAL PRIMARY KEY,
    leaguename VARCHAR(100) NOT NULL,
    season VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS matches (
    matchid SERIAL PRIMARY KEY,
    leagueid INTEGER NOT NULL REFERENCES leagues(leagueid),
    hometeamid INTEGER NOT NULL REFERENCES teams(teamid),
    awayteamid INTEGER NOT NULL REFERENCES teams(teamid),
    matchdate DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',
    homescore INTEGER,
    awayscore INTEGER
);

CREATE TABLE IF NOT EXISTS standings (
    standingid SERIAL PRIMARY KEY,
    leagueid INTEGER NOT NULL REFERENCES leagues(leagueid),
    teamid INTEGER NOT NULL REFERENCES teams(teamid),
    played INTEGER NOT NULL DEFAULT 0,
    wins INTEGER NOT NULL DEFAULT 0,
    draws INTEGER NOT NULL DEFAULT 0,
    losses INTEGER NOT NULL DEFAULT 0,
    goalsfor INTEGER NOT NULL DEFAULT 0,
    goalsagainst INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT uq_standing_league_team UNIQUE (leagueid, teamid)
);