import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize Lenis smooth scrolling
 */
export const initLenisScroll = () => {
  try {
    const Lenis = require('lenis').default;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return lenis;
  } catch (e) {
    console.warn('Lenis not available');
    return null;
  }
};

/**
 * Animate element entrance with stagger
 */
export const animateIn = (elements, delay = 0) => {
  gsap.from(elements, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    delay,
    ease: 'power3.out',
  });
};

/**
 * Animate cards on scroll
 */
export const animateCardsOnScroll = (containerSelector) => {
  const cards = document.querySelectorAll(containerSelector);
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      },
      ease: 'power2.out',
    });
  });
};

/**
 * Hover scale animation for buttons
 */
export const setupButtonHoverScale = (buttonSelector) => {
  const buttons = document.querySelectorAll(buttonSelector);
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });
};

/**
 * Pulse animation for stat numbers
 */
export const pulseStat = (selector) => {
  gsap.to(selector, {
    opacity: 0.6,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Animate count up for stats
 */
export const countUp = (element, targetValue, duration = 1) => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: targetValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.value);
    },
  });
};

/**
 * Fade in animation
 */
export const fadeIn = (selector, duration = 0.5, delay = 0) => {
  gsap.from(selector, {
    opacity: 0,
    duration,
    delay,
    ease: 'power2.out',
  });
};

/**
 * Slide in from left
 */
export const slideInLeft = (selector, duration = 0.6, delay = 0) => {
  gsap.from(selector, {
    x: -30,
    opacity: 0,
    duration,
    delay,
    ease: 'power3.out',
  });
};

/**
 * Slide in from right
 */
export const slideInRight = (selector, duration = 0.6, delay = 0) => {
  gsap.from(selector, {
    x: 30,
    opacity: 0,
    duration,
    delay,
    ease: 'power3.out',
  });
};

/**
 * Stagger children animation
 */
export const staggerChildren = (containerSelector, duration = 0.5) => {
  gsap.from(`${containerSelector} > *`, {
    opacity: 0,
    y: 20,
    duration,
    stagger: 0.08,
    ease: 'power3.out',
  });
};

/**
 * Bounce animation
 */
export const bounce = (selector) => {
  gsap.to(selector, {
    y: -10,
    duration: 0.5,
    ease: 'back.out',
    repeat: 1,
    yoyo: true,
  });
};
