// ====================================
// CONFIGURACIÓN DE LA INVITACIÓN
// ====================================

// Fecha: 9 de enero de 2027, 4 PM
// Zona horaria: Chicago, Illinois

const eventDate = new Date("2027-01-09T16:00:00-06:00");

// AGREGA AQUÍ LA DIRECCIÓN

const eventAddress = "Dirección próximamente";

// AGREGA AQUÍ EL LINK DE AMAZON

const amazonLink = "";

// AGREGA AQUÍ TU NÚMERO DE WHATSAPP
// Ejemplo: 16301234567

const whatsappNumber = "";


// ====================================
// ABRIR INVITACIÓN
// ====================================

const openButton = document.getElementById("openInvitation");

const welcomeScreen = document.getElementById("welcomeScreen");

const invitation = document.getElementById("invitation");

openButton.addEventListener("click", () => {

    welcomeScreen.style.transition = "opacity 1s ease";

    welcomeScreen.style.opacity = "0";

    setTimeout(() => {

        welcomeScreen.style.display = "none";

        invitation.classList.remove("hidden");

        window.scrollTo(0, 0);

        observeSections();

    }, 1000);

});


// ====================================
// CUENTA REGRESIVA
// ====================================

function updateCountdown() {

    const now = new Date().getTime();

    const distance = eventDate.getTime() - now;

    if (distance <= 0) {

        document.querySelector(".countdown").innerHTML =
            "<h3>¡Llegó el gran día! 🧸💕</h3>";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


// ====================================
// ANIMACIONES AL DESLIZAR
// ====================================

function observeSections() {

    const sections = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.1
    });

    sections.forEach((section) => {

        observer.observe(section);

    });

}


// ====================================
// BOTÓN DE UBICACIÓN
// ====================================

document.getElementById("eventAddress").textContent =
    eventAddress;

document.getElementById("locationButton").addEventListener(
    "click",
    () => {

        if (eventAddress === "Dirección próximamente") {

            alert("Próximamente compartiremos la ubicación 💕");

            return;
        }

        const mapsURL =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(eventAddress);

        window.open(mapsURL, "_blank", "noopener,noreferrer");

    }
);


// ====================================
// BOTÓN DE AMAZON
// ====================================

document.getElementById("amazonButton").addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        if (!amazonLink) {

            alert("Próximamente estará disponible la lista de regalos 🎁");

            return;
        }

        window.open(amazonLink, "_blank", "noopener,noreferrer");

    }
);


// ====================================
// CONFIRMAR POR WHATSAPP
// ====================================

document.getElementById("confirmButton").addEventListener(
    "click",
    () => {

        const guestName =
            document.getElementById("guestName").value.trim();

        const guestCount =
            document.getElementById("guestCount").value;

        if (guestName === "") {

            alert("Por favor escribe tu nombre 💕");

            return;
        }

        if (!whatsappNumber) {

            alert("El número de confirmación estará disponible pronto.");

            return;
        }

        const message =
            `Hola 💕🧸\n\n` +
            `Quiero confirmar mi asistencia al Baby Shower de Lía Isabel.\n\n` +
            `Nombre: ${guestName}\n` +
            `Número de personas: ${guestCount}\n\n` +
            `¡Muchas gracias por la invitación! 🌸`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

    }
);