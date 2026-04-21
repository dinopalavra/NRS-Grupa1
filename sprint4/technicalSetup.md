## Uvod

Ovaj dokument opisuje osnovni tehnički setup projekta za sistem upravljanja sportskim terminima i ligama u okviru Sprinta 4.  
Njegova svrha nije da predstavi završenu implementaciju sistema, nego da definiše početnu tehničku osnovu na kojoj će se graditi naredni sprintovi.

U dosadašnjim sprintovima tim je radio na razumijevanju problema, identifikaciji stakeholdera, definisanju product backloga, user storyja i acceptance kriterija.  
Zbog toga Sprint 4 predstavlja važnu prijelaznu tačku: nakon analize i planiranja, potrebno je postaviti tehničku strukturu projekta koja će omogućiti da se ranije definisani zahtjevi kasnije implementiraju na organizovan i smislen način.

Za naš projekat to je posebno važno zato što sistem uključuje više međusobno povezanih cjelina, kao što su upravljanje korisnicima, timovima, terminima, rezervacijama, ligama i rezultatima utakmica.  
Bez unaprijed definisane tehničke organizacije, dalji razvoj bi lako mogao postati nepregledan, neusklađen i teško održiv.

Zbog toga je cilj ovog dokumenta da svim članovima tima pruži zajedničko razumijevanje početne tehničke organizacije projekta, da pojasni logiku strukture repozitorija i da osigura da naredna faza implementacije ne počne nasumično, nego na jasno postavljenim temeljima.

---

## Opšti pristup organizaciji projekta

Projekt je organizovan kroz centralni folder `skeleton/`, koji predstavlja početni tehnički okvir sistema.  
Ovaj folder ne sadrži završene funkcionalnosti, već jasno postavljenu strukturu koja služi kao osnova za dalju implementaciju.

Unutar foldera `skeleton/` projekat je podijeljen na tri glavna dijela:
- `backend/`
- `frontend/`
- `database/`
- `docs/`

Ovakva podjela nije napravljena samo radi preglednosti, nego radi jasnog razdvajanja odgovornosti unutar sistema.  
Backend dio je predviđen za poslovnu logiku i obradu zahtjeva, frontend za korisnički interfejs i interakciju sa korisnicima, dok database dio predstavlja osnovu za organizaciju i čuvanje podataka.

Za naš sistem ovakav pristup ima posebno smisla jer se već iz ranije definisanih zahtjeva vidi da će aplikacija imati više različitih funkcionalnih tokova.  
Na primjer, jedan dio sistema odnosi se na registraciju i prijavu korisnika, drugi na upravljanje timovima i članovima tima, treći na pregled i rezervaciju termina, a četvrti na organizaciju lige, unos rezultata i ažuriranje tabele.  
Ako bi svi ovi dijelovi bili razvijani bez jasne tehničke strukture, vrlo brzo bi došlo do miješanja odgovornosti, dupliranja logike i otežanog održavanja.

Početna organizacija projekta zato treba da omogući da se svaka od ovih cjelina kasnije razvija na svom mjestu, ali i da ostane povezana sa ostatkom sistema.  
Na taj način tehnička struktura prati logiku domene projekta, a ne predstavlja samo nasumično raspoređene foldere.

Pored tri glavna dijela sistema, u okviru Sprinta 4 važnu ulogu ima i dokumentacija.  
Dokumenti u folderu `sprint4/` služe da objasne kako je struktura postavljena, zašto je postavljena baš tako i kako se povezuje sa ranije definisanim artefaktima.  
To znači da tehnička organizacija projekta nije odvojena od ostalih projektnih odluka, nego predstavlja njihov prirodan nastavak.

---

## Standardi rada tima

Da bi tehnička organizacija projekta bila održiva i korisna u narednim sprintovima, nije dovoljno samo napraviti početne foldere.  
Potrebno je i da tim ima zajednička pravila rada koja će osigurati konzistentnost, preglednost i lakšu saradnju.

Prvi osnovni standard je korištenje zajedničkog Git repozitorija kao centralnog mjesta za verzionisanje projekta.  
Time se osigurava da promjene budu vidljive, da se može pratiti razvoj sistema kroz sprintove i da svi članovi tima rade unutar iste tehničke osnove.

Drugi važan standard jeste jasno i dosljedno imenovanje fajlova i foldera.  
U projektu koji će se razvijati kroz više sprintova, nepregledno imenovanje brzo dovodi do zabune i otežava snalaženje članovima tima.  
Zbog toga struktura mora ostati dovoljno jasna da se iz samog naziva može razumjeti svrha pojedinog dijela.

Treći standard odnosi se na razdvajanje slojeva sistema.  
Tim ne treba miješati logiku korisničkog interfejsa, poslovnu logiku i podatkovni sloj, jer takav pristup otežava i razvoj i testiranje i kasnije održavanje.  
Zato je važno da backend, frontend i database od početka budu tretirani kao odvojene, ali povezane cjeline.

Četvrti standard jeste usklađenost tehničke organizacije sa ranije definisanim zahtjevima i modelima.  
To znači da se tehnička struktura ne postavlja proizvoljno, nego tako da podržava funkcionalnosti koje su već identifikovane kroz backlog, user storyje i acceptance kriterije.  
Na primjer, ako sistem treba podržati upravljanje članovima tima, rezervaciju termina i pregled rezultata, onda tehnička organizacija treba omogućiti da se te funkcionalnosti kasnije prirodno smjeste u odgovarajuće dijelove sistema.

Peti standard odnosi se na dokumentovanje važnih tehničkih odluka.  
Čak i u početnoj fazi razvoja važno je da tim može objasniti zašto je projekat organizovan na određeni način, kako su podijeljene odgovornosti i kako se planira dalje proširenje.  
Na taj način tehnička struktura ne ostaje samo “postavljena”, nego i razumljiva svim članovima tima.

Ovi standardi su važni ne samo radi formalnog reda, nego i zato što projekat treba ostati pregledan i održiv kada u narednim sprintovima počne implementacija stvarnih funkcionalnosti.

---

## Minimalni cilj Sprinta 4

Minimalni cilj Sprinta 4 nije razvoj završene aplikacije, niti implementacija kompletnih funkcionalnosti sistema.  
Cilj ovog sprinta je da projekat dobije dovoljno jasnu i stabilnu tehničku osnovu kako bi naredni sprintovi mogli biti usmjereni na implementaciju bez dodatnog tehničkog haosa.

To u našem slučaju znači da na kraju Sprinta 4 projekat treba imati:
- jasno organizovan repozitorij
- prepoznatljivu početnu strukturu sistema
- razdvojene glavne tehničke cjeline (`backend`, `frontend`, `database`, `docs`)
- osnovnu tehničku dokumentaciju koja objašnjava svrhu i logiku te strukture

Za projekat upravljanja sportskim terminima i ligama ovo je posebno važno jer će se u narednim sprintovima razvijati funkcionalnosti koje su međusobno zavisne.  
Na primjer, rezervacija termina zavisi od prikaza dostupnih termina, upravljanje timovima zavisi od korisnika i njihovih uloga, a rezultati utakmica utiču na tabelu lige.  
Ako tehnička struktura nije postavljena na vrijeme, kasnija implementacija ovih funkcionalnosti bi bila teža, nepreglednija i podložnija greškama.

Zato se uspjeh Sprinta 4 ne mjeri time da li sistem već “radi” iz korisničke perspektive, nego time da li je tehnički okvir dovoljno dobro pripremljen da podrži naredne faze razvoja.  
Drugim riječima, cilj je da tim na kraju sprinta može pokazati da zna gdje će se koji dio sistema razvijati, kako su slojevi razdvojeni i kako struktura projekta prati logiku ranije definisanih zahtjeva.

---

## Zaključak

Tehnički setup definisan u ovom dokumentu predstavlja početni, ali vrlo važan temelj za razvoj sistema upravljanja sportskim terminima i ligama.  
Iako u ovoj fazi još nisu implementirane konkretne funkcionalnosti, postavljena struktura projekta pokazuje da tim nije ostao samo na analizi problema i pisanju dokumentacije, nego je pripremio tehnički okvir za naredne sprintove.

Vrijednost ovakvog pristupa je u tome što omogućava da se razvoj sistema nastavi organizovano i dosljedno, uz manje rizika od haotične strukture, miješanja odgovornosti i tehničke nepreglednosti.  
Za sistem koji obuhvata korisnike, timove, termine, rezervacije, lige i rezultate, ovakva početna organizacija je važna kako bi svaka naredna funkcionalnost imala svoje jasno mjesto u projektu.

Na kraju, ovaj dokument treba posmatrati kao osnovu za dalji razvoj, a ne kao konačan opis sistema.  
Detaljnija implementacija, konkretni tehnički izbori i proširenje strukture slijedit će u narednim sprintovima, ali je upravo Sprint 4 trenutak u kojem tim pokazuje da je spreman da iz faze planiranja pređe u fazu organizovanog tehničkog razvoja.

## Tehnologije pod slojevima sistema

Tehnička osnova sistema organizovana je kroz tri glavna sloja: backend, frontend i baza podataka, pri čemu svaki sloj ima jasno definisanu ulogu u okviru projekta.

Backend sloj je zadužen za implementaciju poslovne logike sistema, uključujući upravljanje korisnicima, timovima, terminima i rezervacijama.
Frontend sloj je odgovoran za prikaz podataka i interakciju sa korisnicima kroz korisnički interfejs.
Baza podataka predstavlja sloj za trajno čuvanje podataka i omogućava rad sa ključnim entitetima sistema.

U ovoj fazi projekta tehnologije su definisane na konceptualnom nivou, dok će konkretni alati i implementacija biti dodatno razrađeni u narednim sprintovima.

---

## Konfiguracioni fajlovi

U okviru skeleton strukture pripremljeni su osnovni konfiguracioni i organizacioni fajlovi koji omogućavaju dalji razvoj projekta.

Svaki od glavnih dijelova sistema ('backend', 'frontend', 'database') sadrži svoj 'README.md' fajl koji opisuje svrhu tog dijela i način njegove organizacije.
Ovi fajlovi služe kao početna dokumentacija i pomažu članovima  tima da se lakše snalaze unutar projekta.

Pored toga, projekat uključuje i osnovne konfiguracione fajlove kao što je '.gitignore', koji definiše koje datoteke se ne trebaju verzionisati, čime se osigurava urednost repozitorija.

Ova konfiguracija predstavlja minimalni setup potreban za dalji razvoj i proširenje sistema.

---

## Backend setup

Backend dio sistema nalazi se u folderu 'skeleton/backend/' i predstavlja osnovu za razvoj poslovne logike sistema.

U ovoj fazi backend ne sadrži implementirane funkcionalnosti, ali je njegova struktura postavljena tako da podrži ključne procese sistema, kao što su: 
- upravljanje korisnicima i autentifikacija
- upravljanje timivima i članovima tima
- upravljanje terminima i rezervacijama
- upravljanje ligama i rezultatima

Predviđeno je da backend sloj u narednim sprintovima sadrži API kroz koji će frontend komunicirati sa sistemom, kao i logiku koja osigurava pravilno funkcionisanje svih poslovnih pravila.

Struktura backenda je postavljena tako da omogući modularan razvoj i lakše proširenje sistema.

---

## Frontend setup

Frontend dio sistema nalazi se u folderu 'skeleton/frontend/' i predstavlja osnovu za razvoj korisničkog interfejsa.

U ovoj fazi frontend ne sadrži implementirane stranice, ali je predviđena struktura koja će omogućiti organizovan razvoj interfejsa.

Planirana struktura uključuje:
- komponente za prikaz podataka
- stranice sistema (npr. pregled termina, upravljanje timovima)
- servise za komunikaciju sa backendom
- rute za navigaciju kroz aplikaciju

Ovakva organizacija omogućava da se funkcionalnosti definisane u prethodnim sprintovima kasnije jasno mapiraju na odgovarajuće dijelove korisničkog interfejsa.

---

## Setup baze podataka

Baza podataka nalazi se u folderu 'skeleton/database/' i predstavlja osnovu za rad sa podacima sistema.

U ovoj fazi pripremljena je početna organizacija koja uključuje:
- 'schema/' folder za definisanje strukture baze podataka
- 'seeds/' folder za incijalne testne podatke

Baza podataka će u narednim sprintovima sadržavati ključne entitete sistema, uključujući:
- korisnike
- timove
- termine
- rezervacije
- lige i rezultate

Strukture baze će biti usklađena sa domain modelom definisanim u prethodnom sprintu, čime se osigurava konzistentnost između poslovne logike i načina čuvanja podataka.
