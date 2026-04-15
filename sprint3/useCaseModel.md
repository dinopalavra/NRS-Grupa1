# Use Case Model

## Uvod

Use case model opisuje ključne interakcije korisnika sa sistemom za upravljanje sportskim terminima i ligama.  
Fokus je na osnovnim procesima koji direktno proizlaze iz planiranog MVP opsega i backlog stavki.

---

## Use Case 1

**Akter:** Korisnik  
**Naziv use casea:** Registracija korisnika  
**Kratak opis:** Korisnik kreira novi nalog u sistemu kako bi mogao pristupiti funkcionalnostima sistema.  
**Preduslovi:** Korisnik nije već registrovan sa istim emailom ili korisničkim imenom.  

**Glavni tok:**  
1. Korisnik otvara formu za registraciju.  
2. Korisnik unosi tražene podatke.  
3. Sistem provjerava ispravnost i jedinstvenost podataka.  
4. Sistem kreira korisnički nalog.  
5. Korisnik dobija potvrdu o uspješnoj registraciji.  

**Alternativni tokovi:**  
- Ako korisničko ime već postoji, sistem odbija registraciju i prikazuje poruku.  
- Ako obavezni podaci nisu uneseni ili nisu validni, sistem traži ispravku unosa.  

**Ishod:** Novi korisnik je evidentiran u sistemu i može pristupiti prijavi.

---

## Use Case 2

**Akter:** Registrovani korisnik  
**Naziv use casea:** Prijava korisnika  
**Kratak opis:** Korisnik se prijavljuje u sistem pomoću svojih kredencijala.  
**Preduslovi:** Korisnik ima prethodno kreiran nalog.  

**Glavni tok:**  
1. Korisnik otvara formu za prijavu.  
2. Unosi korisničko ime ili email i lozinku.  
3. Sistem provjerava kredencijale.  
4. Sistem prijavljuje korisnika i dodjeljuje mu pristup u skladu sa ulogom.  

**Alternativni tokovi:**  
- Ako su kredencijali netačni, sistem odbija prijavu.  
- Ako je nalog deaktiviran, sistem ne dozvoljava pristup.  

**Ishod:** Korisnik uspješno pristupa sistemu.

---

## Use Case 3

**Akter:** Kapiten tima / administrator  
**Naziv use casea:** Kreiranje tima  
**Kratak opis:** Ovlašteni korisnik kreira novi tim u sistemu.  
**Preduslovi:** Korisnik je prijavljen i ima ovlaštenje za kreiranje tima.  

**Glavni tok:**  
1. Korisnik bira opciju za kreiranje tima.  
2. Unosi naziv tima i osnovne informacije.  
3. Sistem provjerava da li tim sa istim nazivom već postoji.  
4. Sistem kreira tim i povezuje ga sa korisnikom koji ga je kreirao.  

**Alternativni tokovi:**  
- Ako naziv tima već postoji, sistem traži unos drugog naziva.  
- Ako korisnik nema potrebna prava, sistem odbija akciju.  

**Ishod:** Novi tim je kreiran i spreman za dodavanje članova.

---
