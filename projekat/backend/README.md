# Backend

## Opis

Backend dio projekta predstavlja serverski sloj sistema za upravljanje sportskim terminima i ligama.

Njegova glavna uloga je da implementira:
- poslovnu logiku sistema
- validaciju zahtjeva
- kontrolu prava pristupa
- komunikaciju sa bazom podataka
- REST API za frontend aplikaciju

## Tehnologije

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- PostgreSQL
- Maven
- JWT

## Organizacija foldera

- `src/main/java/ba/sportsmanager/` — glavni Java kod aplikacije
- `config/` — konfiguracione klase
- `controller/` — REST kontroleri
- `service/` — poslovna logika
- `repository/` — pristup podacima
- `model/` — entiteti i domenski modeli
- `dto/` — objekti za razmjenu podataka
- `security/` — autentifikacija i autorizacija
- `exception/` — rukovanje greškama
- `modules/` — modularna organizacija po poslovnim cjelinama
- `resources/` — konfiguracioni i pomoćni fajlovi

## Glavni moduli

- `users/` — korisnici i autentifikacija
- `teams/` — timovi i članstvo
- `reservations/` — termini i rezervacije
- `leagues/` — lige i utakmice
- `results/` — rezultati i tabela

## Pokretanje

Za pokretanje backend dijela potrebno je:
1. imati instaliran JDK
2. imati instaliran Maven
3. podesiti konekciju na PostgreSQL bazu u `application.properties`
4. pokrenuti Spring Boot aplikaciju

## Napomena

U trenutnoj fazi backend predstavlja skeleton spreman za dalje proširenje i implementaciju poslovnih pravila sistema.