/* ============================================================
   i18n — bilingual system (EN / ES)
   - Texts are applied to elements with [data-i18n] (textContent)
     and [data-i18n-html] (innerHTML, for markup inside text).
   - The selected language is persisted in localStorage.
   - Default language: English.
   ============================================================ */

const translations = {
    en: {
        // Navbar
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.publications": "Publications",
        "nav.gallery": "3D Design",
        "nav.contact": "Contact",

        // Hero
        "hero.greeting": "Hello, I'm",
        "hero.role": "Robotics & AI Software Engineer",
        "hero.desc": "M.Sc. in Industrial Automation bridging AI algorithms and real-world autonomous systems: from predictive ML models and large-scale data pipelines to decentralized control of robot swarms.",
        "hero.btnProjects": "View Projects",
        "hero.btnCV": "Download CV",

        // About
        "about.title": "About Me",
        "about.p1": "I'm a Robotics and AI Software Engineer with an M.Sc. in Industrial Automation and a strong foundation in Machine Learning, ROS2, and data engineering. I've designed AI predictive models, orchestrated large-scale data pipelines (~1 TB), and developed decentralized control systems for heterogeneous robot swarms.",
        "about.p2": "I leverage Python, GCP, and simulation tools like Gazebo to bridge the gap between AI algorithms and real-world autonomous navigation systems. Currently turning data into decisions at Banco Falabella.",
        "about.stat1": "Robots in swarm testbed",
        "about.stat2": "Data pipelines orchestrated",
        "about.stat3": "Commission success rate (from 50%)",

        // Skills
        "skills.title": "Technical Arsenal",
        "skills.1.title": "Robotics & Vision",
        "skills.1.desc": "ROS/ROS2 (Nav2), OpenCV, ArUco Markers, Gazebo, CoppeliaSim, Swarm Robotics",
        "skills.2.title": "AI & Data Engineering",
        "skills.2.desc": "Machine Learning (Random Forest), Google Cloud Platform, BigQuery, SQL Server, Looker Studio",
        "skills.3.title": "Programming",
        "skills.3.desc": "Python (Advanced), SQL (Advanced), Bash/Shell, C++ (Familiar)",
        "skills.4.title": "Hardware & Prototyping",
        "skills.4.desc": "NVIDIA Jetson, Raspberry Pi, PCB Troubleshooting, 3D Printing (Cura, SolidWorks)",

        // Experience
        "exp.title": "Experience",

        "exp1.date": "May 2026 — Present",
        "exp1.role": "Data Analyst / Machine Learning",
        "exp1.loc": "Bogotá, Colombia",
        "exp1.b1": "Engineered and deployed Random Forest models in Python to optimize business goal distribution, raising branch commission success rates from 50% to 85%.",
        "exp1.b2": "Architected scalable data pipelines with GCP (BigQuery) and SQL Server to process ~1 TB of historical data through complex Stored Procedures.",
        "exp1.b3": "Designed real-time dashboards in Looker Studio and advanced Excel (ODBC) to turn complex data into actionable intelligence for C-level executives.",

        "exp2.date": "May 2024 — Aug 2025",
        "exp2.role": "Robotics Software Engineer",
        "exp2.loc": "Bogotá, Colombia",
        "exp2.b1": "Maintained and integrated the ROS2 Nav2 stack for differential-drive robots, ensuring platform stability for autonomous navigation.",
        "exp2.b2": "Developed and tested ROS2 nodes in Python and C++ for sensor data processing and behavior orchestration, validated in high-fidelity Gazebo simulations.",
        "exp2.b3": "Automated background processes, deployment pipelines and startup sequences with Bash scripting on Ubuntu.",

        "exp3.date": "Dec 2023 — Apr 2024",
        "exp3.role": "Reliability Engineer (Field Operations)",
        "exp3.loc": "Orono, Maine, USA",
        "exp3.b1": "Cut hardware iteration time with a 24-hour rapid prototyping pipeline (SolidWorks, Cura, 3D printing), deploying custom modifications onto the autonomous delivery fleet.",
        "exp3.b2": "Diagnosed and resolved critical hardware/software failures in harsh weather, troubleshooting PCBs and sensors to maximize fleet uptime.",

        "exp4.date": "Jan 2020 — Jun 2021",
        "exp4.role": "Graduate Research Engineer",
        "exp4.loc": "Daytona Beach, FL, USA",
        "exp4.b1": "Architected a decentralized multi-agent testbed of 23 heterogeneous robots (rovers of 3 sizes + 2 drones) to evaluate swarm behavior and Game Theory algorithms.",
        "exp4.b2": "Built a precise vision/localization pipeline with Python, OpenCV and ArUco markers, integrated with Raspberry Pi hardware for real-world validation.",
        "exp4.b3": "Co-authored a peer-reviewed scientific paper on the multi-agent control strategies.",

        "exp5.date": "Jul 2021 — Nov 2023",
        "exp5.role": "Career Sabbatical — English Immersion & Cultural Exchange",
        "exp5.loc": "USA",
        "exp5.b1": "Immersive program in the United States: achieved professional working proficiency in English and strong cross-cultural communication skills.",

        // Projects
        "projects.title": "Featured Projects",
        "proj1.title": "Hospital AMR Navigation",
        "proj1.desc": "ROS2 Nav2 stack integration for differential-drive service robots, from high-fidelity Gazebo simulation to deployment on NVIDIA Jetson.",
        "proj2.title": "Swarm Robotics Testbed",
        "proj2.desc": "Decentralized control of 23 heterogeneous robots using Game Theory, with an OpenCV + ArUco localization pipeline on Raspberry Pi.",
        "proj3.title": "ML Goal Distribution",
        "proj3.desc": "Random Forest models optimizing business goal assignment across branches, lifting commission success from 50% to 85% over ~1 TB of data.",
        "proj4.title": "Rapid Prototyping Pipeline",
        "proj4.desc": "24-hour design-to-deployment cycle for custom robot fleet modifications: SolidWorks, Cura and 3D printing, plus PCB repair.",

        // Publications
        "publications.title": "Publications",
        "pub.sub": "Peer-reviewed and conference publications in robotics and control.",
        "pub.cited": "Cited by",
        "pub.abstract": "Conference abstract",
        "pub.preprint": "Preprint",
        "pub.btn": "View full profile on Google Scholar",

        // 3D Gallery
        "gallery.title": "3D Design & Prototyping",
        "gallery.subtitle": "Functional parts, sensor mounts and robot components designed for additive manufacturing.",
        "gallery.1": "Lidar Sensor Mount",
        "gallery.2": "Custom Robot Chassis",
        "gallery.3": "Waterproof PCB Enclosure",
        "gallery.4": "Actuator Mechanism",
        "gallery.btn": "View Sketchfab / CAD Files",

        // Education
        "edu.title": "Education",
        "edu1.degree": "M.Sc. in Industrial Automation",
        "edu2.degree": "B.Sc. in Electrical Engineering",
        "edu.school": "Universidad Nacional de Colombia · Bogotá, Colombia",
        "edu1.date": "Jun 2021",
        "edu2.date": "Jun 2018",

        // Contact / Footer
        "contact.title": "Let's Build the Future",
        "contact.text": "Open to opportunities in Robotics Software Engineering, AI and Automation.",
        "contact.location": "Bogotá, Colombia",
        "footer.built": "Designed & built from scratch"
    },

    es: {
        // Navbar
        "nav.about": "Sobre mí",
        "nav.experience": "Experiencia",
        "nav.projects": "Proyectos",
        "nav.publications": "Publicaciones",
        "nav.gallery": "Diseño 3D",
        "nav.contact": "Contacto",

        // Hero
        "hero.greeting": "Hola, soy",
        "hero.role": "Ingeniero de Software en Robótica e IA",
        "hero.desc": "M.Sc. en Automatización Industrial, uniendo algoritmos de IA con sistemas autónomos reales: desde modelos predictivos de ML y pipelines de datos a gran escala hasta control descentralizado de enjambres de robots.",
        "hero.btnProjects": "Ver Proyectos",
        "hero.btnCV": "Descargar CV",

        // About
        "about.title": "Sobre Mí",
        "about.p1": "Soy Ingeniero de Software en Robótica e IA, con M.Sc. en Automatización Industrial y una sólida base en Machine Learning, ROS2 e ingeniería de datos. He diseñado modelos predictivos de IA, orquestado pipelines de datos a gran escala (~1 TB) y desarrollado sistemas de control descentralizado para enjambres de robots heterogéneos.",
        "about.p2": "Uso Python, GCP y herramientas de simulación como Gazebo para cerrar la brecha entre los algoritmos de IA y la navegación autónoma en el mundo real. Actualmente convierto datos en decisiones en Banco Falabella.",
        "about.stat1": "Robots en el testbed de enjambre",
        "about.stat2": "Pipelines de datos orquestados",
        "about.stat3": "Éxito en comisiones (desde 50%)",

        // Skills
        "skills.title": "Arsenal Técnico",
        "skills.1.title": "Robótica y Visión",
        "skills.1.desc": "ROS/ROS2 (Nav2), OpenCV, Marcadores ArUco, Gazebo, CoppeliaSim, Robótica de Enjambres",
        "skills.2.title": "IA e Ingeniería de Datos",
        "skills.2.desc": "Machine Learning (Random Forest), Google Cloud Platform, BigQuery, SQL Server, Looker Studio",
        "skills.3.title": "Programación",
        "skills.3.desc": "Python (Avanzado), SQL (Avanzado), Bash/Shell, C++ (Familiar)",
        "skills.4.title": "Hardware y Prototipado",
        "skills.4.desc": "NVIDIA Jetson, Raspberry Pi, Diagnóstico de PCB, Impresión 3D (Cura, SolidWorks)",

        // Experience
        "exp.title": "Experiencia",

        "exp1.date": "May 2026 — Presente",
        "exp1.role": "Analista de Datos / Machine Learning",
        "exp1.loc": "Bogotá, Colombia",
        "exp1.b1": "Diseñé y desplegué modelos de Random Forest en Python para optimizar la distribución de metas de negocio, aumentando el éxito de comisiones de sucursales del 50% al 85%.",
        "exp1.b2": "Arquitecté pipelines de datos escalables con GCP (BigQuery) y SQL Server para procesar ~1 TB de datos históricos mediante Stored Procedures complejos.",
        "exp1.b3": "Diseñé dashboards en tiempo real en Looker Studio y Excel avanzado (ODBC) para convertir datos complejos en inteligencia accionable para ejecutivos C-level.",

        "exp2.date": "May 2024 — Ago 2025",
        "exp2.role": "Ingeniero de Software en Robótica",
        "exp2.loc": "Bogotá, Colombia",
        "exp2.b1": "Mantuve e integré el stack ROS2 Nav2 para robots diferenciales, garantizando la estabilidad de la plataforma en navegación autónoma.",
        "exp2.b2": "Desarrollé y probé nodos ROS2 en Python y C++ para procesamiento de datos de sensores y orquestación de comportamientos, validados en simulaciones Gazebo de alta fidelidad.",
        "exp2.b3": "Automaticé procesos en segundo plano, pipelines de despliegue y secuencias de arranque con Bash en Ubuntu.",

        "exp3.date": "Dic 2023 — Abr 2024",
        "exp3.role": "Ingeniero de Confiabilidad (Operaciones de Campo)",
        "exp3.loc": "Orono, Maine, EE. UU.",
        "exp3.b1": "Reduje el tiempo de iteración de hardware con un pipeline de prototipado rápido de 24 horas (SolidWorks, Cura, impresión 3D), desplegando modificaciones en la flota de robots de entrega autónoma.",
        "exp3.b2": "Diagnosticué y resolví fallas críticas de hardware/software en condiciones climáticas adversas, reparando PCBs y sensores para maximizar el tiempo activo de la flota.",

        "exp4.date": "Ene 2020 — Jun 2021",
        "exp4.role": "Ingeniero Investigador de Posgrado",
        "exp4.loc": "Daytona Beach, FL, EE. UU.",
        "exp4.b1": "Arquitecté un testbed multiagente descentralizado de 23 robots heterogéneos (rovers de 3 tamaños + 2 drones) para evaluar comportamiento de enjambres y algoritmos de Teoría de Juegos.",
        "exp4.b2": "Construí un pipeline preciso de visión/localización con Python, OpenCV y marcadores ArUco, integrado con Raspberry Pi para validación en el mundo real.",
        "exp4.b3": "Co-autor de un artículo científico revisado por pares sobre las estrategias de control multiagente.",

        "exp5.date": "Jul 2021 — Nov 2023",
        "exp5.role": "Año Sabático — Inmersión en Inglés e Intercambio Cultural",
        "exp5.loc": "EE. UU.",
        "exp5.b1": "Programa de inmersión en Estados Unidos: alcancé competencia profesional en inglés y fuertes habilidades de comunicación intercultural.",

        // Projects
        "projects.title": "Proyectos Destacados",
        "proj1.title": "Navegación AMR Hospitalaria",
        "proj1.desc": "Integración del stack ROS2 Nav2 para robots de servicio diferenciales: desde simulación Gazebo de alta fidelidad hasta despliegue en NVIDIA Jetson.",
        "proj2.title": "Testbed de Robótica de Enjambres",
        "proj2.desc": "Control descentralizado de 23 robots heterogéneos con Teoría de Juegos y pipeline de localización OpenCV + ArUco en Raspberry Pi.",
        "proj3.title": "Modelo ML de Distribución de Metas",
        "proj3.desc": "Modelos Random Forest que optimizan la asignación de metas entre sucursales, elevando el éxito de comisiones del 50% al 85% sobre ~1 TB de datos.",
        "proj4.title": "Pipeline de Prototipado Rápido",
        "proj4.desc": "Ciclo de diseño-a-despliegue en 24 horas para modificaciones de la flota: SolidWorks, Cura e impresión 3D, más reparación de PCBs.",

        // Publications
        "publications.title": "Publicaciones",
        "pub.sub": "Publicaciones revisadas por pares y de congresos en robótica y control.",
        "pub.cited": "Citado por",
        "pub.abstract": "Resumen de congreso",
        "pub.preprint": "Preprint",
        "pub.btn": "Ver perfil completo en Google Scholar",

        // 3D Gallery
        "gallery.title": "Diseño 3D y Prototipado",
        "gallery.subtitle": "Partes funcionales, soportes de sensores y componentes robóticos diseñados para manufactura aditiva.",
        "gallery.1": "Soporte de Sensor Lidar",
        "gallery.2": "Chasis de Robot Personalizado",
        "gallery.3": "Carcasa Impermeable para PCB",
        "gallery.4": "Mecanismo Actuador",
        "gallery.btn": "Ver Sketchfab / Archivos CAD",

        // Education
        "edu.title": "Educación",
        "edu1.degree": "M.Sc. en Automatización Industrial",
        "edu2.degree": "Pregrado en Ingeniería Eléctrica",
        "edu.school": "Universidad Nacional de Colombia · Bogotá, Colombia",
        "edu1.date": "Jun 2021",
        "edu2.date": "Jun 2018",

        // Contact / Footer
        "contact.title": "Construyamos el Futuro",
        "contact.text": "Abierto a oportunidades en Ingeniería de Software Robótico, IA y Automatización.",
        "contact.location": "Bogotá, Colombia",
        "footer.built": "Diseñado y construido desde cero"
    }
};

const DEFAULT_LANG = "en";
const STORAGE_KEY = "site-lang";

function applyLanguage(lang) {
    const dict = translations[lang] || translations[DEFAULT_LANG];

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        const key = el.getAttribute("data-i18n-html");
        if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    // The toggle button shows the language you would switch TO
    const label = document.getElementById("lang-label");
    if (label) label.textContent = lang === "en" ? "ES" : "EN";

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
}

document.addEventListener("DOMContentLoaded", () => {
    let lang = DEFAULT_LANG;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && translations[stored]) lang = stored;
    } catch (e) { /* private mode */ }

    applyLanguage(lang);

    const toggle = document.getElementById("lang-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            const current = document.documentElement.lang === "es" ? "es" : "en";
            applyLanguage(current === "en" ? "es" : "en");
        });
    }
});
