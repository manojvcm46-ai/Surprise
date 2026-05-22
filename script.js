// ==========================================
// PREMIUM ROMANTIC INTERACTION & TIMERS
// ==========================================

// Global DOM references
const cursor = document.querySelector('.custom-cursor');
const mouseGlow = document.querySelector('.mouse-glow');
const audio = document.getElementById('bgMusic');
const daysElement = document.getElementById('days-val');
const hoursElement = document.getElementById('hours-val');
const minutesElement = document.getElementById('minutes-val');
const secondsElement = document.getElementById('seconds-val');

// 1. Mouse Glow Spotlight & Custom Cursor Follower
document.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
        gsap.to(mouseGlow, {
            x: e.clientX - 225,
            y: e.clientY - 225,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Add hover effects for buttons/cards to make cursor grow
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .interactive, .hoverable, .cta-button, .choice-btn, .option-btn, .coupon-inner, .seal, .envelope-flap, .cta-button-pill, .love-counter-card, .music-toggle, [role="button"]')) {
        if (cursor) cursor.classList.add('hovered');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .interactive, .hoverable, .cta-button, .choice-btn, .option-btn, .coupon-inner, .seal, .envelope-flap, .cta-button-pill, .love-counter-card, .music-toggle, [role="button"]')) {
        if (cursor) cursor.classList.remove('hovered');
    }
});

// 2. Gesture Trigger for Music Autoplay (Click Hearts completely removed)
document.addEventListener('click', (e) => {
    // Prevent particle trigger when clicking on hidden overlays
    const introScreen = document.querySelector('.intro-screen');
    if (introScreen && introScreen.style.display !== 'none' && e.target.closest('.intro-screen')) {
        return;
    }

    // Attempt to play music on user gesture to bypass autoplay blocks
    tryPlayMusic();
});

// 3. Audio Handlers (Autoplay Bypass & Mute/Unmute toggle)
function tryPlayMusic() {
    const music = document.getElementById("bgMusic");
    if (music && music.paused) {
        music.volume = 0;
        music.play().catch(e => console.log("Audio autoplay deferred until gesture:", e));
    }
}

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if (music) {
        if (music.paused) {
            music.volume = 0;
            music.play().catch(e => console.log(e));
        } else {
            music.pause();
        }
    }
}

// Set initial volume safely on load and add play fade-in listener
window.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bgMusic");
    if (music) {
        music.volume = 0;
        music.addEventListener('play', () => {
            gsap.to(music, { volume: 0.4, duration: 1.5, ease: "power1.out" });
        });
    }
});

// 4. Live Relationship Counter Ticker
const relationshipStartDate = new Date("2022-05-15T00:00:00");

function updateLoveTimer() {
    const now = new Date();
    const diffMs = now - relationshipStartDate;

    // Standard Math conversion logic
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const remainderHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const remainderMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const remainderSeconds = Math.floor((diffMs / 1000) % 60);

    // Update markup
    if (daysElement) daysElement.textContent = totalDays;
    if (hoursElement) hoursElement.textContent = String(remainderHours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(remainderMinutes).padStart(2, '0');
    if (secondsElement) secondsElement.textContent = String(remainderSeconds).padStart(2, '0');
}

// 5. Generate Random Drifting Romantic Background Particles
const floatSymbols = ['💖', '💕', '🌸', '💫', '💙', '✨', '🎈'];
function spawnFloatingHearts() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = floatSymbols[Math.floor(Math.random() * floatSymbols.length)];
    
    const startX = Math.random() * window.innerWidth;
    heart.style.left = startX + 'px';
    heart.style.bottom = '-40px';
    heart.style.fontSize = (Math.random() * 14 + 18) + 'px';
    heart.style.opacity = '0';
    document.body.appendChild(heart);

    gsap.to(heart, {
        y: -window.innerHeight - 80,
        x: startX + (Math.random() - 0.5) * 200, // sway sideways
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.5 + 0.35,
        duration: 9 + Math.random() * 6,
        ease: "none",
        onComplete: () => heart.remove()
    });
}

// 6. Spawn Custom Instagram-Style Floating Love Words
const loveWords = [
    "pretty girl 💖",
    "my world 🌎",
    "cutieeee 💕",
    "mine 😌"
];

function spawnLoveTexts() {
    const textNode = document.createElement('div');
    textNode.className = 'floating-love-text';
    textNode.innerHTML = loveWords[Math.floor(Math.random() * loveWords.length)];
    
    const startX = 10 + Math.random() * 80; // percent
    textNode.style.left = startX + 'vw';
    textNode.style.bottom = '-50px';
    textNode.style.fontSize = (Math.random() * 5 + 16) + 'px';
    textNode.style.opacity = '0';
    document.body.appendChild(textNode);

    gsap.to(textNode, {
        y: -window.innerHeight - 100,
        x: (Math.random() - 0.5) * 120, // gentle wavy horizontal path
        rotation: (Math.random() - 0.5) * 40,
        opacity: Math.random() * 0.6 + 0.45,
        duration: 10 + Math.random() * 5,
        ease: "power1.out",
        onComplete: () => textNode.remove()
    });
}

// 7. Transition Intro Screen to Premium Birthday Landing Page
function startMainPage() {
    // 1. Trigger audio play automatically (if permissions allow)
    tryPlayMusic();

    // 2. Make main layout container interactive and visible
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
        mainContainer.style.pointerEvents = 'auto';
        gsap.to(mainContainer, {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power3.out"
        });
    }

    // 3. Animate individual blocks within the main screen
    gsap.from('.love-counter-card', {
        scale: 0.92,
        opacity: 0,
        duration: 1.5,
        y: 40,
        ease: "back.out(1.2)",
        delay: 0.2
    });

    gsap.from('.birthday-message-section', {
        opacity: 0,
        y: 35,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.from('.cta-button-pill', {
        scale: 0.8,
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
        delay: 0.8
    });

    gsap.from('.cake-btn', {
        scale: 0.8,
        opacity: 0,
        y: 35,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
        delay: 1.0
    });

    // 4. Fire continuous looping generators
    updateLoveTimer();
    setInterval(updateLoveTimer, 1000);
    
    // Spawn floating elements at spaced intervals
    setInterval(spawnFloatingHearts, 1100);
    setInterval(spawnLoveTexts, 2600);
}

// 8. Handle Window Initialization and Automatic 3s cinematic transition
window.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.querySelector('.intro-screen');
    const introTitle = document.querySelector('.intro-title');
    const introSub = document.querySelector('.intro-subtext');

    // Auto music resume on initial click anywhere
    document.addEventListener('click', tryPlayMusic, { once: true });

    // Animate initial entrance of intro text elements
    if (introTitle && introSub) {
        gsap.from(introTitle, {
            scale: 0.85,
            opacity: 0,
            duration: 1.8,
            ease: "power2.out"
        });
        gsap.from(introSub, {
            opacity: 0,
            y: 10,
            duration: 1.2,
            delay: 0.8
        });
    }

    // Wait 3 seconds, then smoothly transition and reveal main content
    setTimeout(() => {
        if (introScreen) {
            // Animate fade-out transition
            gsap.to(introScreen, {
                opacity: 0,
                duration: 2.0,
                ease: "power2.inOut",
                onComplete: () => {
                    introScreen.style.display = 'none';
                    startMainPage();
                }
            });
        } else {
            startMainPage();
        }
    }, 3000);
});

