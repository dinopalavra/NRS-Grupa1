# Model baze podataka

## Uvod

Model baze podataka predstavlja početni logički prikaz podataka potrebnih za rad sistema za upravljanje sportskim terminima i ligama.  
Cilj modela je osigurati da sistem može podržati korisnike, timove, termine, rezervacije, lige, utakmice i rezultate, te da posluži kao osnova za kasniju fizičku realizaciju baze podataka i implementaciju poslovne logike.

Ovaj model je usklađen sa domain modelom i planiranim MVP opsegom sistema, a pojedina pravila i ograničenja mogu biti dodatno precizirana kroz komunikaciju sa Product Ownerom i kroz naredne sprintove.

---

## Glavne tabele

Sistem se zasniva na sljedećim glavnim tabelama:

- `users`
- `teams`
- `team_members`
- `time_slots`
- `reservations`
- `leagues`
- `league_teams`
- `matches`
- `results`
- `standings`

---

## Pregled tabela i njihove namjene

| Tabela | Namjena |
|---|---|
| `users` | Čuva podatke o registrovanim korisnicima sistema. |
| `teams` | Čuva podatke o sportskim timovima. |
| `team_members` | Predstavlja vezu između korisnika i timova. |
| `time_slots` | Čuva podatke o raspoloživim terminima i resursima. |
| `reservations` | Evidentira rezervacije termina koje prave timovi. |
| `leagues` | Čuva osnovne podatke o ligama ili takmičenjima. |
| `league_teams` | Predstavlja vezu između liga i timova koji učestvuju u njima. |
| `matches` | Čuva podatke o utakmicama unutar liga. |
| `results` | Evidentira rezultate odigranih utakmica. |
| `standings` | Čuva agregirane podatke za tabelu lige. |

---

## Opis tabela i ključnih atributa

### `users`

Sadrži podatke o registrovanim korisnicima sistema.

| Atribut | Opis |
|---|---|
| `user_id` | Jedinstveni identifikator korisnika |
| `full_name` | Puno ime i prezime korisnika |
| `email` | Email adresa korisnika |
| `username` | Korisničko ime za prijavu |
| `password_hash` | Hashirana lozinka korisnika |
| `role` | Sistemska uloga korisnika |
| `active` | Oznaka da li je korisnik aktivan |

### `teams`

Sadrži podatke o timovima.

| Atribut | Opis |
|---|---|
| `team_id` | Jedinstveni identifikator tima |
| `team_name` | Naziv tima |
| `created_by` | Korisnik koji je kreirao tim |
| `created_at` | Datum i vrijeme kreiranja tima |
| `status` | Trenutni status tima |

### `team_members`

Predstavlja vezu između korisnika i timova.

| Atribut | Opis |
|---|---|
| `team_member_id` | Jedinstveni identifikator zapisa članstva |
| `team_id` | Identifikator tima |
| `user_id` | Identifikator korisnika |
| `member_role` | Uloga korisnika unutar tima |
| `joined_at` | Datum pridruživanja timu |

### `time_slots`

Sadrži raspoložive termine za korištenje sportskih resursa.

| Atribut | Opis |
|---|---|
| `slot_id` | Jedinstveni identifikator termina |
| `slot_date` | Datum termina |
| `start_time` | Vrijeme početka termina |
| `end_time` | Vrijeme završetka termina |
| `location` | Lokacija održavanja termina |
| `resource_name` | Naziv sportskog resursa ili terena |
| `availability_status` | Status raspoloživosti termina |

### `reservations`

Predstavlja rezervacije termina od strane timova.

| Atribut | Opis |
|---|---|
| `reservation_id` | Jedinstveni identifikator rezervacije |
| `team_id` | Tim koji pravi rezervaciju |
| `slot_id` | Termin koji se rezerviše |
| `created_by` | Korisnik koji je izvršio rezervaciju |
| `status` | Status rezervacije |
| `created_at` | Datum i vrijeme kreiranja rezervacije |

### `leagues`

Sadrži osnovne podatke o ligama ili takmičenjima.

| Atribut | Opis |
|---|---|
| `league_id` | Jedinstveni identifikator lige |
| `league_name` | Naziv lige |
| `season` | Sezona takmičenja |
| `format` | Format takmičenja |
| `status` | Status lige |

### `league_teams`

Predstavlja vezu između lige i timova koji učestvuju u ligi.

| Atribut | Opis |
|---|---|
| `league_team_id` | Jedinstveni identifikator zapisa veze |
| `league_id` | Identifikator lige |
| `team_id` | Identifikator tima |

### `matches`

Sadrži podatke o utakmicama.

| Atribut | Opis |
|---|---|
| `match_id` | Jedinstveni identifikator utakmice |
| `league_id` | Liga kojoj utakmica pripada |
| `home_team_id` | Domaći tim |
| `away_team_id` | Gostujući tim |
| `match_date` | Datum utakmice |
| `match_time` | Vrijeme utakmice |
| `status` | Status utakmice |

### `results`

Sadrži rezultat odigrane utakmice.

| Atribut | Opis |
|---|---|
| `result_id` | Jedinstveni identifikator rezultata |
| `match_id` | Utakmica na koju se rezultat odnosi |
| `home_score` | Broj golova domaćeg tima |
| `away_score` | Broj golova gostujućeg tima |
| `entered_by` | Korisnik koji je unio rezultat |
| `entered_at` | Datum i vrijeme unosa rezultata |

### `standings`

Sadrži agregirane podatke za tabelu lige.

| Atribut | Opis |
|---|---|
| `standing_id` | Jedinstveni identifikator zapisa u tabeli |
| `league_id` | Liga kojoj zapis pripada |
| `team_id` | Tim na koji se zapis odnosi |
| `played` | Broj odigranih utakmica |
| `wins` | Broj pobjeda |
| `draws` | Broj neriješenih utakmica |
| `losses` | Broj poraza |
| `goals_for` | Broj datih golova |
| `goals_against` | Broj primljenih golova |
| `points` | Ukupan broj bodova |

---

## Veze između tabela

### Pregled referenci

| Izvorna tabela i atribut | Referencira | Značenje veze |
|---|---|---|
| `teams.created_by` | `users.user_id` | Tim je kreiran od strane korisnika |
| `team_members.team_id` | `teams.team_id` | Članstvo pripada timu |
| `team_members.user_id` | `users.user_id` | Članstvo pripada korisniku |
| `reservations.team_id` | `teams.team_id` | Rezervaciju pravi tim |
| `reservations.slot_id` | `time_slots.slot_id` | Rezervacija se odnosi na termin |
| `reservations.created_by` | `users.user_id` | Rezervaciju evidentira korisnik |
| `league_teams.league_id` | `leagues.league_id` | Veza pripada ligi |
| `league_teams.team_id` | `teams.team_id` | Veza uključuje tim |
| `matches.league_id` | `leagues.league_id` | Utakmica pripada ligi |
| `matches.home_team_id` | `teams.team_id` | Domaći tim u utakmici |
| `matches.away_team_id` | `teams.team_id` | Gostujući tim u utakmici |
| `results.match_id` | `matches.match_id` | Rezultat pripada utakmici |
| `results.entered_by` | `users.user_id` | Rezultat je unio korisnik |
| `standings.league_id` | `leagues.league_id` | Zapis tabele pripada ligi |
| `standings.team_id` | `teams.team_id` | Zapis tabele pripada timu |

## Poslovna pravila važna za bazu

- Jedan korisnik može biti član više timova samo ako to poslovna pravila dozvoljavaju.
- Jedan termin ne smije imati više potvrđenih rezervacija za isti resurs i isti vremenski interval.
- Jedna utakmica mora imati tačno dva različita tima.
- Jedna utakmica može imati najviše jedan konačni rezultat.
- Tabela lige se vodi po timu unutar jedne konkretne lige.
- Samo aktivni korisnici mogu imati funkcionalnu ulogu u sistemu.

## Zaključak

Ovaj model baze podataka predstavlja logičku osnovu za kasniju fizičku realizaciju baze i implementaciju poslovne logike sistema.



