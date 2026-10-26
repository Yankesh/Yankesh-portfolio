// ==========================================
// CERTIFICATE DATA - Add all your certificates here
// ==========================================
const certificates = [
    {
        file: 'Coursera datascience.pdf',
        title: 'Data Science Certification',
        issuer: 'Coursera',
        date: 'January 2025',
        type: 'pdf'
    },
    {
        file: 'Flipkart-SCOA---Warehousing_Yankesh-G-_243.pdf',
        title: 'Flipkart Supply Chain Optimization',
        issuer: 'Flipkart',
        date: 'December 2024',
        type: 'pdf'
    },
    {
        file: 'google gemini.pdf',
        title: 'Google Gemini Certification',
        issuer: 'Google',
        date: 'December 2024',
        type: 'pdf'
    },
    {
        file: 'infosys cloud computing.pdf',
        title: 'Infosys Cloud Computing',
        issuer: 'Infosys',
        date: 'November 2024',
        type: 'pdf'
    },
    {
        file: 'ISRO 2.pdf',
        title: 'ISRO Certification',
        issuer: 'ISRO',
        date: 'October 2024',
        type: 'pdf'
    },
    {
        file: 'oracle generative ai eCertificate.pdf',
        title: 'Oracle Generative AI',
        issuer: 'Oracle',
        date: 'September 2024',
        type: 'pdf'
    }
];

const CURRENT_RESUME_FILE = 'resume.pdf?v=20261026';
const CURRENT_ABOUT = "Hi, I'm Yankesh, a full-stack developer who likes turning ideas into products that actually run in production.\n\nI'm a Computer Science Engineering student (batch of 2027), and most of what I know comes from building things. My main project, SecondHand, is a peer-to-peer marketplace built with React, Node.js, Express and MongoDB. I deployed it on Vercel and Render with a GitHub Actions CI/CD pipeline. I also built an AI customer support chatbot that runs locally on an open-source LLM, with a Python backend and a React frontend.\n\nAs an AI Research Intern at Ethara AI, I worked on evaluating LLM outputs. That taught me how AI behaves in the real world, not just in demos. I now bring that into the apps I build.\n\nOutside of coursework, I'm exploring cybersecurity and OSINT, which helps me write safer, more thoughtful code. I've also solved 100+ DSA problems and work comfortably with Git, Docker, Postman and AWS basics.\n\nI'm currently looking for fresher Web Developer / Full-Stack roles. Let's connect!";
function loadPublishedPortfolio() {
    const savedContent = localStorage.getItem('portfolioContent');
    if (!savedContent) return;

    const content = JSON.parse(savedContent);
    content.about = CURRENT_ABOUT;
    document.querySelector('.about-text').innerHTML = CURRENT_ABOUT.replace(/\n\n/g, '<br><br>');
    const resume = content.resume || {};
    if (resume.file !== CURRENT_RESUME_FILE) {
        resume.file = CURRENT_RESUME_FILE;
        content.resume = resume;
        localStorage.setItem('portfolioContent', JSON.stringify(content));
    }
    if (resume.title) document.querySelector('.resume-info-section h3').textContent = resume.title;
    if (resume.subtitle) document.querySelector('.resume-subtitle').textContent = resume.subtitle;
    if (resume.updated) document.querySelector('.resume-meta span').innerHTML = `<i class="fas fa-calendar"></i> Updated: ${resume.updated}`;
    document.querySelector('.view-btn').href = CURRENT_RESUME_FILE;
    document.querySelector('.download-btn').href = CURRENT_RESUME_FILE;
    if (Array.isArray(content.certificates)) {
        certificates.splice(0, certificates.length, ...content.certificates);
    }
}

// Generate certificate cards dynamically
function generateCertificates() {
    const certificatesGrid = document.getElementById('certificatesGrid');
    if (!certificatesGrid) return;

    certificatesGrid.innerHTML = '';
    
    certificates.forEach((cert, index) => {
        const certCard = document.createElement('div');
        certCard.className = 'certificate-card';
        certCard.dataset.cert = index;
        
        certCard.innerHTML = `
            <div class="certificate-image">
                <div class="pdf-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="certificate-overlay">
                    <i class="fas fa-download"></i>
                </div>
            </div>
            <div class="certificate-info">
                <h3>${cert.title}</h3>
                <p class="cert-issuer">${cert.issuer}</p>
                <p class="cert-date">${cert.date}</p>
            </div>
        `;
        
        certificatesGrid.appendChild(certCard);
        
        // Add click event to open/download PDF
        certCard.addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(cert.file, '_blank');
        });
    });
}

// Certificate Modal Functionality
const modal = document.getElementById('certificateModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.modal-close');
const prevBtn = document.getElementById('prevCert');
const nextBtn = document.getElementById('nextCert');
let currentCertIndex = 0;

// This function is no longer needed since we open PDFs directly
// But keeping it for reference
function attachCertificateEvents() {
    // PDF certificates open directly when clicked
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Dark Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Save theme preference
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Add a ripple effect
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
    `;
    themeToggle.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    try {
        loadPublishedPortfolio();
    } catch (error) {
        console.error('Could not load local portfolio content.', error);
    }
    generateCertificates();
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe contact cards
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Parallax effect for shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Dynamic gradient change on mouse move
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const color1 = `hsl(${240 + x * 30}, 70%, ${60 + y * 10}%)`;
            const color2 = `hsl(${270 + y * 30}, 65%, ${55 + x * 10}%)`;
            
            hero.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
        });
    }

    // Add typing effect to tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Add particle effect on profile image hover
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.5)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Cursor trail effect (optional, can be commented out if too much)
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        pointer-events: none;
        left: ${e.clientX - 5}px;
        top: ${e.clientY - 5}px;
        animation: fadeOut 1s ease forwards;
        z-index: 9999;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 1000);
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);
