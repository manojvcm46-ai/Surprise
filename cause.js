// Reasons database
const reasons = [
    { 
        text: "Every moment with you feels like my favorite dream come true. I never knew someone could make my life this beautiful until you came into it. 🌸", 
        emoji: "💖",
        gif: "gifs/gif1.gif"
    },
    { 
        text: "No matter how hard my day gets, your smile alone is enough to heal everything inside my heart. You are truly my safest place. 🥺💙", 
        emoji: "💞",
        gif: "gifs/gif2.gif"
    },
    { 
        text: "I don’t just love you… I love the peace, happiness, and comfort I feel whenever I’m with you. You became my whole world slowly and beautifully. ✨", 
        emoji: "🌙",
        gif: "gifs/gif1.gif"
    },
    { 
        text: "In every lifetime, in every universe, I would still search for you and choose you again without even thinking twice. 🫶", 
        emoji: "💕",
        gif: "gifs/gif2.gif"
    },
    { 
        text: "Your love changed me in the most beautiful way possible. You made me softer, happier, stronger, and more complete than ever before. 💖", 
        emoji: "🌸",
        gif: "gifs/gif1.gif"
    },
    { 
        text: "Even our silly fights, random calls, teasing moments, and emotional talks became precious memories I’ll keep forever in my heart. 🥹", 
        emoji: "💌",
        gif: "gifs/gif2.gif"
    },
    { 
        text: "I may not always express it perfectly, but trust me… you are the best thing that has ever happened in my life. 💙", 
        emoji: "✨",
        gif: "gifs/gif1.gif"
    },
    { 
        text: "Loving you is not just a feeling anymore… it became my daily happiness, my comfort zone, and my future dream. 🌎", 
        emoji: "💖",
        gif: "gifs/gif2.gif"
    },
    { 
        text: "I want more rainy rides, late-night talks, random trips, warm hugs, and peaceful moments with you for the rest of my life. 🚗💕", 
        emoji: "🌧️",
        gif: "gifs/gif1.gif"
    },
    { 
        text: "One day, all these video calls will turn into real mornings together, real hugs, real laughter, and a forever life beside each other. 💍", 
        emoji: "🥺",
        gif: "gifs/gif2.gif"
    },
    { 
        text: "You are not just my girlfriend… you are my peace, my happiness, my home, and the person I want in every chapter of my future. ✨", 
        emoji: "💞",
        gif: "gifs/gif1.gif"
    },
    { 
        text: "No matter what happens in life, one thing will always stay constant — my love for you will never fade. Ever. 💙", 
        emoji: "💖",
        gif: "gifs/gif2.gif"
    }
];

// Cat Memes Database
const memes = [
    { text: "Me after your one text 😭💖", gif: "gifs/gif1.gif" },
    { text: "Average mood after seeing your selfie 📈", gif: "gifs/gif2.gif" },
    { text: "Me pretending not to miss you 🥲", gif: "gifs/gif1.gif" },
    { text: "POV: You replied in 2 seconds 😭", gif: "gifs/gif2.gif" }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Unicode-safe Typewriter function
function typeWriter(element, text, speed, callback) {
    const chars = Array.from(text);
    let i = 0;
    
    // Create text span and cursor span
    const textSpan = document.createElement('span');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typing-cursor';
    cursorSpan.textContent = '|';
    
    element.appendChild(textSpan);
    element.appendChild(cursorSpan);
    
    function type() {
        if (i < chars.length) {
            textSpan.textContent += chars[i];
            i++;
            setTimeout(type, speed);
        } else {
            cursorSpan.remove();
            if (callback) callback();
        }
    }
    
    type();
}

// Create reason card with gif and typing effect
function createReasonCard(reason, onComplete) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `<span style="font-size: 1.4rem; margin-right: 8px;">${reason.emoji}</span>`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out",
        onComplete: () => {
            // Start typing once the card pops up
            typeWriter(text, reason.text, 25, onComplete);
        }
    });

    return card;
}

// Trigger Random Cat Meme Popup
function triggerRandomMeme() {
    const popup = document.getElementById('meme-popup');
    const img = document.getElementById('meme-img');
    const caption = document.getElementById('meme-caption');
    
    if (popup && img && caption) {
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        img.src = randomMeme.gif;
        caption.textContent = randomMeme.text;
        
        gsap.killTweensOf(popup);
        popup.style.display = 'block';
        popup.style.opacity = 1;

        // Auto fadeout after 3.5s
        setTimeout(() => {
            gsap.to(popup, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    popup.style.display = 'none';
                    popup.style.opacity = 1;
                }
            });
        }, 3500);
    }
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        // Pass complete callback that handles re-enabling clicks and final button/ending checks
        const card = createReasonCard(reasons[currentReasonIndex], () => {
            isTransitioning = false;

            // Check if we should transform the button to final glowing button
            if (currentReasonIndex === reasons.length) {
                gsap.to(shuffleButton, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "elastic.out",
                    onComplete: () => {
                        shuffleButton.textContent = "Thank You For Existing 💖";
                        shuffleButton.classList.add('story-mode', 'final-thank-you');
                    }
                });

                // Animate the ending-section!
                const teddyHug = document.querySelector('.teddy-hug');
                const endingText = document.querySelector('.ending-text');
                
                if (teddyHug && endingText) {
                    gsap.timeline()
                        .to(teddyHug, {
                            scale: 1,
                            duration: 0.8,
                            ease: "back.out(1.7)",
                            delay: 0.5
                        })
                        .to(endingText, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out"
                        }, "-=0.3");
                }
            }
        });
        
        reasonsContainer.appendChild(card);
        
        // Gently scroll the new card into view only if it's below the fold
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Trigger Cat Meme Popup (45% probability)
        if (Math.random() < 0.45) {
            setTimeout(triggerRandomMeme, 300);
        }

        // Create floating elements
        createFloatingElement();
    } else {
        // Fade out body and navigate smoothly to the next page (last.html)
        const music = document.getElementById("bgMusic");
        if (music) {
            gsap.to(music, { volume: 0, duration: 1, ease: "power1.inOut" });
        }
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html' + (window._a ? '?access=true' : '');
            }
        });
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Close meme popup on clicking close button
const closeMeme = document.getElementById('close-meme');
if (closeMeme) {
    closeMeme.addEventListener('click', () => {
        const popup = document.getElementById('meme-popup');
        if (popup) popup.style.display = 'none';
    });
}

// Floating elements function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom spotlight glow trail follow cursor
const cursor = document.querySelector('.custom-cursor');
const mouseGlow = document.querySelector('.mouse-glow');

document.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
        gsap.to(mouseGlow, {
            x: e.clientX - 150,
            y: e.clientY - 150,
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
    if (e.target.closest('a, button, .interactive, .hoverable, .cta-button, .shuffle-button, .close-meme, .music-toggle, [role="button"]')) {
        if (cursor) cursor.classList.add('hovered');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .interactive, .hoverable, .cta-button, .shuffle-button, .close-meme, .music-toggle, [role="button"]')) {
        if (cursor) cursor.classList.remove('hovered');
    }
});

// ====== ROMANTIC GIF SHOWER ======
const gifs = [
    "gifs/gif1.gif",
    "gifs/gif2.gif",
    "gifs/gif3.gif",
    "gifs/gif4.gif",
    "gifs/gif5.gif",
    "gifs/gif6.gif",
    "gifs/gif7.gif",
    "gifs/gif8.gif",
    "gifs/gif9.gif",
    "gifs/gif10.gif",
    "gifs/gif11.gif",
    "gifs/gif12.gif"
];

let lastGifIndex = -1;

function getRandomGif() {
    let index = Math.floor(Math.random() * gifs.length);
    while (index === lastGifIndex && gifs.length > 1) {
        index = Math.floor(Math.random() * gifs.length);
    }
    lastGifIndex = index;
    return gifs[index];
}

// Click and romantic GIF shower effect (Click Hearts completely removed)
document.addEventListener('click', (e) => {
    if (e.target.closest('.shuffle-button') && currentReasonIndex === reasons.length) {
        return; // Avoid intercepting cta redirects
    }

    // 1. Spawn a romantic floating GIF
    const gif = document.createElement("img");
    gif.src = getRandomGif();
    gif.classList.add("floating-gif");
    gif.style.left = e.clientX + "px";
    gif.style.top = e.clientY + "px";

    // Random rotation and scale for premium feel
    const randomRotation = (Math.random() - 0.5) * 40; // -20deg to 20deg
    const randomScale = Math.random() * 0.3 + 0.85;     // 0.85 to 1.15

    gsap.set(gif, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.3,
        rotation: randomRotation,
        opacity: 0
    });

    document.body.appendChild(gif);

    // Beautiful smooth floating animation and scaling via GSAP
    gsap.timeline()
        .to(gif, {
            opacity: 1,
            scale: randomScale,
            duration: 0.5,
            ease: "back.out(1.7)"
        })
        .to(gif, {
            y: "-=220",
            rotation: randomRotation + (Math.random() > 0.5 ? 20 : -20),
            scale: randomScale * 1.3,
            opacity: 0,
            duration: 2.5,
            ease: "power1.out",
            delay: 0.3,
            onComplete: () => gif.remove()
        });
});

// Floating love words drifting up
const loveTexts = [
    "pretty girl 💖",
    "mine 😌",
    "cutieeee 🌸",
    "my peace 🕊️",
    "pookie 💌",
    "baby 💕",
    "my world 🌎"
];

function spawnLoveText() {
    const t = document.createElement('div');
    t.className = 'floating-love-text';
    t.innerHTML = loveTexts[Math.floor(Math.random() * loveTexts.length)];
    t.style.left = Math.random() * 80 + 10 + 'vw';
    t.style.bottom = '-50px';
    t.style.fontSize = (Math.random() * 6 + 14) + 'px';
    document.body.appendChild(t);

    gsap.to(t, {
        y: -window.innerHeight - 100,
        x: (Math.random() - 0.5) * 150,
        rotation: (Math.random() - 0.5) * 35,
        opacity: 0,
        duration: 8 + Math.random() * 4,
        ease: "power1.out",
        onComplete: () => t.remove()
    });
}

// Initial background float loops
setInterval(createFloatingElement, 2000);
setInterval(spawnLoveText, 3000);

// Start background music and configure mute/unmute
window.addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    if (music && music.paused) {
        music.volume = 0;
        music.play().catch(e => console.log(e));
    }
}, { once: true });

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

window.addEventListener('load', () => {
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.volume = 0;
        audio.addEventListener('play', () => {
            gsap.to(audio, { volume: 0.4, duration: 1.5, ease: "power1.out" });
        });
        audio.play().catch(err => {
            console.log("Autoplay blocked, waiting for user click.");
        });
    }
});