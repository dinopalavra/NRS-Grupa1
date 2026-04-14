# Test Strategy

## Uvod

Ovaj dokument definiše pristup testiranju sistema za upravljanje sportskim terminima i ligama.  
Cilj je unaprijed odrediti kako će tim provjeravati ispravnost funkcionalnosti i kvalitet sistema tokom razvoja.

## Cilj testiranja

Cilj testiranja je potvrditi da sistem ispravno podržava ključne procese kao što su registracija i prijava korisnika, upravljanje timovima, pregled i rezervacija termina, upravljanje ligama i unos rezultata utakmica.  
Testiranje treba pomoći i u ranom otkrivanju grešaka, konflikata poslovnih pravila i problema u integraciji modula.

## Nivoi testiranja

- Unit testiranje
- Integraciono testiranje
- Sistemsko testiranje
- Prihvatno testiranje

## Šta se testira u kojem nivou

### Unit testiranje
Na ovom nivou testiraju se pojedinačne funkcije i metode poslovne logike.  
Primjeri uključuju validaciju korisničkih podataka, provjeru konflikta rezervacije termina i obračun bodova na tabeli.

### Integraciono testiranje
Na ovom nivou testira se međusobna saradnja modula i ispravna razmjena podataka između njih.  
Primjeri uključuju vezu modula za rezervacije sa modelom termina i vezu modula za rezultate sa tabelom lige.

### Sistemsko testiranje
Na ovom nivou testira se kompletno ponašanje sistema iz perspektive cjeline.  
Primjeri uključuju kompletan tok od prijave korisnika do rezervacije termina, kao i tok od kreiranja lige do unosa rezultata i prikaza tabele.

### Prihvatno testiranje
Na ovom nivou provjerava se da li sistem zadovoljava acceptance kriterije i očekivanja korisnika.  
Prihvatno testiranje će se zasnivati na user stories i definisanim kriterijima prihvatanja za prioritetne funkcionalnosti.

## Veza sa acceptance kriterijima

Acceptance kriteriji predstavljaju osnovu za provjeru da li je određena funkcionalnost ispravno implementirana.  
Za svaku važnu user story tim treba moći povezati test scenarije sa odgovarajućim kriterijima prihvatanja.

## Primjeri funkcionalnosti koje će se testirati

- Registracija korisnika sa validnim i nevalidnim podacima
- Prijava korisnika sa ispravnim i pogrešnim kredencijalima
- Kreiranje tima od strane ovlaštenog korisnika
- Dodavanje članova u tim
- Pregled slobodnih termina
- Rezervacija termina bez konflikta
- Zabrana rezervacije zauzetog termina
- Kreiranje lige
- Dodavanje timova u ligu
- Unos rezultata utakmice
- Ažuriranje tabele nakon unesenog rezultata

## Način evidentiranja rezultata testiranja

Rezultati testiranja će se evidentirati kroz test slučajeve, bilješke o izvršenim provjerama i kasnije kroz dokaz o testiranju relevantnih funkcionalnosti.  
Tim će za svaku važnu provjeru bilježiti šta je testirano, koji je bio očekivani rezultat i da li je rezultat postignut.

## Glavni rizici kvaliteta

- Pogrešna validacija prava pristupa korisnika
- Konflikti rezervacija zbog nedovoljno preciznih pravila
- Neispravan obračun tabele lige
- Neusklađenost između acceptance kriterija i implementiranog ponašanja sistema
- Problemi pri integraciji modula koji međusobno zavise

## Zaključak

Test strategy postavlja osnovu za plansko i konzistentno testiranje sistema u narednim sprintovima i pomaže timu da kvalitet posmatra kao sastavni dio razvoja, a ne kao završnu aktivnost.

