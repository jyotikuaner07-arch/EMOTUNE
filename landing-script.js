// Mood mapping with keywords and emojis
const MOOD_MAPPING = {
    happy: {
        keywords: ['happy', 'joy', 'joyful', 'cheerful', 'glad', 'excited', 'upbeat', 'positive', 'bright'],
        emojis: ['😊', '😄', '😃', '😁', '🙂', '😀', '🌞', '✨', '🎉']
    },
    sad: {
        keywords: ['sad', 'down', 'blue', 'depressed', 'melancholy', 'unhappy', 'gloomy', 'lonely', 'heartbroken'],
        emojis: ['😔', '😢', '😭', '😞', '☹️', '🥺', '💔', '🌧️']
    },
    relaxed: {
        keywords: ['relaxed', 'calm', 'chill', 'peaceful', 'tranquil', 'serene', 'mellow', 'easy', 'zen'],
        emojis: ['😌', '😊', '🧘', '☮️', '🍃', '🌿', '💆', '🛀']
    },
    energetic: {
        keywords: ['energetic', 'hyper', 'pumped', 'active', 'dynamic', 'wild', 'intense', 'powerful', 'strong'],
        emojis: ['⚡', '🔥', '💪', '🚀', '⭐', '💥', '🎯', '🏃']
    },
    romantic: {
        keywords: ['romantic', 'love', 'lovely', 'sweet', 'affectionate', 'tender', 'passionate', 'loving'],
        emojis: ['❤️', '💕', '💖', '💗', '💘', '💝', '💞', '🌹', '😍']
    },
    focused: {
        keywords: ['focused', 'concentrate', 'study', 'work', 'productive', 'determined', 'serious', 'mindful'],
        emojis: ['🎯', '📚', '💼', '🧠', '✍️', '📖', '🎓', '⏰']
    }
};

// Setup input listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const moodInput = document.getElementById('moodInput');
    
    moodInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processInput();
        }
    });
});

// Fill input with suggestion
function fillInput(text) {
    const moodInput = document.getElementById('moodInput');
    moodInput.value = text;
    moodInput.focus();
}

// Process user input
function processInput() {
    const moodInput = document.getElementById('moodInput');
    const input = moodInput.value.toLowerCase().trim();
    
    if (!input) {
        alert('Please enter your mood!');
        return;
    }

    const detectedMood = detectMood(input);
    
    if (detectedMood) {
        selectMood(detectedMood);
    } else {
        alert('Mood not recognized. Please try: happy, sad, relaxed, energetic, romantic, or focused');
    }
}

// Detect mood from input text or emoji
function detectMood(input) {
    // Check each mood category
    for (const [mood, data] of Object.entries(MOOD_MAPPING)) {
        // Check if input matches keywords
        if (data.keywords.some(keyword => input.includes(keyword))) {
            return mood;
        }
        
        // Check if input contains emojis
        if (data.emojis.some(emoji => input.includes(emoji))) {
            return mood;
        }
    }
    
    return null;
}

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

// Select mood from menu or input
function selectMood(mood) {
    console.log('Selected mood:', mood);
    
    // Validate mood
    if (!MOOD_MAPPING[mood]) {
        alert('Invalid mood selection');
        return;
    }
    
    // Store selected mood in localStorage
    const data = JSON.stringify({
        lastEmotion: mood,
        moodHistory: [],
        isDarkMode: false
    });
    localStorage.setItem('emotune_data', data);
    
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
    
    if (overlay.classList.contains('active') && e.target === overlay) {
        closeMenu();
    }
});

// Close menu with ESC key
document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('moodOverlay');
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeMenu();
    }
});