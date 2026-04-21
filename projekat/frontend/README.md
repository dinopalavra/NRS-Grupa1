# Frontend

## Opis

Frontend dio projekta predstavlja korisnički interfejs sistema za upravljanje sportskim terminima i ligama.

Njegova uloga je da omogući korisnicima:
- prijavu i registraciju
- pregled timova
- pregled termina i rezervacija
- rad sa ligama i utakmicama
- unos i pregled rezultata

## Tehnologije

- React
- Vite
- JavaScript
- CSS

## Organizacija foldera

- `src/main.jsx` — ulazna tačka frontend aplikacije
- `src/App.jsx` — glavna aplikaciona komponenta
- `assets/` — statički resursi
- `components/` — višekratno upotrebljive UI komponente
- `pages/` — glavne stranice sistema
- `services/` — komunikacija sa backend API-jem
- `routes/` — definisanje ruta
- `context/` — globalno stanje aplikacije
- `utils/` — pomoćne funkcije
- `modules/` — modularna organizacija po poslovnim cjelinama

## Glavni moduli

- `users/`
- `teams/`
- `reservations/`
- `leagues/`
- `results/`

## Pokretanje

Za pokretanje frontend dijela potrebno je:
1. imati instaliran Node.js
2. instalirati зависности komandom `npm install`
3. pokrenuti razvojni server komandom `npm run dev`

## Napomena

Frontend trenutno predstavlja početni skeleton aplikacije sa osnovnom organizacijom foldera i mjesta za dalji razvoj stranica, komponenti i API integracije.