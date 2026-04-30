# AI Usage Log - Sprint 5

## Svrha dokumenta

Ovaj dokument evidentira stvarnu upotrebu AI alata tokom Sprinta 5 u skladu sa pravilima AI-enabled faze projekta.  
Za svaki evidentirani slučaj navedeni su alat, svrha korištenja, kratak opis zadatka, šta je prihvaćeno, šta je izmijenjeno, šta je odbačeno, te koji su rizici ili problemi uočeni.

## Evidencija korištenja AI alata

| Datum | Sprint | Alat | Svrha korištenja | Kratak opis zadatka ili upita | Šta je AI predložio ili generisao | Šta je tim prihvatio | Šta je tim izmijenio | Šta je tim odbacio | Rizici / problemi | Ko je koristio alat |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-04-29 | 5 | ChatGPT | Pomoć pri SQL unosu testnih korisnika | Tražen je primjer SQL upita za unos korisnika u tabelu `users` | Generisan prijedlog `INSERT INTO users` upita sa osnovnim kolonama | Osnovna struktura SQL inserta i redoslijed kolona | Vrijednosti korisnika, emailovi i role prilagođeni stvarnoj šemi baze | Dijelovi prijedloga koji su koristili kolone koje nisu potvrđene u lokalnoj bazi | Rizik neusaglašenosti AI prijedloga sa stvarnom SQL šemom | Amel Divović |
| 2026-04-29 | 5 | ChatGPT | Pomoć pri validaciji backend-baza veze | Tražen je redoslijed provjere da li backend stvarno komunicira sa PostgreSQL bazom | Predložen checklist pristup: pokretanje backenda, provjera konekcije, insert test podataka, test endpointa | Redoslijed validacije i ideja testnog toka | Koraci prilagođeni našem lokalnom setupu i stvarnim fajlovima projekta | Generički savjeti koji nisu bili vezani za naš stack | Rizik preopštih odgovora bez tačne veze sa projektom | Harun Hodžić |
| 2026-04-29 | 5 | Claude | Pomoć pri formulisanju CORS rješenja | Tražen je primjer kako omogućiti frontend-backend komunikaciju između React/Vite i Spring Boot aplikacije | Predložen `@CrossOrigin` pristup i osnovno objašnjenje CORS problema | Ideja da se za test koristi dozvoljeni origin za lokalni frontend | Origin vrijednosti i nazivi ruta prilagođeni našem projektu | Preširoka CORS podešavanja tipa allow all za produkcijski scenario | Rizik sigurnosno preširoke konfiguracije | Miralem Pupalović |
| 2026-04-29 | 5 | GitHub Copilot | Pomoć pri frontend service sloju | Korišten kao pomoć pri pisanju početnog `fetch` poziva prema backend API-ju | Predložen boilerplate za `fetch`, obradu odgovora i `response.json()` | Osnovni obrazac za API poziv | Putanja, nazivi funkcija i error handling prilagođeni našem frontendu | Nepotrebni helper dijelovi koji nisu odgovarali postojećoj strukturi | Rizik preuzimanja boilerplate koda bez pune prilagodbe | Ernad Prasko |
| 2026-04-30 | 5 | ChatGPT | Pomoć pri identifikaciji razloga zašto frontend nije spojen na backend | Traženi su mogući uzroci kada frontend ne prikazuje podatke i ne vidi se request prema backendu | Predložen skup provjera: Network tab, hardkodirani URL, env varijabla, CORS, nepostojeći fetch poziv | Lista provjera i način dijagnostike problema | Koraci su usklađeni sa stvarnim stanjem našeg React skeletona | Pretpostavke o implementiranim servisima koje u projektu još nisu postojale | Rizik da AI pretpostavi više implementacije nego što stvarno postoji | Dino Palavra |
| 2026-04-30 | 5 | Claude | Pomoć pri organizaciji Sprint 5 dokumentacije | Tražen je prijedlog kako strukturirati Sprint Goal, Sprint Backlog, Review Summary i Retrospective | Predložen kostur markdown dokumenata sa sekcijama i preglednom strukturom | Struktura sekcija i logičan raspored sadržaja | Tekstovi su ručno prilagođeni stvarnom napretku tima | Generičke formulacije koje nisu odgovarale našem projektu | Rizik formalne dokumentacije bez dovoljno stvarnog sadržaja | Tarik Avdović |
| 2026-04-30 | 5 | Gemini | Pomoć pri formulaciji test evidence dokumenta | Tražen je pregled kako evidentirati ručnu validaciju prvog inkrementa | Predložena tabela sa kolonama za naziv testa, korake, očekivani i stvarni rezultat | Ideja strukture test evidencije | Nazivi testova, statusi i rezultati prilagođeni našim stvarnim provjerama | Test cases koji su pretpostavljali automatizovane testove koje još nemamo | Rizik predstavljanja ručnih testova kao automatizovanih | Harun Muhić |
| 2026-04-30 | 5 | ChatGPT | Pomoć pri pisanju objašnjenja za Sprint Review | Tražen je sažet način da se objasni šta je završeno, a šta nije | Predložen nacrt review summary teksta | Struktura pregleda završених i nezavršenih stavki | Formulacije prilagođene stvarno izvedenom sprintu | Rečenice koje su zvučale kao da je frontend-backend integracija završena | Rizik uljepšavanja stvarnog stanja sprinta | Bakir Hadžialić |
| 2026-04-30 | 5 | GitHub Copilot | Pomoć pri refaktorisanja manjeg dijela frontenda | Korišten za prijedlog jednostavnijeg prikaza liste korisnika u React komponenti | Predložen `map` prikaz podataka iz niza korisnika | Osnovna JSX struktura za listu korisnika | Stil, naziv komponente i način renderovanja prilagođeni projektu | Nepotrebne state varijable i suvišni primjer podaci | Rizik ubacivanja koda koji ne odgovara postojećoj komponentnoj strukturi | Amel Divović |
| 2026-04-30 | 5 | Claude | Pomoć pri tehničkom objašnjenju razlike između lokalnog i deploy okruženja | Traženo je objašnjenje zašto deployani frontend ne može pristupiti lokalnom `localhost:8080` backendu | Generisano kratko tehničko objašnjenje rada origin-a i mrežnog okruženja | Suština objašnjenja o lokalnom i javnom backend URL-u | Terminologija pojednostavljena za sprint dokumentaciju i review | Previše detaljna mrežna objašnjenja koja nisu bila potrebna za sprint summary | Rizik nepotrebnog tehničkog širenja dokumentacije | Harun Hodžić |
| 2026-04-30 | 5 | Gemini | Pomoć pri formulisanju narednih koraka za Sprint 6 | Tražen je prijedlog prioriteta nakon završenog prvog backend inkrementa | Predložen slijed: env varijable, service sloj, CORS, prvi prikaz podataka na frontendu | Redoslijed prioriteta za naredni sprint | Stavke su usklađene sa našim backlogom i realnim stanjem projekta | Sve što bi prerano širilo scope na login i role-based pristup | Rizik prevelikog scope-a za jedan sprint | Dino Palavra |
| 2026-04-30 | 5 | ChatGPT | Pomoć pri uređivanju markdown fajlova | Tražen je pregledniji raspored sekcija, naslova i tabela za sprint artefakte | Predloženi nazivi sekcija i uredniji markdown raspored | Pregledniji format dokumenata | Jezik, detalji i nazivi stavki prilagođeni našem timu i projektu | Generičke uvodne pasuse bez konkretne vrijednosti | Rizik da dokument izgleda formalno dobro, ali bez stvarnog sadržaja | Miralem Pupalović |

## Sažetak korištenja AI

Tokom Sprinta 5 AI alati su korišteni kao pomoć pri:
- SQL i backend validaciji
- dijagnostici frontend-backend integracije
- CORS konfiguraciji
- pisanju početnog frontend service sloja
- strukturiranju sprint dokumentacije
- formulisanju test evidence i sprint summary dokumenata

## Opšta zapažanja

- AI prijedlozi su najkorisniji bili za boilerplate, troubleshooting i strukturiranje dokumentacije.
- Svaki prijedlog je morao biti ručno pregledan i prilagođen projektu.
- Najveći rizik bio je da AI pretpostavi implementaciju koja u projektu još ne postoji.
- Tim nije preuzimao AI izlaze bez provjere nad stvarnim kodom, fajlovima i stanjem sistema.