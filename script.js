// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const isMobileView = window.innerWidth <= 992; // Adjust breakpoint as in CSS

            // Check if the clicked anchor is the "Courses" main link in mobile menu
            const isMobileDropdownToggle = this.closest('.dropdown') && this.classList.contains('dropdown-toggle');
            
            if (isMobileDropdownToggle && isMobileView) {
                e.preventDefault(); // Only prevent default for the "Courses" toggle in mobile view
                // Toggle the dropdown for mobile view
                this.closest('.nav-item.dropdown').classList.toggle('show-dropdown');
                return; // Stop further execution for the "Courses" toggle
            }

            // For all other links (including sub-items of "Courses" and non-dropdown links)
            e.preventDefault(); 

            // Close mobile menu if open and it's a navigational link (not the dropdown toggle itself)
            const navMenu = document.getElementById('nav-menu');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

            if (navMenu.classList.contains('show') && !isMobileDropdownToggle) {
                navMenu.classList.remove('show');
                mobileMenuToggle.classList.remove('active'); // Revert hamburger icon
                document.body.classList.remove('no-scroll'); // Re-enable body scroll
                // Also close any open mobile dropdowns when the main menu closes
                document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('show-dropdown');
                });
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerOffset = document.getElementById('main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                // Added extra padding for better visual spacing after scroll
                const offsetPosition = elementPosition - headerOffset - 20; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active link in navbar (optional)
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active'); // Add active class to the clicked link
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        mobileMenuToggle.classList.toggle('active'); // Toggle 'active' class for hamburger animation
        document.body.classList.toggle('no-scroll'); // Toggle body scroll
        
        // Close any open mobile dropdowns when the main menu is toggled
        document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
            dropdown.classList.remove('show-dropdown');
        });
    });

    // Close mobile menu when clicking outside (on the backdrop)
    navMenu.addEventListener('click', (e) => {
        if (e.target === navMenu && navMenu.classList.contains('show')) { // Check if click is directly on the menu (backdrop)
            navMenu.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
            document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show-dropdown');
            });
        }
    });


    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark-mode') {
        body.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            card.classList.remove('active');
            dotsContainer.children[i].classList.remove('active');
            if (i === index) {
                card.classList.add('active');
                dotsContainer.children[i].classList.add('active');
            }
        });
    }

    function createDots() {
        testimonials.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                showTestimonial(currentIndex);
            });
            dotsContainer.appendChild(dot);
        });
    }

    if (testimonials.length > 0) {
        createDots();
        showTestimonial(currentIndex);

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        });
    }


    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling down 300px
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Modals (Sign In and Sign Up)
    const signinModal = document.getElementById('signin-modal');
    const signupModal = document.getElementById('signup-modal');
    const desktopSigninBtn = document.getElementById('desktop-signin-btn');
    const mobileSigninBtn = document.getElementById('mobile-signin-btn');
    const desktopSignupBtn = document.getElementById('desktop-signup-btn');
    const mobileSignupBtn = document.getElementById('mobile-signup-btn');
    const closeSigninBtn = document.getElementById('close-signin');
    const closeSignupBtn = document.getElementById('close-signup');
    const switchToSignupLink = document.getElementById('switch-to-signup');
    const switchToSigninLink = document.getElementById('switch-to-signin');

    function openModal(modal) {
        modal.classList.add('show');
        document.body.classList.add('no-scroll'); // Prevent scrolling background
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        // Only remove no-scroll if no other modal is open
        if (!document.querySelector('.modal.show')) {
             document.body.classList.remove('no-scroll'); // Restore scrolling
        }
    }

    desktopSigninBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(signinModal); });
    mobileSigninBtn.addEventListener('click', (e) => { e.preventDefault(); 
        // Close mobile menu if open before showing modal
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
        }
        openModal(signinModal); 
    });
    desktopSignupBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(signupModal); });
    mobileSignupBtn.addEventListener('click', (e) => { e.preventDefault(); 
        // Close mobile menu if open before showing modal
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
        }
        openModal(signupModal); 
    });

    closeSigninBtn.addEventListener('click', () => closeModal(signinModal));
    closeSignupBtn.addEventListener('click', () => closeModal(signupModal));

    // Close modal if clicked outside content
    window.addEventListener('click', (e) => {
        if (e.target === signinModal) closeModal(signinModal);
        if (e.target === signupModal) closeModal(signupModal);
        // Also close payment modal if clicked outside
        if (e.target === paymentModal) closeModal(paymentModal); 
    });

    // Switch between signin/signup forms
    switchToSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signinModal);
        openModal(signupModal);
    });

    switchToSigninLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(signinModal);
    });

    // Handle form submissions (for demonstration, won't actually send data)
    document.getElementById('signin-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Sign In form submitted! (No actual data sent)');
        closeModal(signinModal);
        // Here you would typically send data to a server
    });

    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Sign Up form submitted! (No actual data sent)');
        closeModal(signupModal);
        // Here you would typically send data to a server
    });

    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Newsletter subscribed! (No actual data sent)');
        e.target.reset(); // Clear the form
    });

    // Show More Courses Functionality
    const showMoreBtn = document.getElementById('show-more-courses');
    const moreCourses = document.querySelectorAll('.more-course');

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            moreCourses.forEach(course => {
                course.style.display = 'block'; // Make hidden courses visible
            });
            showMoreBtn.style.display = 'none'; // Hide the "Show More" button after clicking
        });
    }

    // Payment Modal Functionality
    const paymentModal = document.getElementById('payment-modal');
    const closePaymentBtn = document.getElementById('close-payment');
    const courseTitlePayment = document.getElementById('course-title-payment');
    const coursePricePayment = document.getElementById('course-price-payment');
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    const paymentOptionButtons = document.querySelectorAll('.payment-option-btn');

    enrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const courseName = e.target.dataset.courseName;
            const coursePrice = e.target.dataset.coursePrice;

            courseTitlePayment.textContent = courseName;
            coursePricePayment.textContent = `$${parseFloat(coursePrice).toFixed(2)}`;
            
            openModal(paymentModal);
        });
    });

    closePaymentBtn.addEventListener('click', () => closeModal(paymentModal));

    paymentOptionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const method = e.currentTarget.dataset.method; // Use currentTarget to get the button
            alert(`Proceeding with ${method} for enrollment. (Demo confirmation)`);
            closeModal(paymentModal);
            // In a real application, you'd redirect to a payment gateway or process payment here.
        });
    });
});
