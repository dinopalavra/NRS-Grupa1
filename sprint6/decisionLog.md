# DecisionLog
## Sprint 6

**Datum:** 07/05/2026  
**Projekt:** Sports Manager System  
**Dokument:** Evidencija ključnih tehničkih i procesnih odluka

## Svrha dokumenta

Ovaj dokument prikazuje najvažnije odluke donesene tokom razvoja i završne stabilizacije Sprinta 6 na projektu **Sports Manager System**. Cilj je dokumentovati šta je odlučeno, zašto je odluka donesena, koje alternative su razmatrane i kakav je uticaj odluka imao na konačnu verziju sistema.

Dokument obuhvata i tehničke odluke i operativne odluke donesene tokom pripreme projekta za lokalno pokretanje, testiranje i predaju.

## Kontekst sprinta

Sprint 6 bio je usmjeren na završnu integraciju backend i frontend funkcionalnosti, stabilizaciju reservation toka, provjeru automatskih testova i pripremu prateće dokumentacije za predaju. Tokom sprinta posebna pažnja posvećena je ispravnosti poslovne logike, lokalnom pokretanju aplikacije i validaciji Maven testnog procesa.

## Ključne odluke

### Odluka 1: Zadržati Spring Boot i Maven kao osnovu backend sistema

**Opis odluke:**  
Backend sistema ostaje zasnovan na Spring Boot frameworku i Maven build alatu.

**Razlog:**  
Postojeći projekat već koristi stabilan skup dependency-ja za web, JPA, security, validaciju i testiranje. Ovakav pristup omogućava standardizovan razvoj, jasno upravljanje zavisnostima i jednostavno lokalno pokretanje testova.

**Efekat odluke:**  
Olakšano je pokretanje komandi `mvn test` i `mvn clean test`, kao i priprema projekta za predaju i lokalnu evaluaciju od strane profesora.

### Odluka 2: Koristiti servisni sloj kao primarni nivo automatizovanog testiranja

**Opis odluke:**  
Automatski testovi fokusirani su na servisni sloj, posebno na reservation i time slot module.

**Razlog:**  
Servisni sloj sadrži glavnu poslovnu logiku sistema i predstavlja najkritičnije mjesto za validaciju pravila rada rezervacija, konflikata termina i upravljanja statusima.

**Efekat odluke:**  
Testovi su ostali fokusirani, brzi za pokretanje i relevantni za najvažnije funkcionalnosti sistema.

### Odluka 3: Test klase premjestiti u `src/test/java`

**Opis odluke:**  
Testovi su organizovani kao pravi test artefakti, a ne kao dio produkcijskog koda.

**Razlog:**  
Ranije stanje u kojem su se test klase nalazile u `src/main/java` dovodilo je do problema tokom compile faze i uzrokovalo pad builda zbog test zavisnosti koje nisu dostupne u production compile kontekstu.

**Efekat odluke:**  
Nakon razdvajanja produkcijskog i testnog koda, Maven test lifecycle je počeo raditi očekivano i projekt je uspješno prošao testiranje.

### Odluka 4: Prioritet dati funkcionalnosti rezervacija pred naprednijim uljepšavanjem interfejsa

**Opis odluke:**  
U završnoj fazi sprinta fokus je stavljen na osposobljavanje reservation toka i stabilnost aplikacije, dok su vizuelne dorade frontenda tretirane kao sekundarne.

**Razlog:**  
Funkcionalna ispravnost i prolazak testova imaju veći značaj za akademsku evaluaciju od dodatnih estetskih poboljšanja korisničkog interfejsa.

**Efekat odluke:**  
Kritične funkcionalnosti su osposobljene na vrijeme, a rizik od unošenja novih problema kroz kasne vizuelne izmjene je smanjen.

### Odluka 5: Uvesti privremeni fallback pristup u reservation logici radi završne stabilizacije

**Opis odluke:**  
Za potrebe finalne demonstracije i predaje prihvaćena je pragmatična korekcija u reservation servisu kako bi se izbjegao pad funkcionalnosti prilikom pronalaska korisnika vezanog za rezervaciju.

**Razlog:**  
Problem je blokirao ključni tok aplikacije i direktno ugrožavao završnu validaciju sistema. U datom vremenskom okviru bilo je važnije osigurati stabilan rad nego uvoditi širu refaktorizaciju autentifikacijskog i reservation toka.

**Efekat odluke:**  
Rezervacije su proradile, aplikacija je mogla biti demonstrirana i manuelno validirana, a tim je dobio stabilnu verziju pogodnu za predaju.

**Napomena:**  
Ova odluka se smatra tehnički prihvatljivom za završnu stabilizaciju studentskog projekta, ali bi u daljem razvoju zahtijevala dodatno čišćenje i vezivanje rezervacije za stvarni autentifikovani identitet korisnika.

### Odluka 6: Koristiti kombinaciju automatskog i manuelnog testiranja

**Opis odluke:**  
Finalna validacija sistema zasnovana je na kombinaciji Maven testova i ručnih provjera ključnih funkcionalnih tokova.

**Razlog:**  
Automatski testovi potvrđuju poslovnu logiku u backend sloju, dok manuelne provjere osiguravaju da integracija frontend-backend radi očekivano za stvarnog korisnika.

**Efekat odluke:**  
Tim je dobio realniju sliku o spremnosti projekta za predaju i demonstraciju.

### Odluka 7: Dokumentaciju pripremiti u formalnijem akademskom stilu

**Opis odluke:**  
Prateći dokumenti sprinta pišu se u formi pogodnoj za univerzitetsku predaju, sa jasnim sekcijama, sažecima i zaključcima.

**Razlog:**  
Kvalitet prezentacije dokumentacije utiče na jasnoću evaluacije projekta i ostavlja profesionalniji utisak u završnoj predaji.

**Efekat odluke:**  
Izvještaji su postali strukturiraniji, lakši za pregled i prikladniji za akademski kontekst.

## Razmatrane alternative

Tokom sprinta razmatrane su i alternative koje nisu u potpunosti usvojene:

- potpuna refaktorizacija reservation autentifikacijske logike umjesto brze korekcije,
- dodatno uređivanje korisničkog interfejsa neposredno pred predaju,
- širenje test pokrivenosti na veći broj modula prije završne validacije,
- odgađanje predaje do dubljeg čišćenja backend tokova.

Ove alternative nisu usvojene prvenstveno zbog ograničenog vremena i prioriteta da sistem bude funkcionalan, demonstrabilan i stabilan za završnu evaluaciju.

## Zaključak

Donesene odluke u Sprintu 6 bile su pragmatične i usmjerene na završetak funkcionalne verzije sistema uz minimalan rizik. Najvažnije odluke odnosile su se na stabilizaciju reservation modula, pravilnu organizaciju testnog koda, potvrdu Maven testnog procesa i pripremu formalne dokumentacije.

Na osnovu uticaja ovih odluka može se zaključiti da je sprint uspješno priveden kraju sa fokusom na ispravnost, stabilnost i spremnost sistema za akademsku predaju.
