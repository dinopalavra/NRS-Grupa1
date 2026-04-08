# User stories
## 1 Registracija korisnika

**Opis**  
Kao novi korisnik, želim kreirati korisnički račun, kako bih mogao pristupiti sistemu i koristiti njegove osnovne funkcionalnosti.

**Poslovna vrijednost**  
Registracija je osnovni preduslov za korištenje sistema i omogućava identifikaciju korisnika i povezivanje njegovih aktivnosti sa nalogom.

**Prioritet**  
Visok

**Pretpostavke i otvorena pitanja**  
Pretpostavlja se da korisnik prilikom registracije unosi osnovne podatke kao što su korisničko ime, email adresa i lozinka. Dodatno treba razjasniti da li je potrebna potvrda email adrese nakon registracije.

**Veze sa drugim storyjima ili zavisnostima**  
Povezano sa prijavom korisnika i upravljanjem korisničkim ulogama.

## 2 Prijava korisnika

**Opis**  
Kao registrovani korisnik, želim se prijaviti u sistem koristeći email adresu i lozinku, kako bih mogao pristupiti svom nalogu i funkcionalnostima sistema.

**Poslovna vrijednost**  
Prijava omogućava sigurnu autentifikaciju korisnika i pristup funkcionalnostima u skladu sa njegovom ulogom.

**Prioritet**  
Visok

**Pretpostavke i otvorena pitanja**  
Pretpostavlja se da korisnik ima prethodno kreiran račun. Potrebno je dodatno razjasniti kako sistem reaguje nakon više neuspjelih pokušaja prijave.

**Veze sa drugim storyjima ili zavisnostima**  
Povezano sa registracijom korisnika i upravljanjem korisničkim ulogama.

## 3 Upravljanje korisničkim ulogama

**Opis**  
Kao administrator sistema, želim upravljati korisničkim ulogama, kako bih mogao kontrolisati pristup funkcionalnostima sistema.

**Poslovna vrijednost**  
Ova funkcionalnost omogućava pravilnu raspodjelu ovlasti i sigurnije korištenje sistema od strane različitih tipova korisnika.

**Prioritet**  
Visok

**Pretpostavke i otvorena pitanja**  
Pretpostavlja se da sistem podržava najmanje uloge administratora, kapitena, igrača i sudije/zapisničara. Potrebno je razjasniti da li jedan korisnik može imati više uloga istovremeno.

**Veze sa drugim storyjima ili zavisnostima**  
Povezano sa registracijom, prijavom i svim funkcionalnostima kojima se pristupa prema ulozi korisnika.

## 4 Kreiranje tima

**Opis**  
Kao kapiten tima ili administrator, želim kreirati tim, kako bih mogao organizovati učesnike i pripremiti tim za rezervacije termina i učešće u ligi.

**Poslovna vrijednost**  
Tim je osnovna organizaciona jedinica sistema i bez njega nije moguće dalje upravljati članovima, rezervacijama i takmičenjem.

**Prioritet**  
Visok

**Pretpostavke i otvorena pitanja**  
Pretpostavlja se da tim ima naziv i odgovornu osobu. Potrebno je dodatno razjasniti da li jedan korisnik može kreirati više timova.

**Veze sa drugim storyjima ili zavisnostima**  
Povezano sa upravljanjem članovima tima, rezervacijom termina i dodavanjem timova u ligu.

## 5 Upravljanje članovima tima

**Opis**  
Kao kapiten tima, želim dodavati i uklanjati članove tima, kako bih mogao održavati tačan i ažuran sastav tima.

**Poslovna vrijednost**  
Ažuran sastav tima omogućava bolju organizaciju učesnika i tačnije upravljanje rezervacijama i takmičenjem.

**Prioritet**  
Visok

**Pretpostavke i otvorena pitanja**  
Pretpostavlja se da samo ovlaštena osoba može mijenjati sastav tima. Potrebno je razjasniti da li igrač može biti član više timova istovremeno.

**Veze sa drugim storyjima ili zavisnostima**  
Povezano sa kreiranjem tima, rezervacijom termina i ligama.

## 6 Pregled dostupnih termina

**Opis**  
Kao korisnik sistema, želim pregledati dostupne termine, kako bih mogao odabrati termin koji odgovara mom timu ili aktivnosti.

**Poslovna vrijednost**  
Pregled termina omogućava korisnicima da na jednostavan način vide raspoloživost resursa i planiraju svoje aktivnosti bez konflikta.

**Prioritet**  
Visok

**Pretpostavke i otvorena pitanja**  
Pretpostavlja se da termin sadrži osnovne informacije kao što su datum, vrijeme i lokacija. Potrebno je razjasniti da li korisnik vidi samo slobodne termine ili i zauzete termine sa statusom.

**Veze sa drugim storyjima ili zavisnostima**  
Povezano sa rezervacijom termina i pregledom rezervacija.

## Rezervacija termina

**Opis**  
Kao kapiten tima ili ovlašteni korisnik, želim rezervisati slobodan termin, kako bih osigurao termin za svoj tim bez preklapanja sa postojećim rezervacijama.

**Poslovna vrijednost**  
Rezervacija termina je jedna od ključnih funkcionalnosti sistema jer direktno rješava problem ručnog i nepreglednog upravljanja zauzećem resursa.

**Prioritet**  
Visok

**Pretpostavke i otvorena pitanja**  
Pretpostavlja se da se može rezervisati samo slobodan termin. Potrebno je dodatno razjasniti pravila otkazivanja i izmjene već kreirane rezervacije.

**Veze sa drugim storyjima ili zavisnostima**  
Povezano sa pregledom dostupnih termina, pregledom rezervacija i upravljanjem timovima.

## 8 Pregled rezervacija

**Opis**  
Kao kapiten tima, administrator ili organizator, želim pregledati postojeće rezervacije, kako bih imao uvid u raspored zauzeća i planirane aktivnosti.

**Poslovna vrijednost**  
Pregled rezervacija omogućava bolju kontrolu rasporeda, smanjuje nesporazume i pomaže korisnicima da lakše planiraju naredne aktivnosti.

**Prioritet**  
Srednji

**Pretpostavke i otvorena pitanja**  
Pretpostavlja se da rezervacije mogu biti pregledane po timu ili terminu. Potrebno je razjasniti da li korisnici vide sve rezervacije ili samo one za koje imaju ovlaštenje.

**Veze sa drugim storyjima ili zavisnostima**  
Povezano sa pregledom dostupnih termina i rezervacijom termina.

## 9 Otkazivanje rezervacije

**Opis** Kao kapiten tima ili administrator, želim imati mogućnost da otkažem već napravljenu rezervaciju, kako bi se termin oslobodio za druge timove u slučaju promjene plana.

**Poslovna vrijednost** Otkazivanje omogućava bolju iskorištenost termina i sprečava da resursi ostanu rezervisani, a neiskorišteni.

**Prioritet** Visok

**Pretpostavke i otvorena pitanja** Pretpostavlja se da se otkazivanje može izvršiti samo do određenog vremena prije početka termina. Potrebno je definisati vremenski rok (npr. 24 sata ranije) nakon kojeg otkazivanje više nije moguće.

**Veze sa drugim storyjima ili zavisnostima** Povezano sa rezervacijom termina i pregledom rezervacija.

## 10 Potvrda učešća člana tima

**Opis** Kao član tima (igrač), želim potvrditi svoj dolazak na rezervisani termin, kako bi kapiten imao uvid u to koliko igrača dolazi i da li imamo dovoljan broj za termin.

**Poslovna vrijednost** Ovo poboljšava unutrašnju organizaciju tima i smanjuje potrebu za vanjskom komunikacijom (npr. WhatsApp ili Viber) oko sastava za termin.

**Prioritet** Srednji

**Pretpostavke i otvorena pitanja** Pretpostavlja se da igrač vidi listu rezervacija svog tima. Potrebno je razjasniti da li kapiten može postaviti minimalan broj igrača potreban za potvrdu termina.

**Veze sa drugim storyjima ili zavisnostima** Povezano sa upravljanjem članovima tima i pregledom rezervacija.
