// Scroll to top on page load/refresh
window.addEventListener('load', function() {
    // Scroll to top immediately when page loads
    window.scrollTo(0, 0);
});

// Also handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
    // If page is loaded from cache (back/forward navigation)
    if (event.persisted) {
        window.scrollTo(0, 0);
    }
});

// Force scroll to top on DOM content loaded (backup)
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
}); 