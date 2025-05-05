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
            // Add a specific class or data attribute to identify dropdown toggles if needed
            // For simplicity, we'll check for the chevron icon here
            const hasChevron = toggle.querySelector('.fa-chevron-down');

            if (hasChevron) {
                toggle.addEventListener('click', (event) => {
                    // Only prevent default and toggle on smaller screens where menu is collapsed
                    if (window.innerWidth < 992 && navLinks.classList.contains('active')) {
                        event.preventDefault(); // Prevent navigating away
                        listItem.classList.toggle('open'); // Toggle 'open' class on the LI
                        // Optional: Aria attributes for accessibility
                        const isOpen = listItem.classList.contains('open');
                        toggle.setAttribute('aria-expanded', isOpen);
                    }
                    // Allow navigation on larger screens or if the link doesn't just open a dropdown
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
                 // Close any open dropdowns when menu closes
                 document.querySelectorAll('.nav-links > li.open').forEach(li => li.classList.remove('open'));
            }
        }
    });

});
// Note: Counter animation and carousel logic would go here as well if not already present.
