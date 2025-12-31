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
    const terminalFooter = document.getElementById('terminal-footer');
    const bootLoader = document.getElementById('boot-loader');
    const bootBarFill = document.getElementById('boot-bar-fill');
    const bootPercent = document.getElementById('boot-percent');
    const bootStatus = document.getElementById('boot-status');
    const bootSubtitle = document.getElementById('boot-subtitle');
    const projectCards = document.querySelectorAll('.project-card');

    // --- Initialize ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Boot Loader (startup screen) ---
    let terminalEnabled = false; // user requested no terminal logs once loaded; keep disabled overall

    function setBootProgress(percent, statusText) {
        const p = Math.max(0, Math.min(100, Number(percent) || 0));
        if (bootBarFill) bootBarFill.style.width = `${p}%`;
        if (bootPercent) bootPercent.textContent = `${p}%`;
        if (bootStatus && statusText) bootStatus.textContent = statusText;
        const bar = bootLoader ? bootLoader.querySelector('.boot-bar') : null;
        if (bar) bar.setAttribute('aria-valuenow', String(p));
    }

    function finishBoot() {
        setBootProgress(100, 'nethelp.solutions loaded');
        if (bootLoader) {
            bootLoader.setAttribute('aria-busy', 'false');
            setTimeout(() => {
                bootLoader.classList.add('hidden');
            }, 450);
            setTimeout(() => {
                bootLoader.style.display = 'none';
            }, 1100);
        }
        // Remove terminal footer after boot
        if (terminalFooter) terminalFooter.style.display = 'none';
    }

    const BOOT_MIN_DURATION_MS = 8500; // intentionally slow so users can read the messages

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function startBootMessageCarousel() {
        if (!bootLoader) return () => {};

        const lines = [
            'Initializing user interface…',
            'Loading configuration…',
            'Loading demo data…',
            'Validating business rules…',
            'Preparing interactive views…',
            'Optimizing performance…',
            'Applying security controls…',
            'Final checks…'
        ];

        let idx = 0;
        const interval = setInterval(() => {
            const next = lines[idx % lines.length];
            idx++;
            if (bootSubtitle) bootSubtitle.textContent = next;
        }, 900);

        return () => clearInterval(interval);
    }

    async function runBootSequenceUntilReady(readyPromise) {
        if (!bootLoader) return;

        const stopCarousel = startBootMessageCarousel();
        const startedAt = Date.now();

        // Smooth progress to 95% over BOOT_MIN_DURATION_MS
        const tickMs = 120;
        const maxBeforeReady = 95;

        let resolvedReady = false;
        readyPromise.then(() => { resolvedReady = true; }).catch(() => { resolvedReady = true; });

        while (true) {
            const elapsed = Date.now() - startedAt;
            const t = Math.min(1, elapsed / BOOT_MIN_DURATION_MS);

            // Ease-out curve for nicer feel
            const eased = 1 - Math.pow(1 - t, 3);
            const pct = Math.floor(eased * maxBeforeReady);

            setBootProgress(pct, resolvedReady ? 'Final checks…' : 'Loading…');

            const minTimeDone = elapsed >= BOOT_MIN_DURATION_MS;
            if (minTimeDone && resolvedReady) break;

            // eslint-disable-next-line no-await-in-loop
            await sleep(tickMs);
        }

        stopCarousel();
        finishBoot();
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
        if (!terminalEnabled) return;
        if (terminalLogs) {
            const logLine = document.createElement('div');
            logLine.className = 'terminal-line';
            logLine.textContent = `> ${message}`;
            terminalLogs.appendChild(logLine);
            terminalLogs.scrollTop = terminalLogs.scrollHeight;
        }
    }

    // --- Text Scramble Animation - Optimized ---
    if (heroHeadline) {
        const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const words = heroHeadline.querySelectorAll('.word');
        
        words.forEach((word, wordIndex) => {
            const originalText = word.textContent;
            const chars = originalText.split('');
            
            // Create character spans for scramble effect
            word.innerHTML = '';
            chars.forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.className = 'scramble-char';
                if (char === ' ') {
                    span.textContent = ' ';
                    span.style.width = '0.3em';
                } else {
                    span.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }
                word.appendChild(span);
                
                // Scramble then reveal - faster and fewer iterations
                setTimeout(() => {
                    let iterations = 0;
                    const interval = setInterval(() => {
                        if (char !== ' ') {
                            span.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                            iterations++;
                            if (iterations > 5) {
                                span.textContent = char;
                                clearInterval(interval);
                            }
                        }
                    }, 30);
                }, (wordIndex * 80) + (charIndex * 15));
            });
        });
    }

    // --- Neural Fabric Background - Optimized ---
    if (neuralFabricCanvas) {
        const ctx = neuralFabricCanvas.getContext('2d');
        let nodes = [];
        let mouseX = 0;
        let mouseY = 0;
        let animationFrameId;
        let lastTime = 0;
        const targetFPS = 30; // Reduce to 30fps for better performance
        const frameInterval = 1000 / targetFPS;
        const nodeCount = window.innerWidth < 768 ? 25 : window.innerWidth < 1024 ? 40 : 50; // Reduced node count
        
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
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: 2
            });
        }
        
        // Throttled mouse tracking
        let mouseThrottle = false;
        document.addEventListener('mousemove', (e) => {
            if (!mouseThrottle) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                mouseThrottle = true;
                setTimeout(() => { mouseThrottle = false; }, 16);
            }
        }, { passive: true });
        
        function animate(currentTime) {
            animationFrameId = requestAnimationFrame(animate);
            
            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) return;
            lastTime = currentTime - (deltaTime % frameInterval);
            
            ctx.clearRect(0, 0, neuralFabricCanvas.width, neuralFabricCanvas.height);
            
            // Update and draw nodes - optimized
            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;
                
                if (node.x < 0 || node.x > neuralFabricCanvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > neuralFabricCanvas.height) node.vy *= -1;
                
                // Check mouse proximity
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 120;
                
                let nodeColor = '#3498DB';
                let nodeRadius = node.radius;
                
                if (distance < maxDistance) {
                    const intensity = 1 - (distance / maxDistance);
                    nodeColor = '#F39C12';
                    nodeRadius = node.radius + intensity * 2;
                }
                
                // Draw node - no shadow for performance
                ctx.fillStyle = nodeColor;
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw connections - reduced
                if (i % 2 === 0) { // Only draw every other connection
                    nodes.slice(i + 1, i + 3).forEach(otherNode => {
                        const dx2 = otherNode.x - node.x;
                        const dy2 = otherNode.y - node.y;
                        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                        
                        if (dist2 < 120) {
                            const opacity = (1 - dist2 / 120) * 0.2;
                            ctx.strokeStyle = `rgba(52, 152, 219, ${opacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(otherNode.x, otherNode.y);
                            ctx.stroke();
                        }
                    });
                }
            });
        }
        animate(0);
    }

    // --- Letter Breaking Effect on Mouse Hover ---
    if (heroHeadline) {
        const chars = heroHeadline.querySelectorAll('.scramble-char');
        let isHovering = false;
        let hoverTimeout;
        let currentMouseX = 0;
        let currentMouseY = 0;
        
        heroHeadline.addEventListener('mouseenter', () => {
            isHovering = true;
            clearTimeout(hoverTimeout);
        });
        
        heroHeadline.addEventListener('mouseleave', () => {
            isHovering = false;
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                restoreLetters();
            }, 100);
        });
        
        function breakLetters(mouseX, mouseY) {
            chars.forEach((char) => {
                const rect = char.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const dx = mouseX - centerX;
                const dy = mouseY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = 1 - (distance / maxDistance);
                    const angle = Math.atan2(dy, dx);
                    const spread = 30 * force;
                    
                    const tx = Math.cos(angle) * spread;
                    const ty = Math.sin(angle) * spread;
                    const rot = (Math.random() - 0.5) * 20 * force;
                    
                    char.style.setProperty('--tx', `${tx}px`);
                    char.style.setProperty('--ty', `${ty}px`);
                    char.style.setProperty('--rot', `${rot}deg`);
                    char.classList.add('broken');
                } else {
                    char.classList.remove('broken');
                    char.style.setProperty('--tx', '0px');
                    char.style.setProperty('--ty', '0px');
                    char.style.setProperty('--rot', '0deg');
                }
            });
        }
        
        function restoreLetters() {
            chars.forEach(char => {
                char.classList.remove('broken');
                char.style.setProperty('--tx', '0px');
                char.style.setProperty('--ty', '0px');
                char.style.setProperty('--rot', '0deg');
            });
        }
        
        // Update on mouse move
        heroHeadline.addEventListener('mousemove', (e) => {
            currentMouseX = e.clientX;
            currentMouseY = e.clientY;
            if (isHovering) {
                breakLetters(currentMouseX, currentMouseY);
            }
        }, { passive: true });
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

    // --- View Toggle Functionality ---
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            const project = button.getAttribute('data-project');
            const card = document.querySelector(`[data-project="${project}"]`);
            
            if (card) {
                // Update buttons in this card
                card.querySelectorAll('.view-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Update content views
                const simpleView = card.querySelector('.simple-view');
                const technicalView = card.querySelector('.technical-view');
                
                if (view === 'simple') {
                    if (simpleView) simpleView.classList.add('active');
                    if (technicalView) technicalView.classList.remove('active');
                    logToTerminal(`Switched to simple view: ${project}`);
                } else {
                    if (simpleView) simpleView.classList.remove('active');
                    if (technicalView) technicalView.classList.add('active');
                    logToTerminal(`Switched to technical view: ${project}`);
                }
            }
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
    const DEMO_SECTION_IDS = new Set(['excel-demo', 'odoo-demo']);

    function revealDemoSectionById(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return false;
        if (section.classList.contains('demo-hidden')) {
            section.classList.remove('demo-hidden');
            section.classList.add('demo-visible');
        }
        return true;
    }

    function revealIfDemoHref(href) {
        if (!href || !href.startsWith('#')) return false;
        const id = href.slice(1);
        if (!DEMO_SECTION_IDS.has(id)) return false;
        return revealDemoSectionById(id);
    }

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

            // If a demo section is hidden, reveal it before scrolling
            revealIfDemoHref(href);

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
                
                // Log demo access
                if (href === '#excel-demo') {
                    logToTerminal('User accessed Logistics Matrix demo');
                }
                if (href === '#odoo-demo') {
                    logToTerminal('User accessed Odoo Enterprise demo');
                }
                
                if (navIndicator && Array.from(desktopNavLinks).includes(this)) {
                    updateIndicator(this);
                }
            }
        });
    });

    // Allow direct links to demos (ex: /#excel-demo) even though demos start hidden
    if (window.location && window.location.hash) {
        revealIfDemoHref(window.location.hash);
    }

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
            formStatus.textContent = 'Sending request...';
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
                const originalButtonText = 'Send Request <i class="fas fa-paper-plane ml-2"></i>';
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

    // Start the boot sequence and keep it up for a minimum duration,
    // finishing only after BOTH (1) min time and (2) demo load attempt.

    // --- Excel Viewer Security & Tab Navigation ---
    const excelViewer = document.getElementById('excel-viewer');
    const excelOverlay = document.getElementById('excel-overlay');
    const excelTabs = document.querySelectorAll('.excel-tab');
    const excelSheets = document.querySelectorAll('.excel-sheet');
    const excelSheetInfoTitle = document.getElementById('excel-sheet-info-title');
    const excelSheetInfoText = document.getElementById('excel-sheet-info-text');

    function updateExcelSheetInfo(sheetId) {
        if (!excelSheetInfoTitle || !excelSheetInfoText) return;

        const infoBySheet = {
            assignments: {
                title: 'Assignments',
                text: 'Build the daily dispatch plan. Choose a Driver and Vehicle for each Run/Route. Vehicle ID, VIN, and Status auto-fill from the Vehicles database. Duplicate and status highlighting helps catch problems fast.'
            },
            driverView: {
                title: 'Driver View',
                text: 'Read-only output for the team. This view automatically lists only assignments where Vehicle Status is Active or Needs Service, so drivers see the valid runs at a glance.'
            },
            employees: {
                title: 'Employees',
                text: 'Employee directory. Shows Active and Inactive employees and generates Full Name from First + Last so your dropdown list stays consistent and clean.'
            },
            vehicles: {
                title: 'Vehicles',
                text: 'Vehicle database (source of truth). Assignments pull Vehicle ID, VIN, and Status from here, preventing manual errors.'
            },
            lists: {
                title: 'Lists',
                text: 'Controlled lists used by the system (ex: Run/Route names). This keeps assignments consistent and prevents typos.'
            }
        };

        const info = infoBySheet[sheetId] || infoBySheet.assignments;
        excelSheetInfoTitle.textContent = info.title;
        excelSheetInfoText.textContent = info.text;
    }
    
    // Tab switching functionality
    excelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSheet = tab.getAttribute('data-sheet');
            
            // Update active tab
            excelTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active sheet
            excelSheets.forEach(sheet => {
                sheet.classList.remove('active');
                if (sheet.getAttribute('data-sheet') === targetSheet) {
                    sheet.classList.add('active');
                }
            });

            updateExcelSheetInfo(targetSheet);
            
            logToTerminal(`Switched to Excel sheet: ${targetSheet}`);
        });
    });

    // Initialize per-tab help copy
    const initialActiveTab = document.querySelector('.excel-tab.active');
    if (initialActiveTab) {
        updateExcelSheetInfo(initialActiveTab.getAttribute('data-sheet'));
    }
    
    // Function to load Excel data into a specific sheet
    function loadExcelDataToSheet(sheetId, htmlContent) {
        const sheet = document.getElementById(sheetId);
        if (sheet) {
            const container = sheet.querySelector('.excel-table-container');
            if (container) {
                container.innerHTML = htmlContent;
                logToTerminal(`Excel data loaded into ${sheetId}`);
            }
        }
    }
    
    // --- Logistics Matrix Demo (CSV-driven, Excel-like rules) ---
    // Data sources (in repo root)
    const CSV_FILES = {
        assignments: 'Assignments.csv',
        vehicles: 'Vehicles.csv',
        employees: 'Employees.csv',
        lists: 'Lists.csv'
    };

    /**
     * Lightweight CSV parser with quote support.
     * Returns rows of strings.
     */
    function parseCsv(text) {
        const rows = [];
        let row = [];
        let field = '';
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const next = text[i + 1];

            if (inQuotes) {
                if (char === '"' && next === '"') {
                    field += '"';
                    i++;
                } else if (char === '"') {
                    inQuotes = false;
                } else {
                    field += char;
                }
                continue;
            }

            if (char === '"') {
                inQuotes = true;
                continue;
            }

            if (char === ',') {
                row.push(field);
                field = '';
                continue;
            }

            if (char === '\r') continue;

            if (char === '\n') {
                row.push(field);
                field = '';
                rows.push(row);
                row = [];
                continue;
            }

            field += char;
        }

        // trailing field
        row.push(field);
        rows.push(row);
        return rows;
    }

    async function fetchCsvRows(fileName) {
        const res = await fetch(fileName, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load ${fileName} (${res.status})`);
        const text = await res.text();
        return parseCsv(text);
    }

    function formatDateMMDDYYYY(date) {
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = String(date.getFullYear());
        return `${mm}/${dd}/${yyyy}`;
    }

    function textOrEmpty(value) {
        return (value ?? '').toString().trim();
    }

    function buildTable({ headers, rows, className }) {
        const table = document.createElement('table');
        if (className) table.className = className;

        const thead = document.createElement('thead');
        const headTr = document.createElement('tr');
        headers.forEach(h => {
            const th = document.createElement('th');
            th.textContent = h;
            headTr.appendChild(th);
        });
        thead.appendChild(headTr);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        rows.forEach(trEl => tbody.appendChild(trEl));
        table.appendChild(tbody);
        return table;
    }

    function buildSelect({ options, value, onChange, ariaLabel }) {
        const select = document.createElement('select');
        select.className = 'excel-select';
        if (ariaLabel) select.setAttribute('aria-label', ariaLabel);

        const blank = document.createElement('option');
        blank.value = '';
        blank.textContent = '';
        select.appendChild(blank);

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });

        select.value = value || '';
        select.addEventListener('change', (e) => onChange(e.target.value));
        return select;
    }

    function normalizeStatus(status) {
        return textOrEmpty(status);
    }

    function statusClass(status) {
        const s = normalizeStatus(status);
        if (s === 'Active') return 'status-active';
        if (s === 'Needs Service') return 'status-needs-service';
        if (s === 'In Service') return 'status-in-service';
        if (s === 'Out of Service') return 'status-out-of-service';
        return '';
    }

    function renderError(containerEl, message) {
        containerEl.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'excel-placeholder font-mono text-sm text-nh-accent';
        div.textContent = message;
        containerEl.appendChild(div);
    }

    function clearContainerPreserveHeader(containerEl) {
        // container includes date header as first child; preserve it
        const children = Array.from(containerEl.children);
        children.slice(1).forEach(c => c.remove());
    }

    async function initLogisticsMatrixDemo() {
        const assignmentsContainer = document.getElementById('assignments-container');
        const assignmentsDateEl = document.getElementById('assignments-date');
        const driverViewContainer = document.getElementById('driver-view-container');
        const driverViewDateEl = document.getElementById('driver-view-date');
        const employeesContainer = document.getElementById('employees-container');
        const vehiclesContainer = document.getElementById('vehicles-container');
        const listsContainer = document.getElementById('lists-container');

        // If demo markup is missing, do nothing
        if (!assignmentsContainer || !driverViewContainer || !employeesContainer || !vehiclesContainer || !listsContainer) return;

        try {
            logToTerminal('Loading Logistics Matrix demo CSVs');
            const [assignmentsRows, vehiclesRows, employeesRows, listsRows] = await Promise.all([
                fetchCsvRows(CSV_FILES.assignments),
                fetchCsvRows(CSV_FILES.vehicles),
                fetchCsvRows(CSV_FILES.employees),
                fetchCsvRows(CSV_FILES.lists)
            ]);

            // --- Vehicles map ---
            // Vehicles.csv headers: Vehicle Name, ID, VIN, Status, Notes
            const vehicles = [];
            for (let i = 1; i < vehiclesRows.length; i++) {
                const r = vehiclesRows[i] || [];
                const name = textOrEmpty(r[0]);
                if (!name) continue;
                vehicles.push({
                    name,
                    id: textOrEmpty(r[1]),
                    vin: textOrEmpty(r[2]),
                    status: textOrEmpty(r[3]),
                    notes: textOrEmpty(r[4])
                });
            }
            const vehiclesByName = new Map(vehicles.map(v => [v.name, v]));
            const vehicleNames = vehicles.map(v => v.name).sort((a, b) => a.localeCompare(b));

            // --- Employees: parse active/inactive tables in one CSV ---
            // Employees.csv layout: [First Name, Last Name, Full Name, Role, Status, ... blanks ..., First Name, Last Name, Full Name, Role, Status]
            const empHeader = employeesRows[0] || [];
            const firstNameCol1 = empHeader.findIndex(h => textOrEmpty(h) === 'First Name');
            const firstNameCol2 = empHeader.findIndex((h, idx) => idx > firstNameCol1 && textOrEmpty(h) === 'First Name');
            const activeEmployees = [];
            const inactiveEmployees = [];

            for (let i = 1; i < employeesRows.length; i++) {
                const r = employeesRows[i] || [];

                const aFirst = textOrEmpty(r[firstNameCol1]);
                const aLast = textOrEmpty(r[firstNameCol1 + 1]);
                const aRole = textOrEmpty(r[firstNameCol1 + 3]);
                const aStatus = textOrEmpty(r[firstNameCol1 + 4]);
                if (aFirst || aLast) {
                    activeEmployees.push({
                        firstName: aFirst,
                        lastName: aLast,
                        fullName: textOrEmpty(r[firstNameCol1 + 2]) || `${aFirst} ${aLast}`.trim(),
                        role: aRole,
                        status: aStatus
                    });
                }

                const iFirst = firstNameCol2 >= 0 ? textOrEmpty(r[firstNameCol2]) : '';
                const iLast = firstNameCol2 >= 0 ? textOrEmpty(r[firstNameCol2 + 1]) : '';
                const iRole = firstNameCol2 >= 0 ? textOrEmpty(r[firstNameCol2 + 3]) : '';
                const iStatus = firstNameCol2 >= 0 ? textOrEmpty(r[firstNameCol2 + 4]) : '';
                if (iFirst || iLast) {
                    inactiveEmployees.push({
                        firstName: iFirst,
                        lastName: iLast,
                        fullName: textOrEmpty(r[firstNameCol2 + 2]) || `${iFirst} ${iLast}`.trim(),
                        role: iRole,
                        status: iStatus
                    });
                }
            }

            const activeDriverNames = activeEmployees
                .filter(e => e.status === 'Active')
                .map(e => e.fullName)
                .filter(Boolean)
                .sort((a, b) => a.localeCompare(b));

            // --- Lists: routes list ---
            const routes = [];
            for (let i = 1; i < listsRows.length; i++) {
                const r = listsRows[i] || [];
                const route = textOrEmpty(r[0]);
                if (!route) break;
                routes.push(route);
            }

            // --- Assignments rows (dynamic until first blank Run/Route) ---
            // Assignments.csv: Row 1 has date in col A; row 2 has headers; data begins row 3.
            const assignmentsDate = textOrEmpty((assignmentsRows[0] || [])[0]);
            if (assignmentsDateEl) assignmentsDateEl.textContent = assignmentsDate || '--/--/----';
            if (driverViewDateEl) driverViewDateEl.textContent = formatDateMMDDYYYY(new Date());

            const assignments = [];
            for (let i = 2; i < assignmentsRows.length; i++) {
                const r = assignmentsRows[i] || [];
                const runRoute = textOrEmpty(r[0]);
                if (!runRoute) break; // dynamic stop at first blank route
                assignments.push({
                    runRoute,
                    driver: textOrEmpty(r[1]),
                    vehicle: textOrEmpty(r[2]),
                    vehicleId: textOrEmpty(r[3]),
                    vin: textOrEmpty(r[4]),
                    vehicleStatus: textOrEmpty(r[5])
                });
            }

            // Apply initial VLOOKUP behavior (vehicle-derived fields)
            assignments.forEach(a => {
                const v = vehiclesByName.get(a.vehicle);
                if (v) {
                    a.vehicleId = v.id;
                    a.vin = v.vin;
                    a.vehicleStatus = v.status;
                } else {
                    // Excel IFERROR -> blank if not found
                    a.vehicleId = '';
                    a.vin = '';
                    a.vehicleStatus = '';
                }
            });

            // --- Render Vehicles sheet ---
            clearContainerPreserveHeader(vehiclesContainer);
            const vehicleRows = vehicles.map(v => {
                const tr = document.createElement('tr');
                [v.name, v.id, v.vin, v.status, v.notes].forEach(val => {
                    const td = document.createElement('td');
                    td.textContent = val;
                    tr.appendChild(td);
                });
                return tr;
            });
            vehiclesContainer.appendChild(
                buildTable({
                    headers: ['Vehicle Name', 'ID', 'VIN', 'Status', 'Notes'],
                    rows: vehicleRows
                })
            );

            // --- Render Lists sheet (runs only; gas card ignored) ---
            clearContainerPreserveHeader(listsContainer);
            const listTableRows = routes.map(r => {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.textContent = r;
                tr.appendChild(td);
                return tr;
            });
            listsContainer.appendChild(
                buildTable({
                    headers: ['Valid Runs'],
                    rows: listTableRows
                })
            );

            // --- Render Employees sheet ---
            clearContainerPreserveHeader(employeesContainer);
            const wrap = document.createElement('div');
            wrap.className = 'excel-grid-2';

            const activeBlock = document.createElement('div');
            const activeTitle = document.createElement('div');
            activeTitle.className = 'excel-subheader font-mono text-lg font-bold mb-3 text-nh-terminal-green';
            activeTitle.textContent = 'Active Employees';
            activeBlock.appendChild(activeTitle);
            activeBlock.appendChild(
                buildTable({
                    headers: ['First Name', 'Last Name', 'Full Name', 'Role', 'Status'],
                    rows: activeEmployees.filter(e => e.firstName || e.lastName).map(e => {
                        const tr = document.createElement('tr');
                        const full = `${e.firstName} ${e.lastName}`.trim();
                        [e.firstName, e.lastName, full, e.role, e.status].forEach(val => {
                            const td = document.createElement('td');
                            td.textContent = val;
                            tr.appendChild(td);
                        });
                        return tr;
                    })
                })
            );

            const inactiveBlock = document.createElement('div');
            const inactiveTitle = document.createElement('div');
            inactiveTitle.className = 'excel-subheader font-mono text-lg font-bold mb-3 text-nh-accent';
            inactiveTitle.textContent = 'Inactive Employees';
            inactiveBlock.appendChild(inactiveTitle);
            inactiveBlock.appendChild(
                buildTable({
                    headers: ['First Name', 'Last Name', 'Full Name', 'Role', 'Status'],
                    rows: inactiveEmployees.filter(e => e.firstName || e.lastName).map(e => {
                        const tr = document.createElement('tr');
                        const full = `${e.firstName} ${e.lastName}`.trim();
                        [e.firstName, e.lastName, full, e.role, e.status].forEach(val => {
                            const td = document.createElement('td');
                            td.textContent = val;
                            tr.appendChild(td);
                        });
                        return tr;
                    })
                })
            );

            wrap.appendChild(activeBlock);
            wrap.appendChild(inactiveBlock);
            employeesContainer.appendChild(wrap);

            // --- Assignments renderer + conditional formatting ---
            function applyAssignmentsFormatting(tableEl, rowsState) {
                const driverCounts = new Map();
                const vehicleCounts = new Map();
                const vinCounts = new Map();

                rowsState.forEach(r => {
                    const d = textOrEmpty(r.driver);
                    const v = textOrEmpty(r.vehicle);
                    const vin = textOrEmpty(r.vin);
                    if (d) driverCounts.set(d, (driverCounts.get(d) || 0) + 1);
                    if (v) vehicleCounts.set(v, (vehicleCounts.get(v) || 0) + 1);
                    if (vin) vinCounts.set(vin, (vinCounts.get(vin) || 0) + 1);
                });

                const tbody = tableEl.querySelector('tbody');
                if (!tbody) return;
                const trs = Array.from(tbody.querySelectorAll('tr'));

                trs.forEach((tr, idx) => {
                    const row = rowsState[idx];
                    if (!row) return;

                    const d = textOrEmpty(row.driver);
                    const v = textOrEmpty(row.vehicle);
                    const vin = textOrEmpty(row.vin);
                    const status = normalizeStatus(row.vehicleStatus);

                    tr.classList.remove('is-duplicate', 'status-active', 'status-needs-service', 'status-in-service', 'status-out-of-service');

                    const isDup = (d && (driverCounts.get(d) || 0) > 1) ||
                        (v && (vehicleCounts.get(v) || 0) > 1) ||
                        (vin && (vinCounts.get(vin) || 0) > 1);

                    if (isDup) tr.classList.add('is-duplicate');

                    const sClass = statusClass(status);
                    if (sClass) tr.classList.add(sClass);
                });
            }

            function renderDriverView() {
                clearContainerPreserveHeader(driverViewContainer);

                const filtered = assignments.filter(a => a.vehicleStatus === 'Active' || a.vehicleStatus === 'Needs Service');

                if (filtered.length === 0) {
                    const msg = document.createElement('div');
                    msg.className = 'excel-placeholder font-mono text-sm text-nh-light/70';
                    msg.textContent = 'No Active Records';
                    driverViewContainer.appendChild(msg);
                    return;
                }

                const dvRows = filtered.map(a => {
                    const tr = document.createElement('tr');
                    [a.runRoute, a.driver, a.vehicleId, a.vehicle].forEach(val => {
                        const td = document.createElement('td');
                        td.textContent = val;
                        tr.appendChild(td);
                    });
                    return tr;
                });

                driverViewContainer.appendChild(
                    buildTable({
                        headers: ['Run/Route', 'Driver', 'Vehicle ID', 'Vehicle'],
                        rows: dvRows
                    })
                );
            }

            function renderAssignments() {
                clearContainerPreserveHeader(assignmentsContainer);

                const tableRows = assignments.map((a, idx) => {
                    const tr = document.createElement('tr');

                    // Run/Route (read-only)
                    const tdRoute = document.createElement('td');
                    tdRoute.textContent = a.runRoute;
                    tr.appendChild(tdRoute);

                    // Driver dropdown
                    const tdDriver = document.createElement('td');
                    const driverSelect = buildSelect({
                        options: activeDriverNames,
                        value: a.driver,
                        ariaLabel: `Driver for ${a.runRoute}`,
                        onChange: (val) => {
                            assignments[idx].driver = val;
                            applyAssignmentsFormatting(table, assignments);
                            renderDriverView();
                        }
                    });
                    tdDriver.appendChild(driverSelect);
                    tr.appendChild(tdDriver);

                    // Vehicle dropdown
                    const tdVehicle = document.createElement('td');
                    const vehicleSelect = buildSelect({
                        options: vehicleNames,
                        value: a.vehicle,
                        ariaLabel: `Vehicle for ${a.runRoute}`,
                        onChange: (val) => {
                            assignments[idx].vehicle = val;
                            const v = vehiclesByName.get(val);
                            if (v) {
                                assignments[idx].vehicleId = v.id;
                                assignments[idx].vin = v.vin;
                                assignments[idx].vehicleStatus = v.status;
                            } else {
                                assignments[idx].vehicleId = '';
                                assignments[idx].vin = '';
                                assignments[idx].vehicleStatus = '';
                            }

                            // Update read-only cells
                            tdVehicleId.textContent = assignments[idx].vehicleId;
                            tdVin.textContent = assignments[idx].vin;
                            tdStatus.textContent = assignments[idx].vehicleStatus;

                            applyAssignmentsFormatting(table, assignments);
                            renderDriverView();
                        }
                    });
                    tdVehicle.appendChild(vehicleSelect);
                    tr.appendChild(tdVehicle);

                    // Vehicle ID (read-only)
                    const tdVehicleId = document.createElement('td');
                    tdVehicleId.textContent = a.vehicleId;
                    tr.appendChild(tdVehicleId);

                    // VIN (read-only)
                    const tdVin = document.createElement('td');
                    tdVin.textContent = a.vin;
                    tr.appendChild(tdVin);

                    // Vehicle Status (read-only)
                    const tdStatus = document.createElement('td');
                    tdStatus.textContent = a.vehicleStatus;
                    tr.appendChild(tdStatus);

                    return tr;
                });

                const table = buildTable({
                    headers: ['Run/Route', 'Driver', 'Vehicle', 'Vehicle ID', 'VIN', 'Vehicle Status'],
                    rows: tableRows
                });

                assignmentsContainer.appendChild(table);
                applyAssignmentsFormatting(table, assignments);
            }

            renderAssignments();
            renderDriverView();
            logToTerminal('Logistics Matrix demo loaded');
        } catch (err) {
            console.error(err);
            logToTerminal('Failed to load Logistics Matrix demo');

            const a = document.getElementById('assignments-container');
            const d = document.getElementById('driver-view-container');
            const e = document.getElementById('employees-container');
            const v = document.getElementById('vehicles-container');
            const l = document.getElementById('lists-container');

            const msg = `Demo failed to load CSV data. If you're opening the file directly, use a local web server.`;
            if (a) renderError(a, msg);
            if (d) renderError(d, msg);
            if (e) renderError(e, msg);
            if (v) renderError(v, msg);
            if (l) renderError(l, msg);
        }
    }

    // Kick off demo load (no persistence; refresh resets back to CSV defaults)
    const demoReadyPromise = initLogisticsMatrixDemo();
    // Never get stuck if something goes wrong: consider "ready" after a hard cap
    const cappedReadyPromise = Promise.race([demoReadyPromise, sleep(12000)]);
    runBootSequenceUntilReady(cappedReadyPromise);
    
    if (excelViewer) {
        // Disable right-click context menu
        excelViewer.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Disable text selection
        excelViewer.addEventListener('selectstart', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Disable drag
        excelViewer.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Block keyboard shortcuts (Ctrl+C, Ctrl+A, Ctrl+V, Ctrl+S, F12, etc.)
        excelViewer.addEventListener('keydown', (e) => {
            // Block Ctrl+C, Ctrl+A, Ctrl+V, Ctrl+S, Ctrl+P
            if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || 
                             e.key === 'a' || e.key === 'A' || 
                             e.key === 'v' || e.key === 'V' || 
                             e.key === 's' || e.key === 'S' || 
                             e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            // Block F12 (DevTools)
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }
            // Block Print Screen
            if (e.key === 'PrintScreen') {
                e.preventDefault();
                return false;
            }
        });
        
        // Block copy event
        excelViewer.addEventListener('copy', (e) => {
            e.clipboardData.setData('text/plain', '');
            e.preventDefault();
            return false;
        });
        
        // Block cut event
        excelViewer.addEventListener('cut', (e) => {
            e.clipboardData.setData('text/plain', '');
            e.preventDefault();
            return false;
        });
        
        // Apply security to all sheets
        excelSheets.forEach(sheet => {
            // Disable right-click context menu
            sheet.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });
            
            // Disable text selection
            sheet.addEventListener('selectstart', (e) => {
                e.preventDefault();
                return false;
            });
            
            // Disable drag
            sheet.addEventListener('dragstart', (e) => {
                e.preventDefault();
                return false;
            });
            
            // Block keyboard shortcuts
            sheet.addEventListener('keydown', (e) => {
                if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || 
                                 e.key === 'a' || e.key === 'A' || 
                                 e.key === 'v' || e.key === 'V' || 
                                 e.key === 's' || e.key === 'S' || 
                                 e.key === 'p' || e.key === 'P')) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                if (e.key === 'F12' || e.key === 'PrintScreen') {
                    e.preventDefault();
                    return false;
                }
            });
            
            // Block copy event
            sheet.addEventListener('copy', (e) => {
                e.clipboardData.setData('text/plain', '');
                e.preventDefault();
                return false;
            });
            
            // Block cut event
            sheet.addEventListener('cut', (e) => {
                e.clipboardData.setData('text/plain', '');
                e.preventDefault();
                return false;
            });
        });
        
        // Add overlay to prevent interaction
        excelOverlay.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });
        
        excelOverlay.addEventListener('mouseup', (e) => {
            e.preventDefault();
        });
        
        logToTerminal('Excel viewer security protocols activated');
    }

    // --- Video Security ---
    const odooVideo = document.getElementById('odoo-demo-video');
    
    if (odooVideo) {
        // Prevent right-click on video
        odooVideo.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Remove download option from controls
        odooVideo.addEventListener('loadedmetadata', () => {
            // Ensure download is disabled
            odooVideo.controlsList = 'nodownload noplaybackrate';
        });
        
        // Log video interaction
        odooVideo.addEventListener('play', () => {
            logToTerminal('Odoo demo video playback started');
        });
        
        logToTerminal('Odoo demo video loaded');
    }
});
