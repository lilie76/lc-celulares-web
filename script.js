// script.js

// Año en el footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú móvil
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => nav.classList.remove("active"));
  });
}

// Galería desplegable
const toggleFotos = document.getElementById("toggleFotos");
const galleryWrap = document.getElementById("galleryWrap");

if (toggleFotos && galleryWrap) {
  toggleFotos.addEventListener("click", () => {
    const isOpen = galleryWrap.classList.toggle("open");
    toggleFotos.textContent = isOpen ? "Ocultar fotos" : "Ver fotos";
    toggleFotos.setAttribute("aria-expanded", String(isOpen));
  });
}

// Carrusel
const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevFoto");
const nextBtn = document.getElementById("nextFoto");
const dots = document.getElementById("carouselDots");

if (track && prevBtn && nextBtn && dots) {
  const slides = Array.from(track.children);
  let index = 0;

  // Crear dots
  dots.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Ir a foto ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dots.appendChild(dot);
  });

  const dotEls = Array.from(dots.children);

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotEls.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  // Teclas ← →
  document.addEventListener("keydown", (e) => {
    if (!galleryWrap.classList.contains("open")) return;
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  });

  render();
}




