// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all project items
document.querySelectorAll('.project').forEach(project => {
    project.classList.add('fade-in');
    observer.observe(project);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    const navHeight = 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - navHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-primary)';
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Mobile menu toggle
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav-content');
        const navLinks = document.querySelector('.nav-links');
        
        // Check if menu button already exists
        if (document.querySelector('.menu-toggle')) return;
        
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        menuToggle.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="6" x2="21" y2="6" stroke-width="2"/>
                <line x1="3" y1="12" x2="21" y2="12" stroke-width="2"/>
                <line x1="3" y1="18" x2="21" y2="18" stroke-width="2"/>
            </svg>
        `;
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            .menu-toggle {
                display: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                color: var(--text-primary);
            }
            
            @media (max-width: 768px) {
                .menu-toggle {
                    display: block;
                }
                
                .nav-links {
                    position: fixed;
                    top: 64px;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    flex-direction: column;
                    padding: 2rem;
                    border-bottom: 1px solid var(--border);
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    gap: 1.5rem;
                }
                
                .nav-links.active {
                    transform: translateY(0);
                    opacity: 1;
                }
                
                .nav-links a {
                    font-size: 1.125rem;
                }
            }
        `;
        document.head.appendChild(style);
        nav.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            menuToggle.innerHTML = isOpen ? `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18" stroke-width="2"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke-width="2"/>
                </svg>
            ` : `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="3" y1="6" x2="21" y2="6" stroke-width="2"/>
                    <line x1="3" y1="12" x2="21" y2="12" stroke-width="2"/>
                    <line x1="3" y1="18" x2="21" y2="18" stroke-width="2"/>
                </svg>
            `;
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="3" y1="6" x2="21" y2="6" stroke-width="2"/>
                        <line x1="3" y1="12" x2="21" y2="12" stroke-width="2"/>
                        <line x1="3" y1="18" x2="21" y2="18" stroke-width="2"/>
                    </svg>
                `;
            });
        });
    }
};

// Initialize mobile menu
createMobileMenu();

// Reinitialize on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createMobileMenu();
    }, 250);
});

// Page load fade-in
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('Portfolio loaded');