document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.07)';
        }
    });

    // Flywheel Positioning Logic
    const nodes = document.querySelectorAll('.flywheel-node');
    if (nodes.length > 0) {
        const positionNodes = () => {
            const isMobile = window.innerWidth <= 768;
            const radius = isMobile ? 120 : 160;
            const totalNodes = nodes.length;
            let currentAngle = -90; // Start at top

            nodes.forEach((node) => {
                const angleRad = currentAngle * (Math.PI / 180);
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;

                node.style.setProperty('--tx', `${x}px`);
                node.style.setProperty('--ty', `${y}px`);
                node.style.transform = `translate(${x}px, ${y}px)`;

                currentAngle += (360 / totalNodes);
            });
        };

        positionNodes();
        window.addEventListener('resize', positionNodes);
    }
});
