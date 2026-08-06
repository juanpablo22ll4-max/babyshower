const whatsappNumber = "16308194415";

const coverScreen = document.querySelector("#cover-screen");
const detailsScreen = document.querySelector("#details-screen");

document.querySelector("#open-details").addEventListener("click", () => {
  coverScreen.classList.remove("is-active");
  detailsScreen.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#back-cover").addEventListener("click", () => {
  detailsScreen.classList.remove("is-active");
  coverScreen.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function sendWhatsApp(message) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

document.querySelector("#confirm-button").addEventListener("click", () => {
  sendWhatsApp("¡Hola! Sí, con mucho gusto asistiré al Baby Shower de Sebastián. 💙");
});

document.querySelector("#decline-button").addEventListener("click", () => {
  sendWhatsApp("Hola, muchas gracias por la invitación al Baby Shower de Sebastián. Esta vez no podré asistir.");
});

/* Música instrumental original */
let audioContext;
let playing = false;

const melody = [
  [523.25, 0.42], [659.25, 0.42], [783.99, 0.62], [659.25, 0.42],
  [587.33, 0.42], [698.46, 0.42], [783.99, 0.70], [0, 0.30],
  [523.25, 0.42], [659.25, 0.42], [880.00, 0.62], [783.99, 0.42],
  [698.46, 0.42], [659.25, 0.42], [523.25, 0.82], [0, 0.50]
];

function playNote(frequency, start, duration) {
  if (!frequency) return;

  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  volume.gain.setValueAtTime(0, start);
  volume.gain.linearRampToValueAtTime(0.09, start + 0.04);
  volume.gain.exponentialRampToValueAtTime(0.001, start + duration);

  oscillator.connect(volume).connect(audioContext.destination);

  oscillator.start(start);
  oscillator.stop(start + duration + 0.03);
}

function playLoop() {
  if (!playing) return;

  let beat = audioContext.currentTime + 0.05;

  melody.forEach(([note, duration]) => {
    playNote(note, beat, duration * 0.9);
    beat += duration;
  });

  window.setTimeout(playLoop, (beat - audioContext.currentTime) * 1000 - 40);
}

function startMusic() {
  if (playing) return;

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  playing = true;
  playLoop();
}

/* La música comienza con el primer toque o clic. */
document.addEventListener("pointerdown", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });