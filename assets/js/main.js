(function () {
  "use strict";

  const STORAGE_KEY = "portfolio_lang";
  const PLACEHOLDER = "images/placeholder.svg";

  let lang = localStorage.getItem(STORAGE_KEY) || "en";
  if (!["en", "es"].includes(lang)) lang = "en";
  const browserLang = (navigator.language || "en").toLowerCase();
  if (!localStorage.getItem(STORAGE_KEY) && browserLang.startsWith("es")) lang = "es";

  const t = () => SITE_DATA[lang];

  const icons = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.2.67.8.55A10.5 10.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24a7.54 7.54 0 0 1-5.1-2.1 7 7 0 0 1-1.4-1.7 6.2 6.2 0 0 1-.6-1.9 8.4 8.4 0 0 1-.9-1.4 7.4 7.4 0 0 0-1.3-1.4 7 7 0 0 1-1.3-1.3A5.5 5.5 0 0 1 .2 12a5.4 5.4 0 0 1 .5-2.2A6.6 6.6 0 0 1 1.8 8a10 10 0 0 1 1.5-1.3A8.2 8.2 0 0 0 4.6 5a5.6 5.6 0 0 0 1.2-1.6A5.4 5.4 0 0 1 7.2 1.8 7 7 0 0 1 8.5 1a4.8 4.8 0 0 1 2.2-.7H12a4.4 4.4 0 0 1 2.4.5 5.2 5.2 0 0 1 1.5 1.3l.4.4a8.2 8.2 0 0 0 1.5 1.3 8.7 8.7 0 0 0 1.5 1.2 6.4 6.4 0 0 1 1.7 1.6 4.5 4.5 0 0 1 .8 2.1v.3a3.6 3.6 0 0 0 .5 1 2.6 2.6 0 0 0 .8.9 1.9 1.9 0 0 1 .7 1.1 1.7 1.7 0 0 1-.2 1 2.4 2.4 0 0 1-.7.8l-.2.1a6.3 6.3 0 0 0-1.5 1.4 8.6 8.6 0 0 1-1.2 1.4 7.4 7.4 0 0 1-1.4 1.1 4.8 4.8 0 0 1-1.5.6 8 8 0 0 0-.8 2 6.8 6.8 0 0 1-.9 2 3.8 3.8 0 0 1-1.6 1.5 3.4 3.4 0 0 1-1.9.4Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>',
    robot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="8" rx="2"/><path d="M12 8V4"/><circle cx="12" cy="4" r="1.5"/><circle cx="8.5" cy="13.5" r="1.5"/><circle cx="15.5" cy="13.5" r="1.5"/><path d="M9 17h6"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    grad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>'
  };

  const socialIcon = (label) => {
    const key = label.toLowerCase();
    if (key.includes("github")) return icons.github;
    if (key.includes("linkedin")) return icons.linkedin;
    if (key.includes("scholar")) return icons.scholar;
    if (key.includes("sketchfab")) return icons.cube;
    return icons.link;
  };

  const setImgFallback = (img) => {
    img.onerror = function () {
      if (this.src.indexOf(PLACEHOLDER) === -1) this.src = PLACEHOLDER;
    };
  };

  function renderNav() {
    const d = t();
    const nav = document.getElementById("nav");
    nav.innerHTML =
      '<div class="nav-inner">' +
        '<a href="#hero" class="logo">' + d.nav.logo + "</a>" +
        '<ul class="nav-links" id="navLinks">' +
          d.nav.items.map(function (i) { return '<li><a href="#' + i.id + '">' + i.label + "</a></li>"; }).join("") +
          '<li><button class="lang-btn" id="langBtn" aria-label="Switch language">' + (lang === "en" ? "ES" : "EN") + "</button></li>" +
        "</ul>" +
        '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>' +
      "</div>";

    document.getElementById("burger").addEventListener("click", function () {
      document.getElementById("navLinks").classList.toggle("open");
    });
    document.querySelectorAll("#navLinks a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.getElementById("navLinks").classList.remove("open");
      });
    });
    document.getElementById("langBtn").addEventListener("click", toggleLang);
  }

  function renderHero() {
    const d = t().hero;
    const el = document.getElementById("hero");
    el.classList.add("section");
    el.innerHTML =
      '<div class="container">' +
        '<span class="hero-badge"><span class="dot"></span>' + d.badge + "</span>" +
        "<h1>" + d.name + "</h1>" +
        '<p class="hero-role">' + d.role + "</p>" +
        '<p class="hero-loc">' + icons.pin + d.location + "</p>" +
        '<p class="hero-tag">' + d.tagline + "</p>" +
        '<div class="hero-cta">' +
          d.ctas.map(function (c) {
            if (c.id === "cv") {
              return '<a class="btn' + (c.primary ? " btn-primary" : "") + '" href="' + c.href + '" download>' + icons.download + c.label + "</a>";
            }
            return '<a class="btn' + (c.primary ? " btn-primary" : "") + '" href="#' + c.id + '">' + icons.robot + c.label + "</a>";
          }).join("") +
        "</div>" +
        '<div class="hero-socials">' +
          d.socials.map(function (s) {
            return '<a href="' + s.href + '" target="_blank" rel="noopener">' + socialIcon(s.label) + s.label + "</a>";
          }).join("") +
        "</div>" +
      "</div>";
  }

  function renderAbout() {
    const d = t().about;
    const el = document.getElementById("about");
    el.classList.add("section");
    el.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal"><p class="section-kicker">' + d.kicker + '</p><h2>' + d.title + "</h2></div>" +
        '<div class="about-grid">' +
          '<div class="about-photo reveal"><img src="images/profile.jpg" alt="' + d.name + '"><span class="photo-badge">' + d.photoBadge + "</span></div>" +
          '<div class="about-text reveal">' +
            d.paragraphs.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
            '<div class="about-focus">' +
              d.focus.map(function (f) {
                return '<div class="focus-card"><h4>' + f.title + "</h4><p>" + f.desc + "</p></div>";
              }).join("") +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
    const img = el.querySelector(".about-photo img");
    if (img) setImgFallback(img);
  }

  function renderProjects() {
    const d = t().projects;
    const el = document.getElementById("projects");
    el.classList.add("section");
    el.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal"><p class="section-kicker">' + d.kicker + '</p><h2>' + d.title + "</h2></div>" +
        '<div class="projects-grid">' +
          d.items.map(function (p, i) {
            return (
              '<article class="card reveal">' +
                '<div class="card-img"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy"></div>' +
                '<div class="card-body">' +
                  "<h3>" + p.title + "</h3>" +
                  "<p>" + p.desc + "</p>" +
                  '<div class="tags">' + p.tags.map(function (tag) { return '<span class="tag">' + tag + "</span>"; }).join("") + "</div>" +
                  '<div class="card-links">' +
                    p.links.map(function (l) {
                      const ext = /^https?:/.test(l.href);
                      return '<a href="' + l.href + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + icons.link + l.label + "</a>";
                    }).join("") +
                  "</div>" +
                "</div>" +
              "</article>"
            );
          }).join("") +
        "</div>" +
        '<p class="placeholder-note reveal">' + d.placeholderNote + "</p>" +
      "</div>";
    el.querySelectorAll(".card-img img").forEach(setImgFallback);
  }

  function renderPublications() {
    const d = t().publications;
    const el = document.getElementById("publications");
    el.classList.add("section");

    const badgeHtml = function (p) {
      if (p.badge === "cited") return '<span class="pub-badge cited">' + d.citedLabel + " " + p.count + "</span>";
      if (p.badge === "abstract") return '<span class="pub-badge">' + d.abstractLabel + "</span>";
      return '<span class="pub-badge">' + d.preprintLabel + "</span>";
    };

    el.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal"><p class="section-kicker">' + d.kicker + '</p><h2>' + d.title + "</h2>" +
        '<p class="section-sub">' + d.subtitle + "</p></div>" +
        '<div class="pub-list">' +
          d.items.map(function (p) {
            return (
              '<a class="pub-row reveal" href="' + p.href + '" target="_blank" rel="noopener">' +
                '<span class="pub-year">' + p.year + "</span>" +
                '<div class="pub-row-body">' +
                  "<h3>" + p.title + "</h3>" +
                  '<p class="pub-authors">' + p.authors + "</p>" +
                  '<p class="pub-venue">' + p.venue + "</p>" +
                "</div>" +
                badgeHtml(p) +
              "</a>"
            );
          }).join("") +
        "</div>" +
        '<div class="center-btn reveal">' +
          '<a class="btn" href="https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ" target="_blank" rel="noopener">' + icons.scholar + d.scholarBtn + "</a>" +
        "</div>" +
      "</div>";
  }

  function renderGallery() {
    const d = t().gallery;
    const el = document.getElementById("gallery");
    el.classList.add("section");
    el.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal"><p class="section-kicker">' + d.kicker + '</p><h2>' + d.title + "</h2>" +
        '<p class="section-sub">' + d.subtitle + "</p></div>" +
        '<div class="gallery-grid">' +
          d.items.map(function (g) {
            return (
              '<figure class="gallery-item reveal">' +
                '<div class="gallery-media"><img src="' + g.image + '" alt="' + g.title + '" loading="lazy"></div>' +
                "<figcaption>" + g.title + "</figcaption>" +
              "</figure>"
            );
          }).join("") +
        "</div>" +
        '<div class="center-btn reveal">' +
          '<a class="btn" href="https://sketchfab.com/niospinag" target="_blank" rel="noopener">' + icons.link + d.btn + "</a>" +
        "</div>" +
      "</div>";
    el.querySelectorAll(".gallery-media img").forEach(setImgFallback);
  }

  function renderExperience() {
    const d = t().experience;
    const el = document.getElementById("experience");
    el.classList.add("section");
    el.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal"><p class="section-kicker">' + d.kicker + '</p><h2>' + d.title + "</h2></div>" +
        '<div class="timeline">' +
          d.items.map(function (e) {
            return (
              '<div class="tl-item reveal">' +
                '<div class="tl-head"><h3>' + e.role + '</h3><span class="tl-company">' + e.company + "</span>" +
                '<span class="tl-date">' + e.date + "</span></div>" +
                '<div class="tl-role">' + e.location + "</div>" +
                "<ul>" + e.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</div>";
  }

  function renderSkills() {
    const d = t().skills;
    const iconsByGroup = [icons.robot, icons.database, icons.code, icons.wrench];
    const el = document.getElementById("skills");
    el.classList.add("section");
    el.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal"><p class="section-kicker">' + d.kicker + '</p><h2>' + d.title + "</h2></div>" +
        '<div class="skills-grid">' +
          d.groups.map(function (g, gi) {
            return (
              '<div class="skill-card reveal">' +
                "<h3>" + (iconsByGroup[gi] || icons.wrench) + g.title + "</h3>" +
                '<div class="skill-list">' +
                  g.items.map(function (item) {
                    if (typeof item === "object") {
                      return '<span class="skill-item">' + item.name + ' <span class="lvl">· ' + item.lvl + "</span></span>";
                    }
                    return '<span class="skill-item">' + item + "</span>";
                  }).join("") +
                "</div>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</div>";
  }

  function renderEducation() {
    const d = t().education;
    const el = document.getElementById("education");
    el.classList.add("section");
    el.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal"><p class="section-kicker">' + d.kicker + '</p><h2>' + d.title + "</h2></div>" +
        '<div class="edu-grid">' +
          d.items.map(function (e) {
            return (
              '<div class="edu-card reveal">' +
                '<div class="edu-icon">' + icons.grad + "</div>" +
                "<h3>" + e.school + "</h3>" +
                '<p class="edu-degree">' + e.degree + "</p>" +
                '<p class="edu-date">' + e.date + " · " + e.location + "</p>" +
              "</div>"
            );
          }).join("") +
        "</div>" +
      "</div>";
  }

  function renderContact() {
    const d = t().contact;
    const el = document.getElementById("contact");
    el.classList.add("section");
    const cardIcons = [icons.mail, icons.github, icons.linkedin, icons.scholar, icons.cube];
    el.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal"><p class="section-kicker">' + d.kicker + '</p><h2>' + d.title + "</h2></div>" +
        '<p class="contact-cta reveal">' + d.cta + "</p>" +
        '<div class="contact-links">' +
          d.cards.map(function (c, i) {
            const ext = /^https?:/.test(c.href);
            return (
              '<a class="contact-card reveal" href="' + c.href + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" +
                (cardIcons[i] || icons.link) +
                "<span><span class=\"cc-label\">" + c.label + '</span><span class="cc-value">' + c.value + "</span></span>" +
              "</a>"
            );
          }).join("") +
        "</div>" +
      "</div>";
  }

  function renderFooter() {
    const d = t().footer;
    document.getElementById("footer").innerHTML =
      '<div class="footer-inner">' +
        "<span>" + d.text + "</span>" +
        '<span class="mono">' + d.built + "</span>" +
      "</div>";
  }

  function updateMeta() {
    document.documentElement.lang = lang;
    const titles = {
      en: "Nestor Ospina — Robotics & AI Software Engineer",
      es: "Nestor Ospina — Ingeniero de Software en Robótica e IA"
    };
    const descs = {
      en: "Portfolio of Nestor I. Ospina Gaitan — Robotics & AI Software Engineer. M.Sc. in Industrial Automation. Expert in ROS2, Machine Learning and data engineering.",
      es: "Portafolio de Nestor I. Ospina Gaitan — Ingeniero de Software en Robótica e IA. M.Sc. en Automatización Industrial. Experto en ROS2, Machine Learning e ingeniería de datos."
    };
    document.title = titles[lang];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", descs[lang]);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute("content", titles[lang]);
    if (ogDesc) ogDesc.setAttribute("content", descs[lang]);
  }

  function toggleLang() {
    lang = lang === "en" ? "es" : "en";
    localStorage.setItem(STORAGE_KEY, lang);
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initReveal() {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("visible");
      else io.observe(el);
    });
  }

  function renderAll() {
    renderNav();
    renderHero();
    renderAbout();
    renderProjects();
    renderPublications();
    renderGallery();
    renderExperience();
    renderSkills();
    renderEducation();
    renderContact();
    renderFooter();
    updateMeta();
    initReveal();
  }

  renderAll();
})();