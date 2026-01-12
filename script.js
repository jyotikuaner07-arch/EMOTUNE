// Emotion Data with Local MP3 Files
const EMOTIONS = {
    happy: {
        name: 'Happy',
        emoji: '😊',
        color: '#FFD93D',
        bgGradient: 'linear-gradient(135deg, #FFD93D 0%, #FF8C42 100%)',
        genre: 'Pop / Upbeat',
        tempo: 'Fast',
        songs: [
            { title: 'Cruel Summer', artist: 'Taylor Swift', duration: 178, tempo: 170, file: 'ui/music/happy/Cruel Summer.mp3' },
            { title: 'Danza Kuduro', artist: 'Don Omar, Lucenzo', duration: 199, tempo: 130, file: 'ui/music/happy/Danza Kuduro.mp3' },
            { title: 'Espresso', artist: 'Sabrina Carpenter', duration: 175, tempo: 104, file: 'ui/music/happy/Espresso.mp3' },
            { title: 'Sapphire', artist: 'Ed Sheeran', duration: 203, tempo: 110, file: 'ui/music/happy/Sapphire.mp3' },
            { title: 'Summer of Love', artist: 'Shawn Mendes, Tainy', duration: 203, tempo: 116, file: 'ui/music/happy/Summer of Love.mp3' },


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
            { title: 'Anuv Jain', artist: 'Anuv Jain', duration: 225, tempo: 70, file: 'ui/music/sad/Anuv Jain.mp3' },
            { title: 'Finding Her', artist: 'Kushagra', duration: 214, tempo: 74, file: 'ui/music/sad/Finding Her.mp3' },
            { title: 'Nafrat', artist: 'Seedhe Maut', duration: 196, tempo: 82, file: 'ui/music/sad/Nafrat.mp3' },
            { title: "We Don't Talk Anymore", artist: 'Charlie Puth ft. Selena Gomez', duration: 217, tempo: 100, file: "ui/music/sad/We Don't Talk Anymore.mp3" },

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
            { title: 'Ocean Breeze', artist: 'Calm Collective', duration: 312, tempo: 75, file: 'music/relaxed/song1.mp3' },
            { title: 'Garden Dreams', artist: 'Nature Sounds', duration: 298, tempo: 72, file: 'music/relaxed/song2.mp3' },
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
            { title: 'Believer', artist: 'Imagine Dragons', duration: 204, tempo: 125, file: 'ui/music/energetic/Believer.mp3'},
            { title: 'Desi Girl', artist: 'Shankar–Ehsaan–Loy', duration: 305, tempo: 128, file: 'ui/music/energetic/Desi Girl.mp3' },
            { title: 'Kar Gayi Chull', artist: 'Badshah, Fazilpuria', duration: 187, tempo: 130, file: 'ui/music/energetic/Kar Gayi Chull.mp3' },
            { title: 'MONTERO (Call Me By Your Name)', artist: 'Lil Nas X', duration: 137, tempo: 179, file: 'ui/music/energetic/MONTERO (Call Me By Your Name).mp3' },
            { title: 'Tu Meri', artist: 'Vishal–Shekhar', duration: 260, tempo: 125, file: 'ui/music/energetic/Tu Meri (Bang Bang) - (Raag.Fm).mp3' },

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
            { title: 'Bargad', artist: 'Anuv Jain', duration: 210, tempo: 76, file: 'ui/music/romantic/Bargad.mp3' },
            { title: 'Questions', artist: 'Chris Brown', duration: 258, tempo: 86, file: 'ui/music/romantic/Chris Brown Questions.mp3' },
            { title: 'Closer', artist: 'The Chainsmokers ft. Halsey', duration: 244, tempo: 95, file: 'ui/music/romantic/Closer The Chainsmokers.mp3' },
            { title: 'Love Me Like You Do', artist: 'Ellie Goulding', duration: 252, tempo: 95, file: 'ui/music/romantic/Love me like you do.mp3' },
            { title: 'Tum Ho Toh', artist: 'Saiyaara', duration: 242, tempo: 72, file: 'ui/music/romantic/Tum Ho Toh Saiyaara 320 Kbps.mp3' },

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
            { title: 'Deep Work', artist: 'Productivity Lab', duration: 298, tempo: 95, file: 'music/focused/song1.mp3' },
            { title: 'Flow State', artist: 'Focus Music', duration: 312, tempo: 92, file: 'music/focused/song2.mp3' },
        ]
    }
};


// State
let currentEmotion = null;
let currentSongIndex = 0;
let isPlaying = false;
let isDarkMode = false;
let moodHistory = [];

// Audio Element
const audioPlayer = document.getElementById('audioPlayer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderMoodSelector();
    setupAudioListeners();
    updateVolumeSlider();
    
    // Check if mood was passed from landing page
    const urlParams = new URLSearchParams(window.location.search);
    const moodFromUrl = urlParams.get('mood');
    if (moodFromUrl && EMOTIONS[moodFromUrl]) {
        selectEmotion(moodFromUrl);
    }
});

// Setup Audio Event Listeners
function setupAudioListeners() {
    // Update progress bar as song plays
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            document.getElementById('progressFill').style.width = `${percentage}%`;
            document.getElementById('albumProgressBar').style.width = `${percentage}%`;
            document.getElementById('currentTime').textContent = formatTime(Math.floor(audioPlayer.currentTime));
        }
    });
    
    // When song loads, update duration
    audioPlayer.addEventListener('loadedmetadata', () => {
        document.getElementById('totalTime').textContent = formatTime(Math.floor(audioPlayer.duration));
    });
    
    // When song ends, play next
    audioPlayer.addEventListener('ended', () => {
        nextSong();
        showMoodCheckIn();
    });
    
    // Error handling
    audioPlayer.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        alert('Could not load audio file. Please check if the file exists in the music folder.');
    });
}

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
    isPlaying = false;
    
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
    loadCurrentSong();
    hideMoodSelector();
    showPlayerInterface();
    
    saveToStorage();
}

// Load Current Song
function loadCurrentSong() {
    if (!currentEmotion) return;
    
    const emotion = EMOTIONS[currentEmotion];
    const song = emotion.songs[currentSongIndex];
    
    audioPlayer.src = song.file;
    audioPlayer.load();
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
    
    // Update controls colors
    updateControlColors(emotion.color);
    
    // Update playlist
    renderPlaylist();
}

// Toggle Play/Pause
function togglePlay() {
    if (!currentEmotion) return;
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    
    // Update play icon
    const playIcon = document.getElementById('playIcon');
    const emojiDisplay = document.getElementById('emojiDisplay');
    
    if (isPlaying) {
        playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
        emojiDisplay.classList.add('playing');
    } else {
        playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
        emojiDisplay.classList.remove('playing');
    }
}

// Next Song
function nextSong() {
    if (!currentEmotion) return;
    
    const emotion = EMOTIONS[currentEmotion];
    currentSongIndex = (currentSongIndex + 1) % emotion.songs.length;
    
    loadCurrentSong();
    updateUI();
    
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Previous Song
function prevSong() {
    if (!currentEmotion) return;
    
    if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
    } else {
        const emotion = EMOTIONS[currentEmotion];
        currentSongIndex = (currentSongIndex - 1 + emotion.songs.length) % emotion.songs.length;
        loadCurrentSong();
        updateUI();
        
        if (isPlaying) {
            audioPlayer.play();
        }
    }
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
        const volume = e.target.value;
        display.textContent = `${volume}%`;
        audioPlayer.volume = volume / 100;
    });
    
    // Set initial volume
    audioPlayer.volume = 0.7;
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
            loadCurrentSong();
            updateUI();
            if (isPlaying) {
                audioPlayer.play();
            }
        };
        playlistItems.appendChild(item);
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