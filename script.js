// -----------------------------------------------------------------------------
// DYNAMIC CANVAS BACKGROUND (PROMINENT RETRO TECH)
// -----------------------------------------------------------------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let width, height;
let particles = [];
const particleCount = 220; // Increased density
let mouse = { x: -1000, y: -1000 };

function initCanvas() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2.5 + 1.5; // Larger particles
        this.baseX = this.x;
        this.baseY = this.y;
        // Brighter opacity range
        this.alpha = Math.random() * 0.6 + 0.4;
        // Color variation (green, amber, cyan)
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
            this.color = '0, 255, 65'; // Green
        } else if (colorChoice < 0.66) {
            this.color = '255, 176, 0'; // Amber
        } else {
            this.color = '0, 243, 255'; // Cyan
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // STRONGER Mouse Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250; // Larger interaction radius

        if (distance < maxDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance;
            // Push away with stronger force
            this.x -= forceDirectionX * force * 4;
            this.y -= forceDirectionY * force * 4;
        } else {
            // Gentle return to flow
            if (this.x !== this.baseX) {
                const dx = this.x - this.baseX;
                this.x -= dx/50;
            }
            if (this.y !== this.baseY) {
                const dy = this.y - this.baseY;
                this.y -= dy/50;
            }
        }

        // Screen Wrapping
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw() {
        // Draw with color variation
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = dx * dx + dy * dy;
            
            // Connect close particles with BRIGHTER lines
            if (distance < 15000) { // Adjusted threshold
                let opacityValue = 1 - (distance/15000);
                // Mix colors for connections
                ctx.strokeStyle = `rgba(150, 150, 150, ${opacityValue * 0.6})`;
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
    if (!ctx) return;
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
if (canvas) {
    initCanvas();
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    animate();
}


// -----------------------------------------------------------------------------
// GALLERY DATA & LOGIC
// -----------------------------------------------------------------------------
const mediaItems = [
    {
        file: 'IEEE_research.pdf',
        title: 'IEEE Research Paper',
        category: 'Research',
        description: 'Signal processing & neural optimization within Bayesian & RL frameworks. Achieved 42% improvement in signal-to-noise ratio. Nearing end of peer review.',
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
        description: 'Novel plasma diagnostic method using Cherenkov radiation for non-invasive plasma density mapping in fusion reactors. Endorsed by Head of Physics at IISER Pune.',
        type: 'pdf'
    },
    {
        file: 'Citation_Principals_Award_Hemang.pdf',
        title: 'Student of the Year',
        category: 'Award',
        description: 'Principal\'s Citation for excellence in academics, leadership, and community service. Recognition as #1 ranked student.',
        type: 'pdf'
    },
    {
        file: 'arssdc_trophy.jpg',
        title: 'ARSSDC Runners-Up Trophy',
        category: 'Aerospace',
        description: 'Trophy from the Asian Regional Space Settlement Design Competition. Competed among 150 schools. Designed settlement for 10,000 inhabitants with life support, agriculture, and habitat systems.',
        type: 'image'
    },
    {
        file: 'arssdc_winner.png',
        title: 'ARSSDC Award Announcement',
        category: 'Aerospace',
        description: 'Official award recognition for interdisciplinary design excellence. Balanced architecture, aerospace engineering, and economics within simulated NASA project.',
        type: 'image'
    },
    {
        file: 'principalsaward_2.jpg',
        title: 'Principal\'s Award Ceremony',
        category: 'Award',
        description: 'Award photo representing consistent academic excellence and institutional trust in leadership qualities across all domains.',
        type: 'image'
    },
    {
        file: 'f1_nationals1.jpg',
        title: 'Doppler Racing Nationals',
        category: 'Engineering',
        description: 'F1 in Schools National Finals. Led 8-member team to Best Engineered Car award. Competed against 120+ schools.',
        type: 'image'
    },
    {
        file: 'f1_nationals2.jpg',
        title: 'Doppler Racing Team',
        category: 'Engineering',
        description: 'Team photo at nationals. Showcases collaboration across engineering, marketing, and finance divisions.',
        type: 'image'
    },
    {
        file: 'f1_nationals4.jpg',
        title: 'Doppler Racing Booth',
        category: 'Engineering',
        description: 'Exhibition booth at nationals showcasing technical documentation, CAD models, and sponsorship portfolio.',
        type: 'image'
    },
    {
        file: 'f1_nationals5.jpg',
        title: 'Doppler Racing Presentation',
        category: 'Engineering',
        description: 'Presenting engineering documentation and design process to judges. Demonstrated CFD analysis and manufacturing workflow.',
        type: 'image'
    },
    {
        file: 'f1_nationals3vid.mp4',
        title: 'Record Car Run (1.144s)',
        category: 'Engineering',
        description: 'Video of custom-engineered car achieving 20m in 1.144 seconds, setting a competition record. Cd = 0.12 aerodynamic efficiency.',
        type: 'video'
    },
    {
        file: 'f1_materials.jpg',
        title: 'Doppler Racing Materials',
        category: 'Engineering',
        description: 'Design and testing phases of car components. Documenting iterative problem-solving and material selection.',
        type: 'image'
    },
    {
        file: 'f1_materials2.jpg',
        title: 'Doppler Racing CAD Models',
        category: 'Engineering',
        description: 'SolidWorks CAD models and technical drawings. Shows aerodynamic optimization and structural analysis.',
        type: 'image'
    },
    {
        file: 'f1_materials3.jpg',
        title: 'Doppler Racing Manufacturing',
        category: 'Engineering',
        description: 'CNC machining and precision manufacturing. Built custom robot for micrometer-level component fabrication.',
        type: 'image'
    },
    {
        file: 'f1_regionals.jpg',
        title: 'Doppler Regional Qualifiers',
        category: 'Engineering',
        description: 'Regional-level race visuals. Part of journey to nationals, showcasing early-stage ideation and team development.',
        type: 'image'
    },
    {
        file: 'f1_regionals2.jpg',
        title: 'Regional Competition Setup',
        category: 'Engineering',
        description: 'Setting up for regional qualifiers. Testing track conditions and validating car performance.',
        type: 'image'
    },
    {
        file: 'f1_regionals3.jpg',
        title: 'Regional Team Collaboration',
        category: 'Engineering',
        description: 'Team collaboration at regionals. Coordinating race strategy and technical adjustments.',
        type: 'image'
    },
    {
        file: 'f1_solarcar.jpg',
        title: 'Solar Car Prototype',
        category: 'Engineering',
        description: 'Designed and tested solar-powered vehicle concept. Linking renewable energy systems with racing aerodynamics.',
        type: 'image'
    },
    {
        file: 'f1_solarcar2.jpg',
        title: 'Solar Car Testing',
        category: 'Engineering',
        description: 'Testing solar car prototype. Validating photovoltaic efficiency and power management systems.',
        type: 'image'
    },
    {
        file: 'IISER_visit.jpg',
        title: 'IISER Pune Collaboration',
        category: 'Research',
        description: 'Meeting with IISER Pune Physics Department on CERN research proposal. Networking and interdisciplinary research coordination.',
        type: 'image'
    },
    {
        file: 'MU20_debate_asias_largest.jpg',
        title: 'International Space UN Debate',
        category: 'Leadership',
        description: 'Outstanding Performance at Asia\'s largest international UN debate. Exemplifies communication, argumentation, and research articulation.',
        type: 'image'
    },
    {
        file: 'spUN_debate.png',
        title: 'Space UN Debate Certificate',
        category: 'Leadership',
        description: 'Official recognition for Outstanding Performance. Reinforces excellence in academic debate and diplomacy.',
        type: 'image'
    },
    {
        file: 'orator.jpg',
        title: 'Public Speaking',
        category: 'Leadership',
        description: 'Regional debate achievement from school annual event. Demonstrates ability to captivate an audience and articulate complex ideas.',
        type: 'image'
    },
    {
        file: 'clash_royale_10k_trophies.jpg',
        title: 'Clash Royale: Top 2% Global',
        category: 'Strategy',
        description: 'Achieved 13,000+ trophies in Clash Royale, placing in top 2% of players globally. Demonstrates long-term strategic planning, meta-adaptation, and analytical thinking.',
        type: 'image'
    },
    {
        file: 'cr_deck.jpg',
        title: 'Personal Strategy Deck',
        category: 'Strategy',
        description: 'Custom Clash Royale deck composition. Illustrates methodical planning and meta-adaptation, reflecting analytical traits useful in research.',
        type: 'image'
    },
    {
        file: 'Intro_to_gen_AI_course_certificate (1).pdf',
        title: 'Introduction to Generative AI',
        category: 'Certification',
        description: 'Google Cloud certification in Generative AI fundamentals. Structured learning in AI concepts linking to applied AI projects.',
        type: 'pdf'
    },
    {
        file: 'rocketscience101.png',
        title: 'Rocket Science 101',
        category: 'Certification',
        description: 'University of Michigan aerospace fundamentals course completion (98.2%). Advanced comprehension and self-driven learning.',
        type: 'image'
    },
    {
        file: 'other_certificates.pdf',
        title: 'Miscellaneous Awards',
        category: 'Certification',
        description: 'Consolidated proof of academic, leadership, and extracurricular awards across various domains.',
        type: 'pdf'
    },
    {
        file: 'soccer1.jpg',
        title: 'National Soccer Gold',
        category: 'Sports',
        description: 'National-level U17/U19 soccer gold medalist. Represents leadership, teamwork, and physical discipline. Balances academics with athletics.',
        type: 'image'
    },
    {
        file: 'soccer2.jpg',
        title: 'Soccer Tournament',
        category: 'Sports',
        description: 'Match photo from national tournament. Team coordination and competitive excellence.',
        type: 'image'
    },
    {
        file: 'selfdefence_bluebelt.jpg',
        title: 'Martial Arts Blue Belt',
        category: 'Sports',
        description: 'Blue Belt certification in martial arts. Indicates discipline, perseverance, and structured self-improvement through long-term practice.',
        type: 'image'
    },
    {
        file: 'laptop_cooling_proj.jpg',
        title: 'Hardware Optimization Project',
        category: 'Engineering',
        description: 'Modified internal component layout to improve airflow and reduce laptop temperatures. Demonstrates pragmatic engineering problem-solving.',
        type: 'image'
    },
    {
        file: 'Im_adventurous.jpg',
        title: 'Adventurous Spirit',
        category: 'Personal',
        description: 'Represents curiosity and openness to new experiences. Indicative of balanced, explorative mindset beyond academics.',
        type: 'image'
    },
    {
        file: 'im_goofy.jpg',
        title: 'Goofy Side',
        category: 'Personal',
        description: 'Highlights authenticity and humor. Shows approachability and social ease within teams.',
        type: 'image'
    },
    {
        file: 'im_introspective.jpg',
        title: 'Introspective Temperament',
        category: 'Personal',
        description: 'Reflects reflective temperament, thoughtfulness, and motivation-driven discipline. Key for research and independent work.',
        type: 'image'
    },
    {
        file: 'me_and_brother.jpg',
        title: 'Family Bond',
        category: 'Personal',
        description: 'Personal grounding, empathy, and family values. Emphasizing balance between ambition and relationships.',
        type: 'image'
    },
    {
        file: 'me_and_frnds.jpg',
        title: 'With Friends',
        category: 'Personal',
        description: 'Displays teamwork and camaraderie. Suggests strong interpersonal skills and sociability in collaborative settings.',
        type: 'image'
    },
    {
        file: 'me_grinding.jpg',
        title: 'Focused Work Session',
        category: 'Personal',
        description: 'Snapshot from late-night build session. Captures work ethic, intensity, and consistency in hands-on engineering projects.',
        type: 'image'
    }
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
