# SprintRetrospectiveSummary
## Sprint 6

**Datum:** 07/05/2026  
**Projekt:** Sistem za upravljanje sportskim terminima i ligama
**Dokument:** Sažetak sprint retrospektive

## Svrha dokumenta

Ovaj dokument sumira najvažnija zapažanja sa retrospektive Sprinta 6. Fokus retrospektive bio je na tome šta je tokom sprinta funkcionisalo dobro, koje su poteškoće usporavale tim, šta je iz toga naučeno i koje bi konkretne akcije trebalo primijeniti u narednom radu.

Retrospektiva nije usmjerena samo na tehničke probleme, nego i na način organizacije rada, prioritizacije i završne koordinacije pred predaju.

## Šta je prošlo dobro

### 1. Ključne funkcionalnosti su ipak stabilizovane na vrijeme

Iako je završna faza sprinta uključivala više problema nego što je prvobitno očekivano, tim je uspio osposobiti najvažnije tokove aplikacije. Posebno je značajno što su rezervacije, login i administrativni tokovi za korisnike i timove dovedeni u funkcionalno stanje prije predaje.

### 2. Testovi su uspješno vraćeni u ispravan razvojni tok

Nakon što su prepoznati problemi sa organizacijom test klasa, Maven test proces je stabilizovan i potvrđen kroz uspješan prolazak lokalnih testova. Ovo je timu dalo dodatno povjerenje u ispravnost završne verzije backend sistema.

### 3. Tim je brzo reagovao na blokirajuće greške

Kada je reservation tok počeo padati zbog problema sa korisničkim ID-em, fokus tima je preusmjeren na rješavanje baš tog problema. Ovakav pristup je bio koristan jer je omogućio uklanjanje najkritičnije prepreke prije nego što se nastavilo sa manje važnim doradama.

### 4. Dokumentacija je završena u ozbiljnijoj i preglednijoj formi

U završnoj fazi sprinta posvećena je pažnja i dokumentacionom dijelu projekta. Time projekt nije ostao samo tehnički funkcionalan, nego je i formalno pripremljen za evaluaciju.

## Šta nije prošlo dobro

### 1. Problemi su otkriveni kasno u sprintu

Neki od ozbiljnijih problema, posebno oni vezani za reservation tok i testnu organizaciju, identifikovani su tek u završnoj fazi rada. To je povećalo pritisak i smanjilo prostor za kvalitetnije čišćenje i dorade.

### 2. Premalo vremena je ostalo za frontend polishing

Zbog toga što je fokus morao biti prebačen na funkcionalne i build probleme, manje vremena je ostalo za sređivanje izgleda pojedinih frontend ekrana. To se posebno osjetilo na reservations dijelu, koji nije bio jednako dorađen kao neki drugi moduli.

### 3. Nisu svi problemi rješavani kroz dugoročno idealno rješenje

U završnoj stabilizaciji neke odluke su bile pragmatične i usmjerene na to da sistem proradi i bude demonstrabilan. Takav pristup je bio opravdan u kontekstu predaje, ali znači da bi dio logike u budućnosti trebalo dodatno refaktorisati.

### 4. Tehnički dug je djelimično prenesen u završnu verziju

Iako aplikacija radi i spremna je za predaju, završna verzija i dalje sadrži odluke koje su dobre za akademski kontekst i kratki rok, ali nisu optimalne za dugoročni razvoj bez dodatnog čišćenja.

## Glavne lekcije sprinta

Na osnovu rada u Sprintu 6 tim je izdvojio nekoliko važnih lekcija:

- kritične funkcionalnosti treba validirati ranije, a ne tek pred kraj sprinta,
- testovi moraju biti pravilno organizovani od početka kako ne bi pravili probleme u build procesu,
- rezervisati vrijeme za stabilizaciju sistema treba biti dio plana, a ne posljednja improvizacija,
- korisno je razlikovati šta mora biti tehnički savršeno, a šta mora prije svega biti funkcionalno za predaju,
- dokumentacija ne treba ostati za sam kraj bez međukoraka i ranijih nacrta.

## Šta ćemo raditi drugačije ubuduće

### 1. Ranija provjera end-to-end toka

U narednom radu kompletan tok od logina do ključne poslovne funkcionalnosti treba provjeravati ranije u sprintu. Time bi se ranije otkrivale greške integracije između frontend i backend sloja.

### 2. Jasnije odvajanje produkcijskog i testnog koda

Test klase i testna organizacija moraju ostati odvojene od produkcijskog koda od samog početka. Time se izbjegavaju build problemi i nepotrebna konfuzija pred završnu validaciju.

### 3. Bolje planiranje završnog buffera

U budućim sprintovima treba planirati poseban vremenski buffer za stabilizaciju, finalni UI pregled, dokumentaciju i eventualne neplanirane greške.

### 4. Ranije dokumentovanje važnih odluka

Važne tehničke odluke i workaround rješenja treba zapisivati dok nastaju. Time se kasnije olakšava i dokumentacija i objašnjenje projekta pred evaluatorom.

## Akcioni koraci

Za naredni rad tim definiše sljedeće konkretne akcije:

- uvesti raniji smoke test ključnih tokova pri svakoj većoj integraciji,
- održavati test klase uredno u `src/test/java`,
- validirati reservation tok odmah nakon svake veće backend izmjene,
- ostaviti posebno vrijeme za završni UI pregled,
- voditi kraći decision log tokom sprinta, a ne tek na kraju,
- praviti nacrt završne dokumentacije prije posljednje sedmice rada.

## Zaključak

Retrospektiva Sprinta 6 pokazuje da je tim uspio isporučiti funkcionalan rezultat uprkos pritisku završne stabilizacije i nekoliko blokirajućih problema. Najveći uspjeh sprinta je što je sistem doveden do stanja u kojem radi, prolazi testove i može biti predat.

Najvažnija poruka retrospektive jeste da bi ranija validacija integracije, bolja organizacija testova i ranije planiranje završnih aktivnosti značajno smanjili stres i tehnički dug u sličnim situacijama u budućnosti.
