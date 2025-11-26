// ============================================================================
// CIRCUIT BOARD BACKGROUND ANIMATION (Electronics Theme)
// ============================================================================
const canvas = document.getElementById('circuit-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let width, height;
let nodes = [];
let connections = [];
const nodeCount = 40;
let mouse = { x: -1000, y: -1000 };

function initCanvas() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

// Node represents circuit board connection points
class Node {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.type = type || Math.random() > 0.5 ? 'resistor' : 'capacitor';
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = 4;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.connected = [];
    }

    update() {
        // Gentle drift
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction - repel
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            this.x -= (dx / distance) * force * 3;
            this.y -= (dy / distance) * force * 3;
        } else {
            // Return to base position
            this.x += (this.baseX - this.x) * 0.02;
            this.y += (this.baseY - this.y) * 0.02;
        }

        // Boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.pulsePhase += 0.02;
    }

    draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        
        // Draw node as a small circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 66, ${pulse * 0.6})`;
        ctx.fill();
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(157, 127, 245, ${pulse * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw component symbol
        if (this.type === 'resistor') {
            this.drawResistor();
        } else {
            this.drawCapacitor();
        }
    }

    drawResistor() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = 'rgba(255, 140, 66, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-4, -3);
        ctx.lineTo(0, 3);
        ctx.lineTo(4, -3);
        ctx.lineTo(8, 0);
        ctx.stroke();
        ctx.restore();
    }

    drawCapacitor() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = 'rgba(157, 127, 245, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-2, -6);
        ctx.lineTo(-2, 6);
        ctx.moveTo(2, -6);
        ctx.lineTo(2, 6);
        ctx.stroke();
        ctx.restore();
    }
}

// Connection represents circuit wires
class Connection {
    constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.signal = 0;
        this.signalSpeed = 0.05 + Math.random() * 0.05;
    }

    update() {
        this.signal += this.signalSpeed;
        if (this.signal > 1) this.signal = 0;
    }

    draw() {
        const dx = this.nodeB.x - this.nodeA.x;
        const dy = this.nodeB.y - this.nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 400) return; // Don't draw very long connections

        // Draw wire as straight line
        ctx.beginPath();
        ctx.moveTo(this.nodeA.x, this.nodeA.y);
        ctx.lineTo(this.nodeB.x, this.nodeB.y);
        
        const opacity = 1 - (distance / 400);
        ctx.strokeStyle = `rgba(120, 100, 140, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw signal traveling along wire
        const signalX = this.nodeA.x + dx * this.signal;
        const signalY = this.nodeA.y + dy * this.signal;
        
        ctx.beginPath();
        ctx.arc(signalX, signalY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 66, ${opacity * 0.8})`;
        ctx.fill();
    }
}

// Initialize nodes in a grid-like pattern
function initNodes() {
    nodes = [];
    connections = [];
    
    const cols = Math.ceil(Math.sqrt(nodeCount * (width / height)));
    const rows = Math.ceil(nodeCount / cols);
    const spacingX = width / (cols + 1);
    const spacingY = height / (rows + 1);

    for (let i = 0; i < nodeCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = spacingX * (col + 1) + (Math.random() - 0.5) * 50;
        const y = spacingY * (row + 1) + (Math.random() - 0.5) * 50;
        nodes.push(new Node(x, y));
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200 && Math.random() > 0.7) {
                connections.push(new Connection(nodes[i], nodes[j]));
            }
        }
    }
}

// Animation loop
function animate() {
    if (!ctx) return;
    
    // Clear with slight trail effect
    ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw connections
    connections.forEach(conn => {
        conn.update();
        conn.draw();
    });

    // Update and draw nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });

    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', () => {
    initCanvas();
    initNodes();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Start circuit animation
if (canvas) {
    initCanvas();
    initNodes();
    animate();
}

// ============================================================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================================
// NAVBAR SCROLL EFFECT
// ============================================================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '15px 60px';
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.padding = '20px 60px';
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// ============================================================================
// GALLERY DATA (for gallery.html)
// ============================================================================
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

// Gallery population (only runs on gallery.html)
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-grid');
    const isGalleryPage = window.location.pathname.includes('gallery.html');

    if (isGalleryPage && galleryContainer) {
        mediaItems.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'gallery-item';
            
            el.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.05}s`;
            el.style.opacity = '0';

            let contentHtml = '';
            
            if (item.type === 'image' || item.type === 'pdf') {
                let src = item.file;
                if(item.type === 'pdf') src = item.file.replace('.pdf', '.jpg');
                
                contentHtml = `<img src="${src}" alt="${item.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmY4YzQyIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0xMyAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOUwxMyAyeiIvPjwvc3ZnPg=='">`;
            } else if (item.type === 'video') {
                contentHtml = `<video src="${item.file}" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`;
            }

            el.innerHTML = `
                ${contentHtml}
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
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
    if (!modal) return;
    
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
