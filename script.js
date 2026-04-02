// script.js — L'Atelier des Arts
// ERREURS INTENTIONNELLES : gestion du focus absente, ARIA non mis à jour

// === CARROUSEL ===
let currentSlide = 0;

function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = track.querySelectorAll('.carousel-slide');

  document.querySelector('.carousel-prev').addEventListener('click', function () {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    // ERREUR : aria-live absent, pas d'annonce aux AT
  });

  document.querySelector('.carousel-next').addEventListener('click', function () {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    // ERREUR : aria-live absent, pas d'annonce aux AT
  });
}

// === TABS ===
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panelId = tab.getAttribute('data-target');
      document.getElementById(panelId).classList.add('active');
      // ERREUR : aria-selected non mis à jour
      // ERREUR : focus non déplacé vers le panneau
    });
  });
  // ERREUR : navigation clavier ←→ absente
}

// === MODALE ===
function openModal() {
  document.querySelector('.modal-overlay').classList.add('open');
  // ERREUR : focus non déplacé vers la modale
  // ERREUR : fond non masqué aux AT (aria-hidden absent)
}

function closeModal() {
  document.querySelector('.modal-overlay').classList.remove('open');
  // ERREUR : focus non retourné à l'élément déclencheur
}

function initModal() {
  const openBtn = document.querySelector('.open-modal');
  const closeBtn = document.querySelector('.close-modal');
  if (!openBtn) return;

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  // ERREUR : fermeture par Escape absente
}

// === ACCORDÉON ===
function initAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  if (!triggers.length) return;

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const content = trigger.nextElementSibling;
      content.classList.toggle('open');
      // ERREUR : aria-expanded non mis à jour
    });
  });
}

// === INIT ===
document.addEventListener('DOMContentLoaded', function () {
  initCarousel();
  initTabs();
  initModal();
  initAccordion();
});
