# Model baze podataka

## Uvod

Model baze podataka predstavlja početni logički prikaz podataka potrebnih za rad sistema za upravljanje sportskim terminima i ligama.
Cilj modela je osigurati da sistem može podržati korisnike, timove, termine, rezervacije, lige, utakmice i rezultate.

## Glavne tabele

- users
- teams
- team_members
- time_slots
- reservations
- leagues
- leagues_teams
- matches
- results
- standings

## Opis tabela

### users
Sadrži podatke o registrovanim korisnicima sistema.

**Ključni atributi:**
- user_id
- full_name
- email
- username
- password_hash
- role
- active

### teams
Sadrži podatke o timovima-

**Ključni atributi:**
- team_id
- team_name
- created_by
- created_at
- status

### team_members
Predstavlja vezu izmeđe korisnika i timova.

**Ključni atributi:**
- team_memeber_id
- team_id
- user_id
- member_role
- joined_at

### time_slots
Sadrži raspoložive termine za korištenje sportskih resursa.

**Ključni atributi:**
- slot_id
- slot_date
- start_time
- end_time
- location
- resource_name
- availability_status

### reservations
Predstavlja rezervacije termina od strane timova.

**Ključni atributi:**
- reservation_id
- team_id
- slot_id
- created_by
- status
- created_at

### leagues
Sadrži osnovne podatke o ligama ili takmičenjima.

**Ključni atributi:**
- league_id
- league_name
- season
- format
- status

### league_teams
Predstavlja vezu između lige i timova koji učestvuju u ligi.

**Ključni atributi:**
- league_team_id
- league_id
- team_id

### matches
Sadrži podatke o utakmicama.

**Ključni atributi:**
- match_id
- league_id
- home_team_id
- away_team_id
- match_date
- match_time
- status

### results
Sadrži rezultat odigrane utakmice.

**Ključni atributi:**
- result_id
- match_id
- home_score
- away_score
- entered_by
- entered_at

### standings
Sadrži agregirane podatke za tabelu lige.

**Ključni atributi:**
- standing_id
- league_id
- team_id
- played
- wins
- draws
- losses
- goals_for
- goals_against
- points

## Veze između tabela

- `teams.created_by` referencira `users.user_id`
- `team_members.team_id` referencira `teams.team_id`
- `team_members.user_id` referencira `users.user_id`
- `reservations.team_id` referencira `teams.team_id`
- `reservations.slot_id` referencira `time_slots.slot_id`
- `reservations.created_by` referencira `users.user_id`
- `league_teams.league_id` referencira `leagues.league_id`
- `league_teams.team_id` referencira `teams.team_id`
- `matches.league_id` referencira `leagues.league_id`
- `matches.home_team_id` referencira `teams.team_id`
- `matches.away_team_id` referencira `teams.team_id`
- `results.match_id` referencira `matches.match_id`
- `results.entered_by` referencira `users.user_id`
- `standings.league_id` referencira `leagues.league_id`
- `standings.team_id` referencira `teams.team_id`

## Poslovna pravila važna za bazu

- Jedan korisnik može biti član više timova samo ako to poslovna pravila dozvoljavaju.
- Jedan termin ne smije imati više potvrđenih rezervacija za isti resurs i isti vremenski interval.
- Jedna utakmica mora imati tačno dva različita tima.
- Jedna utakmica može imati najviše jedan konačni rezultat.
- Tabela lige se vodi po timu unutar jedne konkretne lige.
- Samo aktivni korisnici mogu imati funkcionalnu ulogu u sistemu.

## Zaključak

Ovaj model baze podataka predstavlja logičku osnovu za kasniju fizičku realizaciju baze i implementaciju poslovne logike sistema.



