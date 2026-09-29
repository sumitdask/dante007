// ==========================================
// Sumit Kumar Das - Portfolio Vanilla Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    // Close mobile menu when clicking any nav link inside it
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // 3. Active Nav State on Scroll (Scroll Spy)
  const sections = ['home', 'about', 'skills', 'industries', 'work', 'experience', 'contact'];
  const desktopLinks = document.querySelectorAll('#desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('#mobile-menu .mobile-nav-link');

  const updateActiveSection = () => {
    const scrollPos = window.scrollY + 140;

    let currentSection = 'home';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = id;
          break;
        }
      }
    }

    // Update Desktop Nav Links
    desktopLinks.forEach(link => {
      const section = link.getAttribute('data-section');
      if (section === currentSection) {
        link.classList.remove('text-brand-dark/80', 'hover:text-brand-dark');
        link.classList.add('text-brand-orange');
      } else {
        link.classList.remove('text-brand-orange');
        link.classList.add('text-brand-dark/80', 'hover:text-brand-dark');
      }
    });

    // Update Mobile Nav Links
    mobileLinks.forEach(link => {
      const section = link.getAttribute('data-section');
      if (section === currentSection) {
        link.classList.remove('text-brand-dark', 'hover:bg-brand-cream');
        link.classList.add('text-brand-orange', 'bg-brand-orange-light/50');
      } else {
        link.classList.remove('text-brand-orange', 'bg-brand-orange-light/50');
        link.classList.add('text-brand-dark', 'hover:bg-brand-cream');
      }
    });
  };

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  // ==========================================
  // 4. Work Section Slider (Slider With Text Over Image)
  // ==========================================
  const workTrack = document.getElementById('work-slider-track');
  const workPrevBtn = document.getElementById('work-slider-prev');
  const workNextBtn = document.getElementById('work-slider-next');
  const workDotsContainer = document.getElementById('work-slider-dots');
  const workViewport = document.getElementById('work-slider-viewport');

  if (workTrack && workPrevBtn && workNextBtn && workDotsContainer) {
    const slides = Array.from(workTrack.querySelectorAll('.work-slide'));
    let currentIndex = 0;

    const getSlidesPerView = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;
      if (width < 1024) return 2;
      return 3;
    };

    const getMaxIndex = () => {
      const spv = getSlidesPerView();
      return Math.max(0, slides.length - spv);
    };

    // Build or update pagination dots
    const renderDots = () => {
      const maxIdx = getMaxIndex();
      workDotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('button');
        dot.className = `work-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dot.setAttribute('aria-label', `Go to slide page ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
        });
        workDotsContainer.appendChild(dot);
      }
    };

    const updateDots = () => {
      const dots = workDotsContainer.querySelectorAll('.work-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      const maxIdx = getMaxIndex();
      if (index < 0) {
        currentIndex = maxIdx;
      } else if (index > maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      if (slides[currentIndex] && slides[0]) {
        const offset = slides[currentIndex].offsetLeft - slides[0].offsetLeft;
        workTrack.style.transform = `translateX(-${offset}px)`;
      }
      updateDots();
    };

    // Navigation Buttons
    workPrevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    workNextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });

    // Touch Swipe Support for Mobile/Tablet
    let touchStartX = 0;
    let touchEndX = 0;

    if (workViewport) {
      workViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      workViewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            // Swiped Left -> Next
            goToSlide(currentIndex + 1);
          } else {
            // Swiped Right -> Prev
            goToSlide(currentIndex - 1);
          }
        }
      }, { passive: true });
    }

    // Responsive recalculation on resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const maxIdx = getMaxIndex();
        if (currentIndex > maxIdx) currentIndex = maxIdx;
        renderDots();
        goToSlide(currentIndex);
      }, 100);
    });

    // Initialize dots & position
    renderDots();
  }

  // ==========================================
  // Skills & Technologies Slider (8 desktop, 4 tablet, 2 mobile)
  // ==========================================
  const skillsTrack = document.getElementById('skills-slider-track');
  const skillsPrevBtn = document.getElementById('skills-slider-prev');
  const skillsNextBtn = document.getElementById('skills-slider-next');
  const skillsViewport = document.getElementById('skills-slider-viewport');

  if (skillsTrack && skillsPrevBtn && skillsNextBtn) {
    const slides = Array.from(skillsTrack.querySelectorAll('.skills-slide'));
    let currentIndex = 0;

    const getSlidesPerView = () => {
      const width = window.innerWidth;
      if (width < 640) return 1; // 1 on mobile
      if (width < 1024) return 2; // 2 on tablet
      return 4; // exactly 4 on desktop
    };

    const getMaxIndex = () => {
      const spv = getSlidesPerView();
      return Math.max(0, slides.length - spv);
    };

    const updateArrows = () => {
      // Keep both custom styled arrows fully active and responsive
      skillsPrevBtn.style.opacity = '1';
      skillsPrevBtn.style.pointerEvents = 'auto';
      skillsNextBtn.style.opacity = '1';
      skillsNextBtn.style.pointerEvents = 'auto';
    };

    const goToSlide = (index) => {
      const maxIdx = getMaxIndex();
      if (index < 0) {
        currentIndex = maxIdx;
      } else if (index > maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      if (slides[currentIndex] && slides[0]) {
        const offset = slides[currentIndex].offsetLeft - slides[0].offsetLeft;
        skillsTrack.style.transform = `translateX(-${offset}px)`;
      }
      updateArrows();
    };

    skillsPrevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    skillsNextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (skillsViewport) {
      skillsViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      skillsViewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 35) {
          if (diff > 0) {
            goToSlide(currentIndex + 1);
          } else {
            goToSlide(currentIndex - 1);
          }
        }
      }, { passive: true });
    }

    let skillsResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(skillsResizeTimer);
      skillsResizeTimer = setTimeout(() => {
        const maxIdx = getMaxIndex();
        if (currentIndex > maxIdx) currentIndex = maxIdx;
        goToSlide(currentIndex);
      }, 100);
    });

    goToSlide(0);
  }

  // ==========================================
  // Industry Experience Slider (4 desktop, 2 tablet, 1 mobile)
  // ==========================================
  const industryTrack = document.getElementById('industry-slider-track');
  const industryPrevBtn = document.getElementById('industry-slider-prev');
  const industryNextBtn = document.getElementById('industry-slider-next');
  const industryViewport = document.getElementById('industry-slider-viewport');

  if (industryTrack && industryPrevBtn && industryNextBtn) {
    const slides = Array.from(industryTrack.querySelectorAll('.industry-slide'));
    let currentIndex = 0;

    const getSlidesPerView = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;
      if (width < 1024) return 2;
      return 4; // Exactly 4 on desktop
    };

    const getMaxIndex = () => {
      const spv = getSlidesPerView();
      return Math.max(0, slides.length - spv);
    };

    const goToSlide = (index) => {
      const maxIdx = getMaxIndex();
      if (index < 0) {
        currentIndex = maxIdx;
      } else if (index > maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      if (slides[currentIndex] && slides[0]) {
        const offset = slides[currentIndex].offsetLeft - slides[0].offsetLeft;
        industryTrack.style.transform = `translateX(-${offset}px)`;
      }
    };

    industryPrevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    industryNextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });

    // Touch Swipe Support for Mobile & Tablet
    let touchStartX = 0;
    let touchEndX = 0;

    if (industryViewport) {
      industryViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      industryViewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            goToSlide(currentIndex + 1);
          } else {
            goToSlide(currentIndex - 1);
          }
        }
      }, { passive: true });
    }

    let industryResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(industryResizeTimer);
      industryResizeTimer = setTimeout(() => {
        const maxIdx = getMaxIndex();
        if (currentIndex > maxIdx) currentIndex = maxIdx;
        goToSlide(currentIndex);
      }, 100);
    });

    goToSlide(0);
  }
});

