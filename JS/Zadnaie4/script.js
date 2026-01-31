// Pobranie głównego kontenera galerii po id
const gallery = document.getElementById('obrazy');

// Pobranie wszystkich obrazów w kartach galerii
const allImages = document.querySelectorAll('.media-card img');

// Pobranie tytułu w nagłówku strony
const mainTitle = document.querySelector('.header-overlay h1');

// Pobranie elementu lightbox (kontener powiększonego obrazu)
const lightbox = document.getElementById('img1');

// Pobranie obrazka wewnątrz lightboxa
const lightboxImg = lightbox.querySelector('img');

// Dynamiczna zmiana tytułu strony
mainTitle.textContent = "Galeria Interaktywna";


// Iteracja po wszystkich obrazach w galerii
allImages.forEach((img, index) => {
    // Dodanie atrybutów data-* z indeksem i opisem
    img.setAttribute('data-index', index);
    img.setAttribute('data-info', img.alt || "Zdjęcie " + index);

    // Efekt hover dodany przez JS
    img.addEventListener('mouseenter', function() {
        this.style.transform = "scale(1.05)";
        this.style.transition = "0.3s";
    });

    // Cofnięcie efektu hover
    img.addEventListener('mouseleave', function() {
        this.style.transform = "scale(1)";
    });
});


// Aktualny indeks wyświetlanego obrazu
let currentIndex = 0;


// Utworzenie podpisu pod obrazem w lightboxie
const caption = document.createElement('p');
caption.id = "lightbox-caption";
caption.style.color = "white";
caption.style.marginTop = "20px";
lightbox.appendChild(caption);


// Utworzenie przycisku „następny”
const nextBtn = document.createElement('button');
nextBtn.innerHTML = "&#10095;";
nextBtn.style.cssText = "position:fixed; right:20px; font-size:40px; color:white; background:none; border:none; cursor:pointer;";
lightbox.appendChild(nextBtn);


// Utworzenie przycisku „poprzedni”
const prevBtn = document.createElement('button');
prevBtn.innerHTML = "&#10094;";
prevBtn.style.cssText = "position:fixed; left:20px; font-size:40px; color:white; background:none; border:none; cursor:pointer;";
lightbox.appendChild(prevBtn);


// Funkcja zmieniająca obraz i podpis w lightboxie
function showImage(index) {
    // Zapętlenie indeksu w zakresie tablicy obrazów
    if (index >= allImages.length) index = 0;
    if (index < 0) index = allImages.length - 1;

    currentIndex = index;
    const src = allImages[currentIndex].src;
    const text = allImages[currentIndex].getAttribute('data-info');

    // Podmiana źródła i podpisu
    lightboxImg.src = src;
    caption.textContent = text;
}


// Event delegation — klik w kartę galerii otwiera lightbox
gallery.addEventListener('click', function(e) {
    const card = e.target.closest('.media-card');
    if (card) {
        const img = card.querySelector('img');
        const index = parseInt(img.getAttribute('data-index'));
        showImage(index);
        lightbox.style.display = "flex";
    }
});


// Zamknięcie lightboxa po kliknięciu tła lub przycisku X
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.style.display = "none";
    }
});


// Przycisk następnego obrazu
nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
});


// Przycisk poprzedniego obrazu
prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showImage(currentIndex - 1);
});


// Sterowanie klawiaturą w lightboxie
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === "flex") {
        if (e.key === "Escape") lightbox.style.display = "none";
        if (e.key === "ArrowRight") showImage(currentIndex + 1);
        if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    }
});

