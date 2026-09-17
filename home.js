document.addEventListener("DOMContentLoaded", function () {

/* ==================== MOBILE NAVIGATION ==================== */
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            navLinks.classList.toggle("mobile-active");

            if (navLinks.classList.contains("mobile-active")) {
                menuButton.innerHTML = "✕";
                menuButton.setAttribute("aria-label", "Close navigation");
            } else {
                menuButton.innerHTML = "☰";
                menuButton.setAttribute("aria-label", "Open navigation");
            }
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("mobile-active");
                menuButton.innerHTML = "☰";
                menuButton.setAttribute("aria-label", "Open navigation");
            });
        });
    }

    /* ==================== NAVBAR SCROLL EFFECT ==================== */
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ==================== ACTIVE NAVIGATION ==================== */
    const sections = document.querySelectorAll("main section");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(function (link) {
            link.classList.remove("active");

            const target = link.getAttribute("href");

            if (target === "#" + currentSection) {
                link.classList.add("active");
            }
        });

    });

    /* ==================== SCROLL REVEAL ==================== */
    const revealElements = document.querySelectorAll(
        "section, .foundation-card, .benefit-item, .team-member, .impact-stat"
    );

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });

    /* ==================== NUMBER COUNTER ==================== */
    const counters = document.querySelectorAll(".impact-stat strong");

    const counterObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;
                const originalText = counter.textContent.trim();

                const number = parseFloat(
                    originalText.replace(/[^0-9.]/g, "")
                );

                const suffix = originalText.replace(/[0-9.,]/g, "");

                let current = 0;
                const duration = 1500;
                const increment = number / (duration / 16);

                function updateCounter() {

                    current += increment;

                    if (current >= number) {
                        current = number;
                    }

                    let displayNumber;

                    if (number % 1 !== 0) {
                        displayNumber = current.toFixed(1);
                    } else {
                        displayNumber = Math.floor(current).toLocaleString();
                    }

                    counter.textContent = displayNumber + suffix;

                    if (current < number) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                updateCounter();

                observer.unobserve(counter);
            });

        },
        {
            threshold: 0.7
        }
    );

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });

    /* ==================== FORM VALIDATION ==================== */
    const form = document.querySelector("form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.querySelector("#name");
            const email = document.querySelector("#email");
            const phone = document.querySelector("#phone");
            const message = document.querySelector("#message");

            if (name.value.trim() === "") {
                alert("Please enter your name.");
                name.focus();
                return;
            }

            if (email.value.trim() === "") {
                alert("Please enter your email address.");
                email.focus();
                return;
            }

            if (!validateEmail(email.value)) {
                alert("Please enter a valid email address.");
                email.focus();
                return;
            }

            if (phone.value.trim() === "") {
                alert("Please enter your phone number.");
                phone.focus();
                return;
            }

            if (message.value.trim() === "") {
                alert("Please tell us about your solar needs.");
                message.focus();
                return;
            }

            alert(
                "Thank you, " +
                name.value +
                "! Your quote request has been received."
            );

            form.reset();
        });
    }

    function validateEmail(email) {
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }

    /* ==================== CURRENT YEAR ==================== */
    const footerYear = document.querySelector(".footer-bottom p");

    if (footerYear) {
        footerYear.innerHTML =
            "© " +
            new Date().getFullYear() +
            " SunVolt. All rights reserved.";
    }

});