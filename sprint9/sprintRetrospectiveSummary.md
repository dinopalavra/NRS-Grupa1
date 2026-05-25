# Sprint Retrospective Summary
## Sprint 9

---

## Šta je išlo dobro

- Tim je uspješno realizovao svih 9 planiranih user storija unutar jednog sprinta, sa posebnim fokusom na uvođenje igrača kao prvorazrednog entiteta sistema.
- Implementacija pravog rostera (TeamMember entitet sa brojem dresa i pozicijom) konačno je povezala korisničke naloge sa stvarnim učešćem u timovima — ovo je preduslov za sve dalje funkcionalnosti vezane za pojedinačnog igrača.
- Modul liga dobio je sportsku dubinu kroz evidenciju strijelaca utakmica i automatsku rang listu najboljih strijelaca — funkcionalnost koja sistem podiže iznad osnovne CRUD aplikacije.
- Strogo ulogno razdvajanje (admin/kapiten/igrač/sudija) zatvorilo je sigurnosne propuste otkrivene u Sprintu 8 — kapiten više ne može mijenjati tuđe timove, igrač vidi samo ono što ga se tiče, a liga akcije su strogo razdvojene po ulogama.
- Cross-modul validacija sporta (korisnik ↔ tim ↔ liga ↔ utakmica) eliminisala je čitav razred grešaka koje su mogle nastati miješanjem sportova.
- Backend testovi su značajno prošireni — sa 58 u prethodnom sprintu na 99 testova u ovom, sa pokrivenošću svih novih validacionih grana.
- Sprint je sadržavao pravu iteraciju nad dizajnom — inicijalno implementiran "tip rezervacije" je nakon testova pojednostavljen u uniformnu logiku auto-notifikacije, što je rezultiralo čistijim UX-om.

---

## Šta nije išlo dobro

- DB kolona za minutu gola je naivno nazvana `minute`, što je uzrokovalo runtime grešku jer je riječ rezervisana u standardnom SQL-u — problem je otkriven tek nakon prvog ručnog testa unosa rezultata sa strijelcima.
- Prilikom dodavanja sport polja na korisnika, postojeći testovi nisu kompajlirali zbog promjene konstruktora `CreateUserRequest` i `RecordResultRequest` — ovo je predvidiv tehnički efekat ali je svejedno usporio razvoj.
- Frontend role checkovi su prva i jedina linija odbrane za većinu novih liga akcija — backend nije strogo enforce-ovan, što ostavlja teoretsku mogućnost da napredan korisnik preko direktnih API poziva izvrši admin akciju.
- Inicijalna implementacija tip rezervacije (TRAINING/REGULAR) je odbačena nakon testiranja jer nije donosila semantičku razliku — vrijeme uloženo u tu implementaciju je djelimično izgubljeno, iako je DB schema zadržana za buduće potrebe.
- Rad sa H2 in-memory bazom znači da svaki restart backenda briše sve testne podatke — testiranje cijelog protoka (kreiranje korisnika → tim → liga → utakmica → strijelci) zahtijeva ponovno postavljanje cijelog scenarija.

---

## Šta treba promijeniti

- Pri kreiranju novih entiteta uvijek provjeriti da li imena polja koliziraju sa SQL rezervisanim riječima — formirati internu kontrolnu listu.
- Backend permission enforcement za Liga modul akcije treba dodati kao prioritetnu stavku u sljedećem sprintu — frontend ograničenja nisu dovoljna za produkcijsku upotrebu.
- Test ažuriranja koja proizilaze iz promjena DTO konstruktora trebaju biti deo iste commit jedinice kao i promjena DTO-a, ne odvojeno popravljana.
- Prije implementacije novih funkcionalnosti koje uvode dropdownove ili dodatna polja u formama, provjeriti sa product ownerom da li dodaju stvarnu vrijednost — primjer tip rezervacije se mogao izbjeći.
- Razmisliti o postavljanju seed podataka koji se učitavaju pri startu backenda u local profilu — ubrzalo bi manuelno testiranje.

---

## Koje konkretne akcije tim uvodi u narednom sprintu

- Dodati backend ograničenja za sve liga akcije (`@PreAuthorize` ili eksplicitne provjere) — zatvoriti tehnički dug iz DL9-005.
- Dodati seed `data.sql` skriptu za local H2 profil koja kreira test korisnike, timove i jednu ligu — ubrzaće manuelno testiranje.
- Razmotriti implementaciju nekih stavki iz "Budući razvoj" sekcije product backloga — posebno reset zaboravljene lozinke i statistika igrača koje su prirodni nastavak Sprint 9 rada.
- Prije svake nove DB kolone provjeriti listu rezervisanih riječi za H2 i Postgres.
- Nastaviti praksu pisanja unit testova za svaku novu validacijsku granu — trenutna pokrivenost (99 testova) je dobar standard koji ne treba spuštati.

