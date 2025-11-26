// -----------------------------------------------------------------------------
// DYNAMIC CANVAS BACKGROUND (Retro Tech Dark Mode)
// -----------------------------------------------------------------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 180; // Dense but distinct
let mouse = { x: -1000, y: -1000 };

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        // Random opacity for depth
        this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance;
            // Push away
            this.x -= forceDirectionX * force * 2;
            this.y -= forceDirectionY * force * 2;
        } else {
            // Return to flow
            if (this.x !== this.baseX) {
                const dx = this.x - this.baseX;
                this.x -= dx/60;
            }
            if (this.y !== this.baseY) {
                const dy = this.y - this.baseY;
                this.y -= dy/60;
            }
        }

        // Screen Wrapping
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw() {
        ctx.fillStyle = `rgba(200, 200, 200, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = dx * dx + dy * dy;
            
            // Connect close particles
            if (distance < (width/9) * (height/9)) {
                let opacityValue = 1 - (distance/12000);
                ctx.strokeStyle = `rgba(100, 100, 100, ${opacityValue * 0.4})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', () => {
    initCanvas();
    particles = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Start Animation
initCanvas();
for (let i = 0; i < particleCount; i++) particles.push(new Particle());
animate();


// -----------------------------------------------------------------------------
// GALLERY DATA & LOGIC
// -----------------------------------------------------------------------------
const mediaItems = [
    {
        file: 'IEEE_research.pdf',
        title: 'IEEE Research Paper',
        category: 'Research',
        description: 'Signal processing & neural optimization within Bayesian & RL frameworks. Includes analysis on noise reduction in high-frequency signal transmission.',
        type: 'pdf'
    },
    {
        file: 'CERN_Research_Proposal.pdf',
        title: 'CERN Proposal',
        category: 'Research',
        description: 'Plasma diagnostic method utilizing Cherenkov radiation for non-invasive mapping. Endorsed by the Head of Physics at IISER Pune.',
        type: 'pdf'
    },
    {
        file: 'arssdc_trophy.jpg',
        title: 'ARSSDC Runners-Up',
        category: 'Aerospace',
        description: 'Team trophy from the Asian Regional Space Settlement Design Competition. Designed a settlement for 10,000 inhabitants.',
        type: 'image'
    },
    {
        file: 'arssdc_winner.png',
        title: 'ARSSDC Award',
        category: 'Aerospace',
        description: 'Recognition for interdisciplinary design excellence, balancing structural integrity with human-centric systems.',
        type: 'image'
    },
    {
        file: 'f1_nationals1.jpg',
        title: 'Doppler Racing',
        category: 'Engineering',
        description: 'National Finals car submission. Won Best Engineer Award. Car achieved 20m in 1.144s.',
        type: 'image'
    },
    {
        file: 'f1_nationals3vid.mp4',
        title: 'Record Car Run',
        category: 'Engineering',
        description: 'Video of the custom-engineered car setting a competition record on the track.',
        type: 'video'
    },
    {
        file: 'f1_solarcar.jpg',
        title: 'Solar Car Prototype',
        category: 'Engineering',
        description: 'Experimental design linking renewable energy systems with racing aerodynamics.',
        type: 'image'
    },
    {
        file: 'clash_royale_10k_trophies.jpg',
        title: 'Top 2% Global',
        category: 'Strategy',
        description: 'Achieved 13,000+ trophies in Clash Royale. Demonstrates long-term strategic planning and meta-adaptation.',
        type: 'image'
    },
    {
        file: 'Citation_Principals_Award_Hemang.pdf',
        title: 'Student of the Year',
        category: 'Award',
        description: 'Principal\'s Citation for excellence in academics, leadership, and community service.',
        type: 'pdf'
    },
    {
        file: 'Intro_to_gen_AI_course_certificate (1).pdf',
        title: 'Gen AI Cert',
        category: 'Certification',
        description: 'Google Cloud certification in Generative AI fundamentals.',
        type: 'pdf'
    },
    {
        file: 'rocketscience101.png',
        title: 'Rocket Science 101',
        category: 'Certification',
        description: 'University of Michigan aerospace fundamentals course (98.2%).',
        type: 'image'
    },
    {
        file: 'soccer1.jpg',
        title: 'National Soccer',
        category: 'Sports',
        description: 'Gold medalist at U17/U19 National tournaments.',
        type: 'image'
    },
    {
        file: 'selfdefence_bluebelt.jpg',
        title: 'Martial Arts',
        category: 'Sports',
        description: 'Blue Belt certification in Self Defense.',
        type: 'image'
    }
    // Add more items here as needed
];

// Gallery Population Logic
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-grid');
    const isGalleryPage = window.location.pathname.includes('gallery.html');

    // Only run on gallery page
    if (isGalleryPage && galleryContainer) {
        mediaItems.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'gallery-item';
            
            // Staggered animation
            el.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            el.style.opacity = '0';

            let contentHtml = '';
            
            if (item.type === 'image' || item.type === 'pdf') {
                // Use placeholder or actual image
                let src = item.file;
                if(item.type === 'pdf') src = item.file.replace('.pdf', '.jpg'); // Simple fallback logic
                
                contentHtml = `<img src="${src}" alt="${item.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDRkZGM2IiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0xMyAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOUwxMyAyeiIvPjwvc3ZnPg=='">`;
            } else if (item.type === 'video') {
                contentHtml = `<video src="${item.file}" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`;
            }

            el.innerHTML = `
                ${contentHtml}
                <div class="gallery-overlay">
                    <h3 style="color:var(--accent-green); font-family:var(--font-main); font-size:1rem; margin-bottom:5px;">${item.title}</h3>
                    <p style="color:#ccc; font-size:0.85rem; line-height:1.4;">${item.description}</p>
                </div>
            `;
            
            el.addEventListener('click', () => openModal(item));
            galleryContainer.appendChild(el);
        });
    }
});

// Modal Logic
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');

function openModal(item) {
    const mediaBox = document.getElementById('modalMedia');
    const title = document.getElementById('modalTitle');
    const cat = document.getElementById('modalCategory');
    const desc = document.getElementById('modalDescription');

    mediaBox.innerHTML = '';
    title.textContent = item.title;
    cat.textContent = `[ ${item.category.toUpperCase()} ]`;
    desc.textContent = item.description;

    if (item.type === 'image') {
        mediaBox.innerHTML = `<img src="${item.file}" style="width:100%; height:auto; display:block;">`;
    } else if (item.type === 'video') {
        mediaBox.innerHTML = `<video src="${item.file}" controls autoplay style="width:100%; height:auto; display:block;"></video>`;
    } else if (item.type === 'pdf') {
        mediaBox.innerHTML = `<embed src="${item.file}" type="application/pdf" style="width:100%; height:60vh;">`;
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

if (closeBtn) {
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('modalMedia').innerHTML = '';
    };
}

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('modalMedia').innerHTML = '';
    }
};

// Animation Styles via JS injection for simplicity
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
    to { opacity: 1; }
}
`;
document.head.appendChild(style);
