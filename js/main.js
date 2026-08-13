/* ============================================================
   main.js — UI interactions
   - Navbar shadow on scroll
   - Mobile hamburger menu
   - Scroll-reveal animations (IntersectionObserver)
   - Scroll spy (highlights active section in navbar)
   - Dynamic footer year
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Navbar shadow on scroll ---------- */
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile hamburger menu ---------- */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        hamburger.querySelector("i").className = isOpen ? "fas fa-xmark" : "fas fa-bars";
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            hamburger.querySelector("i").className = "fas fa-bars";
        });
    });

    /* ---------- Scroll-reveal animations ---------- */
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("visible"));
    }

    /* ---------- Scroll spy (active nav link) ---------- */
    const sections = document.querySelectorAll("section[id], footer[id]");
    const navAnchors = document.querySelectorAll(".nav-links a");

    if ("IntersectionObserver" in window && sections.length > 0) {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navAnchors.forEach((a) => {
                        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
                    });
                }
            });
        }, { rootMargin: "-40% 0px -55% 0px" });

        sections.forEach((s) => spyObserver.observe(s));
    }
});
