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

// Highlight active nav link based on current URL
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  let currentPath = window.location.pathname;
  console.log('Current path:', currentPath);
  
  // Define service page paths
  const servicePaths = ['/acuteIllness/', '/chronicdiseasecare/', '/paediatrichomoeopathy/', '/womenwellness/'];
  const isServicePage = servicePaths.some(path => currentPath.startsWith(path.replace(/\/$/, '')));
  
  navLinks.forEach(link => {
    let linkPath = link.getAttribute('href');
    console.log('Checking link:', linkPath);
    
    link.classList.remove('active');
    
    // Home page matching
    if (linkPath === '/' && (currentPath === '/' || currentPath === '' || currentPath === '/index.html')) {
      link.classList.add('active');
      console.log('Matched home page');
    }
    // Services dropdown matching - highlight if on any service page
    else if (linkPath === '/acuteIllness/' && isServicePage) {
      link.classList.add('active');
      console.log('Matched services page:', currentPath);
    }
    // Other pages matching - check if current path starts with the link path
    else if (linkPath !== '/' && linkPath !== '/acuteIllness/' && currentPath.startsWith(linkPath.replace(/\/$/, ''))) {
      link.classList.add('active');
      console.log('Matched page:', linkPath);
    }
  });
}

// Function to be called after header is loaded
window.setActiveNavLink = setActiveNavLink;

document.addEventListener('DOMContentLoaded', function () {
  const mq = window.matchMedia('(min-width: 992px)');
  const dropdown = document.querySelector('.navbar .dropdown');
  const dropdownMenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
  if (!dropdown || !dropdownMenu) return;

  let hoverTimeout;
  let isOverDropdown = false;
  let isOverMenu = false;

  function showDropdown() {
    if (mq.matches) {
      clearTimeout(hoverTimeout);
      dropdown.classList.add('show');
      dropdownMenu.classList.add('show');
    }
  }
  function hideDropdownWithDelay() {
    if (mq.matches) {
      hoverTimeout = setTimeout(() => {
        if (!isOverDropdown && !isOverMenu) {
          dropdown.classList.remove('show');
          dropdownMenu.classList.remove('show');
        }
      }, 250); // Slightly longer delay for better UX
    }
  }

  dropdown.addEventListener('mouseenter', function() {
    isOverDropdown = true;
    showDropdown();
  });
  dropdown.addEventListener('mouseleave', function() {
    isOverDropdown = false;
    hideDropdownWithDelay();
  });
  dropdownMenu.addEventListener('mouseenter', function() {
    isOverMenu = true;
    showDropdown();
  });
  dropdownMenu.addEventListener('mouseleave', function() {
    isOverMenu = false;
    hideDropdownWithDelay();
  });

  // Remove show class on resize to mobile
  window.addEventListener('resize', () => {
    if (!mq.matches) {
      dropdown.classList.remove('show');
      dropdownMenu.classList.remove('show');
    }
  });
}); 