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




