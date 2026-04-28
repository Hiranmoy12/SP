document.addEventListener("DOMContentLoaded", () => {

    // --- Terminal Presentation Animation ---
    const startTerminalPresentation = async () => {
        const textElement = document.getElementById('terminal-text');
        const overlay = document.getElementById('terminal-overlay');

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        const typeText = async (text, speed = 60) => {
            for (let i = 0; i < text.length; i++) {
                textElement.innerHTML += text.charAt(i);
                await sleep(speed);
            }
        };

        const clearText = () => {
            textElement.innerHTML = '';
        };

        await sleep(1000);
        await typeText("Initializing a special program...", 50);
        await sleep(1500);
        clearText();

        await typeText("Hey...", 80);
        await sleep(1500);
        clearText();

        await typeText("Just wait a few seconds ", 80);
        await sleep(1500);
        clearText();

        await typeText(" I wanted to make this tiny script..", 80);
        await sleep(2000);
        clearText();

        await typeText("(Please wait, opening a magic window...)", 50);
        await sleep(2000);

        // Hide overlay to reveal the beautiful 3D UI
        overlay.classList.add('hide');

        // Reveal text one by one!
        await sleep(1500); // Wait for terminal to fade out completely

        const reveals = document.querySelectorAll('.reveal-text');

        // Let the glowing flower appear first
        reveals[2].classList.add('show'); // The flower is index 2
        await sleep(1500);

        // Greeting
        reveals[0].classList.add('show');
        await sleep(1500);

        // Message
        reveals[1].classList.add('show');
        await sleep(2500);

        // Wishes
        reveals[3].classList.add('show');
        await sleep(1500);

        // SignOff
        reveals[4].classList.add('show');
    };

    // Start the presentation!
    startTerminalPresentation();

    // Fetch Data from Python Backend
    fetch('/api/message')
        .then(response => response.json())
        .then(data => {
            document.getElementById('greeting').innerText = data.greeting;
            document.getElementById('message').innerText = data.message;
            document.getElementById('wishes').innerText = data.wishes;
            document.getElementById('signOff').innerText = data.signOff;
        })
        .catch(err => {
            console.error("Backend not reachable", err);
            document.getElementById('greeting').innerText = "Hey Beautiful...";
            document.getElementById('message').innerText = "Safe travels. I'll miss you!";
        });

    // Generate Floating Bubbles
    const bubblesContainer = document.querySelector('.bubbles');
    const bubbleCount = 25;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // Randomize bubble properties
        const size = Math.random() * 60 + 20; // 20px to 80px
        const left = Math.random() * 100; // 0% to 100%
        const animationDuration = Math.random() * 10 + 10; // 10s to 20s
        const animationDelay = Math.random() * 10; // 0s to 10s

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${animationDuration}s`;
        bubble.style.animationDelay = `${animationDelay}s`;

        bubblesContainer.appendChild(bubble);
    }

    // 3D Tilt Effect with Buttery Smooth Lerping (Linear Interpolation)
    const card = document.getElementById('card');
    const body = document.querySelector('body');

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    body.addEventListener('mousemove', (e) => {
        targetX = (window.innerWidth / 2 - e.pageX) / 25;
        targetY = (window.innerHeight / 2 - e.pageY) / 25;
    });

    body.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        card.style.transition = 'transform 0.5s ease'; // Smooth snap back
    });

    body.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; // Re-enable manual lerping control
    });

    // 60/120fps smooth animation loop
    function animateTilt() {
        // Lerp formula: current += (target - current) * strength (0.1 is beautifully smooth)
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        card.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;
        requestAnimationFrame(animateTilt);
    }

    animateTilt();
});
