# Architecture Overview

## Uvod

Sistem za upravljanje sportskim terminima i ligama planiran je kao informacioni sistem koji podržava upravljanje korisnicima, timovima, terminima, rezervacijama, ligama, utakmicama i rezultatima.  
Arhitektonski pristup treba biti dovoljno jednostavan za MVP, ali i dovoljno pregledan da omogući kasnije proširenje sistema.

## Kratak opis arhitektonskog pristupa

Predlaže se slojevita arhitektura sa jasnim odvajanjem korisničkog interfejsa, poslovne logike i sloja za pristup podacima.  
Ovakav pristup olakšava razumijevanje sistema, testiranje i kasnije održavanje.

## Glavne komponente sistema

1. Modul za korisnike i autentifikaciju  
2. Modul za timove  
3. Modul za termine i rezervacije  
4. Modul za lige i utakmice  
5. Modul za rezultate i tabelu  
6. Baza podataka  
7. Korisnički interfejs
