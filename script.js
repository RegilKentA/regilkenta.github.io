// background stars design
for (let i = 0; i < 50; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(star);
}

// header navbar
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

// Handle mobile menu toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Handle navigation link clicks and active state
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Close mobile menu
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');

        // Smooth scroll to section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-wrapper')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Enhanced scroll effect for fixed header and active section detection
let lastScrollY = window.scrollY;
let ticking = false;
const sections = document.querySelectorAll('.section');

function updateHeader() {
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    // Header scroll effect
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active navigation based on scroll position
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });

    // Update active nav link based on current section
    if (currentSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Initialize header state
updateHeader();

// Handle logo click
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();

    // Remove active from all and add to home
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[href="#home"]').classList.add('active');

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// hi emoji animation
document.getElementById('wave').addEventListener('click', () => {
    const wave = document.getElementById('wave');
    wave.style.animation = 'none';
    setTimeout(() => {
        wave.style.animation = '';
    }, 10);
});

// Add smooth scroll animation when timeline items come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-photo').forEach(item => {
    observer.observe(item);
});


document.querySelectorAll('.achievement-item').forEach(item => {
    observer.observe(item);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe interest cards
document.querySelectorAll('.logo-card').forEach(card => {
    observer.observe(card);
});


let current = 0;
const cards = document.querySelectorAll('.project-card');
const dots = document.querySelectorAll('.dot');
const carousel = document.getElementById('carousel');

function updateCarousel() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const cardWidth = 650; // card width + gap
    const centerOffset = (containerWidth - 700) / 2; // center the 400px card
    const offset = centerOffset - (current * cardWidth);
    carousel.style.transform = `translateX(${offset}px)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
    });
}

function slide(direction) {
    current = (current + direction + cards.length) % cards.length;
    updateCarousel();
}

function goTo(index) {
    current = index;
    updateCarousel();
}

function openModal(title, issuer, date, imageSrc, skills) {
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalIssuer = document.getElementById('modalIssuer');
    const modalDate = document.getElementById('modalDate');
    const modalSkills = document.getElementById('modalSkills');

    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalImage.classList.remove('zoomed');
    modalTitle.textContent = title;
    modalIssuer.textContent = issuer;
    modalDate.textContent = `Issued: ${date}`;

    // Clear previous skills and add new ones
    modalSkills.innerHTML = '';
    skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        modalSkills.appendChild(skillTag);
    });

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.classList.remove('zoomed');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Toggle zoom on image click
function toggleImageZoom() {
    const modalImage = document.getElementById('modalImage');
    modalImage.classList.toggle('zoomed');
}

// Close modal when clicking outside of it
document.getElementById('certModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
