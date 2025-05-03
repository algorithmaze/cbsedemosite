document.addEventListener('DOMContentLoaded', () => {

    // --- Carousel Functionality ---
    const carouselImages = document.querySelector('.carousel-images');
    if (carouselImages) {
        const images = carouselImages.querySelectorAll('.carousel-img');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        let currentIndex = 0;
        let intervalId = null;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        function startCarousel() {
            stopCarousel(); // Clear existing interval if any
            intervalId = setInterval(nextImage, 5000); // Change image every 5 seconds
        }

        function stopCarousel() {
            clearInterval(intervalId);
        }

        if (nextBtn && prevBtn && images.length > 0) {
            nextBtn.addEventListener('click', () => {
                nextImage();
                stopCarousel(); // Optional: Stop auto-slide on manual navigation
                // startCarousel(); // Optional: Restart auto-slide after manual navigation
            });

            prevBtn.addEventListener('click', () => {
                prevImage();
                stopCarousel(); // Optional: Stop auto-slide on manual navigation
                // startCarousel(); // Optional: Restart auto-slide after manual navigation
            });

            // Initialize
            showImage(currentIndex);
            startCarousel();

            // Optional: Pause on hover
            const carouselContainer = document.querySelector('.carousel-container');
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', stopCarousel);
                carouselContainer.addEventListener('mouseleave', startCarousel);
            }

            // Add Keyboard Navigation
            document.addEventListener('keydown', (e) => {
                // Check if the carousel is likely visible/relevant (basic check)
                if (carouselContainer && carouselContainer.offsetParent !== null) {
                    if (e.key === 'ArrowLeft') { prevImage(); stopCarousel(); }
                    if (e.key === 'ArrowRight') { nextImage(); stopCarousel(); }
                }
            });

        }
    }

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.count-box h2[data-target]');
    const speed = 200; // Lower number = faster animation

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10); // Adjust timing for smoother/faster animation
            } else {
                counter.innerText = target; // Ensure it ends exactly at the target
            }
        };
        updateCount();
    };

    // Intersection Observer for counter animation trigger
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    counters.forEach(counter => {
        counter.innerText = '0'; // Initialize counter text
        observer.observe(counter);
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            // Optional: Change burger icon to 'X'
            const icon = menuToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // --- Mobile Dropdown Toggle ---
        // Add click listener to parent menu items that have dropdowns
        navLinks.querySelectorAll('li > a:has(+ .dropdown)').forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default and toggle if in mobile view (menu is active)
                if (window.innerWidth <= 992 && navLinks.classList.contains('active')) {
                    e.preventDefault(); // Prevent navigating away
                    const parentLi = link.parentElement;
                    parentLi.classList.toggle('open'); // Toggle 'open' class on the li
                }
            });
        });
    }

    // --- Accordion Functionality ---
    const accordionBtns = document.querySelectorAll('.accordion-button');

    accordionBtns.forEach(button => {
        button.addEventListener('click', () => {
            const panel = document.getElementById(button.getAttribute('aria-controls'));
            if (!panel) return; // Exit if panel not found

            const isActive = button.classList.contains('active');

            // Optional: Close all other panels
            // accordionBtns.forEach(btn => {
            //     if (btn !== button && btn.classList.contains('active')) {
            //         const otherPanel = document.getElementById(btn.getAttribute('aria-controls'));
            //         btn.classList.remove('active');
            //         btn.setAttribute('aria-expanded', 'false');
            //         if (otherPanel) {
            //              otherPanel.style.maxHeight = null;
            //              otherPanel.classList.remove('active'); // Remove padding class
            //         }
            //     }
            // });
            button.classList.toggle('active');
            button.setAttribute('aria-expanded', !isActive);
            panel.classList.toggle('active'); // Toggle padding class
            panel.style.maxHeight = isActive ? null : panel.scrollHeight + "px";
        });
    });
});