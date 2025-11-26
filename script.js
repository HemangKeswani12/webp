// =============================================================================
// PHYSICAL CABLE ANIMATION (BACKGROUND)
// =============================================================================
const canvas = document.getElementById('circuit-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let cables = [];

const CABLE_COUNT = 8;
const CABLE_COLOR = 'rgba(100, 100, 110, 0.3)'; 
const SIGNAL_COLOR = 'rgba(155, 89, 182, 0.6)'; // Purple pulses

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Cable {
    constructor(y) {
        this.y = y;
        this.width = Math.random() * 3 + 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.offset = Math.random() * width;
        this.signals = [];
        
        // Generate signals
        const signalCount = Math.floor(Math.random() * 3) + 1;
        for(let i=0; i<signalCount; i++) {
            this.signals.push({
                x: Math.random() * width,
                speed: Math.random() * 2 + 1
            });
        }
    }

    update() {
        this.signals.forEach(s => {
            s.x += s.speed;
            if (s.x > width) s.x = -100;
        });
    }

    draw() {
        // Draw cable
        ctx.fillStyle = CABLE_COLOR;
        ctx.fillRect(0, this.y, width, this.width);
        
        // Draw signals
        ctx.fillStyle = SIGNAL_COLOR;
        this.signals.forEach(s => {
            ctx.fillRect(s.x, this.y, 40, this.width);
        });
        
        // Draw "Nodes" periodically
        ctx.fillStyle = '#333';
        for(let i=0; i<width; i+=200) {
            ctx.fillRect(i, this.y - 2, 10, this.width + 4);
        }
    }
}

function initCables() {
    resize();
    cables = [];
    for(let i=0; i<CABLE_COUNT; i++) {
        cables.push(new Cable(Math.random() * height));
    }
}

function animateCables() {
    ctx.clearRect(0, 0, width, height);
    cables.forEach(c => {
        c.update();
        c.draw();
    });
    requestAnimationFrame(animateCables);
}

// =============================================================================
// 3D INTERACTIVE OBJECT - "THE CORE" (Spinning Reactor)
// =============================================================================
const holoCanvas = document.getElementById('holo-canvas');
const hCtx = holoCanvas ? holoCanvas.getContext('2d') : null;

let hWidth, hHeight;
let rings = [];
let mouseX = 0, mouseY = 0;

function initCore() {
    if (!holoCanvas) return;
    const rect = holoCanvas.getBoundingClientRect();
    hWidth = holoCanvas.width = rect.width;
    hHeight = holoCanvas.height = rect.height;
    
    rings = [];
    // 3 concentric rings
    for(let i=0; i<3; i++) {
        rings.push({
            radius: 60 + (i * 40),
            angleX: Math.random() * Math.PI,
            angleY: Math.random() * Math.PI,
            speedX: (Math.random() * 0.02) + 0.01,
            speedY: (Math.random() * 0.02) + 0.01
        });
    }
}

function project(x, y, z) {
    const scale = 400 / (400 + z);
    return {
        x: hWidth/2 + x * scale,
        y: hHeight/2 + y * scale,
        scale: scale
    };
}

function animateCore() {
    if (!hCtx) return;
    hCtx.clearRect(0, 0, hWidth, hHeight);
    
    // Mouse interaction affects rotation speed
    const mouseFactorX = (mouseX - window.innerWidth/2) * 0.0001;
    const mouseFactorY = (mouseY - window.innerHeight/2) * 0.0001;

    rings.forEach((ring, index) => {
        ring.angleX += ring.speedX + mouseFactorY;
        ring.angleY += ring.speedY + mouseFactorX;
        
        hCtx.beginPath();
        for(let i=0; i<=360; i+=5) {
            const theta = i * Math.PI / 180;
            
            // Ring coordinates
            let x = ring.radius * Math.cos(theta);
            let y = ring.radius * Math.sin(theta);
            let z = 0;
            
            // Rotate X
            let y1 = y * Math.cos(ring.angleX) - z * Math.sin(ring.angleX);
            let z1 = z * Math.cos(ring.angleX) + y * Math.sin(ring.angleX);
            
            // Rotate Y
            let x2 = x * Math.cos(ring.angleY) - z1 * Math.sin(ring.angleY);
            let z2 = z1 * Math.cos(ring.angleY) + x * Math.sin(ring.angleY);
            
            const p = project(x2, y1, z2);
            
            if (i===0) hCtx.moveTo(p.x, p.y);
            else hCtx.lineTo(p.x, p.y);
        }
        
        hCtx.strokeStyle = `rgba(155, 89, 182, ${0.5 + (index * 0.2)})`; // Purple
        hCtx.lineWidth = 2;
        hCtx.stroke();
    });
    
    // Core Glow
    const center = project(0,0,0);
    const gradient = hCtx.createRadialGradient(center.x, center.y, 5, center.x, center.y, 40);
    gradient.addColorStop(0, 'rgba(155, 89, 182, 1)');
    gradient.addColorStop(1, 'rgba(155, 89, 182, 0)');
    hCtx.fillStyle = gradient;
    hCtx.beginPath();
    hCtx.arc(center.x, center.y, 40, 0, Math.PI * 2);
    hCtx.fill();

    requestAnimationFrame(animateCore);
}

// =============================================================================
// INITIALIZATION
// =============================================================================
window.addEventListener('resize', () => {
    initCables();
    initCore();
});

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

initCables();
animateCables();
if (holoCanvas) {
    initCore();
    animateCore();
}

// UI Scroll
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
// GALLERY DATA
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
        
        if (item.type === 'pdf') {
            el.innerHTML = `
                <div class="pdf-card">
                    <div class="pdf-icon"></div>
                    <h3 style="color:#fff; font-size:0.9rem; margin-bottom:5px;">${item.title}</h3>
                    <div style="color:var(--accent-primary); font-size:0.7rem;">${item.category.toUpperCase()}</div>
                    <button class="pdf-btn">ACCESS FILE</button>
                </div>
            `;
            el.addEventListener('click', () => window.open(item.file, '_blank'));
        } else {
            let mediaHtml = '';
            if (item.type === 'video') {
                mediaHtml = `<video src="${item.file}" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`;
            } else {
                mediaHtml = `<img src="${item.file}" alt="${item.title}" loading="lazy">`;
            }
            
            el.innerHTML = `
                ${mediaHtml}
                <div class="gallery-info">
                    <div style="color: var(--accent-primary); font-size: 0.75rem; letter-spacing: 1px;">${item.category.toUpperCase()}</div>
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
