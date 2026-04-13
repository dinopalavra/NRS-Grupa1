# Product Backlog

## Sprint Goal

Cilj Sprinta 3 je detaljnije razraditi strukturu i način funkcionisanja sistema za upravljanje sportskim terminima i ligama kroz izradu ključnih analitičkih i tehničkih artefakata.

Fokus sprinta je na modeliranju baze podataka, definisanju domain i use case modela, opisu osnovne arhitekture sistema i planiranju pristupa testiranju, kako bismo stekli jasniju sliku o tome 
kako će sistem biti organizovan i kako će podržavati glavne funkcionalnosti poput upravljanja timovima, rezervacije termina, vođenja liga i unosa rezultata. 

Na ovaj način tim postavlja kvalitetnu osnovu za naredne sprintove i kasniju implementaciju sistema.

| ID | Naziv stavke | Kratak opis | Tip stavke | Prioritet | Procjena | Status | Sprint / Plan | Napomena |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| 1 | Team Charter | Definisati sastav tima, način komunikacije, radna pravila i početne odgovornosti. | Documentation | Visok | 3 | Završeno | Sprint 1 | Osnov za organizaciju timskog rada. |
| 2 | Product Vision | Definisati problem, vrijednost sistema, ciljne korisnike i MVP opseg. | Documentation | Visok | 3 | Završeno | Sprint 1 | Osnov za dalje planiranje projekta. |
| 3 | Stakeholder Map | Identifikovati ključne stakeholdere, njihove interese, očekivanja i uticaj na sistem. | Documentation | Visok | 3 | Završeno | Sprint 1 | Pomaže razumijevanju korisnika i prioriteta. |
| 4 | Početni Product Backlog | Definisati početne backlog stavke i okvirni plan razvoja sistema. | Documentation | Visok | 3 | Završeno | Sprint 1 | Početna verzija backloga. |
| 5 | Prioritetne User Stories | Razraditi najvažnije funkcionalnosti kroz user stories. | Documentation | Visok | 5 | Završeno | Sprint 2 | Obuhvata razradu odabranih prioritetnih funkcionalnosti. |
| 6 | Acceptance Criteria | Definisati mjerljive i provjerljive kriterije prihvatanja za prioritetne storyje. | Documentation | Visok | 5 | Završeno | Sprint 2 | Povezano sa user stories za odabrane funkcionalnosti. |
| 7 | Početni NFR zahtjevi | Definisati osnovne nefunkcionalne zahtjeve sistema. | Documentation | Srednji | 3 | Završeno | Sprint 2 | Fokus na sigurnost, pouzdanost i upotrebljivost. |
| 8 | Model baze podataka | Definisati osnovne entitete i veze za korisnike, timove, termine, lige, utakmice i rezultate. | Technical Task | Visok | 5 | To Do | Sprint 3 | Temelj za kasniju implementaciju. |
| 9 | Architecture Overview | Definisati osnovni arhitektonski pristup i organizaciju sistema. | Technical Task | Visok | 3 | To Do | Sprint 3 | Povezano sa tehničkim odlukama. |
| 10 | Domain / Use Case model | Modelirati osnovne procese rezervacije termina, upravljanja timovima i unosa rezultata. | Documentation | Srednji | 5 | To Do | Sprint 3 | Podrška razumijevanju sistema. |
| 11 | Test Strategy | Definisati pristup testiranju ključnih funkcionalnosti sistema. | Documentation | Srednji | 3 | To Do | Sprint 3 | Važno za kvalitet rješenja. |
| 12 | Definition of Done | Definisati zajedničke kriterije kada se stavka smatra završenom. | Documentation | Srednji | 2 | To Do | Sprint 4 | Potrebno za konzistentan timski rad. |
| 13 | Initial Release Plan | Definisati plan inkremenata i okvirnu raspodjelu funkcionalnosti po sprintovima. | Documentation | Srednji | 3 | To Do | Sprint 4 | Povezano sa planiranjem razvoja. |
| 14 | Registracija korisnika | Omogućiti korisniku kreiranje korisničkog računa u sistemu. | Feature | Visok | 5 | To Do | Sprint 5 | Razrada zahtjeva u Sprintu 2; implementacija planirana u Sprintu 5. |
| 15 | Prijava korisnika | Omogućiti prijavu korisnika u sistem na osnovu kredencijala. | Feature | Visok | 3 | To Do | Sprint 5 | Razrada zahtjeva u Sprintu 2; implementacija planirana u Sprintu 5. |
| 16 | Upravljanje korisničkim ulogama | Omogućiti razlikovanje administratora, kapitena, igrača i sudije/zapisničara. | Feature | Visok | 5 | To Do | Sprint 5 | Razrada zahtjeva u Sprintu 2; implementacija planirana u Sprintu 5. |
| 17 | Kreiranje tima | Omogućiti kapitenu ili administratoru kreiranje tima. | Feature | Visok | 5 | To Do | Sprint 5 | Razrada zahtjeva u Sprintu 2; implementacija planirana u Sprintu 5. |
| 18 | Upravljanje članovima tima | Omogućiti dodavanje i pregled članova tima. | Feature | Visok | 5 | To Do | Sprint 5 | Razrada zahtjeva u Sprintu 2; implementacija planirana u Sprintu 5. |
| 19 | Pregled dostupnih termina | Omogućiti pregled slobodnih termina i raspoloživih resursa. | Feature | Visok | 8 | To Do | Sprint 6 | Razrada zahtjeva u Sprintu 2; implementacija planirana u Sprintu 6. |
| 20 | Rezervacija termina | Omogućiti rezervaciju termina bez konflikta sa postojećim rezervacijama. | Feature | Visok | 13 | To Do | Sprint 6 | Razrada zahtjeva u Sprintu 2; implementacija planirana u Sprintu 6. |
| 21 | Pregled rezervacija | Omogućiti pregled postojećih rezervacija po timu ili terminu. | Feature | Srednji | 5 | To Do | Sprint 6 | Razrada zahtjeva u Sprintu 2; implementacija planirana u Sprintu 6. |
| 22 | Kreiranje lige | Omogućiti organizatoru kreiranje nove lige ili takmičenja. | Feature | Visok | 5 | To Do | Sprint 7 | Osnov za modul takmičenja. |
| 23 | Dodavanje timova u ligu | Omogućiti povezivanje timova sa odabranom ligom. | Feature | Visok | 5 | To Do | Sprint 7 | Potrebno za organizaciju takmičenja. |
| 24 | Unos rezultata utakmica | Omogućiti unos i ažuriranje rezultata utakmica od strane ovlaštene osobe. | Feature | Visok | 8 | To Do | Sprint 7 | Direktno utiče na tabelu i tok lige. |
| 25 | Automatsko ažuriranje tabele | Automatski izračunavati bodove, poredak i stanje na tabeli na osnovu unesenih rezultata. | Feature | Visok | 8 | To Do | Sprint 7 | Završna ključna funkcionalnost MVP-a. |
| 26 | Notifikacije o promjenama | Omogućiti obavijesti o promjenama termina i rezultata. | Feature | Nizak | 5 | To Do | Kasniji sprintovi | Nije dio početnog MVP-a. |
| 27 | Statistika igrača i timova | Omogućiti prikaz dodatne statistike nakon osnovne funkcionalnosti tabele. | Feature | Nizak | 8 | To Do | Kasniji sprintovi | Nije dio početnog MVP-a. |
