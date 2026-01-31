// Część A - Instrukcje warunkowe

// 4. Funkcja sprawdzająca czy liczba jest parzysta/nieparzysta
function czyParzysta(liczba) {
    if (liczba % 2 === 0) {
        return "parzysta";
    } else {
        return "nieparzysta";
    }
}

console.log("4) 7 jest:", czyParzysta(7));
console.log("4) 10 jest:", czyParzysta(10));


// 5. Kalkulator ocen (0-100 punktów -> ocena słowna)
function ocenaSlowna(punkty) {
    if (punkty < 0 || punkty > 100) {
        return "Błędna liczba punktów";
    }

    if (punkty >= 90) return "bardzo dobry";
    if (punkty >= 75) return "dobry";
    if (punkty >= 60) return "dostateczny";
    if (punkty >= 50) return "dopuszczający";
    return "niedostateczny";
}

console.log("5) 95 pkt:", ocenaSlowna(95));
console.log("5) 68 pkt:", ocenaSlowna(68));
console.log("5) 40 pkt:", ocenaSlowna(40));


// 6. Switch: dzień tygodnia na podstawie numeru (1-7)
function dzienTygodnia(numer) {
    switch (numer) {
        case 1: return "Poniedziałek";
        case 2: return "Wtorek";
        case 3: return "Środa";
        case 4: return "Czwartek";
        case 5: return "Piątek";
        case 6: return "Sobota";
        case 7: return "Niedziela";
        default: return "Błędny numer dnia";
    }
}

console.log("6) Dzień 3:", dzienTygodnia(3));
console.log("6) Dzień 9:", dzienTygodnia(9));


// 7. Operator trójargumentowy (ternary) do sprawdzenia pełnoletności
const wiek = 20;
const czyPelnoletni = wiek >= 18 ? "pełnoletni" : "niepełnoletni";
console.log("7) Wiek:", wiek, "-", czyPelnoletni);


// Część B - Pętle

// 8. for: wyświetlenie liczb 1 do 10
console.log("8) for 1..10:");
for (let i = 1; i <= 10; i++) {
    console.log(i);
}


// 9. while: odliczanie od 10 do 0
console.log("9) while 10..0:");
let licznik = 10;
while (licznik >= 0) {
    console.log(licznik);
    licznik--;
}


// 10. for...of: iteracja po tablicy
console.log("10) for...of po tablicy:");
const jezyki = ["JavaScript", "Python", "Java"];
for (const jezyk of jezyki) {
    console.log(jezyk);
}


// 11. for...in: iteracja po właściwościach obiektu
console.log("11) for...in po obiekcie:");
const osoba = { imie: "Jan", wiek: 20, miasto: "Warszawa" };
for (const klucz in osoba) {
    console.log(klucz + ":", osoba[klucz]);
}


// 12. break i continue w przykładowych pętlach
console.log("12) continue i break (1..10):");
for (let i = 1; i <= 10; i++) {
    if (i === 3) {
        continue; // pomijam 3
    }
    if (i === 8) {
        break; // kończę pętlę na 8
    }
    console.log(i);
}


// Część C - Zadanie praktyczne: tabliczka mnożenia 1-10

console.log("C) Tabliczka mnożenia 1-10:");

let naglowek = "    ";
for (let i = 1; i <= 10; i++) {
    naglowek += String(i).padStart(4, " ");
}
console.log(naglowek);

for (let i = 1; i <= 10; i++) {
    let wiersz = String(i).padStart(4, " ");
    for (let j = 1; j <= 10; j++) {
        wiersz += String(i * j).padStart(4, " ");
    }
    console.log(wiersz);
}
