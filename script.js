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
let lastFocusedElement = null;

function openModal() {
  const overlay = document.getElementById('modal-confirmation');
  const mainContent = document.querySelector('main');
  if (!overlay) return;

  lastFocusedElement = document.activeElement;
  overlay.classList.add('open');
  overlay.removeAttribute('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  if (mainContent) mainContent.setAttribute('aria-hidden', 'true');

  const focusable = overlay.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) focusable.focus();
  document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
  const overlay = document.getElementById('modal-confirmation');
  const mainContent = document.querySelector('main');
  if (!overlay) return;

  overlay.classList.remove('open');
  overlay.setAttribute('hidden', '');
  overlay.setAttribute('aria-hidden', 'true');
  if (mainContent) mainContent.removeAttribute('aria-hidden');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
  document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(event) {
  const overlay = document.getElementById('modal-confirmation');
  if (!overlay || overlay.hasAttribute('hidden')) return;

  if (event.key === 'Escape') {
    closeModal();
  }

  if (event.key === 'Tab') {
    const focusableEls = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusableEls.length) return;

    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusableEl) {
      event.preventDefault();
      lastFocusableEl.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusableEl) {
      event.preventDefault();
      firstFocusableEl.focus();
    }
  }
}

function initModal() {
  const openBtn = document.querySelector('.open-modal');
  const closeBtns = document.querySelectorAll('.close-modal');
  const form = document.getElementById('form-billetterie');
  if (!openBtn || !form) return;

  openBtn.addEventListener('click', function (event) {
    event.preventDefault();
    openModal();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    openModal();
  });

  closeBtns.forEach(function (button) {
    button.addEventListener('click', closeModal);
  });
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
