# Decision Log
## Sprint 10

**Datum:** 31.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Odluka #001 — MVP pristup reset lozinke bez email servisa

| Polje | Opis |
|---|---|
| ID odluke | DL10-001 |
| Datum | 31.05.2026. |
| Kratak naziv odluke | Token za reset lozinke vraća se u HTTP response umjesto na email |
| Opis problema | Reset zaboravljene lozinke standardno zahtijeva SMTP email servis za slanje tokena. Sistem nema konfigurisan email servis u akademskom okruženju. |
| Razmatrane opcije | 1. Implementirati SMTP email servis (Spring Mail + Gmail/SendGrid) — pravi produkcijski pristup  2. Token logirati u backend konzolu — korisnik ga ne može vidjeti bez pristupa serveru  3. Token direktno vratiti u HTTP response — korisnik ga vidi odmah, bez email servisa |
| Odabrana opcija | Token direktno u HTTP response (MVP pristup) |
| Razlog izbora | Akademski projekat ne zahtijeva produkcijski email servis. Direktan token u response-u omogućava funkcionalnu demonstraciju toka (zahtjev → token → nova lozinka) bez infrastrukturnih zavisnosti. Response sadrži jasnu napomenu da bi se u produkciji token slao na email. |
| Posljedice odluke | U produkcijskom okruženju obavezno zamijeniti sa SMTP implementacijom. Token bi trebalo i logirati na server za audit trail. |
| Status odluke | Aktivna (MVP) |

### Trade-off analiza

| Kriterij | Težina | SMTP servis | Backend log | Token u response |
|---|---|---|---|---|
| Produkcijska ispravnost | 5 | 5 | 2 | 1 |
| Brzina implementacije | 4 | 1 | 3 | 5 |
| Demonstrabilnost | 5 | 4 | 1 | 5 |
| Sigurnost | 4 | 5 | 4 | 2 |
| **Ukupno** | — | **59** | **34** | **51** |

---

## Odluka #002 — Kalendar bez vanjske biblioteke (custom implementacija)

| Polje | Opis |
|---|---|
| ID odluke | DL10-002 |
| Datum | 31.05.2026. |
| Kratak naziv odluke | Kalendarski prikaz implementiran bez react-big-calendar |
| Opis problema | Kalendarski prikaz zahtijeva UI komponentu za prikaz događaja u mreži po danima. Postoji više opcija: korištenje popularne biblioteke ili custom implementacija. |
| Razmatrane opcije | 1. `react-big-calendar` — popularna biblioteka, mnogo funkcionalnosti, zahtijeva instalaciju i konfiguraciju  2. Custom implementacija s CSS Grid-om — sve se gradi od nule, puna kontrola nad izgledom |
| Odabrana opcija | Custom CSS Grid implementacija bez vanjske biblioteke |
| Razlog izbora | Projekt već ima konzistentan luksuzni dark dizajn koji je teško uklopiti s vanjskim bibliotekama. Custom implementacija daje punu kontrolu nad stiliziranjem. Za potrebe akademske demonstracije dovoljan je mjesečni prikaz s navigacijom, bez kompleksnih funkcija drag&drop ili višednevnih događaja. Izbjegnuta je dodatna npm zavisnost. |
| Posljedice odluke | Ograničena funkcionalnost u poređenju s react-big-calendar (nema tjednog/dnevnog prikaza, nema drag&drop). Daljnja proširenja zahtijevaju vlastiti razvoj. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | react-big-calendar | Custom implementacija |
|---|---|---|---|
| Bogatstvo funkcionalnosti | 3 | 5 | 2 |
| Vizualna konzistentnost s temom | 5 | 2 | 5 |
| Bez vanjske zavisnosti | 4 | 1 | 5 |
| Brzina implementacije | 3 | 4 | 3 |
| **Ukupno** | — | **36** | **60** |

---

## Odluka #003 — CSV umjesto PDF za eksport podataka

| Polje | Opis |
|---|---|
| ID odluke | DL10-003 |
| Datum | 31.05.2026. |
| Kratak naziv odluke | Eksport podataka implementiran u CSV formatu, PDF odložen |
| Opis problema | Organizatori trebaju mogućnost eksporta rasporeda i tabele van sistema. Razmatrani su CSV i PDF formati. |
| Razmatrane opcije | 1. PDF eksport — vizualno bogat, gotov za ispis, zahtijeva iText ili Apache PDFBox backend biblioteku  2. CSV eksport — tabuliranom formatu, trivijalna implementacija, uvoziv u Excel/Sheets  3. Oba formata |
| Odabrana opcija | CSV eksport (PDF odložen za budući razvoj) |
| Razlog izbora | CSV je trivijalan za implementaciju — backend generira tekst, browser direktno preuzima. Ne zahtijeva vanjsku biblioteku. Dovoljan za akademski projekt jer korisnici mogu otvoriti CSV u Excelu ili Google Sheets i tamo formatirati za ispis. PDF bi zahtijevao dodavanje iText/PDFBox zavisnosti i složeniju template logiku. |
| Posljedice odluke | Korisnici ne dobivaju odmah printabilni dokument. PDF ostaje na backlogu kao "To Do" stavka za budući razvoj. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | PDF | CSV | Oba |
|---|---|---|---|---|
| Gotovost za ispis | 4 | 5 | 2 | 5 |
| Brzina implementacije | 5 | 2 | 5 | 2 |
| Bez vanjske biblioteke | 4 | 1 | 5 | 1 |
| **Ukupno** | — | **35** | **57** | **35** |
