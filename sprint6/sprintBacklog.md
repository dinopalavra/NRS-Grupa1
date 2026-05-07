# Sprint Backlog - Sprint 6

## Sprint cilj

Omogućiti pregled dostupnih termina, rezervaciju termina bez konflikta i pregled postojećih rezervacija.

## Sprint backlog kroz User Storyje

### US6-1: Pregled dostupnih termina

**User Story**  
Kao korisnik sistema, želim pregledati dostupne termine, kako bih mogao odabrati termin koji odgovara mom timu ili aktivnosti.

**Planirane stavke**
- Kreirati model i strukturu podataka za termine.
- Implementirati backend endpoint za dohvat dostupnih termina.
- Omogućiti prikaz termina na frontendu.
- Prikazati osnovne informacije o terminu, uključujući datum, vrijeme i lokaciju.
- Omogućiti pregled raspoloživosti termina kroz jednostavan korisnički interfejs.
- Validirati ispravnost prikaza i dohvaćanja termina kroz ručno testiranje.

**Status:** Implementirano

---

### US6-2: Rezervacija termina

**User Story**  
Kao kapiten tima ili ovlašteni korisnik, želim rezervisati slobodan termin, kako bih osigurao termin za svoj tim bez preklapanja sa postojećim rezervacijama.

**Planirane stavke**
- Implementirati model rezervacije i povezati ga sa terminom i timom.
- Implementirati backend endpoint za kreiranje rezervacije.
- Uvesti provjeru da se može rezervisati samo slobodan termin.
- Spriječiti kreiranje rezervacije koja je u konfliktu sa postojećim zauzećem.
- Omogućiti formu ili akciju na frontendu za rezervaciju odabranog termina.
- Testirati rezervaciju kroz pozitivne i negativne scenarije.

**Status:** Implementirano

---

### US6-3: Pregled rezervacija

**User Story**  
Kao kapiten tima, administrator ili organizator, želim pregledati postojeće rezervacije, kako bih imao uvid u raspored zauzeća i planirane aktivnosti.

**Planirane stavke**
- Implementirati backend endpoint za pregled postojećih rezervacija.
- Omogućiti prikaz rezervacija na frontendu.
- Prikazati rezervacije po osnovnim kriterijima kao što su tim ili termin.
- Omogućiti jednostavan pregled zauzeća i planiranih aktivnosti.
- Povezati pregled rezervacija sa prethodno implementiranim modulom termina.
- Validirati tačnost prikazanih podataka kroz ručno testiranje.

**Status:** Implementirano

## Kratak pregled planirane realizacije

- Ukupan broj user storyja u sprintu: 3
- Planirane user story stavke: 3
- Djelimično završene user story stavke: 0
- Nezavršene user story stavke: 0

## Komentar

Sprint 6 je usmjeren na razvoj osnovnog modula za upravljanje terminima i rezervacijama. Fokus sprinta je na omogućavanju korisnicima da pregledaju raspoložive termine, rezervišu odgovarajući termin bez konflikta i imaju uvid u već evidentirane rezervacije. Realizacijom ovih funkcionalnosti sistem dobija važan operativni dio koji predstavlja osnovu za dalji razvoj takmičarskog i organizacionog modula u narednim sprintovima.