// Część A — Deklaracje funkcji

// Function Declaration
function dodajFD(a, b) {
  return a + b;
}
console.log("FD:", dodajFD(2, 3));

// Function Expression
const dodajFE = function(a, b) {
  return a + b;
};
console.log("FE:", dodajFE(2, 3));

// Arrow Function
const dodajAF = (a, b) => a + b;
console.log("AF:", dodajAF(2, 3));

// IIFE
(function(a, b) {
  console.log("IIFE:", a + b);
})(2, 3);



// Część B — Parametry i zwracanie wartości

// Parametry domyślne
function powitanie(imie = "Gość") {
  return "Witaj " + imie;
}
console.log(powitanie());
console.log(powitanie("Jan"));

// Rest (...args)
function sumaWszystkich(...liczby) {
  let suma = 0;
  for (const n of liczby) suma += n;
  return suma;
}
console.log("Rest:", sumaWszystkich(1,2,3,4));

// Zwracanie obiektu
function daneOsoby(imie, wiek) {
  return { imie, wiek };
}
console.log(daneOsoby("Jan", 20));

// Callback
function policz(a, b, operacja) {
  return operacja(a, b);
}
console.log("Callback:", policz(3, 4, dodajAF));

// Higher-order function
function mnoznik(x) {
  return function(y) {
    return x * y;
  };
}
const razy2 = mnoznik(2);
console.log("HOF:", razy2(5));



// Część C — Zakres i domknięcia

// var vs let w pętli
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 0);
}

// Zasięg blokowy
{
  let x = 10;
  const y = 20;
  console.log("blok:", x, y);
}

// Closure — licznik z zapamiętanym stanem
function licznik() {
  let stan = 0;
  return function() {
    stan++;
    return stan;
  };
}

const licz = licznik();
console.log("closure:", licz());
console.log("closure:", licz());
