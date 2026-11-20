
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const siteHeader = document.getElementById("siteHeader");

    if (!menuToggle || !mobileNav || !siteHeader) return;

    function setMenuState(isOpen) {
        menuToggle.classList.toggle("is-active", isOpen);
        mobileNav.classList.toggle("is-open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        mobileNav.inert = !isOpen;
    }

    // Open and close hamburger menu
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        setMenuState(!isOpen);
    });

    // Close menu when clicking navigation links
    mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    // Close menu when clicking outside header
    document.addEventListener("click", event => {
        if (!siteHeader.contains(event.target)) {
            setMenuState(false);
        }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            const wasOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            setMenuState(false);

            if (wasOpen) {
                menuToggle.focus();
            }
        }
    });

    // Reset menu when switching to desktop
    const desktopMedia = window.matchMedia("(min-width: 1101px)");

    function handleDesktopChange(event) {
        if (event.matches) {
            setMenuState(false);
        }
    }

    desktopMedia.addEventListener(
        "change",
        handleDesktopChange
    );

    setMenuState(false);

});



const footerYear = document.getElementById("footerYear");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}



// ==========================================
// REGENOVA CONTACT FORM - DEMO SUBMISSION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("appointmentForm");
    const modal = document.getElementById("appointmentModal");
    const closeButton = document.getElementById("closeAppointmentModal");
    const phoneInput = document.getElementById("appointmentPhone");

    if (!form || !modal || !closeButton || !phoneInput) return;

    let previousFocus = null;

    // Allow numbers only, maximum 8 digits
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value
            .replace(/\D/g, "")
            .slice(0, 8);

        phoneInput.setCustomValidity("");
    });

    // Open success popup
    function openModal() {
        previousFocus = document.activeElement;

        modal.inert = false;
        modal.classList.add("is-visible");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
        closeButton.focus();
    }

    // Close success popup
    function closeModal() {
        modal.classList.remove("is-visible");
        modal.setAttribute("aria-hidden", "true");
        modal.inert = true;

        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    // Form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const phone = phoneInput.value.trim();

        // Lebanese mobile and Beirut landline formats
        const validPhone =
            /^(?:0?3\d{6}|(?:70|71|76|78|79|81)\d{6}|0?1\d{6})$/.test(phone);

        if (!validPhone) {
            phoneInput.setCustomValidity(
                "Please enter a valid Lebanese phone number."
            );

            phoneInput.reportValidity();
            return;
        }

        phoneInput.setCustomValidity("");

        // Demo only: no data is sent or stored
        form.reset();

        // Display requested success message
        openModal();
    });

    // Close button
    closeButton.addEventListener("click", closeModal);

    // Close when clicking outside popup
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close with Escape key
    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("is-visible")) return;

        if (event.key === "Escape") {
            closeModal();
        }

        if (event.key === "Tab") {
            event.preventDefault();
            closeButton.focus();
        }
    });

});



// ==========================================
// REGENOVA HOMEPAGE ANIMATED COUNTERS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".home-counter");

    if (!counters.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function animateCounter(counter) {

        if (counter.dataset.animated === "true") return;

        counter.dataset.animated = "true";

        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target)) return;

        if (reducedMotion) {
            counter.textContent = target.toLocaleString("en-US");
            return;
        }

        const duration = 1800;
        let startTime = null;

        function updateCounter(timestamp) {

            if (startTime === null) {
                startTime = timestamp;
            }

            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

            // Smooth ease-out animation
            const eased = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.round(target * eased);

            counter.textContent = currentValue.toLocaleString("en-US");

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString("en-US");
            }
        }

        counter.textContent = "0";
        requestAnimationFrame(updateCounter);
    }

    // Start counting when visible
    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.3
            }
        );

        counters.forEach((counter) => {
            observer.observe(counter);
        });

    } else {

        counters.forEach(animateCounter);

    }

});



// ==========================================
// REGENOVA HOMEPAGE ABOUT SECTION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const aboutSection = document.getElementById("homeAbout");

    if (!aboutSection) return;

    const counters = aboutSection.querySelectorAll(
        ".home-about-counter"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function animateAboutCounter(counter) {

        if (counter.dataset.animated === "true") return;

        counter.dataset.animated = "true";

        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target)) return;

        if (reducedMotion) {
            counter.textContent = target.toLocaleString("en-US");
            return;
        }

        const duration = 1800;
        let startTime = null;

        function update(timestamp) {

            if (startTime === null) {
                startTime = timestamp;
            }

            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);

            counter.textContent = current.toLocaleString("en-US");

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString("en-US");
            }
        }

        counter.textContent = "0";
        requestAnimationFrame(update);
    }

    function revealAbout() {

        aboutSection.classList.remove("is-pending");
        aboutSection.classList.add("is-visible");

        counters.forEach(animateAboutCounter);
    }

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealAbout();
        return;
    }

    aboutSection.classList.add("is-pending");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    revealAbout();
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    observer.observe(aboutSection);

});




// ==========================================
// REGENOVA - CONDITIONS SCROLL ANIMATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const section = document.getElementById("homeConditions");

    if (!section) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        section.classList.add("is-visible");
        return;
    }

    section.classList.add("is-pending");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    section.classList.remove("is-pending");
                    section.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    observer.observe(section);

});



// ==========================================
// REGENOVA - TREATMENTS SCROLL ANIMATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const section = document.getElementById("homeTherapies");

    if (!section) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        section.classList.add("is-visible");
        return;
    }

    section.classList.add("is-pending");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    section.classList.remove("is-pending");
                    section.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    observer.observe(section);

});


// ==========================================
// REGENOVA - HOMEPAGE CTA ANIMATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const section = document.getElementById("homeCTA");

    if (!section) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        section.classList.add("is-visible");
        return;
    }

    section.classList.add("is-pending");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    section.classList.remove("is-pending");
                    section.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    observer.observe(section);

});




// ==========================================
// REGENOVA - ABOUT INTRO SCROLL ANIMATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const section = document.getElementById("aboutIntro");

    if (!section) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        section.classList.add("is-visible");
        return;
    }

    section.classList.add("is-pending");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    section.classList.remove("is-pending");
                    section.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    observer.observe(section);

});



// ==========================================
// REGENOVA - ABOUT VALUES SCROLL ANIMATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const section = document.getElementById("aboutValues");

    if (!section) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        section.classList.add("is-visible");
        return;
    }

    section.classList.add("is-pending");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    section.classList.remove("is-pending");
                    section.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.1
        }
    );

    observer.observe(section);

});



// ==========================================
// REGENOVA - SPECIALITY STANDARDS REVEAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const section = document.getElementById("specialityStandards");

    if (!section) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        section.classList.add("is-visible");
        return;
    }

    section.classList.add("is-pending");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    section.classList.remove("is-pending");
                    section.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.1
        }
    );

    observer.observe(section);

});


// ==========================================
// REGENOVA - QUALITY SECTION REVEAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const section = document.getElementById("specialityQuality");

    if (!section) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        section.classList.add("is-visible");
        return;
    }

    section.classList.add("is-pending");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    section.classList.remove("is-pending");
                    section.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.1
        }
    );

    observer.observe(section);

});



/* ======================================
   REGENOVA - TREATMENT TABS
====================================== */

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#allTreatments");
    if (!section) return;

    const tabs = [...section.querySelectorAll(".regen-treatment-tab")];
    const panels = [...section.querySelectorAll(".regen-treatment-panel")];

    function activateTab(tab, moveFocus = false) {
        const target = tab.dataset.treatment;

        tabs.forEach(item => {
            const selected = item === tab;
            item.classList.toggle("active", selected);
            item.setAttribute("aria-selected", String(selected));
            item.tabIndex = selected ? 0 : -1;
        });

        panels.forEach(panel => {
            const selected = panel.dataset.panel === target;
            panel.classList.toggle("active", selected);
            panel.hidden = !selected;
        });

        if (moveFocus) tab.focus();
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => activateTab(tab));

        tab.addEventListener("keydown", event => {
            let nextIndex;

            if (event.key === "ArrowDown" ||
                event.key === "ArrowRight") {
                nextIndex = (index + 1) % tabs.length;
            } else if (event.key === "ArrowUp" ||
                event.key === "ArrowLeft") {
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            activateTab(tabs[nextIndex], true);
        });
    });
});
