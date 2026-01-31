const form = document.getElementById("kontakt-form");

// regex
const nameRe = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]{2,}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\d{9}$/;

// helper — komunikat pod polem
function setError(input, msg) {
    clearError(input);
    const div = document.createElement("div");
    div.className = "error-msg";
    div.textContent = msg;
    input.closest("p").appendChild(div);
    input.classList.add("input-error");
}

function clearError(input) {
    const old = input.closest("p").querySelector(".error-msg");
    if (old) old.remove();
    input.classList.remove("input-error");
    input.classList.add("input-ok");
}


// ---- walidacje pojedynczych pól ----

function validateName() {
    const el = form.imienazwisko;
    if (!nameRe.test(el.value.trim())) {
        setError(el, "Min 2 znaki, tylko litery");
        return false;
    }
    clearError(el);
    return true;
}

function validateEmail() {
    const el = form.email;
    if (!emailRe.test(el.value)) {
        setError(el, "Niepoprawny email");
        return false;
    }
    clearError(el);
    return true;
}

function validatePhone() {
    const el = form.telefon;
    if (!el.value) return true;
    if (!phoneRe.test(el.value.replace(/\D/g,""))) {
        setError(el, "Telefon = 9 cyfr");
        return false;
    }
    clearError(el);
    return true;
}

function validateMsg() {
    const el = form.wiadomosc;
    if (el.value.trim().length < 10) {
        setError(el, "Min 10 znaków");
        return false;
    }
    clearError(el);
    return true;
}

function validatePasswords() {
    const a = form.haslo;
    const b = form.haslo2;
    if (a.value !== b.value) {
        setError(b, "Hasła różne");
        return false;
    }
    clearError(b);
    return true;
}

function validateConsent() {
    const el = form.zgoda;
    if (!el.checked) {
        setError(el, "Wymagana zgoda");
        return false;
    }
    clearError(el);
    return true;
}


// ---- realtime ----

form.imienazwisko.addEventListener("blur", validateName);
form.email.addEventListener("blur", validateEmail);
form.telefon.addEventListener("blur", validatePhone);
form.wiadomosc.addEventListener("blur", validateMsg);
form.haslo2.addEventListener("input", validatePasswords);


// ---- submit ----

form.addEventListener("submit", e => {
    e.preventDefault();

    const ok =
    validateName() &
    validateEmail() &
    validatePhone() &
    validateMsg() &
    validatePasswords() &
    validateConsent();

    if (!ok) return;

                      const btn = form.querySelector('[data-action="submit"]');
    btn.disabled = true;
    btn.textContent = "Wysyłanie...";

    // FormData API
    const data = Object.fromEntries(new FormData(form));
    console.log("FORM DATA:", data);

    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "Wyślij";
        form.reset();

        const msg = document.createElement("div");
        msg.className = "success-msg";
        msg.textContent = "Formularz wysłany poprawnie";
        form.appendChild(msg);

        setTimeout(()=>msg.remove(), 3000);
    }, 1500);
});
