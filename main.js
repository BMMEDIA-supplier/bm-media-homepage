// =====================
// LANGUAGE TOGGLE
// =====================
let currentLang = 'en';

const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });
  document.documentElement.lang = lang === 'en' ? 'en' : 'ko';

  // active 표시 업데이트
  langMenu.querySelectorAll('li').forEach(li => {
    li.classList.toggle('active', li.dataset.lang === lang);
  });
}

langToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  langMenu.classList.toggle('open');
});

langMenu.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    setLanguage(li.dataset.lang);
    langMenu.classList.remove('open');
  });
});

// 외부 클릭 시 닫기
document.addEventListener('click', () => {
  langMenu.classList.remove('open');
});

// =====================
// HERO SLIDER
// =====================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let autoSlide;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAuto() {
  autoSlide = setInterval(() => goTo(current + 1), 5000);
}

function resetAuto() {
  clearInterval(autoSlide);
  startAuto();
}

document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); resetAuto(); });

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { goTo(i); resetAuto(); });
});

startAuto();

// =====================
// HEADER SCROLL
// =====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// =====================
// MOBILE MENU
// =====================
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close menu on nav link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// =====================
// SMOOTH SCROLL OFFSET (fixed header)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 116;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// =====================
// SCROLL FADE-IN
// =====================
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => fadeObserver.observe(el));

// =====================
// NUMBER COUNTER
// =====================
const statNums = document.querySelectorAll('.stat-num[data-target]');
let counted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      statNums.forEach(el => {
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = Math.ceil(duration / target);
        let current = 0;
        const timer = setInterval(() => {
          current += Math.ceil(target / (duration / 16));
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 16);
      });
    }
  });
}, { threshold: 0.4 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) counterObserver.observe(statsEl);

// =====================
// CONTACT FORM
// =====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = '...';
    setTimeout(() => {
      contactForm.reset();
      btn.disabled = false;
      btn.textContent = currentLang === 'ko' ? '메시지 보내기' : 'Send Message';
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 4000);
    }, 800);
  });
}
