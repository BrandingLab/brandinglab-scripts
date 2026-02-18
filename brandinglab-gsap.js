// ============================================
// BRANDINGLAB GSAP ANIMATIONS
// All animation systems consolidated
// ============================================

// ============================================
// GSAP PLUGIN REGISTRATION
// ============================================
(function() {
  if (window.__gsapPluginsRegistered) return;
  window.__gsapPluginsRegistered = true;
  
  // Only register plugins that are loaded
  const plugins = [ScrollTrigger];
  if (typeof SplitText !== 'undefined') plugins.push(SplitText);
  if (typeof ScrambleTextPlugin !== 'undefined') plugins.push(ScrambleTextPlugin);
  if (typeof TextPlugin !== 'undefined') plugins.push(TextPlugin);
  
  gsap.registerPlugin(...plugins);
  console.log('GSAP v' + gsap.version + ' plugins registered');
})();

// ============================================
// 1. PIXELATED IMAGE REVEAL ANIMATION
// Hover effect for project cards
// ============================================
function initPixelatedImageReveal() {
  const animationStepDuration = 0.3;
  const gridSize = 7;
  const pixelSize = 100 / gridSize;
  const cards = document.querySelectorAll('[data-pixelated-image-reveal]');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;

  cards.forEach((card) => {
    const pixelGrid = card.querySelector('[data-pixelated-image-reveal-grid]');
    const activeCard = card.querySelector('[data-pixelated-image-reveal-active]');
    if (!pixelGrid || !activeCard) return;

    // Clear existing pixels
    const existingPixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel');
    existingPixels.forEach(pixel => pixel.remove());

    // Create pixel grid
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.width = `${pixelSize}%`;
        pixel.style.height = `${pixelSize}%`;
        pixel.style.left = `${col * pixelSize}%`;
        pixel.style.top = `${row * pixelSize}%`;
        pixelGrid.appendChild(pixel);
      }
    }

    const pixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel');
    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;
    let isActive = false;
    let delayedCall;

    const animatePixels = (activate) => {
      isActive = activate;
      gsap.killTweensOf(pixels);
      if (delayedCall) delayedCall.kill();
      gsap.set(pixels, { display: 'none' });

      gsap.to(pixels, {
        display: 'block',
        duration: 0,
        stagger: { each: staggerDuration, from: 'random' }
      });

      delayedCall = gsap.delayedCall(animationStepDuration, () => {
        activeCard.style.display = activate ? 'block' : 'none';
        activeCard.style.pointerEvents = activate ? 'none' : '';
      });

      gsap.to(pixels, {
        display: 'none',
        duration: 0,
        delay: animationStepDuration,
        stagger: { each: staggerDuration, from: 'random' }
      });
    };

    if (isTouchDevice) {
      card.addEventListener('click', () => animatePixels(!isActive));
    } else {
      card.addEventListener('mouseenter', () => {
        if (!isActive) animatePixels(true);
      });
      card.addEventListener('mouseleave', () => {
        if (isActive) animatePixels(false);
      });
    }
  });

  if (cards.length > 0) {
    console.log('Pixelated image reveal initialized (' + cards.length + ' cards)');
  }
}

// ============================================
// 2. SCRAMBLE TEXT & SPLIT TEXT ANIMATIONS
// ============================================
function initScrambleAndSplitText() {
  // SCRAMBLE ANIMATION — runs on page load
  const scrambleEls = document.querySelectorAll(".scramble");
  scrambleEls.forEach(el => {
    if (typeof ScrambleTextPlugin !== 'undefined') {
      gsap.to(el, {
        duration: 4,
        scrambleText: {
          text: el.textContent,
          chars: "+?84564XERSHKZN",
          speed: 0.6
        }
      });
    }
  });

  if (scrambleEls.length > 0) {
    console.log('Scramble text initialized (' + scrambleEls.length + ' elements)');
  }

  // SPLIT TEXT ANIMATION — elements with .split class
  if (typeof SplitText === 'undefined') return;
  
  const splitEls = document.querySelectorAll(".split");
  splitEls.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const split = new SplitText(el, { type: "words, chars" });
        gsap.from(split.chars, {
          y: 100,
          autoAlpha: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power2.out"
        });
      }
    });
  });

  if (splitEls.length > 0) {
    console.log('Split text initialized (' + splitEls.length + ' elements)');
  }

  // HERO TRUST SECTION ANIMATION
  const trustHeadline = document.querySelector(".hero-section.light-theme .hero-text");
  if (trustHeadline) {
    ScrollTrigger.create({
      trigger: ".hero-section.light-theme",
      start: "top 80%",
      once: true,
      onEnter: () => {
        const splitTrust = new SplitText(trustHeadline, { type: "lines, words" });
        gsap.from(splitTrust.words, {
          opacity: 0,
          y: 50,
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });
    console.log('Trust headline animation initialized');
  }
}

// ============================================
// 3. TEXT HIGHLIGHTING ANIMATION
// Character-by-character fade-in on scroll
// ============================================
function initHighlightText() {
  if (typeof SplitText === 'undefined') return;
  
  const splitHeadingTargets = document.querySelectorAll("[data-highlight-text]");
  if (splitHeadingTargets.length === 0) return;

  splitHeadingTargets.forEach((heading) => {
    const scrollStart = heading.getAttribute("data-highlight-scroll-start") || "top 90%";
    const scrollEnd = heading.getAttribute("data-highlight-scroll-end") || "center 40%";
    const fadedValue = parseFloat(heading.getAttribute("data-highlight-fade")) || 0.2;
    const staggerValue = parseFloat(heading.getAttribute("data-highlight-stagger")) || 0.02;

    const textContent = heading.textContent;
    heading.textContent = textContent;

    let splitText;
    try {
      splitText = new SplitText(heading, {
        type: "words,chars",
        wordsClass: "word",
        charsClass: "char"
      });
    } catch (e) {
      console.warn("SplitText failed for element:", heading, e);
      return;
    }

    if (!splitText.chars || splitText.chars.length === 0) {
      console.warn("SplitText produced no characters for:", heading);
      return;
    }

    gsap.set(splitText.chars, { opacity: fadedValue });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: scrollStart,
        end: scrollEnd,
        scrub: 0.6
      }
    });

    tl.to(splitText.chars, {
      opacity: 1,
      duration: 1,
      stagger: staggerValue,
      ease: "none"
    });
  });

  console.log('Text highlighting initialized (' + splitHeadingTargets.length + ' elements)');
}

// ============================================
// 4. PREMIUM PILL DESIGN (JavaScript Fallback)
// ============================================
function applyPremiumPillDesign() {
  const premiumElement = Array.from(document.querySelectorAll('*')).find(el =>
    el.textContent.trim() === 'PREMIUM' && el.children.length === 0
  );
  const premiumByAttr = document.querySelector('[data-premium-pill]');
  const premiumByClass = document.querySelector('.premium-pill');
  const target = premiumElement || premiumByAttr || premiumByClass;

  if (target && !target.classList.contains('premium-pill-styled')) {
    Object.assign(target.style, {
      display: 'inline-block',
      padding: window.innerWidth <= 767 ? '6px 20px' : '8px 24px',
      backgroundColor: 'rgba(255, 103, 3, 0.15)',
      border: '1px solid rgb(255, 103, 3)',
      borderRadius: '50px',
      color: 'rgb(255, 103, 3)',
      fontSize: window.innerWidth <= 767 ? '12px' : '14px',
      fontWeight: '600',
      letterSpacing: '0.05em',
      textTransform: 'uppercase'
    });
    target.classList.add('premium-pill-styled');
    console.log('Premium pill design applied');
  }
}

// ============================================
// 5. HERO ENTRANCE ANIMATION
// ============================================
function initHeroEntrance() {
  const heroSection = document.querySelector('.home-hero-section');
  if (!heroSection) return;

  const heroBadges = heroSection.querySelectorAll('[data-gsap="hero-badge"]');
  const heroTexts = heroSection.querySelectorAll('[data-gsap="hero-text"]');
  const heroSub = heroSection.querySelector('.low-brow, .sub-paragraph');
  const heroAction = heroSection.querySelector('.scroll-into-view-08s, .action-wrapper');

  if (heroBadges.length === 0 && heroTexts.length === 0) return;

  heroBadges.forEach(el => {
    gsap.set(el, { opacity: 0, y: 40 });
  });

  heroTexts.forEach(el => {
    gsap.set(el, { opacity: 0, y: 60 });
  });

  if (heroSub && !heroSub.hasAttribute('data-gsap')) {
    gsap.set(heroSub, { opacity: 0, y: 40 });
  }
  if (heroAction && !heroAction.hasAttribute('data-gsap')) {
    gsap.set(heroAction, { opacity: 0, y: 40 });
  }

  const heroTl = gsap.timeline({ delay: 0.2 });

  heroBadges.forEach((el, i) => {
    heroTl.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, i * 0.1);
  });

  heroTexts.forEach((el, i) => {
    heroTl.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0.15 + (i * 0.15));
  });

  if (heroSub && !heroSub.hasAttribute('data-gsap')) {
    heroTl.to(heroSub, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.3);
  }

  if (heroAction && !heroAction.hasAttribute('data-gsap')) {
    heroTl.to(heroAction, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.45);
  }

  console.log('Hero entrance: ' + heroBadges.length + ' badges, ' + heroTexts.length + ' texts');
}

// ============================================
// 6. SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
  const hiddenElements = document.querySelectorAll('[data-w-id][style*="opacity: 0"], [data-w-id][style*="opacity:0"]');
  if (hiddenElements.length === 0) return;

  hiddenElements.forEach((el, index) => {
    if (el.closest('.home-hero-section')) return;
    
    let delay = 0;
    const classList = el.className;
    const delayMatch = classList.match(/scroll-into-view-(\d+)-?(\d*)s?/);
    if (delayMatch) {
      delay = parseFloat(delayMatch[1] + '.' + (delayMatch[2] || '0'));
    }

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          delay: delay,
          ease: "power2.out",
          clearProps: "filter,transform"
        });
      }
    });
  });

  console.log('Scroll reveal initialized (' + hiddenElements.length + ' elements)');
}

// ============================================
// 7. SECTION FADE-UP ANIMATIONS
// ============================================
function initSectionAnimations() {
  const scrollElements = document.querySelectorAll('.scroll-into-view-0-4s, .scroll-into-view-06s, .scroll-into-view-08s, [class*="scroll-into-view"]');
  
  scrollElements.forEach(el => {
    if (el.closest('.home-hero-section')) return;
    if (el.hasAttribute('data-scroll-init')) return;
    el.setAttribute('data-scroll-init', 'true');

    const style = el.getAttribute('style') || '';
    const hasHiddenStyles = style.includes('opacity') || style.includes('transform') || style.includes('filter');
    
    if (!hasHiddenStyles) {
      gsap.set(el, { opacity: 0, y: 30 });
    }

    let delay = 0;
    const delayMatch = el.className.match(/scroll-into-view-(\d+)-?(\d*)s?/);
    if (delayMatch) {
      delay = parseFloat(delayMatch[1] + '.' + (delayMatch[2] || '0')) || 0;
    }

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          delay: delay,
          ease: "power2.out",
          clearProps: "filter,transform"
        });
      }
    });
  });

  const sections = document.querySelectorAll('.splittext-wrapper, .section-benefits, .pricing-card, .partners-grid, .helpstartups_wrapper');
  
  sections.forEach(el => {
    if (el.closest('.home-hero-section')) return;
    if (el.hasAttribute('data-scroll-init')) return;
    el.setAttribute('data-scroll-init', 'true');

    const computedStyle = window.getComputedStyle(el);
    const currentOpacity = parseFloat(computedStyle.opacity);
    
    if (currentOpacity >= 1) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          clearProps: "filter,transform"
        });
      }
    });
  });

  if (scrollElements.length > 0 || sections.length > 0) {
    console.log('Section animations initialized');
  }
}

// ============================================
// 8. STAGGER CHILDREN ANIMATION
// ============================================
function initStaggerAnimations() {
  const staggerContainers = document.querySelectorAll('[data-gsap="stagger-children"]');
  
  staggerContainers.forEach(container => {
    const staggerValue = parseFloat(container.getAttribute('data-gsap-stagger')) || 0.1;
    const children = container.children;
    
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: staggerValue,
          ease: "power2.out"
        });
      }
    });
  });

  if (staggerContainers.length > 0) {
    console.log('Stagger animations initialized (' + staggerContainers.length + ' containers)');
  }
}

// ============================================
// MASTER INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initPixelatedImageReveal();
    initScrambleAndSplitText();
    initHighlightText();
    applyPremiumPillDesign();
    initHeroEntrance();
    initScrollReveal();
    initSectionAnimations();
    initStaggerAnimations();

    console.log('BrandingLab animations initialized');
  });
});

// Cookie consent event listeners
window.addEventListener('cookieConsentAccepted', () => console.log('User accepted cookies'));
window.addEventListener('cookieConsentDenied', () => console.log('User denied cookies'));
