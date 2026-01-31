// Część A: sprawdzenie podłączenia skryptu
console.log("Skrypt zaladowany!");


// Część B: zmienne i typy danych

// String - imię
const imie = "Jan";
console.log("imie:", imie, "typ:", typeof imie);

// Number - wiek
const wiek = 20;
console.log("wiek:", wiek, "typ:", typeof wiek);

// Boolean - czy jesteś studentem
const czyStudent = true;
console.log("czyStudent:", czyStudent, "typ:", typeof czyStudent);

// Array - lista języków programowania
const jezyki = ["JavaScript", "Python", "Java"];
console.log("jezyki:", jezyki, "typ:", typeof jezyki);

// Object - dane osoby
const osoba = {
    imie: "Jan",
    wiek: 20,
    miasto: "Warszawa"
};
console.log("osoba:", osoba, "typ:", typeof osoba);

// null
const brakWartosci = null;
console.log("brakWartosci:", brakWartosci, "typ:", typeof brakWartosci);

// undefined
let nieZdefiniowana;
console.log("nieZdefiniowana:", nieZdefiniowana, "typ:", typeof nieZdefiniowana);


// Część C: operatory

// Operatory arytmetyczne
const a = 10;
const b = 3;

console.log("a + b =", a + b);
console.log("a - b =", a - b);
console.log("a * b =", a * b);
console.log("a / b =", a / b);
console.log("a % b =", a % b);
console.log("a ** b =", a ** b);

// Porównanie == vs ===
console.log("'5' == 5:", '5' == 5);
console.log("'5' === 5:", '5' === 5);

// Operatory logiczne
const x = true;
const y = false;

console.log("x && y:", x && y);
console.log("x || y:", x || y);
console.log("!x:", !x);
