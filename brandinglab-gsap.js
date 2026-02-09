/**
 * BrandingLab.io — GSAP Animation System
 * 
 * A comprehensive, data-attribute driven animation library
 * 
 * Dependencies:
 * - GSAP 3.12+
 * - ScrollTrigger
 * - SplitText (Club GreenSock)
 * 
 * @version 2.0.0
 * @author BrandingLab
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  const CONFIG = {
    // Animation defaults
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.1,
    
    // ScrollTrigger defaults
    scrollStart: 'top 85%',
    scrollEnd: 'bottom 20%',
    
    // Highlight text defaults
    highlightFade: 0.2,
    highlightStagger: 0.1,
    
    // Page transition
    transition: {
      selector: '.transition',
      blockSelector: '.transition-block',
      pageLoadStagger: 0.75,
      pageExitStagger: 0.5
    },
    
    // Selectors
    selectors: {
      fadeUp: '[data-gsap="fade-up"]',
      fadeDown: '[data-gsap="fade-down"]',
      fadeLeft: '[data-gsap="fade-left"]',
      fadeRight: '[data-gsap="fade-right"]',
      zoomIn: '[data-gsap="zoom-in"]',
      scaleUp: '[data-gsap="scale-up"]',
      heroText: '[data-gsap="hero-text"]',
      heroImage: '[data-gsap="hero-image"]',
      heroBadge: '[data-gsap="hero-badge"]',
      splitText: '[data-gsap="split-text"]',
      staggerChildren: '[data-gsap="stagger-children"]',
      counter: '[data-gsap="counter"]',
      highlightText: '[data-highlight-text]',
      hoverGlow: '[data-gsap-hover="glow"]',
      hoverGrow: '[data-gsap-hover="grow"]',
      hoverMagnetic: '[data-gsap-hover="magnetic"]'
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
  /**
   * Get numeric attribute with fallback
   */
  function getAttr(el, attr, fallback) {
    const val = el.getAttribute(attr);
    return val !== null ? parseFloat(val) : fallback;
  }

  /**
   * Get string attribute with fallback
   */
  function getAttrStr(el, attr, fallback) {
    return el.getAttribute(attr) || fallback;
  }

  /**
   * Check if reduced motion is preferred
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SCROLL ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Fade Up Animation
   */
  function initFadeUp() {
    const elements = document.querySelectorAll(CONFIG.selectors.fadeUp);
    
    elements.forEach(el => {
      const delay = getAttr(el, 'data-gsap-delay', 0);
      const duration = getAttr(el, 'data-gsap-duration', CONFIG.duration);
      const start = getAttrStr(el, 'data-gsap-start', CONFIG.scrollStart);
      
      gsap.fromTo(el, 
        { 
          opacity: 0, 
          y: 40 
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: CONFIG.ease,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /**
   * Fade Down Animation
   */
  function initFadeDown() {
    const elements = document.querySelectorAll(CONFIG.selectors.fadeDown);
    
    elements.forEach(el => {
      const delay = getAttr(el, 'data-gsap-delay', 0);
      const duration = getAttr(el, 'data-gsap-duration', CONFIG.duration);
      const start = getAttrStr(el, 'data-gsap-start', CONFIG.scrollStart);
      
      gsap.fromTo(el,
        { 
          opacity: 0, 
          y: -40 
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: CONFIG.ease,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /**
   * Fade Left Animation
   */
  function initFadeLeft() {
    const elements = document.querySelectorAll(CONFIG.selectors.fadeLeft);
    
    elements.forEach(el => {
      const delay = getAttr(el, 'data-gsap-delay', 0);
      const duration = getAttr(el, 'data-gsap-duration', CONFIG.duration);
      const start = getAttrStr(el, 'data-gsap-start', CONFIG.scrollStart);
      
      gsap.fromTo(el,
        { 
          opacity: 0, 
          x: 40 
        },
        {
          opacity: 1,
          x: 0,
          duration: duration,
          delay: delay,
          ease: CONFIG.ease,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /**
   * Fade Right Animation
   */
  function initFadeRight() {
    const elements = document.querySelectorAll(CONFIG.selectors.fadeRight);
    
    elements.forEach(el => {
      const delay = getAttr(el, 'data-gsap-delay', 0);
      const duration = getAttr(el, 'data-gsap-duration', CONFIG.duration);
      const start = getAttrStr(el, 'data-gsap-start', CONFIG.scrollStart);
      
      gsap.fromTo(el,
        { 
          opacity: 0, 
          x: -40 
        },
        {
          opacity: 1,
          x: 0,
          duration: duration,
          delay: delay,
          ease: CONFIG.ease,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /**
   * Zoom In Animation
   */
  function initZoomIn() {
    const elements = document.querySelectorAll(CONFIG.selectors.zoomIn);
    
    elements.forEach(el => {
      const delay = getAttr(el, 'data-gsap-delay', 0);
      const duration = getAttr(el, 'data-gsap-duration', CONFIG.duration);
      const start = getAttrStr(el, 'data-gsap-start', CONFIG.scrollStart);
      
      gsap.fromTo(el,
        { 
          opacity: 0, 
          scale: 0.8 
        },
        {
          opacity: 1,
          scale: 1,
          duration: duration,
          delay: delay,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /**
   * Scale Up Animation
   */
  function initScaleUp() {
    const elements = document.querySelectorAll(CONFIG.selectors.scaleUp);
    
    elements.forEach(el => {
      const delay = getAttr(el, 'data-gsap-delay', 0);
      const duration = getAttr(el, 'data-gsap-duration', CONFIG.duration);
      const start = getAttrStr(el, 'data-gsap-start', CONFIG.scrollStart);
      
      gsap.fromTo(el,
        { 
          opacity: 0, 
          scale: 0.5 
        },
        {
          opacity: 1,
          scale: 1,
          duration: duration,
          delay: delay,
          ease: CONFIG.ease,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /**
   * Stagger Children Animation
   */
  function initStaggerChildren() {
    const containers = document.querySelectorAll(CONFIG.selectors.staggerChildren);
    
    containers.forEach(container => {
      const children = container.children;
      const staggerAmount = getAttr(container, 'data-gsap-stagger', CONFIG.stagger);
      const delay = getAttr(container, 'data-gsap-delay', 0);
      const start = getAttrStr(container, 'data-gsap-start', CONFIG.scrollStart);
      
      gsap.fromTo(children,
        { 
          opacity: 0, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: CONFIG.duration,
          delay: delay,
          stagger: staggerAmount,
          ease: CONFIG.ease,
          scrollTrigger: {
            trigger: container,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Hero Section Animations (runs on page load, no scroll trigger)
   */
  function initHero() {
    const tl = gsap.timeline({ defaults: { ease: CONFIG.ease } });

    // Hero eyebrow / badge
    const heroBadge = document.querySelector(CONFIG.selectors.heroBadge);
    if (heroBadge) {
      tl.fromTo(heroBadge,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );
    }

    // Hero text
    const heroText = document.querySelectorAll(CONFIG.selectors.heroText);
    heroText.forEach((el, i) => {
      const delay = getAttr(el, 'data-gsap-delay', 0.3 + (i * 0.1));
      tl.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        delay
      );
    });

    // Hero image
    const heroImage = document.querySelector(CONFIG.selectors.heroImage);
    if (heroImage) {
      tl.fromTo(heroImage,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        0.5
      );
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TEXT ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Split Text Animation (word or character based)
   */
  function initSplitText() {
    // Check if SplitText is available
    if (typeof SplitText === 'undefined') {
      console.warn('SplitText plugin not loaded');
      return;
    }

    const elements = document.querySelectorAll(CONFIG.selectors.splitText);
    
    elements.forEach(el => {
      const splitType = getAttrStr(el, 'data-gsap-split', 'words');
      const staggerAmount = getAttr(el, 'data-gsap-stagger', 0.05);
      const start = getAttrStr(el, 'data-gsap-start', CONFIG.scrollStart);
      
      const split = new SplitText(el, { 
        type: splitType,
        autoSplit: true
      });
      
      const targets = splitType === 'chars' ? split.chars : split.words;
      
      gsap.fromTo(targets,
        { 
          opacity: 0, 
          y: 20 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: staggerAmount,
          ease: CONFIG.ease,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /**
   * Highlight Text on Scroll (scrubbed character reveal)
   */
  function initHighlightText() {
    // Check if SplitText is available
    if (typeof SplitText === 'undefined') {
      console.warn('SplitText plugin not loaded');
      return;
    }

    const elements = document.querySelectorAll(CONFIG.selectors.highlightText);
    
    elements.forEach(heading => {
      const scrollStart = getAttrStr(heading, 'data-highlight-scroll-start', 'top 90%');
      const scrollEnd = getAttrStr(heading, 'data-highlight-scroll-end', 'center 40%');
      const fadedValue = getAttr(heading, 'data-highlight-fade', CONFIG.highlightFade);
      const staggerValue = getAttr(heading, 'data-highlight-stagger', CONFIG.highlightStagger);
      
      new SplitText(heading, {
        type: 'words, chars',
        autoSplit: true,
        onSplit(self) {
          gsap.context(() => {
            gsap.timeline({
              scrollTrigger: {
                scrub: true,
                trigger: heading,
                start: scrollStart,
                end: scrollEnd
              }
            }).from(self.chars, {
              autoAlpha: fadedValue,
              stagger: staggerValue,
              ease: 'linear'
            });
          });
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // COUNTER ANIMATION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Number Counter Animation
   */
  function initCounter() {
    const elements = document.querySelectorAll(CONFIG.selectors.counter);
    
    elements.forEach(el => {
      const target = getAttr(el, 'data-gsap-target', 100);
      const duration = getAttr(el, 'data-gsap-duration', 2);
      const start = getAttrStr(el, 'data-gsap-start', CONFIG.scrollStart);
      const prefix = getAttrStr(el, 'data-gsap-prefix', '');
      const suffix = getAttrStr(el, 'data-gsap-suffix', '');
      
      const counter = { value: 0 };
      
      gsap.to(counter, {
        value: target,
        duration: duration,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: start,
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          el.textContent = prefix + Math.round(counter.value) + suffix;
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HOVER ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Hover Glow Effect
   */
  function initHoverGlow() {
    const elements = document.querySelectorAll(CONFIG.selectors.hoverGlow);
    
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          boxShadow: '0 0 30px rgba(255, 120, 30, 0.4)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          boxShadow: '0 0 0px rgba(255, 120, 30, 0)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Hover Grow Effect
   */
  function initHoverGrow() {
    const elements = document.querySelectorAll(CONFIG.selectors.hoverGrow);
    
    elements.forEach(el => {
      const scale = getAttr(el, 'data-gsap-hover-scale', 1.05);
      
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          scale: scale,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Magnetic Button Effect
   */
  function initMagnetic() {
    const elements = document.querySelectorAll(CONFIG.selectors.hoverMagnetic);
    
    elements.forEach(el => {
      const strength = getAttr(el, 'data-gsap-magnetic-strength', 0.3);
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE TRANSITIONS (Pixelated)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Generate pixel grid for page transition
   */
  function adjustTransitionGrid() {
    return new Promise((resolve) => {
      const transition = document.querySelector(CONFIG.transition.selector);
      
      if (!transition) {
        resolve();
        return;
      }

      const computedStyle = window.getComputedStyle(transition);
      const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns');
      const columns = gridTemplateColumns.split(' ').length;
      const blockSize = window.innerWidth / columns;
      const rowsNeeded = Math.ceil(window.innerHeight / blockSize);

      transition.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`;
      
      const totalBlocks = columns * rowsNeeded;
      transition.innerHTML = '';

      for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement('div');
        block.classList.add('transition-block');
        transition.appendChild(block);
      }

      resolve();
    });
  }

  /**
   * Page load transition animation
   */
  function animatePageLoad() {
    const transition = document.querySelector(CONFIG.transition.selector);
    if (!transition) return;

    gsap.timeline({
      onStart: () => gsap.set(CONFIG.transition.selector, { background: 'transparent' }),
      onComplete: () => gsap.set(CONFIG.transition.selector, { display: 'none' }),
      defaults: { ease: 'linear' }
    }).to(CONFIG.transition.blockSelector, {
      opacity: 0,
      duration: 0.1,
      stagger: { 
        amount: CONFIG.transition.pageLoadStagger, 
        from: 'random' 
      }
    }, 0.5);
  }

  /**
   * Page exit transition animation
   */
  function animatePageExit(destination) {
    gsap.set(CONFIG.transition.selector, { display: 'grid' });
    
    gsap.fromTo(CONFIG.transition.blockSelector,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.001,
        ease: 'linear',
        stagger: { 
          amount: CONFIG.transition.pageExitStagger, 
          from: 'random' 
        },
        onComplete: () => {
          window.location.href = destination;
        }
      }
    );
  }

  /**
   * Check if link should trigger page transition
   */
  function isValidTransitionLink(link) {
    const href = link.getAttribute('href') || '';
    
    try {
      const hostname = new URL(link.href, window.location.origin).hostname;
      return (
        hostname === window.location.hostname &&
        !href.startsWith('#') &&
        link.getAttribute('target') !== '_blank' &&
        !link.hasAttribute('data-transition-prevent')
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * Initialize page transitions
   */
  function initPageTransitions() {
    const transition = document.querySelector(CONFIG.transition.selector);
    if (!transition) return;

    adjustTransitionGrid().then(() => {
      animatePageLoad();
      
      // Setup link handlers
      const validLinks = Array.from(document.querySelectorAll('a')).filter(isValidTransitionLink);
      validLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          animatePageExit(link.href);
        });
      });
    });

    // Handle browser back/forward
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) window.location.reload();
    });

    // Debounced resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(adjustTransitionGrid, 150);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Register GSAP plugins
   */
  function registerPlugins() {
    if (typeof gsap === 'undefined') {
      console.error('GSAP is required');
      return false;
    }

    gsap.registerPlugin(ScrollTrigger);
    
    if (typeof SplitText !== 'undefined') {
      gsap.registerPlugin(SplitText);
    }
    
    return true;
  }

  /**
   * Initialize all animations
   */
  function init() {
    if (!registerPlugins()) return;
    
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
      // Make all hidden elements visible
      document.querySelectorAll('[data-gsap]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Hero animations (immediate)
    initHero();

    // Scroll animations
    initFadeUp();
    initFadeDown();
    initFadeLeft();
    initFadeRight();
    initZoomIn();
    initScaleUp();
    initStaggerChildren();

    // Text animations
    initSplitText();
    initHighlightText();

    // Counter
    initCounter();

    // Hover effects
    initHoverGlow();
    initHoverGrow();
    initMagnetic();

    // Page transitions
    initPageTransitions();

    // Refresh ScrollTrigger after all setup
    ScrollTrigger.refresh();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose to window for debugging
  window.BrandingLabGSAP = {
    init,
    refresh: () => ScrollTrigger.refresh(),
    config: CONFIG
  };

})();
