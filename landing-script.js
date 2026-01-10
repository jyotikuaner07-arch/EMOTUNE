// Open full screen menu
function openMenu() {
    const overlay = document.getElementById('moodOverlay');
    overlay.classList.add('active');
    
    // Pause video when menu opens (optional)
    const video = document.getElementById('bgVideo');
    video.pause();
}

// Close menu
function closeMenu() {
    const overlay = document.getElementById('moodOverlay');
    overlay.classList.remove('active');
    
    // Resume video when menu closes (optional)
    const video = document.getElementById('bgVideo');
    video.play();
}

// Select mood from menu
function selectMood(mood) {
    console.log('Selected mood:', mood);
    
    // Store selected mood in localStorage
    localStorage.setItem('selectedMood', mood);
    
    // Show progress animation
    const progressFill = document.getElementById('progressFill');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // Redirect to main player page
            window.location.href = 'index.html?mood=' + mood;
        } else {
            width += 5;
            progressFill.style.width = width + '%';
        }
    }, 20);
}

// Close menu when clicking outside mood cards
document.addEventListener('click', (e) => {
    const overlay = document.getElementById('moodOverlay');
    const menuContainer = document.querySelector('.mood-menu-container');
    const closeBtn = document.querySelector('.close-btn');
    
    if (overlay.classList.contains('active')) {
        if (e.target === overlay) {
            closeMenu();
        }
    }
});

// Close menu with ESC key
document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('moodOverlay');
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeMenu();
    }
});