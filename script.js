
// =====================================================
// G1 TRANSPORTES — script.js
// =====================================================

// ---------- ANO ATUAL ----------
document.getElementById('ano').textContent = new Date().getFullYear();

// ---------- HEADER SCROLL ----------
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}, { passive: true });

// ---------- MENU HAMBURGER ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Fechar ao clicar num link
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ---------- ACTIVE NAV LINK por SCROLL ----------
const sections = document.querySelectorAll('section[id], header[id]');
const navItems  = document.querySelectorAll('.nav-link');

const updateActiveNav = () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 90) current = sec.id;
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
};
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ---------- FADE-IN OBSERVER ----------
const fadeEls = document.querySelectorAll(
  '.mvv-card, .depoimento-card, .contato-channel, .ct-photo-placeholder, .section-header'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Aplicar stagger delay
fadeEls.forEach((el, i) => {
  el.dataset.delay = (i % 6) * 90;
  observer.observe(el);
});

// ---------- FORMULÁRIO ----------
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simula envio (conecte ao backend real aqui)
  setTimeout(() => {
    const success = document.getElementById('form-success');
    success.classList.add('visible');
    e.target.reset();
    btn.textContent = 'Enviar Mensagem';
    btn.disabled = false;
    setTimeout(() => success.classList.remove('visible'), 5000);
  }, 1500);
}

// ---------- FAB SCROLL SHOW ----------
const fab = document.getElementById('whatsapp-fab');
const toggleFab = () => {
  if (window.scrollY > 400) {
    fab.style.opacity = '1';
    fab.style.transform = 'scale(1)';
  } else {
    fab.style.opacity = '0';
    fab.style.transform = 'scale(0.8)';
  }
};
fab.style.opacity = '0';
fab.style.transition = 'opacity .3s ease, transform .3s ease';
fab.style.transform = 'scale(0.8)';
window.addEventListener('scroll', toggleFab, { passive: true });
