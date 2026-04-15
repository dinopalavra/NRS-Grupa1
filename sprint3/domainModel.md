# Domain Model

## Uvod

Domain model opisuje glavne entitete sistema za upravljanje sportskim terminima i ligama, njihove ključne atribute, međusobne veze i poslovna pravila.  
Svrha modela je da omogući zajedničko razumijevanje sistema prije početka implementacije i da posluži kao osnova za usklađivanje zahtjeva, modela baze podataka, use case modela i kasnije implementacije poslovne logike.

Napomena: Pojedina poslovna pravila u modelu predstavljaju početne pretpostavke tima i mogu biti dodatno razjašnjena kroz komunikaciju sa Product Ownerom i kroz naredne sprintove.

---

## Glavni entiteti

Sistem je zasnovan na sljedećim glavnim entitetima:

- **Korisnik**
- **Tim**
- **Član tima**
- **Termin**
- **Rezervacija**
- **Liga**
- **Utakmica**
- **Rezultat**
- **Tabela lige**

---

## Pregled entiteta i njihove uloge

| Entitet | Uloga u sistemu |
|---|---|
| **Korisnik** | Predstavlja registrovanu osobu koja koristi sistem i ima određenu ulogu i prava pristupa. |
| **Tim** | Predstavlja sportsku ekipu koja može imati članove, rezervisati termine i učestvovati u ligama. |
| **Član tima** | Predstavlja vezu između korisnika i tima, uz evidenciju uloge korisnika unutar tima. |
| **Termin** | Predstavlja raspoloživ vremenski slot za korištenje sportskog resursa ili lokacije. |
| **Rezervacija** | Predstavlja evidentiranu rezervaciju termina od strane određenog tima. |
| **Liga** | Predstavlja organizovano takmičenje u kojem učestvuju timovi. |
| **Utakmica** | Predstavlja pojedinačni susret dva tima u okviru određene lige. |
| **Rezultat** | Predstavlja evidentiran ishod jedne odigrane utakmice. |
| **Tabela lige** | Predstavlja agregirani prikaz učinka timova unutar jedne lige. |

---

## Ključni atributi

### Korisnik

| Atribut | Opis |
|---|---|
| `userId` | Jedinstveni identifikator korisnika |
| `imePrezime` | Puno ime i prezime korisnika |
| `email` | Email adresa korisnika |
| `korisnickoIme` | Korisničko ime za prijavu |
| `lozinka` | Lozinka korisnika |
| `uloga` | Sistemska uloga korisnika |
| `statusNaloga` | Status naloga, npr. aktivan ili deaktiviran |

### Tim

| Atribut | Opis |
|---|---|
| `teamId` | Jedinstveni identifikator tima |
| `nazivTima` | Naziv tima |
| `datumKreiranja` | Datum kreiranja tima |
| `kapitenId` | Identifikator korisnika koji ima ulogu kapitena |
| `statusTima` | Trenutni status tima |

### Član tima

| Atribut | Opis |
|---|---|
| `teamMemberId` | Jedinstveni identifikator zapisa članstva |
| `teamId` | Identifikator tima |
| `userId` | Identifikator korisnika |
| `ulogaUTimu` | Uloga korisnika unutar tima |
| `datumPridruzivanja` | Datum pridruživanja timu |

### Termin

| Atribut | Opis |
|---|---|
| `terminId` | Jedinstveni identifikator termina |
| `datum` | Datum termina |
| `vrijemePocetka` | Vrijeme početka termina |
| `vrijemeZavrsetka` | Vrijeme završetka termina |
| `lokacija` | Lokacija ili sportski resurs |
| `tipTermina` | Vrsta termina |
| `statusDostupnosti` | Status raspoloživosti termina |

### Rezervacija

| Atribut | Opis |
|---|---|
| `reservationId` | Jedinstveni identifikator rezervacije |
| `teamId` | Identifikator tima koji rezerviše termin |
| `terminId` | Identifikator rezervisanog termina |
| `datumKreiranja` | Datum kreiranja rezervacije |
| `statusRezervacije` | Status rezervacije |
| `kreiraoKorisnik` | Korisnik koji je izvršio rezervaciju |

### Liga

| Atribut | Opis |
|---|---|
| `leagueId` | Jedinstveni identifikator lige |
| `nazivLige` | Naziv lige |
| `sezona` | Sezona takmičenja |
| `formatTakmicenja` | Format takmičenja |
| `statusLige` | Status lige |

### Utakmica

| Atribut | Opis |
|---|---|
| `matchId` | Jedinstveni identifikator utakmice |
| `leagueId` | Identifikator lige |
| `domaciTimId` | Identifikator domaćeg tima |
| `gostujuciTimId` | Identifikator gostujućeg tima |
| `datumUtakmice` | Datum odigravanja utakmice |
| `vrijemeUtakmice` | Vrijeme utakmice |
| `statusUtakmice` | Trenutni status utakmice |

### Rezultat

| Atribut | Opis |
|---|---|
| `resultId` | Jedinstveni identifikator rezultata |
| `matchId` | Identifikator utakmice |
| `goloviDomaci` | Broj golova domaćeg tima |
| `goloviGosti` | Broj golova gostujućeg tima |
| `unosIzvrsio` | Korisnik koji je unio rezultat |
| `vrijemeUnosa` | Vrijeme unosa rezultata |

### Tabela lige

| Atribut | Opis |
|---|---|
| `standingId` | Jedinstveni identifikator zapisa u tabeli |
| `leagueId` | Identifikator lige |
| `teamId` | Identifikator tima |
| `brojOdigranih` | Broj odigranih utakmica |
| `brojPobjeda` | Broj pobjeda |
| `brojNerijesenih` | Broj neriješenih utakmica |
| `brojPoraza` | Broj poraza |
| `datiGolovi` | Ukupan broj datih golova |
| `primljeniGolovi` | Ukupan broj primljenih golova |
| `bodovi` | Ukupan broj osvojenih bodova |

---

## Veze između entiteta

### Pregled odnosa

| Odnos | Opis |
|---|---|
| **Korisnik — Tim** | Jedan korisnik može kreirati jedan ili više timova. |
| **Tim — Član tima** | Jedan tim ima jednog ili više članova tima. |
| **Korisnik — Član tima** | Jedan korisnik može biti povezan sa jednim ili više timova preko entiteta Član tima, ako poslovna pravila to dozvoljavaju. |
| **Tim — Rezervacija** | Jedan tim može imati više rezervacija termina kroz vrijeme. |
| **Termin — Rezervacija** | Jedan termin može biti povezan sa najviše jednom aktivnom ili potvrđenom rezervacijom za isti resurs i vremenski interval. |
| **Liga — Tim** | Jedna liga može sadržavati više timova, a isti tim može učestvovati u više liga ili sezona ako poslovna pravila to dozvole. |
| **Liga — Utakmica** | Jedna liga sadrži više utakmica koje pripadaju isključivo toj ligi. |
| **Utakmica — Rezultat** | Jedna utakmica može imati najviše jedan konačni rezultat. |
| **Liga — Tabela lige** | Tabela lige se vodi po timu unutar jedne konkretne lige. |

### Dodatna pojašnjenja

- Jedan tim je kreiran od strane tačno jednog korisnika, pri čemu atribut `kapitenId` označava korisnika koji ima vodeću ulogu u timu.
- Veza između korisnika i tima modelirana je preko entiteta **Član tima**, čime se podržava evidencija članstva, uloge u timu i datuma pridruživanja.
- Jedna rezervacija pripada tačno jednom timu i odnosi se na tačno jedan termin.
- Jedna utakmica pripada tačno jednoj ligi i uključuje tačno dva različita tima: domaći i gostujući tim.
- Jedan rezultat odnosi se na tačno jednu utakmicu.
- Za svaku kombinaciju **liga–tim** postoji najviše jedan zapis u tabeli lige.
- Tabela lige se formira i ažurira na osnovu rezultata utakmica koje pripadaju istoj ligi.

---

## Napomena o statusima entiteta

Pojedini entiteti u sistemu imaju status koji određuje njihovo trenutno stanje i dozvoljene akcije unutar sistema.

| Entitet | Primjeri statusa | Značenje |
|---|---|---|
| **Korisnik** | aktivan, deaktiviran | Deaktiviran korisnik nema pristup zaštićenim funkcionalnostima sistema. |
| **Tim** | aktivan, neaktivan, u formiranju | Status tima utiče na mogućnost učešća u rezervacijama i ligama. |
| **Termin** | slobodan, privremeno rezervisan, zauzet | Status termina određuje da li ga je moguće rezervisati. |
| **Rezervacija** | kreirana, potvrđena, odbijena, otkazana | Status rezervacije zavisi od toka procesa rezervacije i eventualnog odobravanja. |
| **Liga** | u pripremi, aktivna, završena | Status lige određuje da li se može planirati takmičenje i evidentirati rezultati. |
| **Utakmica** | planirana, odigrana, odgođena, otkazana | Status utakmice utiče na mogućnost unosa i obrade rezultata. |
| **Rezultat** | važeći / evidentiran | Rezultat se smatra važećim tek kada je unesen za utakmicu koja ispunjava uslove za unos rezultata. |

---

## Poslovna pravila

### Prava pristupa i korisnici

- Korisnik mora imati nalog da bi mogao koristiti funkcionalnosti sistema koje zahtijevaju autentifikaciju.
- Samo aktivan korisnički nalog može pristupiti zaštićenim funkcionalnostima sistema.
- Samo ovlašteni korisnici mogu kreirati tim ili upravljati članovima tima.
- Kapiten tima ili administrator može upravljati sastavom tima u skladu sa pravilima dodijeljene uloge.
- Jedan korisnik može biti član više timova samo ako je to eksplicitno dozvoljeno poslovnim pravilima sistema.

### Rezervacije i termini

- Termin se ne može rezervisati ako već postoji potvrđena rezervacija za isti termin i resurs.
- Tim ne može imati konfliktne rezervacije u preklapajućem vremenskom periodu.
- Rezervaciju može kreirati samo korisnik koji ima pravo da djeluje u ime odabranog tima.
- Ako proces rezervacije uključuje odobrenje, tek potvrđena rezervacija mijenja raspoloživost termina u zauzet.

### Liga i utakmice

- Liga mora imati najmanje dva tima da bi se moglo planirati takmičenje.
- Tim se ne može dodati u ligu više puta za istu sezonu ili isto takmičenje.
- Utakmica mora uključivati dva različita tima i oba tima moraju pripadati ligi u okviru koje se utakmica evidentira.

### Rezultati i tabela

- Rezultat utakmice može unijeti samo ovlaštena osoba, kao što je administrator, sudija ili zapisničar.
- Rezultat se može unijeti samo za utakmicu koja je u odgovarajućem statusu za unos rezultata.
- Jedna utakmica može imati najviše jedan konačni rezultat, a naknadna izmjena rezultata mora biti kontrolisana pravilima ovlaštenja i evidencije promjena.
- Tabela lige se ažurira isključivo na osnovu potvrđenih i važećih rezultata utakmica.
- Ako rezultat nije unesen, utakmica ne utiče na tabelu.
- Ako je utakmica otkazana ili odgođena, ona ne smije uticati na obračun bodova dok ne dobije validan ishod.

---

## Veza sa ostalim artefaktima

Ovaj domain model je usklađen sa ostalim ključnim projektnim artefaktima i predstavlja osnovu za njihovu dalju razradu:

- **Use Case Model** koristi ove entitete za opis glavnih interakcija korisnika sa sistemom.
- **Model baze podataka** predstavlja logičku i kasnije fizičku realizaciju odnosa definisanih u ovom modelu.
- **Architecture Overview** koristi domenske cjeline kao osnovu za modulsku podjelu sistema.
- **Risk Register** prepoznaje rizike koji su direktno povezani sa pravilima rezervacije, korisničkim ulogama, obračunom tabele i usklađenošću artefakata.

---

## Zaključak

Domain model predstavlja osnovu za model baze podataka, use case model i kasniju implementaciju poslovne logike sistema.  
Model definiše ključne entitete, njihove atribute, odnose i poslovna pravila, te pomaže timu da dosljedno razvija sistem u skladu sa zahtjevima i planiranim MVP opsegom.

