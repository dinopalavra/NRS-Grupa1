# Decision Log

## Pregled odluka

| ID odluke | Datum | Kratak naziv odluke | Opis problema ili pitanja | Razmatrane opcije | Odabrana opcija | Razlog izbora | Posljedice odluke | Status |
|---|---|---|---|---|---|---|---|---|
| DL-5-01 | 2026-04-29 | Zadržavanje postojećeg tehnološkog stacka | Trebalo je potvrditi da li tim ostaje na postojećem stacku iz skeletona | Promjena stacka; zadržavanje Spring Boot + React + PostgreSQL | Zadržavanje postojećeg stecka | Stack je već definisan i djelimično postavljen u projektu | Omogućava kontinuitet rada i brži početak implementacije | Aktivna |
| DL-5-02 | 2026-04-29 | Korištenje lokalne PostgreSQL baze za razvoj | Trebalo je odabrati razvojno okruženje za bazu podataka | In-memory baza; lokalni PostgreSQL | Lokalni PostgreSQL | Bliže je planiranoj produkcijskoj arhitekturi i modelu baze | Potrebna lokalna konfiguracija i održavanje baze| Aktivna |
| DL-5-03 | 2026-04-29 | Privremeni testni users endpoint | Trebalo je odlučiti kako validirati prvi API inkrement | Odmah puna JPA implementacija; privremeni testni endpoint | Privremeni 'GET /api/users' endpoint | Brža validacija da backend i API sloj rade | Potrebna kasnija  zamjena punom implementacijom | Aktivna |
| DL-5-04 | 2026-04-30 | Odgađanje autentifikacije za naredni sprint | Trebalo je odlučiti da li raditi auth odmah ili nakon osnovne integracije | Paralelno auth + integracija; prvo osnovna integracija | Prvo osnovna integracija frontend-backend | Smanjuje rizik i omogućava fokus na prvi radni tok | Login i role-based pristup ostaju za naredni korak | Aktivna | 
| DL-5-05 | 2026-04-30 | Uvođenje env varijable za API URL | Trebalo je definisati kako frontend čita backend adresu | Hardkodiran URL; env varijable | Env varijabla za API base URL | Lakše razlikovanje lokalnog i produkcijskog okruženja | Potrebno ažurirati frontend konfiguraciju i deployment postavke | Aktivna |
