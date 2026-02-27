/**
 * Error Handling and Fallbacks for aeroKLE Website
 * Implements logo loading fallback, video loading fallback, and animation safety checks
 */

// ============================================
// 8.1 Logo Loading Fallback
// ============================================

/**
 * Add error handler to logo images
 * Hides logo if image fails to load and logs warning to console
 */
function initLogoErrorHandling() {
  const logoImages = document.querySelectorAll('.fixed-logo img');
  
  logoImages.forEach(img => {
    img.onerror = function() {
      console.warn('Logo failed to load:', this.src);
      // Hide the entire logo container
      const logoContainer = this.closest('.fixed-logo');
      if (logoContainer) {
        logoContainer.style.display = 'none';
      }
    };
  });
}

// ============================================
// 8.2 Video Loading Fallback
// ============================================

/**
 * Add error handler to video elements
 * Replaces failed videos with poster images and ensures layout remains stable
 */
function initVideoErrorHandling() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    video.onerror = function() {
      console.warn('Video failed to load:', this.src || this.currentSrc);
      
      // Get the poster image if available
      const poster = this.getAttribute('poster');
      
      if (poster) {
        // Create an img element to replace the video
        const img = document.createElement('img');
        img.src = poster;
        img.className = this.className;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.alt = 'Video thumbnail';
        
        // Replace video with image
        this.parentNode.replaceChild(img, this);
      } else {
        // If no poster, hide the video but maintain layout
        this.style.visibility = 'hidden';
        this.style.opacity = '0';
        
        // Add a placeholder message if parent has space
        const parent = this.parentNode;
        if (parent && !parent.querySelector('.video-error-message')) {
          const errorMsg = document.createElement('div');
          errorMsg.className = 'video-error-message';
          errorMsg.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
            font-size: 14px;
            z-index: 10;
          `;
          errorMsg.textContent = 'Video unavailable';
          parent.style.position = 'relative';
          parent.appendChild(errorMsg);
        }
      }
    };
    
    // Also handle source errors
    const sources = video.querySelectorAll('source');
    sources.forEach(source => {
      source.onerror = function() {
        console.warn('Video source failed to load:', this.src);
      };
    });
  });
}

// ============================================
// 8.3 Animation Safety Checks
// ============================================

/**
 * Safe animation wrapper that verifies elements exist before animating
 * @param {string} elementId - The ID of the element to animate
 * @param {Function} callback - The animation function to execute
 * @returns {boolean} - True if animation was executed, false otherwise
 */
function safeAnimate(elementId, callback) {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      callback(element);
      return true;
    } else {
      console.warn(`Element ${elementId} not found for animation`);
      return false;
    }
  } catch (error) {
    console.error(`Animation error for element ${elementId}:`, error);
    return false;
  }
}

/**
 * Safe query selector wrapper with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Optional context element (defaults to document)
 * @returns {Element|null} - The found element or null
 */
function safeQuerySelector(selector, context = document) {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.error(`Query selector error for "${selector}":`, error);
    return null;
  }
}

/**
 * Safe query selector all wrapper with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Optional context element (defaults to document)
 * @returns {NodeList|Array} - The found elements or empty array
 */
function safeQuerySelectorAll(selector, context = document) {
  try {
    return context.querySelectorAll(selector);
  } catch (error) {
    console.error(`Query selector all error for "${selector}":`, error);
    return [];
  }
}

/**
 * Wrap rotating word animation with safety checks
 */
function initRotatingWordAnimation() {
  try {
    const rotatingWord = document.getElementById("rotatingWord");
    const inspirationalQuote = document.getElementById("inspirationalQuote");
    
    // Verify elements exist before proceeding
    if (!rotatingWord) {
      console.warn('rotatingWord element not found - animation skipped');
      return;
    }
    
    const words = ["FLY*", "BUILD*", "DARE*", "DREAM*", "INNOVATE*", "EXPLORE*", "ENVISION*", "RISE*"];
    let index = 0;
    let cycleCount = 0;
    const maxCycles = 3;

    function rotate() {
      try {
        rotatingWord.style.opacity = 0;
        
        setTimeout(() => {
          try {
            rotatingWord.textContent = words[index];
            rotatingWord.style.opacity = 1;
            index = (index + 1) % words.length;
            
            if (index === 0) {
              cycleCount++;
            }
            
            if (cycleCount >= maxCycles) {
              // Set final word to "RISE*"
              rotatingWord.textContent = "RISE*";
              rotatingWord.style.opacity = 1;
              
              // Fade in the inspirational quote if it exists
              if (inspirationalQuote) {
                setTimeout(() => {
                  try {
                    inspirationalQuote.style.opacity = 1;
                  } catch (error) {
                    console.error('Error fading in quote:', error);
                  }
                }, 500);
              }
            }
          } catch (error) {
            console.error('Error in rotate timeout:', error);
          }
        }, 300);
      } catch (error) {
        console.error('Error in rotate function:', error);
      }
    }

    // Start animation with safety check
    if (cycleCount < maxCycles) {
      const interval = setInterval(() => {
        try {
          if (cycleCount >= maxCycles) {
            clearInterval(interval);
          } else {
            rotate();
          }
        } catch (error) {
          console.error('Error in animation interval:', error);
          clearInterval(interval);
        }
      }, 1600);
    }
  } catch (error) {
    console.error('Error initializing rotating word animation:', error);
  }
}

/**
 * Wrap GSAP animations with safety checks
 */
function safeGSAPAnimation(target, properties, options = {}) {
  try {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP library not loaded - animation skipped');
      return null;
    }
    
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) {
      console.warn(`GSAP animation target not found: ${target}`);
      return null;
    }
    
    return gsap.to(element, { ...properties, ...options });
  } catch (error) {
    console.error('GSAP animation error:', error);
    return null;
  }
}

/**
 * Wrap Intersection Observer with safety checks
 */
function safeIntersectionObserver(callback, options = {}) {
  try {
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver not supported - fallback behavior applied');
      return null;
    }
    
    return new IntersectionObserver((entries, observer) => {
      try {
        callback(entries, observer);
      } catch (error) {
        console.error('IntersectionObserver callback error:', error);
      }
    }, options);
  } catch (error) {
    console.error('IntersectionObserver creation error:', error);
    return null;
  }
}

// ============================================
// Initialize All Error Handlers
// ============================================

/**
 * Initialize all error handling on DOM ready
 */
function initErrorHandling() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLogoErrorHandling();
      initVideoErrorHandling();
    });
  } else {
    // DOM already loaded
    initLogoErrorHandling();
    initVideoErrorHandling();
  }
}

// Auto-initialize error handling
initErrorHandling();

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    safeAnimate,
    safeQuerySelector,
    safeQuerySelectorAll,
    safeGSAPAnimation,
    safeIntersectionObserver,
    initRotatingWordAnimation,
    initLogoErrorHandling,
    initVideoErrorHandling
  };
}
