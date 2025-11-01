// Media data with descriptions
const mediaItems = [
    {
        file: 'arssdc_trophy.jpg',
        title: 'ARSSDC Trophy',
        category: 'Space Settlement Design',
        description: 'Trophy photo from the Asian-level competition where my team placed runners-up among 150 schools. Showcases engineering teamwork, systems design, and leadership under high-pressure international collaboration. This competition challenged us to design a complete space settlement, considering everything from structural engineering to economics and social systems.',
        type: 'image',
        size: 'large'
    },
    {
        file: 'arssdc_winner.png',
        title: 'ARSSDC Award Announcement',
        category: 'Space Settlement Design',
        description: 'Official award recognition image. Reflects interdisciplinary design thinking—balancing architecture, aerospace, and economics within a simulated NASA project. Our team worked tirelessly to integrate multiple engineering disciplines into a cohesive, viable space habitat design.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'Citation_Principal\'s Award_Hemang.pdf',
        title: 'Principal\'s Award Citation',
        category: 'Academic Recognition',
        description: 'Formal citation for being named Student of the Year 2024—acknowledging academics, leadership, and community contribution across all domains. This award represents consistent excellence across academics, extracurriculars, and community service throughout my school career.',
        type: 'pdf',
        size: 'large'
    },
    {
        file: 'principalsaward_2.jpg',
        title: 'Principal\'s Award Ceremony',
        category: 'Academic Recognition',
        description: 'Award photo representing consistent academic excellence and institutional trust in leadership qualities. Being recognized as Student of the Year is a testament to balancing multiple responsibilities while maintaining high standards in all areas.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'f1_materials.jpg',
        title: 'Doppler Racing: Manufacturing Materials',
        category: 'F1 in Schools',
        description: 'Photos documenting design and testing phases of the team\'s car components—demonstrating practical engineering skills and iterative problem-solving. Every component was carefully crafted and tested to optimize performance while maintaining structural integrity.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'f1_materials2.jpg',
        title: 'Doppler Racing: Design Process',
        category: 'F1 in Schools',
        description: 'Detailed view of our manufacturing and design process. Each iteration brought us closer to the perfect balance of aerodynamics, weight distribution, and speed. This hands-on engineering taught me more than any textbook could.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'f1_materials3.jpg',
        title: 'Doppler Racing: Component Testing',
        category: 'F1 in Schools',
        description: 'Testing phase documentation showing our commitment to precision and quality. We conducted multiple test runs, analyzing data and refining our design based on real-world performance metrics.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'f1_nationals1.jpg',
        title: 'Doppler Racing: National Finals',
        category: 'F1 in Schools',
        description: 'Event images from the National F1 in Schools competition. Led the engineering and marketing divisions and secured Best Engineer Award among 120 schools. This competition was the culmination of months of hard work, innovation, and teamwork.',
        type: 'image',
        size: 'wide'
    },
    {
        file: 'f1_nationals2.jpg',
        title: 'Doppler Racing: National Competition',
        category: 'F1 in Schools',
        description: 'Competing at the national level taught me to work under pressure, think strategically, and lead a diverse team. The experience of presenting our work to industry professionals was invaluable.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'f1_nationals3vid.mp4',
        title: 'Doppler Racing: Nationals Car Run',
        category: 'F1 in Schools',
        description: 'Race clip demonstrating our custom-engineered car achieving 20m in 1.144s—represents applied physics, design optimization, and engineering precision. Watching months of work come together in this single run was exhilarating.',
        type: 'video',
        size: 'large'
    },
    {
        file: 'f1_nationals4.jpg',
        title: 'Doppler Racing: Team Celebration',
        category: 'F1 in Schools',
        description: 'Celebrating our achievements at nationals. This moment captured the joy of seeing our hard work recognized and validated at the highest level of school competition.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'f1_nationals5.jpg',
        title: 'Doppler Racing: Award Recognition',
        category: 'F1 in Schools',
        description: 'Receiving the Best Engineer Award was a defining moment. It recognized not just technical skills, but leadership, innovation, and the ability to inspire a team toward a common goal.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'f1_regionals.jpg',
        title: 'Doppler Racing: Regional Qualifiers',
        category: 'F1 in Schools',
        description: 'Regional-level race visuals; part of the team\'s journey to the nationals. This was where our journey began, testing our initial designs and learning from early challenges.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'f1_regionals2.jpg',
        title: 'Doppler Racing: Regional Competition',
        category: 'F1 in Schools',
        description: 'The regional competition was our proving ground. Each race taught us something new about engineering, teamwork, and resilience.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'f1_regionals3.jpg',
        title: 'Doppler Racing: Early Development',
        category: 'F1 in Schools',
        description: 'Shows early-stage ideation and teamwork development. These initial stages were crucial in establishing our team dynamics and design philosophy.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'f1_solarcar.jpg',
        title: 'Doppler Racing: Solar Car Prototype',
        category: 'F1 in Schools',
        description: 'Designed and tested solar-powered vehicle concepts, linking renewable energy systems with racing aerodynamics. This project expanded our understanding of sustainable engineering and alternative energy integration.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'f1_solarcar2.jpg',
        title: 'Solar Car Development',
        category: 'F1 in Schools',
        description: 'Further development of our solar car prototype, exploring the intersection of clean energy and high-performance engineering. This project challenged us to think beyond traditional combustion systems.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'IISER_visit.jpg',
        title: 'IISER Pune Collaboration',
        category: 'Research & Academia',
        description: 'Taken during discussions with IISER Pune\'s Physics Department and Student Activity Centre on our CERN research proposal. Showcases initiative in networking and interdisciplinary research coordination. These meetings opened doors to understanding cutting-edge physics research.',
        type: 'image',
        size: 'large'
    },
    {
        file: 'MU20_debate_asias_largest.jpg',
        title: 'International Space UN Debate',
        category: 'Debate & Oratory',
        description: 'Recognition for Outstanding Performance at Asia\'s largest international UN debate. Exemplifies communication, argumentation, and research articulation skills. Debating international space policy required deep research and the ability to defend complex positions under pressure.',
        type: 'image',
        size: 'tall'
    },
    {
        file: 'spUN_debate.png',
        title: 'Space UN Debate Certificate',
        category: 'Debate & Oratory',
        description: 'Official recognition for Outstanding Performance at the International Space UN Debate. This competition reinforced my passion for space policy and international cooperation in scientific endeavors.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'orator.jpg',
        title: 'Regional Debate Achievement',
        category: 'Debate & Oratory',
        description: 'Image from school annual event. I love being a public speaker and captivating an audience. The ability to articulate complex ideas clearly and persuasively is something I continuously work to improve.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'clash_royale_10k_trophies.jpg',
        title: 'Clash Royale 10K Achievement',
        category: 'Strategic Gaming',
        description: 'Screenshot marking top-tier global ranking in a strategic game—reflecting analytical thinking, long-term planning, and persistence. Achieving this level required thousands of hours of practice, strategic analysis, and adaptation to constantly changing meta-game dynamics.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'cr_deck.jpg',
        title: 'Personal Strategy Deck',
        category: 'Strategic Gaming',
        description: 'Illustrates methodical planning and meta-adaptation—mirrors analytical traits useful in research and engineering. Building and refining this deck taught me about optimization, resource management, and strategic thinking.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'Im_adventurous.jpg',
        title: 'Adventurous Spirit',
        category: 'Personal',
        description: 'Represents curiosity and openness to new experiences—indicative of a balanced, explorative mindset beyond academics. I believe the best learning happens when we step outside our comfort zones.',
        type: 'image',
        size: 'tall'
    },
    {
        file: 'im_goofy.jpg',
        title: 'Goofy Side',
        category: 'Personal',
        description: 'Highlights authenticity and humor—shows approachability and social ease within teams. Life is serious enough; being able to laugh and keep things light helps create better team dynamics.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'im_introspective.jpg',
        title: 'Introspective Moments',
        category: 'Personal',
        description: 'Reflects reflective temperament, thoughtfulness, and motivation-driven discipline—key for research and independent work. I find clarity in quiet moments of contemplation.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'me_and_brother.jpg',
        title: 'Family Bond',
        category: 'Personal',
        description: 'Represents personal grounding, empathy, and family values—emphasizing balance between ambition and relationships. Family keeps me grounded and reminds me what truly matters.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'me_and_frnds.jpg',
        title: 'With Friends',
        category: 'Personal',
        description: 'Displays teamwork and camaraderie—suggests strong interpersonal skills and sociability in collaborative settings. The friendships I\'ve built are as important to me as any achievement.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'me_grinding.jpg',
        title: 'Focused Work Session',
        category: 'Personal',
        description: 'Snapshot from a late-night build session—captures work ethic, intensity, and consistency in hands-on engineering projects. Some of my best work happens in these deep focus sessions.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'laptop_cooling_proj.jpg',
        title: 'Hardware Optimization Project',
        category: 'Technical Projects',
        description: 'Modified internal component layout to improve airflow and reduce laptop temperatures. Demonstrates pragmatic engineering problem-solving. This project taught me that sometimes the best solutions come from understanding the fundamentals and applying creative thinking.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'Intro_to_gen_AI_course_certificate (1).pdf',
        title: 'Introduction to Generative AI',
        category: 'Certifications',
        description: 'Google Cloud certification showing structured learning in AI fundamentals, linking conceptual understanding to future applied AI projects. Understanding generative AI is crucial for the future of technology.',
        type: 'pdf',
        size: 'small'
    },
    {
        file: 'rocketscience101.png',
        title: 'Rocket Science 101',
        category: 'Certifications',
        description: 'University of Michigan completion certificate (98.2%) for university-level aerospace fundamentals—shows advanced comprehension and self-driven learning. This course deepened my understanding of aerospace engineering principles.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'soccer1.jpg',
        title: 'National Football U17/U19',
        category: 'Sports',
        description: 'Match and team photos from national-level tournaments. Represent leadership, teamwork, and physical discipline. Balance academics with athletics. Football taught me about teamwork, strategy, and pushing through physical and mental barriers.',
        type: 'image',
        size: 'large'
    },
    {
        file: 'soccer2.jpg',
        title: 'Football Competition',
        category: 'Sports',
        description: 'Competing at the national level in football while maintaining academic excellence taught me time management and dedication. Sports provide balance and keep me physically and mentally sharp.',
        type: 'image',
        size: 'medium'
    },
    {
        file: 'selfdefence_bluebelt.jpg',
        title: 'Martial Arts Blue Belt',
        category: 'Sports & Discipline',
        description: 'Indicates discipline, perseverance, and structured self-improvement through long-term practice. Martial arts taught me patience, respect, and the importance of consistent practice.',
        type: 'image',
        size: 'small'
    },
    {
        file: 'other_certificates.pdf',
        title: 'Miscellaneous Achievements',
        category: 'Certifications',
        description: 'Consolidated proof of academic, leadership, and extracurricular awards across various domains. Each certificate represents a challenge overcome, a skill learned, or recognition earned.',
        type: 'pdf',
        size: 'small'
    }
];

// Populate gallery
function createGallery() {
    const gallery = document.getElementById('gallery');
    
    mediaItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item size-${item.size || 'small'}`;
        galleryItem.style.animationDelay = `${index * 0.05}s`;
        
        let mediaElement;
        if (item.type === 'image' || item.type === 'pdf') {
            mediaElement = document.createElement('img');
            if (item.type === 'pdf') {
                mediaElement.src = item.file.replace('.pdf', '.jpg'); // Fallback thumbnail
                // Try to use first page as preview, or a generic icon
                mediaElement.onerror = function() {
                    this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"%3E%3Cpath fill="%235a6d4c" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"%3E%3C/path%3E%3C/svg%3E';
                };
            } else {
                mediaElement.src = item.file;
            }
            mediaElement.alt = item.title;
            mediaElement.className = 'item-media';
        } else if (item.type === 'video') {
            // For video, show a thumbnail
            mediaElement = document.createElement('video');
            mediaElement.src = item.file;
            mediaElement.className = 'item-media';
            mediaElement.muted = true;
        }
        
        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        
        const itemTitle = document.createElement('h3');
        itemTitle.className = 'item-title';
        itemTitle.textContent = item.title;
        
        const itemCategory = document.createElement('p');
        itemCategory.className = 'item-category';
        itemCategory.textContent = item.category;
        
        const viewText = document.createElement('div');
        viewText.className = 'view-text';
        viewText.textContent = 'View Details';
        
        itemInfo.appendChild(itemTitle);
        itemInfo.appendChild(itemCategory);
        
        galleryItem.appendChild(mediaElement);
        galleryItem.appendChild(itemInfo);
        galleryItem.appendChild(viewText);
        
        // Add click event
        galleryItem.addEventListener('click', () => openModal(item));
        
        gallery.appendChild(galleryItem);
    });
}

// Modal functionality
function openModal(item) {
    const modal = document.getElementById('modal');
    const mediaContainer = document.getElementById('mediaContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    // Clear previous content
    mediaContainer.innerHTML = '';
    
    // Create media element
    let mediaElement;
    if (item.type === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.src = item.file;
        mediaElement.alt = item.title;
    } else if (item.type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.src = item.file;
        mediaElement.controls = true;
        mediaElement.autoplay = true;
    } else if (item.type === 'pdf') {
        mediaElement = document.createElement('embed');
        mediaElement.src = item.file;
        mediaElement.type = 'application/pdf';
    }
    
    mediaContainer.appendChild(mediaElement);
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Stop any playing videos
    const videos = document.querySelectorAll('#mediaContainer video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

// Event listeners
document.getElementById('closeBtn').addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Initialize gallery on page load
window.addEventListener('DOMContentLoaded', createGallery);

// Add parallax effect to title
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
    header.style.opacity = 1 - (scrolled / 500);
});

