# Izvještaj testiranja
## Sprint 11

**Datum:** 08.06.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Pregled

Sprint 11 je fokusiran na UX poboljšanja i responzivnost. Testiranje je provedeno manualno pregledom UI komponenti u browseru, provjerom vizualnog prikaza na različitim rezolucijama i testiranjem interakcije s novim paginacijskim komponentama.

---

## 1. Testovi paginacije — Rezervacije (US11-1)

| ID testa | Opis testa | Ulazni uvjeti | Očekivani rezultat | Stvarni rezultat | Status |
|---|---|---|---|---|---|
| T11-1-01 | Paginacija se prikazuje samo kada ima više od 10 rezervacija | Lista s 12 rezervacija | Paginacija vidljiva ispod tabele | Paginacija se prikazuje ✓ | PROŠAO |
| T11-1-02 | Paginacija se ne prikazuje kada ima ≤ 10 rezervacija | Lista s 8 rezervacija | Paginacija nije vidljiva | Paginacija sakrivena ✓ | PROŠAO |
| T11-1-03 | Klik na narednu stranicu prikazuje sljedeći set rezervacija | Stranica 1 od 2, 12 stavki | Stranica 2 s 2 preostalim rezervacijama | Ispravno prikazuje 2 stavke ✓ | PROŠAO |
| T11-1-04 | Reset stranice pri promjeni filtera | Na stranici 2, promjeni filter na "Na čekanju" | Vraća se na stranicu 1 | Stranica resetirana ✓ | PROŠAO |
| T11-1-05 | Info tekst prikazuje točan raspon | 12 stavki, stranica 1 | "Prikazano 1–10 od 12" | Tekst ispravan ✓ | PROŠAO |
| T11-1-06 | Prethodna i naredna dugmad su onemogućeni na granicama | Na prvoj / posljednjoj stranici | Dugme "‹" onemogućeno na str. 1, "›" na posljednjoj | Ispravno onemogućeni ✓ | PROŠAO |

---

## 2. Testovi paginacije — Termini (US11-2)

| ID testa | Opis testa | Ulazni uvjeti | Očekivani rezultat | Stvarni rezultat | Status |
|---|---|---|---|---|---|
| T11-2-01 | Termini paginacija po 15 stavki | Lista s 20 termina | Stranica 1 prikazuje 15, str. 2 prikazuje 5 | Ispravno ✓ | PROŠAO |
| T11-2-02 | Reset stranice pri promjeni pretrage | Na stranici 2, unos teksta u search | Vraća se na stranicu 1 | Stranica resetirana ✓ | PROŠAO |
| T11-2-03 | Reset stranice pri promjeni sporta | Na stranici 2, odabir drugog sporta | Vraća se na stranicu 1 | Stranica resetirana ✓ | PROŠAO |
| T11-2-04 | Reset stranice pri promjeni datuma | Na stranici 2, unos datuma | Vraća se na stranicu 1 | Stranica resetirana ✓ | PROŠAO |

---

## 3. Testovi pretrage i paginacije — Korisnici (US11-3)

| ID testa | Opis testa | Ulazni uvjeti | Očekivani rezultat | Stvarni rezultat | Status |
|---|---|---|---|---|---|
| T11-3-01 | Pretraga po imenu | Unos "Ana" u search | Lista se filtrira na korisnike koji sadrže "Ana" | Filtriranje radi ✓ | PROŠAO |
| T11-3-02 | Pretraga po korisničkom imenu | Unos dijela usernamea | Lista se ažurira | Filtriranje radi ✓ | PROŠAO |
| T11-3-03 | Filter po ulozi PLAYER | Odabir "PLAYER" iz dropdown-a | Prikazuju se samo igrači | Filter radi ✓ | PROŠAO |
| T11-3-04 | Filter po ulozi MANAGER | Odabir "MANAGER" iz dropdown-a | Prikazuju se samo manageri | Filter radi ✓ | PROŠAO |
| T11-3-05 | Kombinacija pretrage i role filtera | Search "a" + role "PLAYER" | Igrači čije ime/username sadrži "a" | Kombinacija radi ✓ | PROŠAO |
| T11-3-06 | Subtitle prikazuje tačan broj | Filtriranje na 3 od 12 korisnika | "3 od 12 korisnika" | Ispravno ✓ | PROŠAO |
| T11-3-07 | Paginacija Korisnici po 10 stavki | Lista s 15 korisnika | Stranica 1 = 10, stranica 2 = 5 | Ispravno ✓ | PROŠAO |

---

## 4. Testovi dizajna padajućih lista na Login stranici (US11-4)

| ID testa | Opis testa | Ulazni uvjeti | Očekivani rezultat | Stvarni rezultat | Status |
|---|---|---|---|---|---|
| T11-4-01 | Select "Uloga" ima vidljivu zlatnu strelicu | Registracijska forma na Login stranici | Zlatna strelica desno od teksta | Strelica vidljiva ✓ | PROŠAO |
| T11-4-02 | Select "Sport" ima vidljivu zlatnu strelicu | Odabrana uloga PLAYER/MANAGER | Zlatna strelica vidljiva | Strelica vidljiva ✓ | PROŠAO |
| T11-4-03 | Opcije u dropdownu imaju tamnu pozadinu | Klik na select za otvaranje liste | Opcije s tamnom pozadinom (#1a1a2e), čitljiv tekst | Tamna pozadina ✓ | PROŠAO |
| T11-4-04 | Sport dropdown je vidljiv samo za ne-admin uloge | Odabir ADMIN uloge | Sport field nestaje | Ispravno sakriveno ✓ | PROŠAO |
| T11-4-05 | Dizajn konzistentan s ostatkom stranice | Usporedba s text inputima | Isti border, boja teksta i pozadina kao ostali inputi | Konzistentan ✓ | PROŠAO |

---

## 5. Testovi responzivnosti (US11-5)

### 5a. Kalendar

| ID testa | Opis testa | Rezolucija | Očekivani rezultat | Stvarni rezultat | Status |
|---|---|---|---|---|---|
| T11-5-01 | Kalendar se prikazuje na 768px | DevTools 768px širine | 7-kolonska mreža uredna, ćelije vidljive | Uredan prikaz ✓ | PROŠAO |
| T11-5-02 | Kalendar na 520px | DevTools 520px širine | Ćelije smanjene, dan-broj čitljiv | Kompaktan prikaz ✓ | PROŠAO |
| T11-5-03 | Event chipovi ne prelaze rubove ćelije | Dan s 2 događaja, 520px | Tekst skraćen, ne overflow | Tekst skraćen ✓ | PROŠAO |
| T11-5-04 | Navigacijski gumbi i naslov vidljivi na 520px | Gornja traka kalendara, 520px | Gumbi i naziv mj. u jednom redu | Uredna traka ✓ | PROŠAO |

### 5b. Tabele

| ID testa | Opis testa | Rezolucija | Očekivani rezultat | Stvarni rezultat | Status |
|---|---|---|---|---|---|
| T11-5-05 | Rezervacije tabela horizontalno skroluje | 520px širine | Tabela dostupna horizontalnim scrollom | Scroll radi ✓ | PROŠAO |
| T11-5-06 | Termini tabela horizontalno skroluje | 520px širine | Sve kolone dostupne scrollom | Scroll radi ✓ | PROŠAO |
| T11-5-07 | Korisnici tabela horizontalno skroluje | 520px širine | Sve kolone dostupne scrollom | Scroll radi ✓ | PROŠAO |

### 5c. Liga kartice i filter čipovi

| ID testa | Opis testa | Rezolucija | Očekivani rezultat | Stvarni rezultat | Status |
|---|---|---|---|---|---|
| T11-5-08 | Liga match kartice ne prelaze rubove | 768px širine | Tim nazivi se prelamaju unutar kartice | Uredne kartice ✓ | PROŠAO |
| T11-5-09 | Filter čipovi horizontalno skrolaju | 520px širine | Čipovi u jednom redu, skrolaju desno | Horizontalni scroll ✓ | PROŠAO |

---

## Rezidualni nedostaci

| ID | Opis | Ozbiljnost | Odluka |
|---|---|---|---|
| BUG11-001 | Na ekranima ispod 360px kalendar ćelije su very male | Nizak | Prihvaćen — ekrani ispod 360px su izvan opsega |
| BUG11-002 | Horizontalni scroll filter čipova nema vidljivi indikator skrolanja | Nizak | Prihvaćen — browser-native scroll indicator |

---

## Zaključak

Sve planirane user story stavke testira su uspješno prošle manualne testove. Paginacija funkcioniše ispravno na svim trima stranicama (Rezervacije, Termini, Korisnici). Dizajn select elemenata je konzistentan s ostatkom aplikacije. Responzivni prikaz je unaprijeđen na ključnim stranicama. Sistem je spreman za finalnu demonstraciju.
