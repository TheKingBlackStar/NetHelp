// script.js - NETHELP_OS v2.0

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwabJUVWdKe-FzbYv60bVsziB1rJ_oz7kHWvvl-sDIeQTZ1rnhyXp3pEkuvFVrJqGNM/exec';

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
    const utcClock = document.getElementById('utc-clock');
    const heroHeadline = document.getElementById('hero-headline');
    const neuralFabricCanvas = document.getElementById('neural-fabric');
    const terminalLogs = document.getElementById('terminal-logs');
    const projectCards = document.querySelectorAll('.project-card');

    // --- Initialize ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- UTC Clock ---
    function updateUTCTime() {
        if (utcClock) {
            const now = new Date();
            const hours = String(now.getUTCHours()).padStart(2, '0');
            const minutes = String(now.getUTCMinutes()).padStart(2, '0');
            const seconds = String(now.getUTCSeconds()).padStart(2, '0');
            utcClock.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    updateUTCTime();
    setInterval(updateUTCTime, 1000);

    // --- Terminal Logging ---
    function logToTerminal(message) {
        if (terminalLogs) {
            const logLine = document.createElement('div');
            logLine.className = 'terminal-line';
            logLine.textContent = `> ${message}`;
            terminalLogs.appendChild(logLine);
            terminalLogs.scrollTop = terminalLogs.scrollHeight;
        }
    }

    // --- Text Scramble Animation ---
    if (heroHeadline) {
        const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const originalText = heroHeadline.textContent.trim();
        const chars = originalText.split('');
        
        heroHeadline.textContent = '';
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'scramble-char';
            if (char === ' ') {
                span.textContent = ' ';
                span.style.width = '0.3em';
            } else {
                span.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
            heroHeadline.appendChild(span);
            
            setTimeout(() => {
                let iterations = 0;
                const interval = setInterval(() => {
                    span.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    iterations++;
                    if (iterations > 10) {
                        span.textContent = char;
                        clearInterval(interval);
                    }
                }, 50);
            }, index * 30);
        });
    }

    // --- Neural Fabric Background ---
    if (neuralFabricCanvas) {
        const ctx = neuralFabricCanvas.getContext('2d');
        let nodes = [];
        let mouseX = 0;
        let mouseY = 0;
        const nodeCount = window.innerWidth < 768 ? 40 : window.innerWidth < 1024 ? 60 : 80;
        
        function resizeCanvas() {
            neuralFabricCanvas.width = window.innerWidth;
            neuralFabricCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * neuralFabricCanvas.width,
                y: Math.random() * neuralFabricCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 2 + Math.random() * 2
            });
        }
        
        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animate() {
            ctx.clearRect(0, 0, neuralFabricCanvas.width, neuralFabricCanvas.height);
            
            // Update and draw nodes
            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;
                
                if (node.x < 0 || node.x > neuralFabricCanvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > neuralFabricCanvas.height) node.vy *= -1;
                
                // Check mouse proximity
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;
                
                let nodeColor = '#3498DB';
                let nodeRadius = node.radius;
                
                if (distance < maxDistance) {
                    const intensity = 1 - (distance / maxDistance);
                    nodeColor = '#F39C12';
                    nodeRadius = node.radius + intensity * 3;
                }
                
                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor;
                ctx.fill();
                ctx.shadowBlur = 10;
                ctx.shadowColor = nodeColor;
                
                // Draw connections
                nodes.slice(i + 1).forEach(otherNode => {
                    const dx2 = otherNode.x - node.x;
                    const dy2 = otherNode.y - node.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    
                    if (dist2 < 150) {
                        const opacity = (1 - dist2 / 150) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(52, 152, 219, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Project Card Interactions ---
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const projectName = card.getAttribute('data-project');
            const projectNames = {
                'logistics': 'Logistics Matrix',
                'odoo': 'Odoo Enterprise Cloud',
                'c1st': 'C1st Automation Hub'
            };
            logToTerminal(`User accessed ${projectNames[projectName] || 'Project'}`);
        });
    });

    // --- Kinetic Scrolling ---
    let isScrolling = false;
    let scrollVelocity = 0;
    let lastScrollTop = 0;
    let scrollTimeout;
    
    function applyKineticScroll() {
        if (Math.abs(scrollVelocity) > 0.1) {
            window.scrollBy(0, scrollVelocity);
            scrollVelocity *= 0.95; // Deceleration
            requestAnimationFrame(applyKineticScroll);
        } else {
            isScrolling = false;
        }
    }
    
    window.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > 5) {
            scrollVelocity = e.deltaY * 0.3;
            if (!isScrolling) {
                isScrolling = true;
                applyKineticScroll();
            }
        }
    }, { passive: true });

    // --- Header Scroll Effect ---
    let lastSection = '';
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            header.classList.add('scrolled');
            if(headerLogo) headerLogo.classList.add('scrolled-logo-size');
        } else {
            header.classList.remove('scrolled');
            if(headerLogo) headerLogo.classList.remove('scrolled-logo-size');
        }
        
        // Log section changes
        const sections = ['hero', 'projects', 'process', 'why-us', 'contact'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5) {
                    if (lastSection !== sectionId) {
                        lastSection = sectionId;
                        const sectionNames = {
                            'hero': 'Hero Section',
                            'projects': 'Project Architecture',
                            'process': 'System Process',
                            'why-us': 'System Capabilities',
                            'contact': 'Contact Interface'
                        };
                        logToTerminal(`Navigated to ${sectionNames[sectionId] || sectionId}`);
                    }
                }
            }
        });
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
        // Log form interactions
        contactForm.addEventListener('focusin', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                logToTerminal(`Form field accessed: ${e.target.name || e.target.id}`);
            }
        });
        
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (submitButton.disabled) return;

            logToTerminal('Contact form submission initialized');
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
                            logToTerminal('Contact form submitted successfully');
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

    // Initial terminal log
    setTimeout(() => {
        logToTerminal('Neural Fabric network initialized');
    }, 1000);
});
