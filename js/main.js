

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
// Disable right click
// document.addEventListener('contextmenu', function(e) {
//   e.preventDefault();

//   // Create and show custom alert
//   const alertBox = document.createElement('div');
//   alertBox.innerHTML = `
//       <div style="
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background-color: white;
//           padding: 15px 25px;
//           border-radius: 5px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//           z-index: 9999;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//       ">
//           <span style="color: #ff9800; font-size: 20px;">⚠️</span>
//           <span style="color: #333;">ALERT: Content is protected !!</span>
//       </div>
//   `;

//   document.body.appendChild(alertBox);

//   // Remove alert after 2 seconds
//   setTimeout(() => {
//       alertBox.remove();
//   }, 2000);
// });

// // Disable keyboard shortcuts
// document.addEventListener('keydown', function(e) {
//   // Prevent Ctrl+U (view source)
//   if (e.ctrlKey && e.keyCode == 85) {
//       e.preventDefault();
//       return false;
//   }

//   // Prevent Ctrl+S (save page)
//   if (e.ctrlKey && e.keyCode == 83) {
//       e.preventDefault();
//       return false;
//   }

//   // Prevent Ctrl+Shift+I (developer tools)
//   if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
//       e.preventDefault();
//       return false;
//   }

//   // Prevent F12 (developer tools)
//   if (e.keyCode == 123) {
//       e.preventDefault();
//       return false;
//   }
// });
let textAnimationTimer = null;
let backgroundAnimationTimer = null;
let isAnimationRunning = false; // Flag to prevent duplicate animations

function getAllPhrases() {
  return [
    "مرحبًا بكم في موقع شركة تشطيب العقارات الرائدة!",
    "اكتشف تشطيبات عالية الجودة تلبي جميع الأذواق.",
    "انضم إلينا اليوم لتحويل أحلامك إلى واقع ملموس.",
    "استكشف أحدث التصاميم والتشطيبات العصرية.",
    "رحلتك نحو تشطيب مثالي تبدأ من هنا.",
    "نقدم لكم الابتكار والجودة في كل تفصيلة.",
    "لنعمل معًا لإنشاء تشطيبات استثنائية تدوم لسنوات."
  ];
}

function animateText() {
  const textElement = document.querySelector('.typing-text');
  const phrases = getAllPhrases();
  let currentIndex = 0;

  function updateText() {
    const phrase = phrases[currentIndex];

    // Clear existing content
    textElement.innerHTML = '';

    // Create a span for the animated text
    const span = document.createElement('span');
    span.className = 'animated-phrase';
    span.textContent = phrase;

    // Add the new phrase to the text element
    textElement.appendChild(span);

    // Schedule the fade-out
    setTimeout(() => {
      span.classList.add('fade-out');
    }, 4500); // Start fade-out after 4.5 seconds

    // Schedule the next phrase
    textAnimationTimer = setTimeout(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      updateText();
    }, 6000); // Switch to the next phrase after 6 seconds
  }

  // Start the text animation
  updateText();
}

function changeBackgroundImagesWithZoom() {
  const backgroundImages = document.querySelectorAll('.hero-backgrounds .background-image');
  let currentBackgroundIndex = 0;

  function updateBackground() {
    // Remove active class from all images
    backgroundImages.forEach(image => image.classList.remove('active'));

    // Add active class to the current image
    backgroundImages[currentBackgroundIndex].classList.add('active');

    // Update index for the next image
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;

    // Schedule the next update
    backgroundAnimationTimer = setTimeout(updateBackground, 6000); // Change background every 6 seconds
  }

  // Start the animation
  updateBackground();
}

// Main Initialization Function
function initializeAnimations() {
  if (isAnimationRunning) return; // Prevent duplicate animations
  isAnimationRunning = true; // Mark animations as running
  animateText(); // Start text animation
  changeBackgroundImagesWithZoom(); // Start background animation
}

// Cleanup Function
function stopAnimations() {
  clearTimeout(textAnimationTimer);
  clearTimeout(backgroundAnimationTimer);
  isAnimationRunning = false; // Mark animations as stopped
}

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAnimations(); // Pause animations when tab is not visible
  } else {
    initializeAnimations(); // Restart animations when tab becomes visible
  }
});

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
});

var swiper = new Swiper('.portfolio-details-slider', {
  slidesPerView: 1, // Show only one slide at a time
  spaceBetween: 0,  // No space between slides
  loop: true,
  speed: 600,
  autoplay: {
      delay: 5000,
      disableOnInteraction: false
  },
  pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
  }
});