// Menú hamburguesa
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

// Año automático
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Fotos desplegables
const toggleFotos = document.getElementById("toggleFotos");
const galleryWrap = document.getElementById("galleryWrap");

// Carrusel
const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevFoto");
const nextBtn = document.getElementById("nextFoto");
const dotsWrap = document.getElementById("carouselDots");

let indexFoto = 0;

function getSlides() {
  return track ? Array.from(track.children) : [];
}

function renderDots() {
  if (!dotsWrap) return;
  const slides = getSlides();
  dotsWrap.innerHTML = "";

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel__dot" + (i === indexFoto ? " active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir a foto ${i + 1}`);
    dot.addEventListener("click", () => {
      indexFoto = i;
      updateCarousel();
    });
    dotsWrap.appendChild(dot);
  });
}

function updateCarousel() {
  const slides = getSlides();
  if (!track || slides.length === 0) return;

  if (indexFoto < 0) indexFoto = slides.length - 1;
  if (indexFoto >= slides.length) indexFoto = 0;

  track.style.transform = `translateX(-${indexFoto * 100}%)`;

  if (dotsWrap) {
    Array.from(dotsWrap.children).forEach((d, i) => {
      d.classList.toggle("active", i === indexFoto);
    });
  }
}

// Flechas
if (prevBtn) prevBtn.addEventListener("click", () => { indexFoto--; updateCarousel(); });
if (nextBtn) nextBtn.addEventListener("click", () => { indexFoto++; updateCarousel(); });

// Teclado (solo cuando está abierto)
document.addEventListener("keydown", (e) => {
  if (!galleryWrap || !galleryWrap.classList.contains("open")) return;
  if (e.key === "ArrowLeft") { indexFoto--; updateCarousel(); }
  if (e.key === "ArrowRight") { indexFoto++; updateCarousel(); }
});

// Si una imagen falla, se elimina el slide (para que no rompa)
if (track) {
  getSlides().forEach((slide) => {
    const img = slide.querySelector("img");
    if (!img) return;
    img.onerror = () => {
      slide.remove();
      indexFoto = 0;
      renderDots();
      updateCarousel();
    };
  });

  renderDots();
  updateCarousel();
}

// Botón Ver fotos / Ocultar fotos
if (toggleFotos && galleryWrap) {
  toggleFotos.addEventListener("click", () => {
    const isOpen = galleryWrap.classList.toggle("open");
    toggleFotos.setAttribute("aria-expanded", String(isOpen));
    toggleFotos.textContent = isOpen ? "Ocultar fotos" : "Ver fotos";

    if (isOpen) {
      setTimeout(() => {
        renderDots();
        updateCarousel();
      }, 50);
    }
  });
}



