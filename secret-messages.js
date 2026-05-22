// ====== TAP ANYWHERE SECRET MESSAGES ======
(function() {
    const secretMessages = [
        "I miss you di 🥺",
        "Come hug me 😭",
        "You are my home 💖",
        "I love chello 💕",
        "You are my world 🌎✨",
        "You are my queen 👑💖",
        "Kiss me deeply 💋🥺",
        "Unnoda smile en medicine 💊💕",
        "One tight hug please 🤗",
        "You make my heart go brrr 💓",
        "Can't stop thinking about you 🫠",
        "En uyiru nee thaan di 🥹",
        "Stay with me forever 💍",
        "You're my favorite notification 📱💖",
        "Miss your voice right now 🎧🥺",
        "Nee illama bore ah iruku 😩💙"
    ];

    document.addEventListener('click', (e) => {
        // Don't trigger on buttons or interactive elements
        if (e.target.closest('button, a, input, .shuffle-button, .music-toggle, .close-meme, .meme-popup, .cta-button, .next-btn, .coupon-card, .envelope')) return;

        const msg = secretMessages[Math.floor(Math.random() * secretMessages.length)];
        const bubble = document.createElement('div');
        bubble.className = 'secret-msg-bubble';
        bubble.textContent = msg;
        bubble.style.left = e.clientX + 'px';
        bubble.style.top = e.clientY + 'px';
        document.body.appendChild(bubble);

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(bubble, {
                scale: 0,
                opacity: 0,
                xPercent: -50,
                yPercent: -50
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to(bubble, {
                        y: "-=60",
                        opacity: 0,
                        duration: 1.5,
                        delay: 1.2,
                        ease: "power1.out",
                        onComplete: () => bubble.remove()
                    });
                }
            });
        } else {
            // Fallback without GSAP
            bubble.style.transform = 'translate(-50%, -50%)';
            bubble.style.opacity = '1';
            setTimeout(() => {
                bubble.style.transition = '1.5s ease';
                bubble.style.opacity = '0';
                bubble.style.transform = 'translate(-50%, calc(-50% - 60px))';
                setTimeout(() => bubble.remove(), 1600);
            }, 1200);
        }
    });

    // ====== TOM IS THINKING ABOUT YOU - TEDDY CHAT POPUP ======
    const thinkingMessages = [
        "I miss your laugh right now 😭💕",
        "Counting seconds to see you again ⏳💖",
        "You're the prettiest girl ever 🌸",
        "Wish I could hug you rn 🤗💙",
        "Thinking about our late night calls 🌙",
        "You + Me = Forever 💍✨",
        "Unnoda one smile ku I'll do anything 🥺",
        "My heart beats only for you 💓",
        "Can we skip time and meet already? 😩💕",
        "You make everything better just by existing 🫶",
        "Next trip together when? 🚗💖",
        "Nee en life la best gift 🎁💙",
        "I love you more than yesterday, less than tomorrow 💞",
        "My queen deserves the whole universe 👑🌌",
        "One kiss from you = my whole day fixed 💋✨"
    ];
    let lastThinkingIdx = -1;

    function showThinkingBubble() {
        let idx = Math.floor(Math.random() * thinkingMessages.length);
        while (idx === lastThinkingIdx && thinkingMessages.length > 1) {
            idx = Math.floor(Math.random() * thinkingMessages.length);
        }
        lastThinkingIdx = idx;

        const existing = document.querySelector('.teddy-chat-popup');
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.className = 'teddy-chat-popup';
        popup.innerHTML = `
            <div class="teddy-chat-header">Tom is thinking about you 💭</div>
            <div class="teddy-chat-body">${thinkingMessages[idx]}</div>
        `;
        document.body.appendChild(popup);

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(popup, {
                y: 30,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            });

            setTimeout(() => {
                gsap.to(popup, {
                    y: 20,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => popup.remove()
                });
            }, 6000);
        } else {
            popup.style.opacity = '1';
            setTimeout(() => {
                popup.style.transition = '0.4s ease';
                popup.style.opacity = '0';
                setTimeout(() => popup.remove(), 500);
            }, 6000);
        }
    }

    // Show first one after 5 seconds, then every 10 seconds
    setTimeout(showThinkingBubble, 5000);
    setInterval(showThinkingBubble, 10000);
})();
