/**
 * Accessibility Enhancements for aeroKLE Website
 * Adds ARIA labels, keyboard navigation, and reduced motion support
 */

(function() {
    'use strict';

    // ============================================
    // 1. ADD ARIA LABELS TO CAROUSEL BUTTONS
    // ============================================
    function addCarouselAriaLabels() {
        // Market & Use Cases Carousel
        const marketPrevBtn = document.querySelector('[data-carousel-prev]');
        const marketNextBtn = document.querySelector('[data-carousel-next]');
        
        if (marketPrevBtn) {
            marketPrevBtn.setAttribute('aria-label', 'Previous use case');
            marketPrevBtn.setAttribute('role', 'button');
            marketPrevBtn.setAttribute('tabindex', '0');
        }
        
        if (marketNextBtn) {
            marketNextBtn.setAttribute('aria-label', 'Next use case');
            marketNextBtn.setAttribute('role', 'button');
            marketNextBtn.setAttribute('tabindex', '0');
        }
        
        // Core Technologies Carousel
        const corePrevBtn = document.getElementById('prevBtn');
        const coreNextBtn = document.getElementById('nextBtn');
        
        if (corePrevBtn) {
            corePrevBtn.setAttribute('aria-label', 'Previous core technology');
            corePrevBtn.setAttribute('role', 'button');
            corePrevBtn.setAttribute('tabindex', '0');
        }
        
        if (coreNextBtn) {
            coreNextBtn.setAttribute('aria-label', 'Next core technology');
            coreNextBtn.setAttribute('role', 'button');
            coreNextBtn.setAttribute('tabindex', '0');
        }
        
        // Add ARIA labels to carousel containers
        const marketCarousel = document.querySelector('[data-carousel]');
        if (marketCarousel) {
            marketCarousel.setAttribute('role', 'region');
            marketCarousel.setAttribute('aria-label', 'Market and use cases carousel');
        }
        
        const coreCarousel = document.getElementById('carouselContainer');
        if (coreCarousel) {
            coreCarousel.setAttribute('role', 'region');
            coreCarousel.setAttribute('aria-label', 'Core technologies carousel');
        }
        
        console.log('✓ ARIA labels added to carousel buttons');
    }

    // ============================================
    // 2. IMPLEMENT KEYBOARD NAVIGATION
    // ============================================
    function implementKeyboardNavigation() {
        // Market & Use Cases Carousel Keyboard Support
        const marketPrevBtn = document.querySelector('[data-carousel-prev]');
        const marketNextBtn = document.querySelector('[data-carousel-next]');
        
        if (marketPrevBtn) {
            marketPrevBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    marketPrevBtn.click();
                }
            });
        }
        
        if (marketNextBtn) {
            marketNextBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    marketNextBtn.click();
                }
            });
        }
        
        // Core Technologies Carousel Keyboard Support
        const corePrevBtn = document.getElementById('prevBtn');
        const coreNextBtn = document.getElementById('nextBtn');
        
        if (corePrevBtn) {
            corePrevBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    corePrevBtn.click();
                }
            });
        }
        
        if (coreNextBtn) {
            coreNextBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    coreNextBtn.click();
                }
            });
        }
        
        // Arrow key navigation for carousels
        document.addEventListener('keydown', (e) => {
            // Check if focus is on carousel or its children
            const activeElement = document.activeElement;
            const isInMarketCarousel = activeElement.closest('[data-carousel]');
            const isInCoreCarousel = activeElement.closest('#carouselContainer');
            
            if (isInMarketCarousel) {
                if (e.key === 'ArrowLeft' && marketPrevBtn) {
                    e.preventDefault();
                    marketPrevBtn.click();
                    marketPrevBtn.focus();
                } else if (e.key === 'ArrowRight' && marketNextBtn) {
                    e.preventDefault();
                    marketNextBtn.click();
                    marketNextBtn.focus();
                }
            }
            
            if (isInCoreCarousel) {
                if (e.key === 'ArrowLeft' && corePrevBtn) {
                    e.preventDefault();
                    corePrevBtn.click();
                    corePrevBtn.focus();
                } else if (e.key === 'ArrowRight' && coreNextBtn) {
                    e.preventDefault();
                    coreNextBtn.click();
                    coreNextBtn.focus();
                }
            }
        });
        
        console.log('✓ Keyboard navigation implemented for carousels');
    }

    // ============================================
    // 3. ENSURE TOUCH TARGETS ARE AT LEAST 44x44px
    // ============================================
    function ensureTouchTargets() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ensure all interactive elements meet minimum touch target size */
            button, a, .dock-item, [role="button"], input[type="submit"], input[type="button"] {
                min-width: 44px;
                min-height: 44px;
            }
            
            /* Carousel buttons specifically */
            .carousel-nav, [data-carousel-prev], [data-carousel-next] {
                min-width: 44px !important;
                min-height: 44px !important;
            }
            
            /* Dock items */
            .dock-item {
                min-width: 44px !important;
                min-height: 44px !important;
            }
            
            /* Ensure padding doesn't break touch targets */
            button:not(.no-min-size), 
            a:not(.no-min-size) {
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
        console.log('✓ Touch target sizes enforced (minimum 44x44px)');
    }

    // ============================================
    // 4. ADD PREFERS-REDUCED-MOTION SUPPORT
    // ============================================
    function addReducedMotionSupport() {
        const style = document.createElement('style');
        style.textContent = `
            /* Respect user's motion preferences */
            @media (prefers-reduced-motion: reduce) {
                *,
                *::before,
                *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
                
                /* Disable rotating word animation */
                .rotating-word {
                    animation: none !important;
                    transition: none !important;
                }
                
                /* Disable hero text slide-up animation */
                .word {
                    animation: none !important;
                    transform: translateY(0) !important;
                    opacity: 1 !important;
                }
                
                /* Disable tilt card effects */
                .tilt-card {
                    transform: none !important;
                    transition: none !important;
                }
                
                /* Disable carousel transitions */
                .carousel-track,
                [data-slides] {
                    transition: none !important;
                }
                
                /* Disable dock hover animations */
                .dock-item:hover {
                    transform: none !important;
                }
                
                /* Disable video card animations */
                .video-card {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                
                /* Disable bento card hover effects */
                .bento-card:hover {
                    transform: none !important;
                }
                
                /* Disable quote fade-in */
                .quote-container {
                    transition: none !important;
                }
                
                /* Disable GSAP animations */
                .gsap-animation {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            console.log('✓ Reduced motion mode enabled');
            
            // Disable GSAP animations if present
            if (window.gsap) {
                gsap.globalTimeline.timeScale(1000); // Speed up to effectively disable
            }
            
            // Stop rotating word animation
            const rotatingWord = document.getElementById('rotatingWord');
            if (rotatingWord) {
                rotatingWord.style.transition = 'none';
            }
            
            // Show quote immediately
            const quote = document.getElementById('inspirationalQuote');
            if (quote) {
                quote.style.opacity = '1';
                quote.style.transition = 'none';
            }
        } else {
            console.log('✓ Reduced motion support added (currently not active)');
        }
    }

    // ============================================
    // 5. ADD FOCUS INDICATORS
    // ============================================
    function addFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced focus indicators for keyboard navigation */
            button:focus-visible,
            a:focus-visible,
            [role="button"]:focus-visible,
            .dock-item:focus-visible,
            .carousel-nav:focus-visible,
            [data-carousel-prev]:focus-visible,
            [data-carousel-next]:focus-visible {
                outline: 3px solid #00FFFF !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.3) !important;
            }
            
            /* Remove default outline but keep for keyboard users */
            button:focus:not(:focus-visible),
            a:focus:not(:focus-visible) {
                outline: none;
            }
        `;
        document.head.appendChild(style);
        
        console.log('✓ Focus indicators added');
    }

    // ============================================
    // 6. ADD LIVE REGION FOR CAROUSEL UPDATES
    // ============================================
    function addLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(liveRegion);
        
        // Update live region when carousel changes
        const marketPrevBtn = document.querySelector('[data-carousel-prev]');
        const marketNextBtn = document.querySelector('[data-carousel-next]');
        
        if (marketPrevBtn) {
            marketPrevBtn.addEventListener('click', () => {
                liveRegion.textContent = 'Showing previous use case';
            });
        }
        
        if (marketNextBtn) {
            marketNextBtn.addEventListener('click', () => {
                liveRegion.textContent = 'Showing next use case';
            });
        }
        
        const corePrevBtn = document.getElementById('prevBtn');
        const coreNextBtn = document.getElementById('nextBtn');
        
        if (corePrevBtn) {
            corePrevBtn.addEventListener('click', () => {
                liveRegion.textContent = 'Showing previous core technology';
            });
        }
        
        if (coreNextBtn) {
            coreNextBtn.addEventListener('click', () => {
                liveRegion.textContent = 'Showing next core technology';
            });
        }
        
        console.log('✓ Live region added for screen reader announcements');
    }

    // ============================================
    // INITIALIZE ALL ENHANCEMENTS
    // ============================================
    function init() {
        console.log('Initializing accessibility enhancements...');
        
        addCarouselAriaLabels();
        implementKeyboardNavigation();
        ensureTouchTargets();
        addReducedMotionSupport();
        addFocusIndicators();
        addLiveRegion();
        
        console.log('✓ All accessibility enhancements initialized successfully');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
