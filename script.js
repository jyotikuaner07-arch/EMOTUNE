// Emotion Data
const EMOTIONS = {
    happy: {
        name: 'Happy',
        emoji: '😊',
        color: '#FFD93D',
        bgGradient: 'linear-gradient(135deg, #FFD93D 0%, #FF8C42 100%)',
        genre: 'Pop / Upbeat',
        tempo: 'Fast',
        songs: [
            { title: 'Good Vibes', artist: 'Summer Rays', duration: 234, tempo: 128 },
            { title: 'Sunshine Dance', artist: 'Happy Hearts', duration: 198, tempo: 132 },
            { title: 'Joy Ride', artist: 'The Optimists', duration: 211, tempo: 125 },
            { title: 'Smile More', artist: 'Bright Side', duration: 187, tempo: 130 }
        ]
    },
    sad: {
        name: 'Sad',
        emoji: '😔',
        color: '#6C9BCF',
        bgGradient: 'linear-gradient(135deg, #6C9BCF 0%, #5B7DB1 100%)',
        genre: 'Acoustic / Lo-fi',
        tempo: 'Slow',
        songs: [
            { title: 'Rainy Thoughts', artist: 'Melancholy Moon', duration: 267, tempo: 65 },
            { title: 'Empty Room', artist: 'Solitude', duration: 243, tempo: 58 },
            { title: 'Fading Memory', artist: 'Echo Chamber', duration: 289, tempo: 62 },
            { title: 'Blue Hour', artist: 'Midnight Poetry', duration: 256, tempo: 60 }
        ]
    },
    relaxed: {
        name: 'Relaxed',
        emoji: '😌',
        color: '#A8E6CF',
        bgGradient: 'linear-gradient(135deg, #A8E6CF 0%, #7BC8A4 100%)',
        genre: 'Ambient / Chill',
        tempo: 'Medium-Slow',
        songs: [
            { title: 'Ocean Breeze', artist: 'Calm Collective', duration: 312, tempo: 75 },
            { title: 'Garden Dreams', artist: 'Nature Sounds', duration: 298, tempo: 72 },
            { title: 'Peaceful Mind', artist: 'Zen Masters', duration: 334, tempo: 68 },
            { title: 'Soft Clouds', artist: 'Sky Meditation', duration: 287, tempo: 70 }
        ]
    },
    energetic: {
        name: 'Energetic',
        emoji: '⚡',
        color: '#FF6B6B',
        bgGradient: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
        genre: 'EDM / Dance',
        tempo: 'Very Fast',
        songs: [
            { title: 'Power Up', artist: 'Electric Storm', duration: 201, tempo: 140 },
            { title: 'Adrenaline Rush', artist: 'High Voltage', duration: 189, tempo: 145 },
            { title: 'Peak Performance', artist: 'Gym Beasts', duration: 215, tempo: 138 },
            { title: 'Unstoppable', artist: 'Force Field', duration: 198, tempo: 142 }
        ]
    },
    romantic: {
        name: 'Romantic',
        emoji: '❤️',
        color: '#FFB6C1',
        bgGradient: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
        genre: 'R&B / Soul',
        tempo: 'Medium',
        songs: [
            { title: 'Moonlit Kiss', artist: 'Love Letters', duration: 245, tempo: 88 },
            { title: 'Hearts Align', artist: 'Soul Mates', duration: 267, tempo: 85 },
            { title: 'Forever Yours', artist: 'Romantic Era', duration: 289, tempo: 82 },
            { title: 'Sweet Embrace', artist: 'Velvet Voice', duration: 234, tempo: 90 }
        ]
    },
    focused: {
        name: 'Focused',
        emoji: '🎯',
        color: '#9B59B6',
        bgGradient: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
        genre: 'Instrumental / Study',
        tempo: 'Medium',
        songs: [
            { title: 'Deep Work', artist: 'Productivity Lab', duration: 298, tempo: 95 },
            { title: 'Flow State', artist: 'Focus Music', duration: 312, tempo: 92 },
            { title: 'Brain Power', artist: 'Study Beats', duration: 287, tempo: 98 },
            { title: 'Concentration', artist: 'Mind Palace', duration: 301, tempo: 90 }
        ]
    }
};

// State
let currentEmotion = null;
let currentSongIndex = 0;
let isPlaying = false;
let progress = 0;
let volume = 70;
let isDarkMode = false;
let moodHistory = [];
let progressInterval = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderMoodSelector();
    updateVolumeSlider();
});

// Load from localStorage
function loadFromStorage() {
    const saved = localStorage.getItem('emotune_data');
    if (saved) {
        const data = JSON.parse(saved);
        if (data.lastEmotion) {
            currentEmotion = data.lastEmotion;
            selectEmotion(currentEmotion, false);
        }
        if (data.moodHistory) {
            moodHistory = data.moodHistory;
        }
        if (data.isDarkMode) {
            isDarkMode = data.isDarkMode;
            document.body.classList.toggle('dark-mode', isDarkMode);
            updateThemeIcon();
        }
    }
}

// Save to localStorage
function saveToStorage() {
    const data = {
        lastEmotion: currentEmotion,
        moodHistory: moodHistory,
        isDarkMode: isDarkMode
    };
    localStorage.setItem('emotune_data', JSON.stringify(data));
}

// Render Mood Selector
function renderMoodSelector() {
    const moodGrid = document.getElementById('moodGrid');
    const checkInMoodGrid = document.getElementById('checkInMoodGrid');
    
    moodGrid.innerHTML = '';
    checkInMoodGrid.innerHTML = '';
    
    let delay = 0;
    Object.keys(EMOTIONS).forEach(key => {
        const emotion = EMOTIONS[key];
        
        // Main mood selector
        const card = document.createElement('button');
        card.className = 'mood-card';
        card.style.background = emotion.bgGradient;
        card.style.animationDelay = `${delay}s`;
        card.innerHTML = `
            <div class="mood-emoji">${emotion.emoji}</div>
            <div class="mood-name">${emotion.name}</div>
            <div class="mood-genre">${emotion.genre}</div>
        `;
        card.onclick = () => selectEmotion(key);
        moodGrid.appendChild(card);
        
        // Check-in popup
        const smallCard = document.createElement('button');
        smallCard.className = 'mood-card-small';
        smallCard.style.background = emotion.bgGradient;
        smallCard.innerHTML = `
            <div class="mood-emoji">${emotion.emoji}</div>
            <div class="mood-name">${emotion.name}</div>
        `;
        smallCard.onclick = () => {
            selectEmotion(key);
            closeMoodCheckIn();
        };
        checkInMoodGrid.appendChild(smallCard);
        
        delay += 0.1;
    });
}

// Select Emotion
function selectEmotion(emotionKey, addToHistory = true) {
    currentEmotion = emotionKey;
    currentSongIndex = 0;
    progress = 0;
    
    if (addToHistory) {
        moodHistory.unshift({
            emotion: emotionKey,
            time: new Date().toLocaleTimeString()
        });
        if (moodHistory.length > 10) moodHistory.pop();
        saveToStorage();
        updateHistoryList();
    }
    
    // Auto dark mode
    if (['sad', 'relaxed', 'focused'].includes(emotionKey)) {
        if (!isDarkMode) toggleDarkMode();
    } else {
        if (isDarkMode) toggleDarkMode();
    }
    
    updateUI();
    hideMoodSelector();
    showPlayerInterface();
    
    saveToStorage();
}

// Update UI
function updateUI() {
    if (!currentEmotion) return;
    
    const emotion = EMOTIONS[currentEmotion];
    const song = emotion.songs[currentSongIndex];
    
    // Update background
    document.body.style.background = emotion.bgGradient;
    
    // Update mood indicator
    const moodIndicator = document.getElementById('moodIndicator');
    moodIndicator.style.background = 'rgba(255, 255, 255, 0.2)';
    moodIndicator.style.color = 'white';
    moodIndicator.innerHTML = `
        <span class="mood-indicator-emoji">${emotion.emoji}</span>
        <div>
            <div class="mood-indicator-name">${emotion.name}</div>
            <div class="mood-indicator-genre">${emotion.genre}</div>
        </div>
    `;
    
    // Update album art
    const albumArt = document.getElementById('albumArt');
    albumArt.style.background = emotion.bgGradient;
    
    const emojiDisplay = document.getElementById('emojiDisplay');
    emojiDisplay.textContent = emotion.emoji;
    emojiDisplay.classList.toggle('playing', isPlaying);
    
    // Update now playing
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('songArtist').textContent = song.artist;
    document.getElementById('songMeta').textContent = `${emotion.genre} • ${song.tempo} BPM • ${emotion.tempo} Tempo`;
    
    // Update total time
    document.getElementById('totalTime').textContent = formatTime(song.duration);
    
    // Update controls colors
    updateControlColors(emotion.color);
    
    // Update playlist
    renderPlaylist();
}

// Update Control Colors
function updateControlColors(color) {
    const style = document.createElement('style');
    style.id = 'dynamic-colors';
    const existingStyle = document.getElementById('dynamic-colors');
    if (existingStyle) existingStyle.remove();
    
    style.innerHTML = `
        .top-btn { background: rgba(255, 255, 255, 0.2); color: white; }
        .top-btn:hover { background: rgba(255, 255, 255, 0.3); }
        .control-btn { background: rgba(255, 255, 255, 0.2); color: white; }
        .control-btn:hover { background: rgba(255, 255, 255, 0.3); }
        .play-btn { background: ${color}; }
        .play-btn:hover { background: ${color}; opacity: 0.9; }
        .volume-slider { background: rgba(255, 255, 255, 0.3); }
        .volume-slider::-webkit-slider-track { background: rgba(255, 255, 255, 0.3); }
        .volume-slider::-moz-range-track { background: rgba(255, 255, 255, 0.3); }
        .playlist { background: rgba(255, 255, 255, 0.1); color: white; }
        .playlist-title { color: white; }
        .playlist-item { background: rgba(255, 255, 255, 0.1); color: white; }
        .playlist-item:hover { background: rgba(255, 255, 255, 0.2); }
        .playlist-item.active { background: ${color}; }
        .popup-content { background: rgba(255, 255, 255, 0.95); color: #333; }
        .secondary-btn { background: #f0f0f0; color: #333; }
        .secondary-btn:hover { background: #e0e0e0; }
        .history-sidebar { background: rgba(255, 255, 255, 0.95); color: #333; }
        .history-item { background: rgba(0, 0, 0, 0.05); }
        .close-btn { color: #333; }
    `;
    document.head.appendChild(style);
}

// Render Playlist
function renderPlaylist() {
    if (!currentEmotion) return;
    
    const emotion = EMOTIONS[currentEmotion];
    const playlistTitle = document.getElementById('playlistTitle');
    const playlistItems = document.getElementById('playlistItems');
    
    playlistTitle.textContent = `${emotion.name} Playlist`;
    playlistItems.innerHTML = '';
    
    emotion.songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
        item.innerHTML = `
            <div class="playlist-item-info">
                <div>
                    <div class="playlist-item-title">${song.title}</div>
                    <div class="playlist-item-artist">${song.artist}</div>
                </div>
                <div class="playlist-item-duration">${formatTime(song.duration)}</div>
            </div>
        `;
        item.onclick = () => {
            currentSongIndex = index;
            progress = 0;
            updateUI();
            if (isPlaying) startProgress();
        };
        playlistItems.appendChild(item);
    });
}

// Toggle Play
function togglePlay() {
    if (!currentEmotion) return;
    
    isPlaying = !isPlaying;
    
    const playIcon = document.getElementById('playIcon');
    const emojiDisplay = document.getElementById('emojiDisplay');
    
    if (isPlaying) {
        playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
        emojiDisplay.classList.add('playing');
        startProgress();
    } else {
        playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
        emojiDisplay.classList.remove('playing');
        stopProgress();
    }
}

// Start Progress
function startProgress() {
    stopProgress();
    
    const emotion = EMOTIONS[currentEmotion];
    const song = emotion.songs[currentSongIndex];
    
    progressInterval = setInterval(() => {
        progress += 0.5;
        
        if (progress >= song.duration) {
            progress = 0;
            nextSong();
            showMoodCheckIn();
        }
        
        updateProgressBar();
    }, 500);
}

// Stop Progress
function stopProgress() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

// Update Progress Bar
function updateProgressBar() {
    if (!currentEmotion) return;
    
    const emotion = EMOTIONS[currentEmotion];
    const song = emotion.songs[currentSongIndex];
    const percentage = (progress / song.duration) * 100;
    
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('albumProgressBar').style.width = `${percentage}%`;
    document.getElementById('currentTime').textContent = formatTime(Math.floor(progress));
}

// Next Song
function nextSong() {
    if (!currentEmotion) return;
    
    const emotion = EMOTIONS[currentEmotion];
    currentSongIndex = (currentSongIndex + 1) % emotion.songs.length;
    progress = 0;
    updateUI();
    
    if (isPlaying) startProgress();
}

// Previous Song
function prevSong() {
    if (!currentEmotion) return;
    
    if (progress > 3) {
        progress = 0;
    } else {
        const emotion = EMOTIONS[currentEmotion];
        currentSongIndex = (currentSongIndex - 1 + emotion.songs.length) % emotion.songs.length;
        progress = 0;
    }
    
    updateUI();
    if (isPlaying) startProgress();
}

// Format Time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Volume Control
function updateVolumeSlider() {
    const slider = document.getElementById('volumeSlider');
    const display = document.getElementById('volumeDisplay');
    
    slider.addEventListener('input', (e) => {
        volume = e.target.value;
        display.textContent = `${volume}%`;
    });
}

// Show/Hide Interfaces
function showMoodSelector() {
    document.getElementById('moodSelector').classList.remove('hidden');
}

function hideMoodSelector() {
    document.getElementById('moodSelector').classList.add('hidden');
}

function showPlayerInterface() {
    document.getElementById('playerInterface').classList.remove('hidden');
}

// Mood Check-In Popup
function showMoodCheckIn() {
    document.getElementById('moodCheckInPopup').classList.remove('hidden');
}

function closeMoodCheckIn() {
    document.getElementById('moodCheckInPopup').classList.add('hidden');
}

// History Sidebar
function toggleHistory() {
    const sidebar = document.getElementById('historysidebar');
    sidebar.classList.toggle('hidden');
    if (!sidebar.classList.contains('hidden')) {
        updateHistoryList();
    }
}

function closeHistory() {
    document.getElementById('historysidebar').classList.add('hidden');
}

function updateHistoryList() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    moodHistory.forEach(item => {
        const emotion = EMOTIONS[item.emotion];
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.style.background = emotion.bgGradient;
        historyItem.style.color = 'white';
        historyItem.innerHTML = `
            <div class="history-item-emoji">${emotion.emoji}</div>
            <div>
                <div class="history-item-name">${emotion.name}</div>
                <div class="history-item-time">${item.time}</div>
            </div>
        `;
        historyList.appendChild(historyItem);
    });
}

// Dark Mode Toggle
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    updateThemeIcon();
    saveToStorage();
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('themeIcon');
    if (isDarkMode) {
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    } else {
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
}

// Add to the loadFromStorage() function
const urlParams = new URLSearchParams(window.location.search);
const moodFromUrl = urlParams.get('mood');
if (moodFromUrl) {
    selectEmotion(moodFromUrl);
}