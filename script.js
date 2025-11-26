// Media data with descriptions
// Removed sizing property to ensure uniform grid as requested
const mediaItems = [
    {
        file: 'arssdc_trophy.jpg',
        title: 'ARSSDC Trophy',
        category: 'Space Settlement',
        description: 'Runners-up among 150 schools. A testament to engineering teamwork and systems design under pressure.',
        type: 'image'
    },
    {
        file: 'arssdc_winner.png',
        title: 'ARSSDC Award',
        category: 'Space Settlement',
        description: 'Official recognition of our interdisciplinary design balancing architecture, aerospace, and economics.',
        type: 'image'
    },
    {
        file: 'Citation_Principals_Award_Hemang.pdf',
        title: 'Principal\'s Citation',
        category: 'Academic Honor',
        description: 'Student of the Year 2024. Acknowledging academics, leadership, and community contribution.',
        type: 'pdf'
    },
    {
        file: 'principalsaward_2.jpg',
        title: 'Award Ceremony',
        category: 'Academic Honor',
        description: 'Receiving the Principal\'s Award, representing consistent academic excellence.',
        type: 'image'
    },
    {
        file: 'CERN_Research_Proposal.pdf',
        title: 'CERN Proposal',
        category: 'Physics Research',
        description: 'Research proposal for high-energy physics applications in sustainable energy.',
        type: 'pdf'
    },
    {
        file: 'IEEE_research.pdf',
        title: 'IEEE Paper',
        category: 'Engineering Research',
        description: 'Published research paper exploring advanced engineering concepts.',
        type: 'pdf'
    },
    {
        file: 'f1_materials.jpg',
        title: 'Doppler: Manufacturing',
        category: 'F1 in Schools',
        description: 'Design and testing phases of the car components.',
        type: 'image'
    },
    {
        file: 'f1_materials2.jpg',
        title: 'Doppler: Design',
        category: 'F1 in Schools',
        description: 'Detailed view of our manufacturing and iterative design process.',
        type: 'image'
    },
    {
        file: 'f1_materials3.jpg',
        title: 'Doppler: Testing',
        category: 'F1 in Schools',
        description: 'Commitment to precision and quality through rigorous testing.',
        type: 'image'
    },
    {
        file: 'f1_nationals1.jpg',
        title: 'Doppler: Nationals',
        category: 'F1 in Schools',
        description: 'Secured Best Engineer Award among 120 schools at the National Finals.',
        type: 'image'
    },
    {
        file: 'f1_nationals2.jpg',
        title: 'Doppler: Competition',
        category: 'F1 in Schools',
        description: 'Presenting our work to industry professionals under pressure.',
        type: 'image'
    },
    {
        file: 'f1_nationals3vid.mp4',
        title: 'Nationals Car Run',
        category: 'F1 in Schools',
        description: 'Our custom car achieving 20m in 1.144s.',
        type: 'video'
    },
    {
        file: 'f1_nationals4.jpg',
        title: 'Team Celebration',
        category: 'F1 in Schools',
        description: 'Celebrating our hard work and validation at the highest level.',
        type: 'image'
    },
    {
        file: 'f1_nationals5.jpg',
        title: 'Best Engineer Award',
        category: 'F1 in Schools',
        description: 'Recognition of technical skills, leadership, and innovation.',
        type: 'image'
    },
    {
        file: 'f1_regionals.jpg',
        title: 'Regional Qualifiers',
        category: 'F1 in Schools',
        description: 'The beginning of our journey at the regional level.',
        type: 'image'
    },
    {
        file: 'f1_regionals2.jpg',
        title: 'Regional Race',
        category: 'F1 in Schools',
        description: 'Proving ground for our initial engineering concepts.',
        type: 'image'
    },
    {
        file: 'f1_regionals3.jpg',
        title: 'Early Development',
        category: 'F1 in Schools',
        description: 'Early-stage ideation and team development.',
        type: 'image'
    },
    {
        file: 'f1_solarcar.jpg',
        title: 'Solar Car Prototype',
        category: 'Green Energy',
        description: 'Linking renewable energy systems with racing aerodynamics.',
        type: 'image'
    },
    {
        file: 'f1_solarcar2.jpg',
        title: 'Solar Car Dev',
        category: 'Green Energy',
        description: 'Exploring clean energy and high-performance engineering.',
        type: 'image'
    },
    {
        file: 'IISER_visit.jpg',
        title: 'IISER Collaboration',
        category: 'Research',
        description: 'Discussions on CERN research proposal at IISER Pune.',
        type: 'image'
    },
    {
        file: 'MU20_debate_asias_largest.jpg',
        title: 'Space UN Debate',
        category: 'Debate',
        description: 'Outstanding Performance at Asia\'s largest international UN debate.',
        type: 'image'
    },
    {
        file: 'spUN_debate.png',
        title: 'Debate Certificate',
        category: 'Debate',
        description: 'Official recognition for Outstanding Performance.',
        type: 'image'
    },
    {
        file: 'orator.jpg',
        title: 'Public Speaking',
        category: 'Debate',
        description: 'Captivating an audience at the school annual event.',
        type: 'image'
    },
    {
        file: 'clash_royale_10k_trophies.jpg',
        title: 'CR Top Ranking',
        category: 'Strategy',
        description: 'Top-tier global ranking reflecting analytical thinking.',
        type: 'image'
    },
    {
        file: 'cr_deck.jpg',
        title: 'Strategy Deck',
        category: 'Strategy',
        description: 'Methodical planning and meta-adaptation.',
        type: 'image'
    },
    {
        file: 'Im_adventurous.jpg',
        title: 'Adventurous Spirit',
        category: 'Personal',
        description: 'Curiosity and openness to new experiences.',
        type: 'image'
    },
    {
        file: 'im_goofy.jpg',
        title: 'Authenticity',
        category: 'Personal',
        description: 'Approachability and social ease within teams.',
        type: 'image'
    },
    {
        file: 'im_introspective.jpg',
        title: 'Introspection',
        category: 'Personal',
        description: 'Reflective temperament and thoughtfulness.',
        type: 'image'
    },
    {
        file: 'me_and_brother.jpg',
        title: 'Family Bond',
        category: 'Personal',
        description: 'Personal grounding and family values.',
        type: 'image'
    },
    {
        file: 'me_and_frnds.jpg',
        title: 'Camaraderie',
        category: 'Personal',
        description: 'Teamwork and strong interpersonal skills.',
        type: 'image'
    },
    {
        file: 'me_grinding.jpg',
        title: 'The Grind',
        category: 'Personal',
        description: 'Late-night build session capturing work ethic.',
        type: 'image'
    },
    {
        file: 'laptop_cooling_proj.jpg',
        title: 'Laptop Cooling',
        category: 'Hardware',
        description: 'Modified internal component layout to improve airflow.',
        type: 'image'
    },
    {
        file: 'Intro_to_gen_AI_course_certificate (1).pdf',
        title: 'Gen AI Cert',
        category: 'Certification',
        description: 'Google Cloud certification in AI fundamentals.',
        type: 'pdf'
    },
    {
        file: 'rocketscience101.png',
        title: 'Rocket Science 101',
        category: 'Certification',
        description: 'Univ. of Michigan aerospace fundamentals (98.2%).',
        type: 'image'
    },
    {
        file: 'soccer1.jpg',
        title: 'National Football',
        category: 'Sports',
        description: 'U17/U19 National tournaments representation.',
        type: 'image'
    },
    {
        file: 'soccer2.jpg',
        title: 'Team Sport',
        category: 'Sports',
        description: 'Leadership and teamwork on the field.',
        type: 'image'
    },
    {
        file: 'selfdefence_bluebelt.jpg',
        title: 'Martial Arts',
        category: 'Sports',
        description: 'Blue Belt certification indicating discipline.',
        type: 'image'
    },
    {
        file: 'other_certificates.pdf',
        title: 'Achievements',
        category: 'Awards',
        description: 'Consolidated proof of academic and leadership awards.',
        type: 'pdf'
    }
];

// Core Logic
document.addEventListener('DOMContentLoaded', () => {
    const isGalleryPage = window.location.pathname.includes('gallery.html');
    
    if (isGalleryPage) {
        initGallery();
        setupModal();
    }
});

function initGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    mediaItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item'; // Removed size classes for uniform tiling
        
        // Animation delay
        galleryItem.style.animation = `fadeInUp 0.6s ease-out backwards ${index * 0.05}s`;

        // Media Content
        let mediaElement;
        if (item.type === 'image' || item.type === 'pdf') {
            mediaElement = document.createElement('img');
            if (item.type === 'pdf') {
                mediaElement.src = item.file.replace('.pdf', '.jpg'); 
                mediaElement.onerror = function() {
                    // Fallback icon with updated orange color
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmY0ZDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMnYtOWwtNS01eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0IDIgMTQgOSAyMCA5Ii8+PC9zdmc+'; 
                    this.style.padding = '40px';
                    this.style.objectFit = 'contain';
                    this.style.background = '#fff';
                };
            } else {
                mediaElement.src = item.file;
            }
            mediaElement.alt = item.title;
        } else if (item.type === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.src = item.file;
            mediaElement.muted = true;
            mediaElement.loop = true;
            // Play on hover
            galleryItem.addEventListener('mouseenter', () => mediaElement.play());
            galleryItem.addEventListener('mouseleave', () => {
                mediaElement.pause();
                mediaElement.currentTime = 0;
            });
        }

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = `
            <h3 style="font-size: 1rem; margin-bottom: 5px; font-family: 'Space Mono', monospace; text-transform: uppercase;">${item.title}</h3>
            <p style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-orange); font-weight: 700;">${item.category}</p>
        `;

        galleryItem.appendChild(mediaElement);
        galleryItem.appendChild(overlay);
        galleryItem.addEventListener('click', () => openModal(item));
        gallery.appendChild(galleryItem);
    });
}

function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeBtn');

    closeBtn.onclick = closeModal;
    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(item) {
    const modal = document.getElementById('modal');
    const mediaContainer = document.getElementById('modalMedia');
    const title = document.getElementById('modalTitle');
    const category = document.getElementById('modalCategory');
    const desc = document.getElementById('modalDescription');

    mediaContainer.innerHTML = '';
    title.textContent = item.title;
    category.textContent = item.category;
    desc.textContent = item.description;

    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.file;
        mediaContainer.appendChild(img);
    } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.file;
        video.controls = true;
        video.autoplay = true;
        mediaContainer.appendChild(video);
    } else if (item.type === 'pdf') {
        const embed = document.createElement('embed');
        embed.src = item.file;
        embed.type = 'application/pdf';
        embed.style.width = '100%';
        embed.style.height = '100%';
        mediaContainer.appendChild(embed);
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    const mediaContainer = document.getElementById('modalMedia');
    mediaContainer.innerHTML = ''; // Stop videos
}
