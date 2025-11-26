// =============================================================================
// ELECTRONIC CIRCUIT ANIMATION (BACKGROUND)
// =============================================================================
const canvas = document.getElementById('circuit-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let nodes = [];

const GRID_SIZE = 40;
const PARTICLE_COUNT = 30;
const NODE_COUNT = 15;
const WIRE_COLOR = 'rgba(51, 255, 51, 0.2)'; // Greenish
const NODE_COLOR = 'rgba(155, 89, 182, 0.4)'; // Purple-ish

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Node {
    constructor() {
        this.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
        this.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
        this.size = Math.random() * 3 + 2;
        this.pulse = 0;
        this.pulseSpeed = 0.05 + Math.random() * 0.05;
    }

    draw() {
        this.pulse += this.pulseSpeed;
        const glow = Math.sin(this.pulse) * 0.5 + 0.5;
        
        ctx.fillStyle = NODE_COLOR;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(155, 89, 182, ${glow * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 4 + (glow * 2), 0, Math.PI * 2);
        ctx.stroke();
    }
}

class Electron {
    constructor() { this.reset(); }

    reset() {
        this.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
        this.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
        this.dir = Math.floor(Math.random() * 4); // 0:R, 1:D, 2:L, 3:U
        this.speed = 2;
        this.history = [];
        this.maxLength = 20 + Math.random() * 30;
        this.life = 0;
        this.maxLife = 100 + Math.random() * 100;
    }

    update() {
        this.life++;
        if (this.life > this.maxLife) { this.reset(); return; }

        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLength) this.history.shift();

        if (this.dir === 0) this.x += this.speed;
        else if (this.dir === 1) this.y += this.speed;
        else if (this.dir === 2) this.x -= this.speed;
        else if (this.dir === 3) this.y -= this.speed;

        if (this.x % GRID_SIZE === 0 && this.y % GRID_SIZE === 0) {
            if (Math.random() < 0.2) this.dir = Math.floor(Math.random() * 4);
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        if (this.history.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.strokeStyle = WIRE_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Head
        ctx.fillStyle = '#33ff33'; // Green head
        ctx.fillRect(this.x - 1, this.y - 1, 3, 3);
    }
}

function initCircuit() {
    resize();
    particles = [];
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Electron());
}

function animateCircuit() {
    ctx.clearRect(0, 0, width, height);
    nodes.forEach(n => n.draw());
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateCircuit);
}

// =============================================================================
// HOLOGRAPHIC FACE ANIMATION (HERO SECTION)
// =============================================================================
const holoCanvas = document.getElementById('holo-canvas');
const hCtx = holoCanvas ? holoCanvas.getContext('2d') : null;

let hWidth, hHeight;
let faceDots = [];
let mouseX = 0, mouseY = 0;

// Basic 3D-ish Face Grid Data (Simplified Sphere/Face Projection)
function initFace() {
    if (!holoCanvas) return;
    const rect = holoCanvas.getBoundingClientRect();
    hWidth = holoCanvas.width = rect.width;
    hHeight = holoCanvas.height = rect.height;
    
    faceDots = [];
    const rows = 15;
    const cols = 12;
    const spacing = 20;
    
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            // Create a sphere-like distribution
            const u = i / (rows - 1);
            const v = j / (cols - 1);
            const theta = u * Math.PI; // 0 to PI
            const phi = v * Math.PI; // 0 to PI (half sphere facing forward)
            
            // 3D Coordinates on a sphere
            const radius = 100;
            const x3d = radius * Math.sin(theta) * Math.cos(phi - Math.PI/2);
            const y3d = radius * Math.cos(theta);
            const z3d = radius * Math.sin(theta) * Math.sin(phi - Math.PI/2);
            
            // Only keep front-facing points roughly
            if (z3d > -20) {
                faceDots.push({
                    x: x3d, y: y3d, z: z3d,
                    baseX: x3d, baseY: y3d
                });
            }
        }
    }
}

function animateFace() {
    if (!hCtx) return;
    hCtx.clearRect(0, 0, hWidth, hHeight);
    
    const centerX = hWidth / 2;
    const centerY = hHeight / 2;
    
    // Mouse interaction factor
    // Map mouse position to rotation angles
    const lookX = (mouseX - window.innerWidth/2) * 0.001;
    const lookY = (mouseY - window.innerHeight/2) * 0.001;
    
    hCtx.fillStyle = 'rgba(51, 255, 51, 0.8)';
    
    faceDots.forEach(dot => {
        // Rotate points based on mouse look
        let x = dot.baseX;
        let y = dot.baseY;
        let z = dot.z;
        
        // Y-axis rotation (horizontal look)
        const cosY = Math.cos(lookX);
        const sinY = Math.sin(lookX);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        
        // X-axis rotation (vertical look)
        const cosX = Math.cos(lookY);
        const sinX = Math.sin(lookY);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;
        
        // Perspective projection
        const scale = 300 / (300 + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        
        const size = Math.max(0.5, 2 * scale);
        
        hCtx.beginPath();
        hCtx.arc(projX, projY, size, 0, Math.PI * 2);
        hCtx.fill();
        
        // Connections for holographic look
        faceDots.forEach(other => {
             const dx = dot.baseX - other.baseX;
             const dy = dot.baseY - other.baseY;
             const dist = Math.sqrt(dx*dx + dy*dy);
             if (dist < 25 && Math.random() > 0.98) {
                 hCtx.strokeStyle = `rgba(51, 255, 51, ${0.2 * scale})`;
                 hCtx.beginPath();
                 hCtx.moveTo(projX, projY);
                 // simplified projection for 'other' without re-calc to save perf
                 // (just drawing lines randomly flickering)
                 hCtx.lineTo(projX + (Math.random()-0.5)*10, projY + (Math.random()-0.5)*10);
                 hCtx.stroke();
             }
        });
    });
    
    requestAnimationFrame(animateFace);
}

// =============================================================================
// INITIALIZATION & EVENTS
// =============================================================================
window.addEventListener('resize', () => {
    initCircuit();
    initFace();
});

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

initCircuit();
animateCircuit();
if (holoCanvas) {
    initFace();
    animateFace();
}

// =============================================================================
// UI SCROLL
// =============================================================================
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.index-item').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('onclick').includes(entry.target.id)) {
                    item.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('section').forEach(s => observer.observe(s));


// =============================================================================
// GALLERY DATA (Comprehensive Update)
// =============================================================================
const mediaItems = [
    {
        file: 'IEEE_research.pdf',
        title: 'IEEE Research Paper',
        category: 'Research',
        description: 'Signal processing & neural optimization within Bayesian & RL frameworks. 42% improvement in signal-to-noise ratio.',
        type: 'pdf'
    },
    {
        file: 'main.pdf',
        title: 'EV Grid Stability',
        category: 'Research',
        description: 'Statistical analysis of urban distribution grid stability under high-load EV charging scenarios.',
        type: 'pdf'
    },
    {
        file: 'CERN_Research_Proposal.pdf',
        title: 'CERN Proposal',
        category: 'Research',
        description: 'Non-invasive plasma diagnostic method using Cherenkov radiation. Endorsed by IISER Pune.',
        type: 'pdf'
    },
    {
        file: 'Citation_Principals_Award_Hemang.pdf',
        title: 'Student of the Year',
        category: 'Award',
        description: 'Principal\'s Citation for excellence in academics, leadership, and community service.',
        type: 'pdf'
    },
    {
        file: 'arssdc_trophy.jpg',
        title: 'ARSSDC Runners-Up',
        category: 'Aerospace',
        description: 'Asian Regional Space Settlement Design Competition. Designed settlement for 10,000 inhabitants.',
        type: 'image'
    },
    {
        file: 'arssdc_winner.png',
        title: 'ARSSDC Award',
        category: 'Aerospace',
        description: 'Award recognition for interdisciplinary design excellence.',
        type: 'image'
    },
    {
        file: 'f1_nationals1.jpg',
        title: 'Doppler Racing Car',
        category: 'Engineering',
        description: 'Best Engineered Car at Nationals. Achieved 20m in 1.144s.',
        type: 'image'
    },
    {
        file: 'f1_nationals2.jpg',
        title: 'Doppler Team',
        category: 'Leadership',
        description: 'Leading the 8-member team at National Finals.',
        type: 'image'
    },
    {
        file: 'f1_nationals3vid.mp4',
        title: 'Record Track Run',
        category: 'Engineering',
        description: 'Video of the car setting the competition record.',
        type: 'video'
    },
    {
        file: 'f1_nationals4.jpg',
        title: 'Engineering Booth',
        category: 'Engineering',
        description: 'Showcasing technical documentation and CAD models.',
        type: 'image'
    },
    {
        file: 'f1_solarcar.jpg',
        title: 'Solar Car Proto',
        category: 'Engineering',
        description: 'Experimental renewable energy racing vehicle design.',
        type: 'image'
    },
    {
        file: 'clash_royale_10k_trophies.jpg',
        title: 'Top 2% Global',
        category: 'Strategy',
        description: '13,000+ trophies in Clash Royale. Strategic planning mastery.',
        type: 'image'
    },
    {
        file: 'Intro_to_gen_AI_course_certificate (1).pdf',
        title: 'Gen AI Cert',
        category: 'Certification',
        description: 'Google Cloud Generative AI Fundamentals.',
        type: 'pdf'
    },
    {
        file: 'rocketscience101.png',
        title: 'Rocket Science 101',
        category: 'Certification',
        description: 'University of Michigan Aerospace Fundamentals (98.2%).',
        type: 'image'
    },
    {
        file: 'soccer1.jpg',
        title: 'National Soccer',
        category: 'Sports',
        description: 'Gold Medalist (U17/U19 Nationals).',
        type: 'image'
    },
    {
        file: 'laptop_cooling_proj.jpg',
        title: 'Thermal Mod',
        category: 'Engineering',
        description: 'Custom hardware modification for laptop cooling efficiency.',
        type: 'image'
    },
    {
        file: 'IISER_visit.jpg',
        title: 'IISER Pune',
        category: 'Research',
        description: 'Collaboration meeting for CERN proposal.',
        type: 'image'
    },
    {
        file: 'MU20_debate_asias_largest.jpg',
        title: 'MU20 Debate',
        category: 'Leadership',
        description: 'Speaking at Asia\'s largest international debate conference.',
        type: 'image'
    },
    {
        file: 'selfdefence_bluebelt.jpg',
        title: 'Martial Arts',
        category: 'Sports',
        description: 'Blue Belt Certification.',
        type: 'image'
    },
    {
        file: 'spUN_debate.png',
        title: 'Space UN Cert',
        category: 'Leadership',
        description: 'Outstanding Performance Award.',
        type: 'image'
    },
    {
        file: 'other_certificates.pdf',
        title: 'Misc Awards',
        category: 'Awards',
        description: 'Collection of various academic and extracurricular achievements.',
        type: 'pdf'
    }
];

const galleryGrid = document.getElementById('gallery-grid');
const modal = document.getElementById('modal');
const modalMedia = document.getElementById('modalMedia');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDesc = document.getElementById('modalDescription');

function initGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    
    mediaItems.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'gallery-item';
        el.style.animationDelay = `${index * 0.05}s`;
        
        // If PDF, render a "Card" instead of an image
        if (item.type === 'pdf') {
            el.innerHTML = `
                <div class="pdf-card">
                    <div class="pdf-icon"></div>
                    <h3 style="color:#fff; font-size:0.9rem; margin-bottom:5px;">${item.title}</h3>
                    <div style="color:var(--accent-green); font-size:0.7rem;">${item.category.toUpperCase()}</div>
                    <button class="pdf-btn">ACCESS FILE</button>
                </div>
            `;
            // Click opens PDF in new tab
            el.addEventListener('click', () => window.open(item.file, '_blank'));
        } else {
            // Image/Video logic
            let mediaHtml = '';
            if (item.type === 'video') {
                mediaHtml = `<video src="${item.file}" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`;
            } else {
                mediaHtml = `<img src="${item.file}" alt="${item.title}" loading="lazy">`;
            }
            
            el.innerHTML = `
                ${mediaHtml}
                <div class="gallery-info">
                    <div style="color: var(--accent-green); font-size: 0.75rem; letter-spacing: 1px;">${item.category.toUpperCase()}</div>
                    <h3 style="font-size: 1rem; color: #fff;">${item.title}</h3>
                </div>
            `;
            el.addEventListener('click', () => openModal(item));
        }
        
        galleryGrid.appendChild(el);
    });
}

function openModal(item) {
    modal.style.display = 'flex';
    modalTitle.textContent = item.title;
    modalCategory.textContent = item.category;
    modalDesc.textContent = item.description;
    modalMedia.innerHTML = '';
    
    if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.file;
        video.controls = true;
        video.autoplay = true;
        modalMedia.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = item.file;
        modalMedia.appendChild(img);
    }
}

function closeModal() {
    modal.style.display = 'none';
    modalMedia.innerHTML = '';
}

window.onclick = function(e) {
    if (e.target == modal) closeModal();
}

document.addEventListener('DOMContentLoaded', initGallery);
