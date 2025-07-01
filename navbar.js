// Floating Navbar Scroll Logic (global)
(function() {
    const navbar = document.querySelector('.floating-navbar');
    if (!navbar) return;
    let lastScrollY = window.scrollY;
    let ticking = false;
    let isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    if (isHome) document.body.classList.add('homepage');

    function onScroll() {
        if (window.scrollY <= 0) {
            navbar.classList.remove('hide');
            navbar.classList.add('at-top');
            return;
        } else {
            navbar.classList.remove('at-top');
        }
        if (window.scrollY < lastScrollY) {
            navbar.classList.remove('hide');
        } else {
            navbar.classList.add('hide');
        }
        lastScrollY = window.scrollY;
    }
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    // Initial state
    if (window.scrollY <= 0) {
        navbar.classList.add('at-top');
    }
})();

document.addEventListener('DOMContentLoaded', function () {
  const mq = window.matchMedia('(min-width: 992px)');
  const dropdown = document.querySelector('.navbar .dropdown');
  const dropdownMenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
  if (!dropdown || !dropdownMenu) return;

  let hoverTimeout;

  function showDropdown() {
    if (mq.matches) {
      clearTimeout(hoverTimeout);
      dropdown.classList.add('show');
      dropdownMenu.classList.add('show');
    }
  }
  function hideDropdown() {
    if (mq.matches) {
      hoverTimeout = setTimeout(() => {
        dropdown.classList.remove('show');
        dropdownMenu.classList.remove('show');
      }, 120); // Small delay for user to move mouse
    }
  }

  dropdown.addEventListener('mouseenter', showDropdown);
  dropdown.addEventListener('mouseleave', hideDropdown);
  dropdownMenu.addEventListener('mouseenter', showDropdown);
  dropdownMenu.addEventListener('mouseleave', hideDropdown);

  // Remove show class on resize to mobile
  window.addEventListener('resize', () => {
    if (!mq.matches) {
      dropdown.classList.remove('show');
      dropdownMenu.classList.remove('show');
    }
  });
}); 