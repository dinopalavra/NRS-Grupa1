# Sistem za upravljanje sportskim terminima i ligama

## Opis projekta

Ovaj projekat predstavlja početni skeleton full-stack web aplikacije za upravljanje sportskim terminima i ligama.

Sistem je namijenjen podršci za:
- registraciju i prijavu korisnika
- upravljanje korisničkim ulogama i pravima pristupa
- kreiranje i upravljanje timovima
- pregled termina i rezervaciju sportskih resursa
- organizaciju liga i utakmica
- unos rezultata i ažuriranje tabele lige

## Osnovna arhitektura

Projekat je organizovan kao slojevita i modularna web aplikacija sa sljedećim glavnim dijelovima:
- `backend/` — serverski dio sistema i poslovna logika
- `frontend/` — korisnički interfejs aplikacije
- `database/` — SQL skripte za bazu podataka
- `docs/` — pomoćna tehnička dokumentacija

## Tehnologije

- Backend: Java + Spring Boot
- Frontend: React + Vite
- Baza podataka: PostgreSQL
- Build alat za backend: Maven
- Autentifikacija: Spring Security + JWT

## Trenutni status

Ova verzija projekta predstavlja početni tehnički skeleton sistema.

U ovoj fazi nisu implementirane sve funkcionalnosti, nego su postavljeni osnovni folderi, početne ulazne tačke, konfiguracioni fajlovi i mjesta na kojima će se dalje razvijati logika sistema.

## Struktura projekta

```text
Projekat/
├── README.md
├── .gitignore
├── backend/
├── frontend/
├── database/
└── docs/
```

## Pokretanje projekta

Detaljna uputstva za pokretanje backend, frontend i database dijela nalaze se u odgovarajućim README fajlovima unutar tih foldera.

## Napomena

Ovaj skeleton je pripremljen kao početna osnova za dalji razvoj MVP verzije sistema kroz naredne sprintove.