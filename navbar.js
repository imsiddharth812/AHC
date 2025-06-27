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