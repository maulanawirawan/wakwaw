// State Management
const state = {
    password: 'iloveyou', // Change this to your desired password
    unlockedContent: [],
    currentScreen: 'password',
    musicPlaying: false,
    theme: 'light' // default theme
};

// Animated Character
let characterSVG;
let leftPupil, rightPupil, head, body, leftArm, rightArm;

function initCharacterAnimation() {
    characterSVG = document.getElementById('characterSVG');
    if (!characterSVG) return;
    
    leftPupil = document.getElementById('leftPupil');
    rightPupil = document.getElementById('rightPupil');
    head = document.getElementById('head');
    body = document.getElementById('body');
    leftArm = document.getElementById('leftArm');
    rightArm = document.getElementById('rightArm');
    
    document.addEventListener('mousemove', animateCharacter);
}

function animateCharacter(e) {
    if (!characterSVG) return;
    
    const rect = characterSVG.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate angle and distance
    const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
    const distance = Math.min(Math.hypot(mouseX - centerX, mouseY - centerY) / 10, 30);
    
    // Move pupils
    const pupilX = Math.cos(angle) * Math.min(distance / 5, 3);
    const pupilY = Math.sin(angle) * Math.min(distance / 5, 3);
    
    if (leftPupil) leftPupil.setAttribute('cx', 90 + pupilX);
    if (leftPupil) leftPupil.setAttribute('cy', 105 + pupilY);
    if (rightPupil) rightPupil.setAttribute('cx', 110 + pupilX);
    if (rightPupil) rightPupil.setAttribute('cy', 105 + pupilY);
    
    // Tilt head slightly
    const headTilt = Math.cos(angle) * Math.min(distance / 30, 3);
    const headMoveY = Math.sin(angle) * Math.min(distance / 30, 2);
    if (head) {
        head.setAttribute('cx', 100 + headTilt);
        head.setAttribute('cy', 60 + headMoveY);
    }
    
    // Move body slightly
    const bodyMove = Math.cos(angle) * Math.min(distance / 40, 2);
    if (body) {
        body.setAttribute('cx', 100 + bodyMove);
    }
    
    // Animate arms
    if (leftArm && rightArm) {
        const armAngle = Math.cos(angle) * Math.min(distance / 20, 5);
        leftArm.setAttribute('x2', 40 - armAngle);
        rightArm.setAttribute('x2', 160 + armAngle);
    }
}

// Math Puzzle Game
function startMathPuzzle() {
    const mathHTML = `
        <div class="math-puzzle-container">
            <h2 class="quiz-title">🧮 Advanced Math Challenge</h2>
            <p style="text-align: center; margin-bottom: 30px;">Solve these advanced problems. Each answer is a symbol or number!</p>

            <div class="math-equations" style="max-width: 800px; margin: 0 auto;">
                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">1. Hitung bilangan kompleks <i>z</i> jika <i>z²</i> + 1 = 0</p>
                    <input type="text" class="math-input" data-answer="i" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>

                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">2. Simbol yang mewakili ukuran sudut dalam geometri</p>
                    <input type="text" class="math-input" data-answer="∠" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>

                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">3. Hitung limit: lim<sub>x→0</sub> [sin(5x)/x - 5]</p>
                    <input type="text" class="math-input" data-answer="0" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>

                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">4. Simbol logika untuk "p ATAU q" (OR)</p>
                    <input type="text" class="math-input" data-answer="∨" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>

                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">5. Simbol "anggota dari" dalam teori himpunan (2 ___ A)</p>
                    <input type="text" class="math-input" data-answer="∈" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>

                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">6. Variabel output untuk fungsi <i>f(x)</i> = 3x² + 2x - 1</p>
                    <input type="text" class="math-input" data-answer="y" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>

                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">7. Hitung turunan: d/dx(cos(x) - 1) di x = 0</p>
                    <input type="text" class="math-input" data-answer="0" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>

                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">8. Simbol gabungan (union) himpunan A dan B</p>
                    <input type="text" class="math-input" data-answer="∪" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>

                <div class="math-item">
                    <p class="equation" style="font-size: 0.95rem;">9. Simbol operasi faktorial (5! / (3! · 2!))</p>
                    <input type="text" class="math-input" data-answer="!" placeholder="Jawaban..." maxlength="3">
                    <span class="letter-reveal"></span>
                </div>
            </div>

            <div id="mathMessage" class="math-message"></div>
            <button id="checkMathBtn" class="btn-primary" style="margin-top: 20px;">Check Answers</button>
        </div>
    `;

    document.getElementById('quizContent').innerHTML = mathHTML;
    document.getElementById('quizModal').classList.add('active');

    document.getElementById('checkMathBtn').addEventListener('click', checkMathAnswers);
}

function checkMathAnswers() {
    const inputs = document.querySelectorAll('.math-input');
    let allCorrect = true;
    let message = '';

    inputs.forEach(input => {
        const answer = input.value.trim();
        const correctAnswer = input.dataset.answer;
        const reveal = input.nextElementSibling;

        if (answer === correctAnswer) {
            input.style.borderColor = '#27ae60';
            input.style.background = '#d4edda';
            reveal.textContent = '✓';
            reveal.style.color = '#27ae60';
            reveal.style.fontSize = '1.5rem';
            reveal.style.fontWeight = 'bold';
            message += correctAnswer;
        } else {
            input.style.borderColor = '#e74c3c';
            input.style.background = '#fadbd8';
            reveal.textContent = '✗';
            reveal.style.color = '#e74c3c';
            allCorrect = false;
        }
    });

    if (allCorrect) {
        document.getElementById('mathMessage').innerHTML = `
            <div class="success-message sparkle">
                <h3 style="font-size: 2rem; margin-bottom: 15px;">Perfect! All Correct! 🎉</h3>
                <p style="font-size: 1.1rem;">Your answer: <strong style="font-size: 1.5rem; color: var(--primary-color);">${message}</strong></p>
                <p style="font-size: 1rem; margin-top: 10px;">You're a math genius! 💕</p>
            </div>
        `;
        createConfetti();

        setTimeout(() => {
            const content = document.getElementById('quizContent');
            content.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 4rem; margin: 20px 0;">🎉</div>
                    <h3 style="font-size: 2rem; margin-bottom: 15px;">Amazing Work!</h3>
                    <div class="success-message">
                        Choose which content to unlock
                    </div>
                    <div id="unlockChoices"></div>
                </div>
            `;
            showUnlockChoices();
        }, 2000);
    } else {
        document.getElementById('mathMessage').innerHTML = '<p style="color: #e74c3c; margin-top: 15px;">Some answers are wrong. Try again! 💪</p>';
    }
}

// Theme Management
function initTheme() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('loveWebsiteTheme') || 'light';
    state.theme = savedTheme;
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const root = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');

    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        root.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    state.theme = theme;
}

function toggleTheme() {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('loveWebsiteTheme', newTheme);

    // Add a cute animation
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.style.animation = 'none';
        setTimeout(() => {
            themeBtn.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    initTheme(); // Initialize theme first
    createFloatingHearts();
    initCharacterAnimation();
    setupEventListeners();
    loadSavedProgress();
    checkAutoLogin();
}

// Check if user already logged in
function checkAutoLogin() {
    // MATIKAN AUTO-LOGIN! User harus login setiap kali buka website
    // Tapi progress unlock tetap tersimpan
    
    // Hapus status login (kalau ada)
    localStorage.removeItem('loveWebsiteLoggedIn');
    
    console.log('🔒 Auto-login disabled. Please login first!');
    
    // Tidak ada kode lain disini - semua user mulai dari password screen
}

// Create Floating Hearts Animation
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const heartSymbols = ['💕', '💖', '💗', '💝', '💘', '❤️', '💓'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 500);
}

// Event Listeners Setup
function setupEventListeners() {
    // Password Screen
    const passwordInput = document.getElementById('passwordInput');
    const enterBtn = document.getElementById('enterBtn');

    enterBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    // Welcome Screen
    const startBtn = document.getElementById('startExploring');
    startBtn.addEventListener('click', showMainContent);

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Music Toggle
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.addEventListener('click', toggleMusic);
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            switchSection(target);
        });
    });
    
    // Feature Cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', () => handleCardClick(card));
    });
    
    // Activity Cards
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        const btn = card.querySelector('.btn-secondary');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const quizType = card.getAttribute('data-quiz');
            
            // Launch games based on quiz type
            switch(quizType) {
                case 'mathpuzzle':
                    startMathPuzzle();
                    break;
                default:
                    startQuiz(quizType); // For crossword, memory, trivia
                    break;
            }
        });
    });
    
    // Modal Close
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close modal on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
}

// Password Check
function checkPassword() {
    const input = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('passwordError');
    
    if (input.value.toLowerCase() === state.password.toLowerCase()) {
        errorMsg.textContent = '';
        
        // HAPUS BARIS INI - jangan save login status!
        // localStorage.setItem('loveWebsiteLoggedIn', 'true'); // ❌ HAPUS!
        
        showWelcomeScreen();
    } else {
        errorMsg.textContent = '❌ Oops! Try again, sweetheart 💕';
        input.value = '';
        input.style.animation = 'shake 0.5s';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
}

// Screen Management
function showWelcomeScreen() {
    document.getElementById('passwordScreen').classList.remove('active');
    document.getElementById('welcomeScreen').classList.add('active');
    state.currentScreen = 'welcome';
}

function showMainContent() {
    document.getElementById('welcomeScreen').classList.remove('active');
    document.getElementById('mainContent').classList.add('active');
    state.currentScreen = 'main';
    updateCardStates();
}

function switchSection(sectionId) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Music Control
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');
    
    if (state.musicPlaying) {
        music.pause();
        btn.classList.remove('playing');
        state.musicPlaying = false;
    } else {
        music.play();
        btn.classList.add('playing');
        state.musicPlaying = true;
    }
}

// Content Management
function handleCardClick(card) {
    const contentType = card.getAttribute('data-content');
    const isUnlocked = state.unlockedContent.includes(contentType);
    
    if (isUnlocked) {
        showContent(contentType);
    } else {
        showUnlockPrompt(contentType);
    }
}

function showUnlockPrompt(contentType) {
    const modal = document.getElementById('quizModal');
    const content = document.getElementById('quizContent');
    
    content.innerHTML = `
        <div class="quiz-container">
            <h2 class="quiz-title">🔒 Content Locked</h2>
            <p style="font-size: 1.1rem; margin-bottom: 30px;">
                Complete a quiz or game to unlock this content! 💝
            </p>
            <button class="btn-primary" onclick="closeModal(); switchSection('activities');">
                Go to Activities
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function unlockContent(contentType) {
    if (!state.unlockedContent.includes(contentType)) {
        state.unlockedContent.push(contentType);
        updateCardStates();
        saveProgress();
    }
}

function updateCardStates() {
    document.querySelectorAll('.feature-card').forEach(card => {
        const contentType = card.getAttribute('data-content');
        const status = card.querySelector('.card-status');
        
        if (state.unlockedContent.includes(contentType)) {
            status.classList.remove('locked');
            status.classList.add('unlocked');
            status.innerHTML = '<i class="fas fa-unlock"></i> Unlocked!';
        }
    });
    
    updateProgressIndicator();
}

function updateProgressIndicator() {
    const total = 5;
    const unlocked = state.unlockedContent.length;
    const percentage = (unlocked / total) * 100;
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${unlocked} / ${total} Contents Unlocked`;
        
        if (unlocked === total) {
            progressText.innerHTML = `🎉 All Contents Unlocked! You're Amazing! 💕`;
        }
    }
}

// Quiz System
function startQuiz(quizType) {
    const modal = document.getElementById('quizModal');
    const content = document.getElementById('quizContent');
    
    switch (quizType) {
        case 'crossword':
            content.innerHTML = createCrosswordQuiz();
            break;
        case 'trivia':
            content.innerHTML = createTriviaQuiz();
            initializeTriviaQuiz();
            break;
        case 'memory':
            content.innerHTML = createMemoryGame();
            initializeMemoryGame();
            break;
    }
    
    modal.classList.add('active');
}

// Crossword Quiz
function createCrosswordQuiz() {
    return `
        <div class="quiz-container">
            <h2 class="quiz-title">🎯 Love Crossword</h2>
            <p style="margin-bottom: 20px;">Fill in the crossword with words about me!</p>

            <div class="crossword-container">
                <div id="crosswordGrid" style="display: grid; grid-template-columns: repeat(6, 45px); gap: 3px; margin: 20px auto; width: fit-content;">
                    ${generateCrosswordGrid()}
                </div>

                <div style="text-align: left; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
                    <h4 style="margin-bottom: 15px;">Clues:</h4>
                    <div style="display: grid; gap: 10px;">
                        <p><strong>1 Down:</strong> What is my favorite type of perfume? (6 letters)</p>
                        <p><strong>2 Across:</strong> What is my favorite dessert? (5 letters)</p>
                        <p><strong>3 Across:</strong> How would you describe my face? (6 letters)</p>
                        <p><strong>4 Down:</strong> Where did you give me the ring? (6 letters)</p>
                        <p><strong>5 Across:</strong> What is my favorite color? (4 letters)</p>
                    </div>
                </div>
            </div>

            <button class="btn-primary" onclick="checkCrossword()" style="margin-top: 30px;">
                Check Answers
            </button>
        </div>
    `;
}

function generateCrosswordGrid() {
    // Grid layout based on the crossword structure
    // Grid is 6 cols x 10 rows
    const grid = [
        // Row 0
        ['black', 'F', 'black', 'black', 'black', 'black'],
        // Row 1
        ['black', 'L', 'black', 'black', 'black', 'black'],
        // Row 2: MOCHI (horizontal)
        ['M', 'O', 'C', 'H', 'I', 'black'],
        // Row 3
        ['black', 'R', 'black', 'black', 'black', 'black'],
        // Row 4: CANTIK (horizontal)
        ['C', 'A', 'N', 'T', 'I', 'K'],
        // Row 5
        ['black', 'L', 'black', 'black', 'black', 'A'],
        // Row 6
        ['black', 'black', 'black', 'black', 'black', 'W'],
        // Row 7
        ['black', 'black', 'black', 'black', 'black', 'O'],
        // Row 8: PINK (horizontal)
        ['black', 'black', 'P', 'I', 'N', 'K'],
        // Row 9
        ['black', 'black', 'black', 'black', 'black', 'A']
    ];

    let html = '';
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 'black') {
                html += '<div class="crossword-cell black" style="background: #2c3e50;"></div>';
            } else {
                html += `<div class="crossword-cell" style="background: white; border: 2px solid #ddd;">
                    <input type="text" maxlength="1" data-answer="${cell}" data-row="${rowIndex}" data-col="${colIndex}"
                    style="width: 100%; height: 40px; text-align: center; font-size: 1.2rem; font-weight: bold; text-transform: uppercase; border: none; background: transparent;"
                    oninput="this.value = this.value.toUpperCase()">
                </div>`;
            }
        });
    });

    return html;
}

function checkCrossword() {
    const inputs = document.querySelectorAll('#crosswordGrid input[type="text"]');
    let allCorrect = true;

    inputs.forEach(input => {
        const answer = input.getAttribute('data-answer');
        const userAnswer = input.value.toUpperCase();

        if (userAnswer !== answer) {
            allCorrect = false;
            input.style.background = '#fadbd8';
            input.style.color = '#e74c3c';
        } else {
            input.style.background = '#d4edda';
            input.style.color = '#27ae60';
        }
    });

    if (allCorrect) {
        createConfetti();
        setTimeout(() => {
            const content = document.getElementById('quizContent');
            content.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 4rem; margin: 20px 0;">🎉</div>
                    <h3 style="font-size: 2rem; margin-bottom: 15px;">Perfect! You Know Me So Well! 💕</h3>
                    <div class="success-message">
                        Choose which content to unlock
                    </div>
                    <div id="unlockChoices"></div>
                </div>
            `;
            showUnlockChoices();
        }, 1500);
    } else {
        // Show error message
        const errorMsg = document.createElement('p');
        errorMsg.textContent = '❌ Some answers are wrong. Try again!';
        errorMsg.style.cssText = 'color: #e74c3c; margin-top: 20px; font-size: 1.1rem;';

        const container = document.querySelector('.quiz-container');
        const existingError = container.querySelector('.error-msg');
        if (existingError) existingError.remove();

        errorMsg.className = 'error-msg';
        container.appendChild(errorMsg);

        // Reset colors after 2 seconds
        setTimeout(() => {
            inputs.forEach(input => {
                input.style.background = 'transparent';
                input.style.color = 'inherit';
            });
            if (errorMsg) errorMsg.remove();
        }, 2000);
    }
}

// Trivia Quiz
let currentQuestion = 0;
let triviaScore = 0;

const triviaQuestions = [
    {
        question: "1. What's my favorite food?",
        options: ["Noodle soup", "Spicy fried chicken", "Sushi", "Beef teriyaki"],
        correct: 2
    },
    {
        question: "2. What's my favorite coffee?",
        options: ["Latte", "Cappuccino", "Americano lemonade", "Macchiato"],
        correct: 2
    },
    {
        question: "3. What's my favorite movie genre?",
        options: ["Comedy", "Fantasy", "Romance", "Action"],
        correct: 1
    },
    {
        question: "4. What type of vacation do I enjoy most?",
        options: ["Beach", "Mountains", "Big city", "Staycation"],
        correct: 3
    },
    {
        question: "5. Which animal do I dislike the most?",
        options: ["Cats", "Dogs", "Birds", "Fish"],
        correct: 0
    },
    {
        question: "6. What's my favorite season/weather?",
        options: ["Rainy", "Hot", "Cold", "Cloudy"],
        correct: 3
    },
    {
        question: "7. I prefer which time of day…",
        options: ["Morning", "Night", "Both", "It changes"],
        correct: 1
    },
    {
        question: "8. I prefer which type of food…",
        options: ["Sweet", "Salty", "Spicy", "Savory"],
        correct: 2
    },
    {
        question: "9. What's my love language?",
        options: ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time / Physical Touch"],
        correct: 1
    },
    {
        question: "10. When I'm angry, what do I need most?",
        options: ["Silent company", "A hug", "To be left alone first", "Gentle conversation"],
        correct: 0
    },
    {
        question: "11. My strongest way of showing love is…",
        options: ["Small acts of care", "Gentle words", "Loyalty", "Doing things without being asked"],
        correct: 0
    },
    {
        question: "12. I need a partner who can…",
        options: ["Calm my mind", "Be a safe home", "Accept me as I am", "Support my growth"],
        correct: 1
    },
    {
        question: "13. In an argument, I tend to…",
        options: ["Stay silent and shut down", "Cry", "Explain things at length", "Step away to think"],
        correct: 2
    },
    {
        question: "14. My most sensitive point is…",
        options: ["Tone of voice", "Cold attitude", "Being compared", "Feeling unappreciated"],
        correct: 2
    },
    {
        question: "15. What makes me feel loved without doubt?",
        options: ["Consistency", "Honesty", "Gentleness", "Daily attention"],
        correct: 0
    },
    {
        question: "16. The part of myself I find hardest to open up about is…",
        options: ["My feelings", "Old traumas", "My deepest thoughts", "My dark side"],
        correct: 2
    },
    {
        question: "17. A sign I'm truly hurt is…",
        options: ["Sudden silence", "Withdrawal", "Quiet crying", "Pretending to be strong"],
        correct: 2
    },
    {
        question: "18. When I fear losing someone, I usually…",
        options: ["Become more attentive", "Overthink", "Keep everything to myself", "Distance myself out of fear"],
        correct: 1
    },
    {
        question: "19. When I'm emotionally exhausted, I…",
        options: ["Sink into my thoughts", "Cry alone", "Shut myself off", "Seek someone who makes me feel safe"],
        correct: 2
    },
    {
        question: "20. The thing I secretly want to hear most is…",
        options: ["I'm here for you.", "You're not alone.", "I choose you, every day.", "You're enough… just as you are."],
        correct: 2
    },
    {
        question: "21. When I want attention, I usually…",
        options: ["Act cute unconsciously", "Move closer to you", "Say small things to get attention", "Stay quiet but hope you notice"],
        correct: 2
    },
    {
        question: "22. The smallest romantic gesture I love is…",
        options: ["Holding hands", "Hugging from behind", "Leaning on my shoulder", "Playing with my hair"],
        correct: 1
    },
    {
        question: "23. When I'm sulking, the fastest way to cheer me up is…",
        options: ["Give me food", "Hug me", "Act silly", "Apologize cutely"],
        correct: 0
    },
    {
        question: "24. If we play guessing games, I usually lose at…",
        options: ["Remembering names", "Logic", "Speed", "Everything… because I'm watching you"],
        correct: 3
    },
    {
        question: "25. When you tease me, my reaction is usually…",
        options: ["Sulk for 2 minutes", "Retaliate playfully", "Laugh while blushing", "Ugh…"],
        correct: 3
    },
    {
        question: "26. I'm most easily won over if you…",
        options: ["Smile sweetly", "Call my name gently", "Give small attention", "Say you miss me"],
        correct: 1
    },
    {
        question: "27. When I flirt with you, my style is more like…",
        options: ["Acting cool", "Acting innocent", "Pretending not to care but actually care", "Acting sweet but obvious"],
        correct: 2
    },
    {
        question: "28. I feel most comfortable with someone who…",
        options: ["Can have long talks", "Always makes me laugh", "Gives small attention", "Can be honest without sugarcoating"],
        correct: 0
    },
    {
        question: "29. The person who makes me blush the most is…",
        options: ["Close friends", "You", "Cute strangers", "Others"],
        correct: 1
    },
    {
        question: "30. I can't lie about…",
        options: ["Missing you", "Liking you", "Being annoyed at your little quirks", "All of the above"],
        correct: 3
    }
];

function createTriviaQuiz() {
    return `
        <div class="quiz-container">
            <h2 class="quiz-title">❓ How Well Do You Know Me?</h2>
            <p style="margin-bottom: 20px;">Answer these 30 questions about me!</p>
            <div id="triviaContent"></div>
        </div>
    `;
}

function initializeTriviaQuiz() {
    currentQuestion = 0;
    triviaScore = 0;
    showTriviaQuestion();
}

function showTriviaQuestion() {
    const content = document.getElementById('triviaContent');
    const question = triviaQuestions[currentQuestion];
    
    content.innerHTML = `
        <div class="quiz-progress" style="text-align: center; margin-bottom: 20px; color: #7f8c8d;">
            Question ${currentQuestion + 1} of ${triviaQuestions.length}
        </div>
        <div class="quiz-question">${question.question}</div>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <div class="quiz-option" onclick="selectTriviaAnswer(${index})">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
}

function selectTriviaAnswer(selectedIndex) {
    const question = triviaQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === question.correct) {
        triviaScore++;
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < triviaQuestions.length) {
            showTriviaQuestion();
        } else {
            showTriviaResults();
        }
    }, 1500);
}

function showTriviaResults() {
    const content = document.getElementById('triviaContent');
    const percentage = (triviaScore / triviaQuestions.length) * 100;
    
    let message = '';
    if (percentage === 100) {
        message = 'Perfect! You know me so well! 🥰';
    } else if (percentage >= 80) {
        message = 'Amazing! You really pay attention! 💖';
    } else if (percentage >= 60) {
        message = 'Good job! You know me pretty well! 💕';
    } else {
        message = 'We need to spend more time together! 😊';
    }
    
    content.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin: 20px 0;">🎉</div>
            <h3 style="font-size: 2rem; margin-bottom: 15px;">Quiz Complete!</h3>
            <p style="font-size: 1.5rem; color: var(--primary-color); margin-bottom: 10px;">
                ${triviaScore} / ${triviaQuestions.length}
            </p>
            <p style="font-size: 1.1rem; margin-bottom: 30px;">${message}</p>
            <div class="success-message">
                ✨ Choose which content to unlock! ✨
            </div>
            <div id="unlockChoices"></div>
        </div>
    `;
    
    showUnlockChoices();
}

// Memory Game
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

function createMemoryGame() {
    return `
        <div class="quiz-container">
            <h2 class="quiz-title">🎴 Memory Match</h2>
            <p style="margin-bottom: 20px;">Match the pairs!</p>
            <div id="memoryGame" style="display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; justify-content: center; margin: 30px auto;">
            </div>
            <div id="memoryStatus" style="text-align: center; margin-top: 20px; font-size: 1.1rem;"></div>
        </div>
    `;
}

function initializeMemoryGame() {
    const symbols = ['💕', '💖', '💗', '💝', '💘', '❤️', '💓', '🌹'];
    memoryCards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    flippedCards = [];
    matchedPairs = 0;
    
    const game = document.getElementById('memoryGame');
    game.innerHTML = memoryCards.map((symbol, index) => `
        <div class="memory-card" onclick="flipCard(${index})" style="
            width: 80px;
            height: 80px;
            background: var(--primary-color);
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        " data-index="${index}">
            <span style="display: none;">${symbol}</span>
        </div>
    `).join('');
    
    updateMemoryStatus();
}

function flipCard(index) {
    if (flippedCards.length >= 2) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    card.querySelector('span').style.display = 'block';
    card.style.background = 'white';
    flippedCards.push({ index, symbol: memoryCards[index], element: card });
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.symbol === card2.symbol) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === 8) {
            setTimeout(() => {
                document.getElementById('memoryStatus').innerHTML = `
                    <div class="success-message">
                        🎉 Congratulations! Choose which content to unlock!
                    </div>
                    <div id="unlockChoices" style="margin-top: 20px;"></div>
                `;
                showUnlockChoices();
            }, 500);
        }
    } else {
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
        card1.element.querySelector('span').style.display = 'none';
        card2.element.querySelector('span').style.display = 'none';
        card1.element.style.background = 'var(--primary-color)';
        card2.element.style.background = 'var(--primary-color)';
    }
    
    flippedCards = [];
    updateMemoryStatus();
}

function updateMemoryStatus() {
    const status = document.getElementById('memoryStatus');
    if (status) {
        status.textContent = `Matched: ${matchedPairs} / 8`;
    }
}

// Content Display
function showContent(contentType) {
    const modal = document.getElementById('contentModal');
    const content = document.getElementById('modalContent');
    
    let html = '';
    
    switch (contentType) {
        case 'letter':
            html = createLetterContent();
            break;
        case 'music':
            html = createMusicContent();
            break;
        case 'gallery':
            html = createGalleryContent();
            break;
        case 'birthday':
            html = createBirthdayContent();
            break;
        case 'flowers':
            html = createFlowersContent();
            break;
    }

    content.innerHTML = html;
    modal.classList.add('active');
}

function createLetterContent() {
    return `
        <div class="content-display">
            <h2>💌 A Secret Message for You</h2>
            <p style="text-align: center; margin-bottom: 30px; color: #7f8c8d; font-style: italic;">
                Can you decode my hidden love letter?
            </p>
            <div class="cipher-letter" style="
                background: linear-gradient(135deg, #fef5f8 0%, #fff5f9 100%);
                border: 2px dashed var(--primary-color);
                border-radius: 15px;
                padding: 30px;
                font-family: 'Courier New', monospace;
                line-height: 1.8;
                color: #2c3e50;
                font-size: 0.95rem;
                letter-spacing: 0.5px;
                max-height: 500px;
                overflow-y: auto;
                box-shadow: inset 0 2px 10px rgba(255, 107, 157, 0.1);
            ">
                <p>Pdana eo w mqeap iwcey ej pda swu ukq hejcan ej iu pdkqcdpo</p>
                <p>Araj sdaj sa wna wlwnp ukqn lnaoajya baaho jawn</p>
                <p>Hega w cajpha odwzks pdwp bkhhkso ia pdnkqcd pda hecdp wjz pda zwng</p>
                <br>
                <p>E bejz iuoahb ieooejc ukq ej pda oiwhhaop ikiajpo</p>
                <p>Ej pda ywhi kb awnhu iknjejc</p>
                <p>Ej pda okbpjaoo kb arajejc</p>
                <p>Pda baahejc ykiao mqeaphu</p>
                <p>Opawzu wjz swni</p>
                <p>Wo eb iu dawnp naiaixano ukq xabkna iu iejz zkao</p>
                <br>
                <p>Ukq wna hega w lwpeajp heppha hecdp</p>
                <p>Jaran bknyejc, jaran kransdahiejc</p>
                <p>Xqp whswuo ajkqcd pk iwga iu sknhz baah yhawnan wjz okbpan</p>
                <br>
                <p>Kja zwu, sdaj kqn lwpdo iaap ej pda owia lhwya</p>
                <p>E swjp pk hkkg wp ukq ohkshu, sepdkqp nqod</p>
                <p>Happejc pda ikiajp oappha</p>
                <p>Ok pdwp aranu mqeap hkjcejc sa dwra ywnneaz ywj bejwhhu naop</p>
                <br>
                <p>Bkn jks, opwu wo ukq wna</p>
                <p>Lnaoajp ej ukqn cajpha wjz yanpwej swu</p>
                <p>Araj sdaj zeopwjya lhwuo epo heppha pneygo</p>
                <p>Iu dawnp whswuo gjkso sdana ep xahkjco</p>
                <br>
                <p>Sepd wbbaypekj pdwp cnkso oehajphu</p>
            </div>
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #fff9fc; border-radius: 12px;">
                <p style="color: var(--primary-color); font-weight: 600; margin-bottom: 10px;">Good luck decoding!</p>
                <p style="color: #7f8c8d; font-size: 0.9rem;">This message was written with love, just for you.</p>
            </div>
        </div>
    `;
}

function createMusicContent() {
    // ⬇️ TARUH LINK PLAYLIST SPOTIFY DI SINI ⬇️
    const playlistLink = 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'; // ← GANTI DENGAN LINK PLAYLIST ANDA!

    return `
        <div class="content-display">
            <h2>🎵 Our Special Playlist</h2>
            <p style="text-align: center; margin-bottom: 30px; color: #7f8c8d;">
                Songs that remind me of us 💕
            </p>

            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 5rem; margin-bottom: 30px;">🎧</div>

                <a href="${playlistLink}"
                   target="_blank"
                   style="
                       display: inline-block;
                       padding: 20px 50px;
                       background: linear-gradient(135deg, #1DB954, #1ed760);
                       color: white;
                       text-decoration: none;
                       border-radius: 50px;
                       font-size: 1.3rem;
                       font-weight: bold;
                       box-shadow: 0 8px 20px rgba(29, 185, 84, 0.3);
                       transition: all 0.3s ease;
                       cursor: pointer;
                   "
                   onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 30px rgba(29, 185, 84, 0.4)';"
                   onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 8px 20px rgba(29, 185, 84, 0.3)';">
                    🎵 Play Our Playlist on Spotify
                </a>

                <p style="margin-top: 30px; color: #7f8c8d; font-style: italic;">
                    Click to open our playlist in Spotify 💚
                </p>
            </div>

            <div style="margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 15px; text-align: center;">
                <p style="color: #7f8c8d; font-size: 0.95rem; margin: 0;">
                    🎵 Powered by Spotify • Listen together 💕
                </p>
            </div>
        </div>
    `;
}

function createGalleryContent() {
    // Array gambar - Upload foto ke folder images/ di GitHub!
    const images = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.jpg',
        'images/photo5.jpg',
        'images/photo6.jpg'
    ];

    const captions = [
        'Moment 1',    // Ganti dengan caption untuk setiap foto
        'Moment 2',
        'Moment 3',
        'Moment 4',
        'Moment 5',
        'Moment 6'
    ];

    return `
        <div class="content-display">
            <h2>📸 Our Memories Together</h2>
            <p style="text-align: center; margin-bottom: 30px; color: #7f8c8d;">
                Our beautiful moments captured in time 💕
            </p>
            <div class="gallery-grid">
                ${images.map((imgPath, i) => `
                    <div class="gallery-item">
                        <img src="${imgPath}" alt="${captions[i]}" onerror="this.parentElement.innerHTML='<div class=\\'gallery-placeholder\\'>${['💑', '🌹', '💕', '🎂', '🌟', '💝'][i]}</div>'">
                        <div class="gallery-caption">${captions[i]}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function createBirthdayContent() {
    setTimeout(() => {
        createFallingPetals();
    }, 100);
    
    return `
        <div class="content-display birthday-content">
            <h1>🎂 Happy Birthday, Love! 💕</h1>
            <div class="birthday-flower-container" style="position: relative;">
                <div class="birthday-flower">🌹</div>
            </div>
            <div class="birthday-message">
                <p>Happy Birthday to the most amazing person in my life! 🎉</p>
                <br>
                <p>Today we celebrate YOU - your kindness, your beauty (inside and out), your incredible spirit, and all the joy you bring to everyone around you.</p>
                <br>
                <p>I'm so grateful to have you in my life, and I can't wait to celebrate many more birthdays together. Here's to another year of adventures, laughter, and love! 💝</p>
                <br>
                <p>May all your wishes come true today and always! 🎂</p>
                <br>
                <p style="font-size: 1.5rem; margin-top: 30px;">I LOVE YOU! 💕💕💕</p>
            </div>
        </div>
    `;
}

function createFlowersContent() {
    return `
        <div class="content-display">
            <h2>🌸 A Blooming Garden for You</h2>
            <p style="text-align: center; margin-bottom: 30px; color: #7f8c8d;">
                Watch this beautiful garden bloom just for you 💕
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <iframe src="flowers.html"
                    style="
                        width: 100%;
                        height: 600px;
                        border: none;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    "
                    title="Flower Garden Animation">
                </iframe>
            </div>
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #fff9fc; border-radius: 12px;">
                <p style="color: var(--primary-color); font-weight: 600; margin-bottom: 10px;">These flowers bloom with my love for you 🌺</p>
                <p style="color: #7f8c8d; font-size: 0.9rem;">Watch them grow and sway in the breeze...</p>
            </div>
        </div>
    `;
}

// Falling Petals Animation
function createFallingPetals() {
    const container = document.querySelector('.birthday-flower-container');
    if (!container) return;
    
    const petals = ['🌸', '🌺', '🌼', '🌻', '🌷', '💮'];
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = (Math.random() * 100) + '%';
        petal.style.animationDuration = (Math.random() * 3 + 3) + 's';
        petal.style.animationDelay = Math.random() + 's';
        
        container.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 6000);
    }, 500);
}

// Helper Functions
function showUnlockChoices() {
    const allContent = ['letter', 'music', 'gallery', 'birthday', 'flowers'];
    const locked = allContent.filter(c => !state.unlockedContent.includes(c));
    
    if (locked.length === 0) {
        document.getElementById('unlockChoices').innerHTML = `
            <p style="margin: 20px 0; color: #7f8c8d;">All content already unlocked! 🎉</p>
            <button class="btn-primary" onclick="closeModal()">Close</button>
        `;
        return;
    }
    
    const contentNames = {
        letter: '💌 Love Letter',
        music: '🎵 Music Playlist',
        gallery: '📸 Gallery',
        birthday: '🎂 Birthday Wish',
        flowers: '🌸 Flower Garden'
    };
    
    const choicesHTML = locked.map(content => `
        <button class="unlock-choice-btn" onclick="selectUnlock('${content}')">
            ${contentNames[content]}
        </button>
    `).join('');
    
    document.getElementById('unlockChoices').innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 30px;">
            ${choicesHTML}
        </div>
    `;
}

function selectUnlock(contentType) {
    unlockContent(contentType);
    
    // Create confetti effect
    createConfetti();
    
    document.getElementById('unlockChoices').innerHTML = `
        <div class="success-message sparkle" style="margin-top: 20px;">
            Content unlocked successfully!
        </div>
        <button class="btn-primary" onclick="closeModal()" style="margin-top: 20px;">Close</button>
    `;
    
    // Auto update UI
    setTimeout(() => {
        closeModal();
    }, 2000);
}

function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#ffc6d9', '#ff9ff3', '#feca57', '#48dbfb'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

function unlockRandomContent() {
    const allContent = ['letter', 'music', 'gallery', 'birthday', 'flowers'];
    const locked = allContent.filter(c => !state.unlockedContent.includes(c));
    
    if (locked.length > 0) {
        const randomContent = locked[Math.floor(Math.random() * locked.length)];
        unlockContent(randomContent);
    }
}

function showSuccessMessage(message) {
    const content = document.getElementById('quizContent');
    content.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin: 20px 0;">🎉</div>
            <div class="success-message">${message}</div>
            <button class="btn-primary" onclick="closeModal()" style="margin-top: 30px;">Close</button>
        </div>
    `;
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Local Storage
function saveProgress() {
    localStorage.setItem('loveWebsiteProgress', JSON.stringify(state.unlockedContent));
}

function loadSavedProgress() {
    const saved = localStorage.getItem('loveWebsiteProgress');
    if (saved) {
        state.unlockedContent = JSON.parse(saved);
        updateCardStates();
    }
}

// Evasive modal state
let evasiveAttempts = 0;
const MAX_EVASIVE_ATTEMPTS = 7; // Berapa kali button kabur sebelum bisa diklik
let evasiveCleanup = null; // Store cleanup function

function logout() {
    evasiveAttempts = 0;

    // Buat modal custom
    const modal = document.createElement('div');
    modal.id = 'prankModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div id="prankCard" style="
            background: white;
            padding: 50px 40px;
            border-radius: 30px;
            text-align: center;
            max-width: 500px;
            animation: slideIn 0.3s ease;
            position: relative;
        ">
            <div style="font-size: 5rem; margin-bottom: 20px;">😈</div>
            <h2 style="color: #ff6b9d; font-size: 2rem; margin-bottom: 20px;">
                SERIUS NIH MAU LOGOUT?
            </h2>
            <p style="font-size: 1.2rem; color: #555; margin-bottom: 30px; line-height: 1.6;">
                Kamu pikir bisa lepas dari aku? 😏<br>
                <strong>NO YOU CAN'T!</strong><br>
                YOU ARE MINE! 💕
            </p>

            <div id="evasiveButtonsContainer" style="display: flex; gap: 15px; margin-bottom: 20px; position: relative;">
                <button id="logoutYesBtn" class="evasive-btn" style="
                    flex: 1;
                    padding: 15px;
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                    color: white;
                    border: none;
                    border-radius: 15px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">
                    Yes, Logout
                </button>
                <button id="logoutNoBtn" class="evasive-btn" style="
                    flex: 1;
                    padding: 15px;
                    background: white;
                    color: #ff6b9d;
                    border: 2px solid #ff6b9d;
                    border-radius: 15px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">
                    No, Stay
                </button>
            </div>

            <p id="evasiveHint" style="font-size: 0.9rem; color: #999; font-style: italic;">
                Coba deh klik... kalau bisa 😏
            </p>
        </div>
    `;

    document.body.appendChild(modal);

    // Setup evasive behavior and store cleanup function
    evasiveCleanup = setupEvasiveBehavior();
}

function setupEvasiveBehavior() {
    const card = document.getElementById('prankCard');
    const container = document.getElementById('evasiveButtonsContainer');
    const yesBtn = document.getElementById('logoutYesBtn');
    const noBtn = document.getElementById('logoutNoBtn');
    const hint = document.getElementById('evasiveHint');

    if (!card || !container || !yesBtn || !noBtn) {
        return () => {}; // Return empty cleanup function
    }

    let isEvading = true;

    // Function to move card to random position
    function moveCardRandomly() {
        if (!isEvading) return;

        const modal = document.getElementById('prankModal');
        const modalRect = modal.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // Calculate safe boundaries
        const maxX = modalRect.width - cardRect.width - 40;
        const maxY = modalRect.height - cardRect.height - 40;

        const randomX = Math.random() * maxX + 20;
        const randomY = Math.random() * maxY + 20;

        card.style.position = 'absolute';
        card.style.left = randomX + 'px';
        card.style.top = randomY + 'px';
        card.style.transition = 'all 0.3s ease';

        evasiveAttempts++;

        // Update hint message
        const remaining = MAX_EVASIVE_ATTEMPTS - evasiveAttempts;
        if (remaining > 0) {
            hint.textContent = `Wkwkwk kabur! Coba lagi! (${remaining} kali lagi) 😂`;
            hint.style.color = '#ff6b9d';
        } else {
            hint.textContent = `Oke deh... boleh klik sekarang 😤`;
            hint.style.color = '#27ae60';
            isEvading = false;

            // Now make buttons clickable
            yesBtn.onclick = attemptLogout;
            noBtn.onclick = cancelLogout;
        }
    }

    // Mouse proximity detection
    function checkProximity(e) {
        if (!isEvading) return;

        const cardRect = card.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate distance from mouse to card center
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const distance = Math.sqrt(
            Math.pow(mouseX - cardCenterX, 2) +
            Math.pow(mouseY - cardCenterY, 2)
        );

        // If mouse is close to card (within 150px), move it!
        if (distance < 150) {
            moveCardRandomly();
        }
    }

    // Prevent clicks when evading
    function preventClick(e) {
        if (isEvading) {
            e.preventDefault();
            e.stopPropagation();
            moveCardRandomly();
        }
    }

    document.addEventListener('mousemove', checkProximity);
    yesBtn.addEventListener('click', preventClick);
    noBtn.addEventListener('click', preventClick);

    // Center card initially
    card.style.position = 'relative';

    // Return cleanup function
    return function cleanup() {
        document.removeEventListener('mousemove', checkProximity);
        yesBtn.removeEventListener('click', preventClick);
        noBtn.removeEventListener('click', preventClick);
    };
}

// Kalau klik YES (tetap ga bisa logout)
function attemptLogout() {
    const modal = document.getElementById('prankModal');
    modal.querySelector('div').innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 20px;">🔒</div>
        <h2 style="color: #ff6b9d; font-size: 2rem; margin-bottom: 20px;">
            LOGOUT DITOLAK!
        </h2>
        <p style="font-size: 1.2rem; color: #555; margin-bottom: 30px; line-height: 1.6;">
            Hahaha! Kamu pikir gampang? 😂<br>
            Aku ga akan pernah lepas kamu!<br>
            <strong>YOU'RE STUCK WITH ME FOREVER! 💖</strong>
        </p>
        <button onclick="closePrankModal()" style="
            padding: 15px 40px;
            background: linear-gradient(135deg, #ff6b9d, #c44569);
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
        ">
            Fine, I'll Stay 💕
        </button>
    `;
    
    createLoveExplosion();
}

// Kalau klik NO (tetap ga bisa logout juga)
function cancelLogout() {
    const modal = document.getElementById('prankModal');
    modal.querySelector('div').innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 20px;">🥰</div>
        <h2 style="color: #ff6b9d; font-size: 2rem; margin-bottom: 20px;">
            GOOD CHOICE!
        </h2>
        <p style="font-size: 1.2rem; color: #555; margin-bottom: 30px; line-height: 1.6;">
            Emang gabisa ninggalin aku kan? 😊<br>
            Kita terikat selamanya!<br>
            <strong>FOREVER AND EVER! 💕</strong>
        </p>
        <button onclick="closePrankModal()" style="
            padding: 15px 40px;
            background: linear-gradient(135deg, #ff6b9d, #c44569);
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
        ">
            Yes, I'm Yours Forever 💖
        </button>
    `;
    
    createLoveExplosion();
}

// Tutup modal (TIDAK LOGOUT!)
function closePrankModal() {
    const modal = document.getElementById('prankModal');
    if (modal) {
        // Call cleanup function to remove event listeners
        if (evasiveCleanup) {
            evasiveCleanup();
            evasiveCleanup = null;
        }

        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    // Reset evasive attempts
    evasiveAttempts = 0;
}

// Love explosion effect
function createLoveExplosion() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💘', '💓'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = '2.5rem';
            heart.style.zIndex = '9998';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'float-up 2s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
}

// Tambah CSS animations untuk modal
const prankStyles = document.createElement('style');
prankStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideIn {
        from { 
            transform: scale(0.7) translateY(-50px);
            opacity: 0;
        }
        to { 
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(prankStyles);