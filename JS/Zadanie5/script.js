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

// ===== Zadanie: async / promises / fetch (doklejone do Zadania 4) =====

function fakeLoad(ms, fail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail) reject("Blad symulacji");
            else resolve("OK po " + ms + "ms");
        }, ms);
    });
}

// then / catch / finally
fakeLoad(300)
.then(msg => console.log("then:", msg))
.catch(err => console.log("catch:", err))
.finally(() => console.log("finally: koniec"));

// Promise.all
Promise.all([fakeLoad(200), fakeLoad(400)])
.then(() => console.log("Promise.all: OK"))
.catch(e => console.log("Promise.all: blad", e));

// Promise.race jako timeout
Promise.race([
    fakeLoad(500),
             new Promise((_, reject) => setTimeout(() => reject("timeout"), 300))
]).catch(err => console.log("Promise.race:", err));


// async/await + try/catch (przepisanie stylu na await)
async function demoAsyncAwait() {
    try {
        const msg = await fakeLoad(200);
        console.log("await:", msg);
    } catch (e) {
        console.log("try/catch:", e);
    }
}
demoAsyncAwait();

// sekwencyjnie
async function demoSequential() {
    const a = await fakeLoad(200);
    const b = await fakeLoad(300);
    console.log("seq:", a, b);
}
demoSequential();

// równolegle
async function demoParallel() {
    const [a, b] = await Promise.all([fakeLoad(200), fakeLoad(300)]);
    console.log("par:", a, b);
}
demoParallel();


// ===== Fetch API: users + tabela + loader + błędy + refresh + posts =====

const btnLoad = document.getElementById("loadUsers");
const btnRefresh = document.getElementById("refreshUsers");
const usersBody = document.getElementById("usersBody");
const loader = document.getElementById("loader");
const apiError = document.getElementById("apiError");
const postsBox = document.getElementById("postsBox");

function showLoader(flag) {
    if (!loader) return;
    loader.style.display = flag ? "block" : "none";
}

function showError(msg) {
    if (!apiError) return;
    apiError.style.display = "block";
    apiError.textContent = msg;
}

function clearError() {
    if (!apiError) return;
    apiError.style.display = "none";
    apiError.textContent = "";
}

function clearPosts() {
    if (!postsBox) return;
    postsBox.innerHTML = "";
}

async function loadUsers() {
    if (!usersBody) return;

    showLoader(true);
    clearError();
    clearPosts();
    usersBody.innerHTML = "";

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Błąd serwera: " + res.status);

        const users = await res.json();

        users.forEach(u => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${u.id}</td><td>${u.name}</td><td>${u.email}</td>`;
            tr.style.cursor = "pointer";
            tr.addEventListener("click", () => loadPosts(u.id, u.name));
            usersBody.appendChild(tr);
        });
    } catch (e) {
        showError("Błąd pobierania użytkowników: " + e.message);
        usersBody.innerHTML = `<tr><td colspan="3">Nie udało się pobrać danych</td></tr>`;
    } finally {
        showLoader(false);
    }
}

async function loadPosts(userId, userName) {
    showLoader(true);
    clearError();

    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        if (!res.ok) throw new Error("Błąd serwera: " + res.status);

        const posts = await res.json();

        if (postsBox) {
            postsBox.innerHTML = `<h3>Posty: ${userName} (id: ${userId})</h3>`;
            const ul = document.createElement("ul");
            posts.slice(0, 5).forEach(p => {
                const li = document.createElement("li");
                li.textContent = p.title;
                ul.appendChild(li);
            });
            postsBox.appendChild(ul);
            const info = document.createElement("div");
            info.textContent = "Pokazano 5 pierwszych postów (łącznie: " + posts.length + ").";
            postsBox.appendChild(info);
        }
    } catch (e) {
        showError("Błąd pobierania postów: " + e.message);
    } finally {
        showLoader(false);
    }
}

if (btnLoad) btnLoad.addEventListener("click", loadUsers);
if (btnRefresh) btnRefresh.addEventListener("click", loadUsers);
