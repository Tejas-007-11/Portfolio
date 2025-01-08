// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = loadingScreen.querySelector('.progress-bar');
    const counter = loadingScreen.querySelector('.loading-counter');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        counter.textContent = `${Math.floor(progress)}%`;
        progressBar.style.setProperty('--width', `${progress}%`);
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);

    // Custom cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add lag effect to cursor outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, {
            duration: 500,
            fill: 'forwards'
        });
    });

    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const fullMenu = document.querySelector('.full-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    let isMenuOpen = false;
    
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active');
        fullMenu.classList.toggle('active');
        
        if (isMenuOpen) {
            // Animate menu items
            menuItems.forEach((item, index) => {
                item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
            });
        } else {
            menuItems.forEach(item => {
                item.style.animation = '';
            });
        }
    });

    // Close menu when clicking menu items
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            fullMenu.classList.remove('active');
        });
    });

    // Noise canvas effect
    const canvas = document.getElementById('noise-canvas');
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    function createNoise() {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 255;
            data[i] = noise;
            data[i + 1] = noise;
            data[i + 2] = noise;
            data[i + 3] = 255;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    function animateNoise() {
        createNoise();
        requestAnimationFrame(animateNoise);
    }
    
    animateNoise();

    // Handle window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--width', `${level}%`);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navbar scroll effect
    const navbar = document.querySelector('.nav-wrapper');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success message
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            submitBtn.style.backgroundColor = 'var(--primary-color)';
            submitBtn.style.color = 'var(--secondary-color)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);
            
        } catch (error) {
            // Error handling
            submitBtn.innerHTML = '<span>Error!</span><i class="fas fa-times"></i>';
            submitBtn.style.backgroundColor = '#ff3366';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }
    });

    // Glitch text effect enhancement
    const glitchText = document.querySelector('.glitch-text');
    let glitchInterval;

    glitchText.addEventListener('mouseenter', () => {
        glitchInterval = setInterval(() => {
            const glitch = Math.random() < 0.5;
            if (glitch) {
                glitchText.style.setProperty('--glitch-translate', 
                    `${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px`);
            }
        }, 50);
    });

    glitchText.addEventListener('mouseleave', () => {
        clearInterval(glitchInterval);
        glitchText.style.setProperty('--glitch-translate', '0, 0');
    });

    // Project hover effect enhancement
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const image = item.querySelector('img');
        
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            image.style.transform = `
                scale(1.1)
                rotate3d(${-y}, ${x}, 0, ${Math.sqrt(x*x + y*y) * 10}deg)
            `;
        });
        
        item.addEventListener('mouseleave', () => {
            image.style.transform = '';
        });
    });
});