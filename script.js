// =============================================================================
// ELECTRONIC CIRCUIT ANIMATION
// =============================================================================
const canvas = document.getElementById('circuit-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let nodes = [];

// Configuration
const GRID_SIZE = 40;
const PARTICLE_COUNT = 40;
const NODE_COUNT = 20;
const WIRE_COLOR = 'rgba(230, 126, 34, 0.3)'; // Orange-ish
const NODE_COLOR = 'rgba(155, 89, 182, 0.5)'; // Purple-ish

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Node {
    constructor() {
        // Snap to grid
        this.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
        this.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
        this.size = Math.random() * 3 + 2;
        this.pulse = 0;
        this.pulseSpeed = 0.05 + Math.random() * 0.05;
    }

    draw() {
        this.pulse += this.pulseSpeed;
        const glow = Math.sin(this.pulse) * 0.5 + 0.5; // 0 to 1
        
        ctx.fillStyle = NODE_COLOR;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow ring
        ctx.strokeStyle = `rgba(155, 89, 182, ${glow * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 4 + (glow * 2), 0, Math.PI * 2);
        ctx.stroke();
    }
}

class Electron {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
        this.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
        // Random direction: 0=right, 1=down, 2=left, 3=up
        this.dir = Math.floor(Math.random() * 4);
        this.speed = 2; // Pixels per frame
        this.history = [];
        this.maxLength = 20 + Math.random() * 30;
        this.life = 0;
        this.maxLife = 100 + Math.random() * 100;
    }

    update() {
        this.life++;
        if (this.life > this.maxLife) {
            this.reset();
            return;
        }

        // Store history for trail
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLength) {
            this.history.shift();
        }

        // Move
        if (this.dir === 0) this.x += this.speed;
        else if (this.dir === 1) this.y += this.speed;
        else if (this.dir === 2) this.x -= this.speed;
        else if (this.dir === 3) this.y -= this.speed;

        // Random turn at grid intersections
        if (this.x % GRID_SIZE === 0 && this.y % GRID_SIZE === 0) {
            if (Math.random() < 0.2) { // 20% chance to turn
                this.dir = Math.floor(Math.random() * 4);
            }
        }

        // Wrap around
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
        ctx.fillStyle = '#e67e22'; // Orange head
        ctx.fillRect(this.x - 1, this.y - 1, 3, 3);
    }
}

function init() {
    resize();
    particles = [];
    nodes = [];

    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(new Node());
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Electron());
    }
}

function animate() {
    // Clear with slight trails? No, clear fully for clean look
    ctx.clearRect(0, 0, width, height);

    nodes.forEach(n => n.draw());
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();


// =============================================================================
// NAVIGATION & UI
// =============================================================================

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Update active state
    document.querySelectorAll('.index-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
}

// Intersection Observer for Active Index
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.index-item').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('onclick').includes(id)) {
                    item.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section').forEach(section => observer.observe(section));


// =============================================================================
// GALLERY LOGIC
// =============================================================================
const mediaItems = [
     {
         file: 'IEEE_research.pdf',
         title: 'IEEE Research Paper',
         category: 'Research',
         description: 'Signal processing & neural optimization within Bayesian & RL frameworks. Includes analysis on noise reduction in high-frequency signal transmission.',
         type: 'pdf'
     },
     {
         file: 'main.pdf',
         title: 'EV Grid Stability Research',
         category: 'Research',
         description: 'MDPI submission: Smart EV Charging Station Grid Infrastructure Stability. Statistical analysis of urban distribution grid under high-load scenarios. Analyzed 500+ charging events.',
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
         file: 'soccer2.jpg',
         title: 'Soccer Tournament',
         category: 'Sports',
         description: 'Match photo from national tournament.',
         type: 'image'
     },
     {
         file: 'selfdefence_bluebelt.jpg',
         title: 'Martial Arts',
         category: 'Sports',
         description: 'Blue Belt certification in Self Defense.',
         type: 'image'
     },
     {
         file: 'laptop_cooling_proj.jpg',
         title: 'Laptop Cooling Mod',
         category: 'Engineering',
         description: 'Hardware modification to improve thermal efficiency of a laptop chassis.',
         type: 'image'
     },
     {
         file: 'IISER_visit.jpg',
         title: 'IISER Collaboration',
         category: 'Research',
         description: 'Meeting with physics department regarding CERN proposal.',
         type: 'image'
     },
     {
         file: 'MU20_debate_asias_largest.jpg',
         title: 'MU20 Debate',
         category: 'Leadership',
         description: 'Speaking at Asia\'s largest international debate conference.',
         type: 'image'
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
        el.style.animationDelay = `${index * 0.1}s`;
        
        let mediaHtml = '';
        
        // Handle different media types
        if (item.type === 'image' || item.type === 'pdf') {
            let src = item.file;
            // Fallback icon for PDFs if thumbnail fails (simplified logic)
            if (item.type === 'pdf') {
                 // Try to use a jpg thumbnail if it exists, else generic icon
                 src = item.file.replace('.pdf', '.jpg'); 
            }
            
            mediaHtml = `<img src="${src}" alt="${item.title}" onerror="this.src='https://placehold.co/400x400/111/e67e22?text=PDF/IMG'">`;
        } else if (item.type === 'video') {
            mediaHtml = `<video src="${item.file}" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`;
        }

        el.innerHTML = `
            ${mediaHtml}
            <div class="gallery-info">
                <div style="color: var(--accent-purple); font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 5px;">${item.category.toUpperCase()}</div>
                <h3 style="font-size: 1rem; color: #fff; margin-bottom: 5px;">${item.title}</h3>
            </div>
        `;
        
        el.addEventListener('click', () => openModal(item));
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
    } else if (item.type === 'pdf') {
         const iframe = document.createElement('iframe');
         iframe.src = item.file;
         iframe.style.width = "100%";
         iframe.style.height = "100%";
         iframe.style.border = "none";
         modalMedia.appendChild(iframe);
    } else {
        const img = document.createElement('img');
        img.src = item.file;
        // Fallback for PDF images in modal
        img.onerror = function() { 
            if(item.type === 'pdf') {
                this.style.display='none';
                const msg = document.createElement('a');
                msg.href = item.file;
                msg.textContent = "Click to View PDF";
                msg.target = "_blank";
                msg.style.color = "var(--accent-orange)";
                modalMedia.appendChild(msg);
            }
        };
        modalMedia.appendChild(img);
    }
}

function closeModal() {
    modal.style.display = 'none';
    modalMedia.innerHTML = '';
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', initGallery);
