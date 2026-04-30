# Sprint Backlog - Sprint 5

## Sprint cilj

Uspostaviti prvi funkcionalni inkrement sistema kroz operativan backend, povezivanje sa PostgreSQL bazom, osnovne funkcionalnosti za rad sa korisnicima i timovima, te početno povezivanje frontenda i backenda.

## Sprint backlog kroz User Storyje

### US5-1: Registracija i pregled korisnika

**User Story**  
Kao administrator, želim evidentirati i pregledati korisnike u sistemu kako bi se moglo upravljati osnovnim korisničkim podacima.

**Planirane stavke**
- Kreirati i podesiti tabelu `users` u bazi podataka.
- Dodati testne korisnike radi validacije funkcionalnosti.
- Implementirati `GET /api/users` endpoint za dohvat korisnika.
- Implementirati kreiranje korisnika kroz backend logiku.
- Omogućiti prikaz korisnika na frontendu.
- Validirati rad korisničkog modula kroz browser, Postman ili Query Tool.

**Status:** Završeno

---

### US5-2: Prijava korisnika u sistem

**User Story**  
Kao korisnik sistema, želim se prijaviti u aplikaciju kako bih mogao pristupiti funkcionalnostima sistema.

**Planirane stavke**
- Implementirati osnovni login endpoint.
- Definisati request i response modele za prijavu.
- Uvesti osnovnu JWT logiku za generisanje tokena.
- Pripremiti frontend formu za prijavu korisnika.
- Testirati osnovni tok prijave kroz frontend i backend komunikaciju.

**Status:** Završeno

---

### US5-3: Kreiranje i pregled timova

**User Story**  
Kao administrator ili kapiten, želim evidentirati i pregledati timove kako bi sistem mogao upravljati ekipama i njihovim osnovnim podacima.

**Planirane stavke**
- Kreirati model i tabelu za timove.
- Implementirati `GET /api/teams` endpoint.
- Implementirati `POST /api/teams` endpoint.
- Omogućiti prikaz i dodavanje timova kroz frontend modul.
- Validirati rad modula kroz ručno testiranje.

**Status:** Završeno

---

### US5-4: Povezivanje frontenda i backenda

**User Story**  
Kao korisnik sistema, želim da frontend komunicira sa backend servisima kako bi podaci bili dohvaćeni i prikazani iz stvarnog sistema, a ne samo iz lokalnog prikaza.

**Planirane stavke**
- Pokrenuti frontend skeleton lokalno i potvrditi osnovnu strukturu.
- Uvesti service sloj za komunikaciju sa backendom.
- Konfigurisati backend API adresu kroz env varijablu.
- Omogućiti osnovne fetch pozive prema backend endpoint-ima.
- Testirati komunikaciju između frontenda i backenda.

**Status:** Završeno

---

### US5-5: Omogućavanje komunikacije između deployanih servisa

**User Story**  
Kao član tima, želim da frontend i backend budu dostupni online i međusobno povezani kako bi sistem bio spreman za demonstraciju.

**Planirane stavke**
- Deployati frontend na Vercel.
- Deployati backend na Render.
- Podesiti konekciju backend servisa sa PostgreSQL bazom.
- Riješiti CORS za komunikaciju između Vercel i Render servisa.
- Validirati dostupnost backend servisa kroz ping endpoint.
- Testirati osnovni rad sistema kroz javno dostupni link.

**Status:** Završeno

---

### US5-6: Dokumentovanje i validacija sprint inkrementa

**User Story**  
Kao član projektnog tima, želim dokumentovati tehničke odluke, AI podršku i rezultate testiranja kako bi sprint inkrement bio transparentan i spreman za evaluaciju.

**Planirane stavke**
- Kreirati početni Decision Log.
- Kreirati početni AI Usage Log.
- Evidentirati osnovne rezultate testiranja.
- Ažurirati relevantne sprint artefakte i tehničku dokumentaciju.

**Status:** Završeno

## Kratak pregled realizacije

- Ukupan broj user storyja u sprintu: 6
- Završene user story stavke: 6
- Djelimično završene user story stavke: 0
- Nezavršene user story stavke: 0

## Komentar

Sprint 5 bio je usmjeren na izradu prvog funkcionalnog inkrementa sistema. U okviru sprinta uspješno su realizovani osnovni backend i frontend moduli, konekcija sa bazom podataka, rad sa korisnicima i timovima, početna autentifikacija, kao i povezivanje deployanih servisa radi javne demonstracije sistema. Na kraju sprinta tim je uspostavio stabilnu osnovu za naredni razvoj složenijih funkcionalnosti.
