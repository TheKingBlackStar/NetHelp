// script.js - NetHelp Automation

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwabJUVWdKe-FzbYv60bVsziB1rJ_oz7kHWvvl-sDIeQTZ1rnhyXp3pEkuvFVrJqGNM/exec'; // YOUR NEW DEPLOYMENT URL

    // --- Elements ---
    const header = document.getElementById('header');
    const menuButton = document.getElementById('menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileNav = document.getElementById('nav-links-mobile');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const navLinksDesktopContainer = document.querySelector('#nav-links-desktop.nav-indicator-container');
    const desktopNavLinks = document.querySelectorAll('#nav-links-desktop .nav-link');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = document.getElementById('submit-button');
    const currentYearSpan = document.getElementById('current-year');
    const headerLogo = document.querySelector('#header .animated-logo');
    const powerUpSuccessDiv = document.getElementById('power-up-success');
    const resetFormButton = document.getElementById('reset-form-button');


    // --- Initialize ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            header.classList.add('scrolled');
            if(headerLogo) headerLogo.classList.add('scrolled-logo-size');
        } else {
            header.classList.remove('scrolled');
            if(headerLogo) headerLogo.classList.remove('scrolled-logo-size');
        }
    });

    // --- Mobile Navigation Drawer ---
    const toggleMobileMenu = (open) => {
        if (open) {
            mobileNav.classList.add('open');
            mobileMenuOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            mobileNav.classList.remove('open');
            mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    if (menuButton) menuButton.addEventListener('click', () => toggleMobileMenu(true));
    if (closeMenuButton) closeMenuButton.addEventListener('click', () => toggleMobileMenu(false));
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));
    document.querySelectorAll('#nav-links-mobile a').forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });


    // --- Desktop Navigation Indicator ---
    let navIndicator;
    if (navLinksDesktopContainer) {
        navIndicator = document.createElement('div');
        navIndicator.className = 'nav-indicator';
        navLinksDesktopContainer.appendChild(navIndicator);

        const updateIndicator = (targetLink) => {
            if (targetLink && navIndicator) {
                navIndicator.style.left = `${targetLink.offsetLeft}px`;
                navIndicator.style.width = `${targetLink.offsetWidth}px`;
                navIndicator.style.opacity = '1';
            } else if (navIndicator) {
                navIndicator.style.opacity = '0';
            }
        };

        desktopNavLinks.forEach(link => {
            link.addEventListener('mouseenter', () => updateIndicator(link));
        });

        navLinksDesktopContainer.addEventListener('mouseleave', () => {
            const currentActive = findActiveSectionLink();
            updateIndicator(currentActive);
        });
        setTimeout(() => {
            const initialActive = findActiveSectionLink();
            if (initialActive) updateIndicator(initialActive);
        }, 100);

         window.addEventListener('scroll', () => {
            if (!navLinksDesktopContainer.matches(':hover') && !Array.from(desktopNavLinks).some(l => l.matches(':hover'))) {
                const currentActive = findActiveSectionLink();
                updateIndicator(currentActive);
            }
        }, { passive: true });
    }


    // --- Smooth Scrolling & Active Link Highlighting ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (navIndicator && navLinksDesktopContainer && navLinksDesktopContainer.contains(this)) {
                    updateIndicator(null);
                }
                return;
            }

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = header.offsetHeight > 0 ? header.offsetHeight : 70;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                if (navIndicator && Array.from(desktopNavLinks).includes(this)) {
                    updateIndicator(this);
                }
            }
        });
    });

    const findActiveSectionLink = () => {
        let activeLink = null;
        const scrollThreshold = (header.offsetHeight > 0 ? header.offsetHeight : 70) + window.innerHeight * 0.3;

        for (let i = desktopNavLinks.length - 1; i >= 0; i--) {
            const link = desktopNavLinks[i];
            const sectionId = link.getAttribute('href');
            if (sectionId.startsWith('#') && sectionId.length > 1) {
                const section = document.querySelector(sectionId);
                if (section && section.offsetTop <= window.pageYOffset + scrollThreshold) {
                    activeLink = link;
                    break;
                }
            }
        }
        return activeLink;
    };


    // --- Contact Form Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (submitButton.disabled) return;

            formStatus.textContent = 'Sending Power-Up Request...';
            formStatus.className = 'mt-4 text-center text-sm text-nh-light/70 h-5';
            formStatus.classList.remove('hidden');

            submitButton.disabled = true;
            submitButton.classList.add('opacity-70', 'cursor-not-allowed');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ml-2"></i>';

            const formData = new FormData(contactForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                let scriptKey = key;
                if (key === "Name") scriptKey = "name";
                else if (key === "Email") scriptKey = "email";
                else if (key === "Phone") scriptKey = "phone";
                else if (key === "Company") scriptKey = "company";
                else if (key === "ServiceInterest") scriptKey = "service_interest";
                else if (key === "Message") scriptKey = "message";
                data[scriptKey] = value;
            }

            if (!data.name || !data.email || !data.service_interest || !data.message) {
                formStatus.textContent = "Please fill out all required fields.";
                formStatus.className = 'mt-4 text-center text-sm error h-5';
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
                submitButton.innerHTML = originalButtonText;
                return;
            }

            console.log("Sending data to Apps Script URL:", googleScriptUrl);
            console.log("Data being sent:", JSON.stringify(data));

            try {
                const response = await fetch(googleScriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(data),
                    mode: 'cors'
                });

                console.log("Response status from Apps Script:", response.status);
                const responseText = await response.text();
                console.log("Response text from Apps Script:", responseText);

                if (response.ok) {
                    try {
                        const result = JSON.parse(responseText);
                        if (result.result === 'success') {
                            contactForm.classList.add('hidden');
                            formStatus.classList.add('hidden');
                            if(powerUpSuccessDiv) powerUpSuccessDiv.classList.remove('hidden');
                            
                            const icon = powerUpSuccessDiv ? powerUpSuccessDiv.querySelector('i') : null;
                            if (icon) {
                                icon.style.animation = 'none';
                                icon.offsetHeight; 
                                icon.style.animation = ''; 
                            }
                            contactForm.reset();
                        } else {
                            console.error('Apps Script reported an error:', result.error, "Details:", result.details);
                            formStatus.textContent = `Oops! Server issue: ${result.error || 'Unknown error'}. Please try again.`;
                            formStatus.className = 'mt-4 text-center text-sm error h-5';
                        }
                    } catch (parseError) {
                        console.error('Failed to parse JSON response from Apps Script:', parseError);
                        console.error('Raw response that failed to parse:', responseText);
                        formStatus.textContent = "Received an unexpected response from server. Please try again.";
                        formStatus.className = 'mt-4 text-center text-sm error h-5';
                    }
                } else {
                    formStatus.textContent = `Submission failed. Server responded with ${response.status}. Please try again.`;
                    formStatus.className = 'mt-4 text-center text-sm error h-5';
                }
            } catch (error) {
                console.error('Fetch Network Error:', error);
                formStatus.textContent = "Network problem. Check connection & try again.";
                formStatus.className = 'mt-4 text-center text-sm error h-5';
            } finally {
                if (powerUpSuccessDiv && !powerUpSuccessDiv.classList.contains('hidden')) {
                    // Submit button remains visually "off" as form is hidden
                } else {
                    submitButton.disabled = false;
                    submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
                    submitButton.innerHTML = originalButtonText;
                }
            }
        });
    }

    if (resetFormButton) {
        resetFormButton.addEventListener('click', () => {
            if(powerUpSuccessDiv) powerUpSuccessDiv.classList.add('hidden');
            if(contactForm) contactForm.classList.remove('hidden');
            if(formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'mt-4 text-center text-sm h-5';
                formStatus.classList.remove('hidden');
            }

            if(submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
                const originalButtonText = 'Send My Power-Up Request <i class="fas fa-paper-plane ml-2"></i>';
                submitButton.innerHTML = originalButtonText;
            }
        });
    }

    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left');
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
