document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            // Optional: Change icon on toggle
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isExpanded);
                icon.classList.toggle('fa-times', isExpanded); // Assuming you want an X icon
            }
        });
    }

    // --- Mobile Dropdown Toggle ---
    const dropdownToggles = document.querySelectorAll('.nav-links > li > a'); // Select links that might have dropdowns

    dropdownToggles.forEach(toggle => {
        const listItem = toggle.parentElement;
        const dropdown = listItem.querySelector('.dropdown');

        if (dropdown) { // Only add listener if there's a dropdown
            const hasChevron = toggle.querySelector('.fa-chevron-down');

            if (hasChevron) {
                toggle.addEventListener('click', (event) => {
                    if (window.innerWidth < 992 && navLinks.classList.contains('active')) {
                        event.preventDefault(); 
                        listItem.classList.toggle('open'); 
                        const isOpen = listItem.classList.contains('open');
                        toggle.setAttribute('aria-expanded', isOpen);
                    }
                });
            }
        }
    });

    // --- Close mobile menu if clicking outside ---
    document.addEventListener('click', (event) => {
        if (navLinks && navLinks.classList.contains('active')) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                 if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                 }
                 document.querySelectorAll('.nav-links > li.open').forEach(li => li.classList.remove('open'));
            }
        }
    });

    // --- Image Carousel ---
    const carouselContainer = document.querySelector('#home .carousel'); // More specific selector
    if (carouselContainer) {
        const images = carouselContainer.querySelectorAll('.carousel-img');
        const prevButton = carouselContainer.querySelector('.carousel-btn.prev');
        const nextButton = carouselContainer.querySelector('.carousel-btn.next');

        if (images.length > 0 && prevButton && nextButton) {
            let currentImageIndex = 0;

            function showImage(index) {
                images.forEach((img, i) => {
                    img.classList.remove('active');
                    // The 'active' class in CSS should handle display: block / none
                });
                images[index].classList.add('active');
                currentImageIndex = index;
            }

            nextButton.addEventListener('click', () => {
                let nextIndex = currentImageIndex + 1;
                if (nextIndex >= images.length) {
                    nextIndex = 0; // Cycle to the first
                }
                showImage(nextIndex);
            });

            prevButton.addEventListener('click', () => {
                let prevIndex = currentImageIndex - 1;
                if (prevIndex < 0) {
                    prevIndex = images.length - 1; // Cycle to the last
                }
                showImage(prevIndex);
            });

            let initialActiveIndex = 0;
            let activeImageFoundInHtml = false;
            images.forEach((img, index) => {
                if (img.classList.contains('active')) {
                    initialActiveIndex = index;
                    activeImageFoundInHtml = true;
                }
            });

            if (activeImageFoundInHtml) {
                 showImage(initialActiveIndex); 
            } else if (images.length > 0) {
                 showImage(0); 
            }
        }
    }

    // --- Animated Counters ---
    const statsSection = document.getElementById('stats');
    const counterElements = document.querySelectorAll('#stats .count-box h2[data-target]');

    if (statsSection && counterElements.length > 0) {
        const animateCount = (el) => {
            const target = parseInt(el.dataset.target, 10);
            const duration = 2000; // Animation duration in milliseconds (e.g., 2 seconds)
            // Ensure stepTime is at least 1 to prevent issues with very small or large targets
            const stepTime = Math.max(1, Math.abs(Math.floor(duration / target))); 
            let currentNum = 0;
            el.textContent = currentNum; // Initialize with 0

            const counter = () => {
                const increment = Math.ceil(target / (duration / stepTime)); // Dynamic increment
                currentNum += increment;

                if (currentNum >= target) {
                    el.textContent = target; // Ensure target is met
                    clearInterval(timer);
                } else {
                    el.textContent = currentNum;
                }
            };
            
            // Adjust setInterval to handle cases where target is 0 or less than typical increments
            if (target === 0) {
                 el.textContent = 0;
                 return;
            }
            const timer = setInterval(counter, stepTime);
        };
        
        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counterElements.forEach(el => {
                        if (!el.dataset.animated) {
                            animateCount(el);
                            el.dataset.animated = "true"; 
                        }
                    });
                    observer.unobserve(statsSection); 
                }
            });
        };

        const observerOptions = {
            root: null, 
            threshold: 0.1 
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        observer.observe(statsSection);
    }

    // --- Accordion ---
    const accordionButtons = document.querySelectorAll('#disclosure .accordion-button');

    if (accordionButtons.length > 0) {
        accordionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const panelId = button.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);

                if (panel) {
                    // Toggle active classes
                    button.classList.toggle('active');
                    panel.classList.toggle('active');

                    // Update aria-expanded attribute
                    const isExpanded = button.classList.contains('active');
                    button.setAttribute('aria-expanded', isExpanded);

                    // Set max-height for CSS transition
                    if (isExpanded) {
                        panel.style.maxHeight = panel.scrollHeight + 'px';
                    } else {
                        panel.style.maxHeight = null; // Or '0px' if preferred, null lets CSS take over if defined
                    }
                }
            });
        });
    }

    // --- Placeholder Interaction Alerts ---
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent any default action if it were a link
            alert('Search functionality is not yet implemented.');
        });
    }

    const viewAllUpdatesButton = document.querySelector('.view-all-btn');
    if (viewAllUpdatesButton) {
        viewAllUpdatesButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent any default action if it were a link
            alert('Viewing all updates is not yet implemented.');
        });
    }

    const downloadFormButton = document.querySelector('.download-btn'); // Targets the link with class 'download-btn'
    if (downloadFormButton) {
        downloadFormButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent navigation for the '#' href
            alert('Download functionality is not yet implemented.');
        });
    }
    
});
// End of DOMContentLoaded
// Final comment to ensure structure
