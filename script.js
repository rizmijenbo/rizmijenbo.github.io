// ===== Navbar: bayangan saat scroll =====
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('nav-toggle');

function handleScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ===== Menu mobile: tutup otomatis =====
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => { navToggle.checked = false; });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) navToggle.checked = false;
});

// ===== Animasi muncul saat scroll =====
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll(
    '.section-tag, .section h2, .glass, .timeline-item, .gallery-grid figure'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => {
    // jeda kecil antar elemen bersaudara supaya munculnya berurutan
    const index = Array.from(el.parentElement.children).indexOf(el);
    el.style.transitionDelay = Math.min(index, 4) * 80 + 'ms';
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ===== Lightbox untuk galeri & sertifikat =====
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<img alt="">';
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector('img');

function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-grid img, .achieve-card img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img));
});

lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});