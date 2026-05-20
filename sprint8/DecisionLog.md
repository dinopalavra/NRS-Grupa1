# Decision Log
## Sprint 8

**Datum:** 18.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Odluka #001 — Polling vs. WebSocket za notifikacije

| Polje | Opis |
|---|---|
| ID odluke | DL8-001 |
| Datum | 18.05.2026. |
| Kratak naziv odluke | Mehanizam isporuke notifikacija u realnom vremenu |
| Opis problema | Notifikacijski sistem mora informisati korisnike o događajima (rezervacije, utakmice) bez ručnog osvježavanja stranice. Pitanje je koji mehanizam koristiti za dostavu notifikacija. |
| Razmatrane opcije | 1. WebSocket (STOMP/SockJS) — pravi real-time, ali zahtijeva konfiguraciju i session management  2. Server-Sent Events (SSE) — jednosmjerni real-time, lakši od WebSocket  3. Polling (REST GET svakih N sekundi) — jednostavno, bez posebne konfiguracije |
| Odabrana opcija | Polling svake 30 sekunde |
| Razlog izbora | Polling je najjednostavniji za implementaciju unutar postojeće REST arhitekture bez uvođenja novih protokola. Za akademski projekt s malim brojem korisnika, interval od 30s je prihvatljiv. Notification badge i dropdown osvježavaju se odmah nakon korisničkih akcija neovisno o intervalu. |
| Posljedice odluke | Notifikacije mogu kasniti do 30s. Pri velikom broju korisnika polling može opteretiti backend. Razmotriti WebSocket u budućem razvoju. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Polling (30s) | SSE | WebSocket |
|---|---|---|---|---|
| Složenost implementacije | 4 | 5 | 3 | 2 |
| Real-time preciznost | 3 | 3 | 5 | 5 |
| Skalabilnost | 4 | 3 | 4 | 5 |
| Konzistentnost s arhitekturom | 5 | 5 | 4 | 3 |
| **Ukupno** | — | **63** | **56** | **53** |

---

## Odluka #002 — Blokada reschedule/cancel za ligu-vezane termine

| Polje | Opis |
|---|---|
| ID odluke | DL8-002 |
| Datum | 18.05.2026. |
| Kratak naziv odluke | Zaštita termina vezanih za ligaške utakmice |
| Opis problema | Kada je termin automatski rezervisan pri zakazivanju ligaške utakmice, korisnik ne smije moći otkazati ili prerasporediti tu rezervaciju jer bi to narušilo integritet ligaškog rasporeda. |
| Razmatrane opcije | 1. Dozvoliti reschedule/cancel za sve rezervacije bez ograničenja  2. Blokirati samo cancel, dozvoliti reschedule  3. Blokirati i cancel i reschedule za liga-vezane termine, prikazati informativnu poruku |
| Odabrana opcija | Blokada i cancel i reschedule za liga-vezane termine |
| Razlog izbora | Ligaška utakmica i rezervacija termina su nerazdvojno vezani. Otkazivanje ili preraspoređivanje bi ostavilo utakmicu bez termina ili stvorilo nekonzistentno stanje u sistemu. Korisnik dobiva jasnu poruku zašto akcija nije dostupna. |
| Posljedice odluke | Veća konzistentnost podataka. Admin mora intervenisati direktno u ligi da bi promijenio termin utakmice. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Bez ograničenja | Cancel-only blokada | Puna blokada |
|---|---|---|---|---|
| Integritet podataka | 5 | 1 | 3 | 5 |
| Korisnička fleksibilnost | 3 | 5 | 4 | 2 |
| Konzistentnost liga modula | 5 | 1 | 3 | 5 |
| **Ukupno** | — | **23** | **47** | **62** |

---

## Odluka #003 — Arhitektura role-aware dashboarda

| Polje | Opis |
|---|---|
| ID odluke | DL8-003 |
| Datum | 18.05.2026. |
| Kratak naziv odluke | Personalizacija dashboarda po korisničkoj ulozi |
| Opis problema | Različite korisničke uloge (ADMIN, CAPTAIN, PLAYER) imaju različite potrebe i relevantne informacije na dashboardu. Pitanje je kako strukturirati prikaz da svaka uloga vidi relevantne podatke. |
| Razmatrane opcije | 1. Jedan generički dashboard za sve uloge  2. Zasebne dashboard stranice po ulozi  3. Jedan dashboard s dinamičkim sekcijama ovisno o ulozi |
| Odabrana opcija | Jedan dashboard s dinamičkim sekcijama po ulozi |
| Razlog izbora | Konzistentno s postojećom arhitekturom (ne uvodi nove stranice/rute). ADMIN dobiva widget za rezervacije na čekanju i notifikacije. CAPTAIN dobiva vlastite rezervacije i nadolazeće utakmice. PLAYER dobiva nadolazeće utakmice. Jednostavno proširivo za nove uloge. |
| Posljedice odluke | Nešto složenija render logika na dashboardu, ali konzistentno korisničko iskustvo. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Generički | Zasebne stranice | Dinamičke sekcije |
|---|---|---|---|---|
| Relevatnost informacija | 5 | 2 | 5 | 5 |
| Konzistentnost arhitekture | 4 | 5 | 2 | 4 |
| Složenost implementacije | 3 | 5 | 2 | 4 |
| **Ukupno** | — | **42** | **43** | **61** |

---

## Odluka #004 — Hard delete za brisanje lige s kaskadnim čišćenjem

| Polje | Opis |
|---|---|
| ID odluke | DL8-004 |
| Datum | 20.05.2026. |
| Kratak naziv odluke | Pristup brisanju lige — hard delete vs. soft delete |
| Opis problema | Admin treba moći obrisati ligu koja je greškom kreirana ili čija je sezona završena. Pitanje je treba li se liga samo označiti kao neaktivna ili fizički ukloniti zajedno sa svim vezanim podacima. |
| Razmatrane opcije | 1. Soft delete — liga dobiva status DELETED, podaci ostaju u bazi  2. Hard delete — liga i svi vezani entiteti (utakmice, standings, liga-timovi) se fizički brišu; vezani termini se oslobađaju |
| Odabrana opcija | Hard delete s kaskadnim čišćenjem i confirmation modalom |
| Razlog izbora | Završena sezona ne zahtijeva historiju podataka unutar sistema (podaci se čuvaju u dokumentaciji). Hard delete čuva bazu čistom i sprječava akumulaciju starih podataka. Vezani termini moraju biti oslobođeni da budu dostupni za rezervacije. Confirmation modal sprječava slučajno brisanje. |
| Posljedice odluke | Brisanje je nepovratno. Redoslijed kaskadnog brisanja mora poštivati FK constrainte: standings → utakmice → liga-timovi → liga → oslobađanje termina. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Soft delete | Hard delete |
|---|---|---|---|
| Sigurnost podataka | 4 | 5 | 2 |
| Čistoća baze | 5 | 2 | 5 |
| Oslobađanje termina | 5 | 2 | 5 |
| Implementacijska jednostavnost | 3 | 4 | 3 |
| **Ukupno** | — | **47** | **57** |

---

## Odluka #005 — Cross-modul filtriranje termina po sportu

| Polje | Opis |
|---|---|
| ID odluke | DL8-005 |
| Datum | 20.05.2026. |
| Kratak naziv odluke | Gdje i kako filtrirati terene po sportu pri rezervaciji i zakazivanju |
| Opis problema | Sistem sada zna koji sport je predviđen za svaki teren. Pitanje je treba li filtriranje biti backend (server vraća samo relevantne terene) ili frontend (client filtrira dobivenu listu). |
| Razmatrane opcije | 1. Backend filtriranje — novi API parametar `?sport=FOOTBALL`, server vraća filtrirane rezultate  2. Frontend filtriranje — svi slobodni termini se učitavaju, frontend filtrira po odabranom sportu |
| Odabrana opcija | Frontend filtriranje na već učitanim podacima |
| Razlog izbora | Lista slobodnih termina je već učitana u AppContext i dostupna bez dodatnog API poziva. Frontend filter je trenutačan i bez latencije. Za akademski projekt s malim brojem termina performans nije kritičan. Backend filter bi zahtijevao promjene API ugovora i novi endpoint parametar. |
| Posljedice odluke | Svi slobodni termini se učitavaju bez obzira na sport, što je neoptimalno za veće skupove podataka. Pri rastu sistema preporučuje se migracija na backend filter. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Backend filter | Frontend filter |
|---|---|---|---|
| Performans pri velikom skupu | 4 | 5 | 2 |
| Brzina implementacije | 5 | 2 | 5 |
| Konzistentnost s arhitekturom | 4 | 3 | 5 |
| Latencija za korisnika | 3 | 3 | 5 |
| **Ukupno** | — | **49** | **61** |
