# Risk Register

## Pregled

Ovaj dokument sadrži identifikovane rizike za projekat sistema za upravljanje sportskim terminima i ligama.  
Cilj dokumenta je rano prepoznati moguće probleme koji mogu ugroziti kvalitet artefakata, kasniju implementaciju i realizaciju MVP funkcionalnosti.

| ID | Opis rizika | Uzrok | Vjerovatnoća | Uticaj | Prioritet | Plan mitigacije | Odgovorna osoba / uloga | Status |
|---|---|---|---|---|---|---|---|---|
| R1 | Nejasna pravila rezervacije termina | Pravila o tome ko može rezervisati termin, koliko unaprijed i pod kojim uslovima još nisu potpuno razjašnjena | Srednja | Visok | Visok | Na vrijeme definisati poslovna pravila kroz use case model i usaglasiti ih sa Product Ownerom | Tim / osoba zadužena za zahtjeve | Otvoren |
| R2 | Konflikti termina i dvostruke rezervacije | Sistem upravlja ograničenim brojem termina i resursa, pa postoji mogućnost preklapanja rezervacija | Visoka | Visok | Visok | U modelu baze i use caseovima predvidjeti validaciju zauzetosti termina i zabranu konflikta | Tim / osoba zadužena za model i logiku | Otvoren |
| R3 | Nedovoljno jasno definisane korisničke uloge | U sistemu postoje različiti tipovi korisnika sa različitim ovlaštenjima | Srednja | Visok | Visok | Jasno odvojiti administratora, kapitena, igrača i sudiju/zapisničara u modelima i backlogu | Tim / osoba zadužena za zahtjeve | Otvoren |
| R4 | Neusklađenost između artefakata | Product backlog, user stories, modeli i arhitektura mogu opisivati sistem na različite načine | Srednja | Srednji | Srednji | Nakon izrade svakog artefakta izvršiti zajednički pregled i uskladiti nazive entiteta i pravila | Cijeli tim | Otvoren |
| R5 | Prevelik scope MVP-a | Postoji rizik da tim prerano pokuša obuhvatiti i dodatne funkcionalnosti poput statistike i notifikacija | Srednja | Srednji | Srednji | Zadržati fokus na MVP stavkama definisanim u backlogu i odgoditi dodatne opcije za kasnije sprintove | Scrum koordinator / cijeli tim | Otvoren |
| R6 | Pogrešno modeliranje bodovanja i tabele lige | Pravila bodovanja i rangiranja mogu biti složenija nego što se na prvi pogled čini | Srednja | Visok | Visok | U domain modelu i use case modelu eksplicitno opisati pravila unosa rezultata i obračuna tabele | Tim / osoba zadužena za domenski model | Otvoren |
| R7 | Slaba priprema za kasniju implementaciju | Ako arhitektura i model baze budu površni, naredni sprintovi mogu krenuti sa lošim temeljom | Srednja | Visok | Visok | U Sprintu 3 detaljno razraditi ključne entitete, module i interakcije prije tehničkog setupa u Sprintu 4 | Cijeli tim | Otvoren |
| R8 | Problemi u koordinaciji tima | Neravnomjerna raspodjela rada može dovesti do kašnjenja i nekonzistentnih artefakata | Srednja | Srednji | Srednji | Jasno podijeliti odgovornosti po dokumentima i odrediti zajednički termin za završni pregled | Cijeli tim | Otvoren |


