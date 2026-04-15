# Use Case Model  
## Sistem za upravljanje rezervacijama termina i ligom

Ovaj dokument opisuje funkcionalnosti sistema kroz **Use Case scenarije** koji su izvedeni iz definisanih **User Stories** i **Acceptance Criteria**.  
Use case model prikazuje kako različiti akteri koriste sistem i koje procese sistem podržava.

---

# 1. Akteri sistema

| Akter | Opis |
|------|------|
| **Korisnik (Igrač)** | Registrovani korisnik koji može pregledati termine i rezervacije. |
| **Kapiten tima** | Korisnik koji upravlja timom i rezervacijama termina. |
| **Administrator** | Korisnik koji upravlja ligama, rezultatima i korisnicima. |
| **Sistem** | Automatizovane funkcije kao što su validacija podataka i sprječavanje konflikta rezervacija. |

---

# 2. Use Case lista

| ID | Naziv | Akter |
|---|---|---|
| UC-1 | Registracija korisnika | Korisnik |
| UC-2 | Prijava korisnika | Korisnik |
| UC-3 | Upravljanje korisničkim ulogama | Administrator |
| UC-4 | Kreiranje tima | Kapiten / Administrator |
| UC-5 | Upravljanje članovima tima | Kapiten |
| UC-6 | Pregled dostupnih termina | Korisnik |
| UC-7 | Rezervacija termina | Kapiten |
| UC-8 | Pregled rezervacija | Korisnik / Kapiten |
| UC-9 | Otkazivanje rezervacije | Kapiten |
| UC-10 | Kreiranje lige | Administrator |
| UC-11 | Dodavanje timova u ligu | Administrator |
| UC-12 | Unos rezultata utakmica | Administrator / Ovlaštena osoba |
| UC-13 | Automatsko ažuriranje tabele | Sistem |

---

# 3. Use Case specifikacije

---

## UC-1 — Registracija korisnika

**Akter:** Korisnik  

**Preduslov:**  
Korisnik nema kreiran nalog.

**Postuslov:**  
Korisnički nalog je kreiran u sistemu.

**Osnovni tok:**

1. Korisnik otvara stranicu za registraciju.
2. Sistem prikazuje formu za unos podataka.
3. Korisnik unosi korisničko ime, email i lozinku.
4. Sistem provjerava ispravnost podataka.
5. Sistem kreira korisnički nalog.
6. Sistem prikazuje potvrdu o uspješnoj registraciji.

**Alternativni tok:**

- Email već postoji → sistem prikazuje poruku o grešci.
- Neispravni podaci → sistem traži ponovni unos.

---

## UC-2 — Prijava korisnika

**Akter:** Korisnik  

**Preduslov:**  
Korisnik ima kreiran nalog.

**Postuslov:**  
Korisnik je prijavljen u sistem.

**Osnovni tok:**

1. Korisnik otvara stranicu za prijavu.
2. Unosi email i lozinku.
3. Sistem provjerava podatke.
4. Sistem kreira korisničku sesiju.
5. Korisnik se preusmjerava na početnu stranicu.

**Alternativni tok:**

- Pogrešni podaci → sistem prikazuje poruku o grešci.
- Previše pokušaja prijave → sistem blokira pristup.

---

## UC-3 — Upravljanje korisničkim ulogama

**Akter:** Administrator  

**Preduslov:**  
Administrator je prijavljen.

**Postuslov:**  
Uloga korisnika je ažurirana.

**Osnovni tok:**

1. Administrator otvara listu korisnika.
2. Sistem prikazuje korisnike i njihove uloge.
3. Administrator bira korisnika.
4. Administrator dodjeljuje ili mijenja ulogu.
5. Sistem sprema promjene.

**Alternativni tok:**

- Neovlašten pristup → sistem odbija promjenu.

---

## UC-4 — Kreiranje tima

**Akter:** Kapiten / Administrator  

**Preduslov:**  
Korisnik je prijavljen.

**Postuslov:**  
Tim je evidentiran u sistemu.

**Osnovni tok:**

1. Korisnik bira opciju za kreiranje tima.
2. Unosi naziv tima.
3. Sistem provjerava podatke.
4. Sistem kreira tim.
5. Tim postaje dostupan u sistemu.

---

## UC-5 — Upravljanje članovima tima

**Akter:** Kapiten  

**Preduslov:**  
Tim postoji u sistemu.

**Postuslov:**  
Lista članova tima je ažurirana.

**Osnovni tok:**

1. Kapiten otvara upravljanje timom.
2. Dodaje ili uklanja člana tima.
3. Sistem ažurira listu članova.

**Alternativni tok:**

- Dupli član → sistem ne dozvoljava dodavanje.

---

## UC-6 — Pregled dostupnih termina

**Akter:** Korisnik  

**Preduslov:**  
Korisnik je prijavljen.

**Postuslov:**  
Prikazana lista termina.

**Osnovni tok:**

1. Korisnik otvara raspored termina.
2. Sistem prikazuje sve termine.
3. Slobodni i zauzeti termini su jasno označeni.
4. Korisnik može filtrirati termine po datumu ili vremenu.

---

## UC-7 — Rezervacija termina

**Akter:** Kapiten  

**Preduslov:**

- Korisnik je prijavljen.
- Termin je slobodan.

**Postuslov:**  
Termin je rezervisan.

**Osnovni tok:**

1. Kapiten bira slobodan termin.
2. Sistem provjerava dostupnost termina.
3. Sistem kreira rezervaciju.
4. Termin postaje označen kao zauzet.

**Alternativni tok:**

- Termin već rezervisan → sistem odbija rezervaciju.
- Korisnik nije prijavljen → sistem blokira akciju.

---

