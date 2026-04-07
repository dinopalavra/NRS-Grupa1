# NFR zahtjevi

| ID | Kategorija | Opis zahtjeva | Kako će se provjeravati | Prioritet | Napomena |
|:---|:---|:---|:---|:---|:---|
| NFR-1 | Sigurnost | Sistem mora omogućiti pristup funkcionalnostima u skladu sa korisničkom ulogom. | Provjera kroz testne scenarije za različite korisničke uloge i pokušaje neovlaštenog pristupa. | Visok | Povezano sa prijavom korisnika i upravljanjem korisničkim ulogama. |
| NFR-2 | Sigurnost | Lozinke korisnika moraju biti zaštićene i ne smiju se čuvati u otvorenom obliku. | Pregled implementacije i baze podataka, uz provjeru da se lozinke ne prikazuju niti čuvaju kao običan tekst. | Visok | Povezano sa registracijom i prijavom korisnika. |
| NFR-3 | Pouzdanost | Sistem mora spriječiti dvostruku rezervaciju istog termina. | Testiranje pokušaja rezervacije već zauzetog termina i provjera ponašanja sistema. | Visok | Ključni zahtjev za funkcionalnost rezervacije termina. |
| NFR-4 | Pouzdanost | Sistem mora osigurati da se promjene rezervacija i sastava timova ispravno evidentiraju i ažuriraju. | Testiranje dodavanja i uklanjanja članova tima, rezervacije i otkazivanja termina, te provjera prikaza nakon izmjene. | Visok | Povezano sa upravljanjem članovima tima i rezervacijama. |
| NFR-5 | Upotrebljivost | Korisnički interfejs za pregled termina i rezervacija treba biti jednostavan, jasan i pregledan. | Pregled korisničkog interfejsa i provjera da su osnovne informacije lako uočljive i razumljive. | Srednji | Posebno važno za korisnike koji često pregledaju termine. |
