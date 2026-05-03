/* ========================================
   GUIDE ENGLISH BOARDING SCHOOL - SCRIPTS
   ======================================== */

'use strict';

// ============================
// LOADER
// ============================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

// ============================
// CUSTOM CURSOR
// ============================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

const hoverables = document.querySelectorAll('a, button, .gallery-item, .feature-card, .filter-btn');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    follower.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    follower.classList.remove('hovered');
  });
});

// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  toggleBackTop();
});

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ============================
// ACTIVE NAV LINK ON SCROLL
// ============================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ============================
// SCROLL REVEAL ANIMATION
// ============================
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============================
// NUMBER COUNTER ANIMATION
// ============================
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll('.stat strong');
      const values = [500, 30, 15];
      stats.forEach((el, i) => {
        setTimeout(() => animateCounter(el, values[i]), i * 200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ============================
// GALLERY FILTER
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galleryItems.forEach((item, index) => {
      const cat = item.dataset.cat;
      const show = filter === 'all' || cat === filter;

      if (show) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.85)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, index * 60);
      } else {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.85)';
        setTimeout(() => { item.style.display = 'none'; }, 300);
      }
    });
  });
});

// ============================
// LIGHTBOX
// ============================
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================
// TESTIMONIALS SLIDER
// ============================
const testiTrack = document.getElementById('testiTrack');
const testiDotsContainer = document.getElementById('testiDots');
const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');
const cards = testiTrack ? testiTrack.querySelectorAll('.testi-card') : [];

let currentSlide = 0;
let cardsPerView = getCardsPerView();
let totalSlides = Math.ceil(cards.length / cardsPerView);

function getCardsPerView() {
  if (window.innerWidth <= 700) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function buildDots() {
  if (!testiDotsContainer) return;
  testiDotsContainer.innerHTML = '';
  totalSlides = Math.ceil(cards.length / cardsPerView);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('testi-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    testiDotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
  const cardWidth = cards[0] ? cards[0].offsetWidth + 32 : 0; // 32 = gap
  testiTrack.style.transform = `translateX(-${currentSlide * cardsPerView * cardWidth}px)`;
  document.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

if (testiPrev) testiPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
if (testiNext) testiNext.addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  else goToSlide(0);
});

buildDots();

// Auto-advance
let autoSlide = setInterval(() => {
  if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  else goToSlide(0);
}, 5000);

testiTrack && testiTrack.addEventListener('mouseenter', () => clearInterval(autoSlide));
testiTrack && testiTrack.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    else goToSlide(0);
  }, 5000);
});

window.addEventListener('resize', () => {
  cardsPerView = getCardsPerView();
  currentSlide = 0;
  buildDots();
  goToSlide(0);
});

// ============================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================
// FORM SUBMISSION
// ============================
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.form-input');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = '#e74c3c';
        input.style.background = '#fff5f5';
        setTimeout(() => {
          input.style.borderColor = '';
          input.style.background = '';
        }, 2000);
      }
    });

    if (!allFilled) return;

    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.style.display = 'none';
      formSuccess.style.display = 'flex';
      inputs.forEach(input => { input.value = ''; });

      setTimeout(() => {
        submitBtn.style.display = '';
        submitBtn.textContent = 'Submit Application';
        submitBtn.disabled = false;
        formSuccess.style.display = 'none';
      }, 4000);
    }, 1200);
  });
}

// ============================
// BACK TO TOP BUTTON
// ============================
const backTop = document.getElementById('backTop');

function toggleBackTop() {
  if (window.scrollY > 400) {
    backTop && backTop.classList.add('show');
  } else {
    backTop && backTop.classList.remove('show');
  }
}

if (backTop) {
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================
// PARALLAX EFFECT ON HERO
// ============================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero && window.scrollY < window.innerHeight) {
    const shapes = hero.querySelectorAll('.shape');
    shapes.forEach((shape, i) => {
      const speed = 0.08 + i * 0.04;
      shape.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
  }
});

// ============================
// NAVBAR LINK HOVER RIPPLE
// ============================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    this.style.transition = 'none';
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transition = '';
      this.style.transform = '';
    }, 150);
  });
});

// ============================
// FEATURE CARDS TILT EFFECT
// ============================
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    this.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.transition = 'transform 0.5s ease';
  });
});

// ================================
// TYPED TEXT EFFECT ON HERO
// ============================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const texts = ['Brilliant', 'Curious', 'Confident', 'Creative'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const highlight = heroTitle.querySelector('.highlight');

  function typeEffect() {
    if (!highlight) return;
    const current = texts[textIndex];
    if (isDeleting) {
      highlight.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 400);
        return;
      }
    } else {
      highlight.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2500);
        return;
      }
    }
    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }

  setTimeout(typeEffect, 2200);
}

// ============================
// SCROLL PROGRESS INDICATOR
// ============================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px;
  background: linear-gradient(90deg, #1a3a6b, #e8a020);
  z-index: 9999; width: 0%;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px rgba(232,160,32,0.5);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  toggleBackTop();
});

console.log('%c Guide English Boarding School 🎓', 'color: #1a3a6b; font-size: 18px; font-weight: bold;');
console.log('%c Shaping Brilliant Minds for Tomorrow', 'color: #e8a020; font-size: 14px;');
