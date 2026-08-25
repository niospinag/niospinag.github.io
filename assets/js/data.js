const SITE_DATA = {
  en: {
    nav: {
      logo: "nestor<span>.</span>dev",
      items: [
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "publications", label: "Publications" },
        { id: "gallery", label: "3D Design" },
        { id: "experience", label: "Experience" },
        { id: "skills", label: "Skills" },
        { id: "contact", label: "Contact" }
      ]
    },
    hero: {
      badge: "Open to new challenges",
      name: "Nestor I. Ospina Gaitan",
      role: "Robotics &amp; AI Software Engineer",
      location: "Bogotá, Colombia",
      tagline: "I build intelligent systems that move — from autonomous robots navigating the real world to data pipelines that drive better decisions.",
      ctas: [
        { id: "projects", label: "View Projects", primary: true },
        { id: "cv", label: "Download CV", href: "files/Nestor_Ospina_CV.pdf", primary: false }
      ],
      socials: [
        { label: "GitHub", href: "https://github.com/niospinag" },
        { label: "LinkedIn", href: "https://linkedin.com/in/nestor-ospina" },
        { label: "Scholar", href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ" },
        { label: "Sketchfab", href: "https://sketchfab.com/niospinag" }
      ]
    },
    about: {
      kicker: "About me",
      title: "Bridging AI and the physical world",
      photoBadge: "Robotics & AI",
      paragraphs: [
        "Robotics and AI Software Engineer with an <strong>M.Sc. in Industrial Automation</strong> and a strong foundation in <strong>Machine Learning</strong>, <strong>ROS2</strong> and <strong>data engineering</strong>.",
        "I have designed AI predictive models, orchestrated large-scale data pipelines (~1 TB), and developed decentralized control systems for heterogeneous robot swarms.",
        "I love leveraging Python, GCP and simulation tools (Gazebo) to bridge the gap between AI algorithms and real-world autonomous navigation systems."
      ],
      focus: [
        { title: "Autonomous Robotics", desc: "ROS2 / Nav2 navigation, swarm robotics and simulation-driven development with Gazebo." },
        { title: "Data & AI", desc: "Predictive models, large-scale pipelines on GCP / BigQuery and dashboards for decision-making." },
        { title: "Rapid Prototyping", desc: "From 3D-printed hardware and PCB troubleshooting to NVIDIA Jetson and Raspberry Pi systems." }
      ]
    },
    projects: {
      kicker: "Portfolio",
      title: "Featured Projects",
      placeholderNote: "More projects coming soon — this portfolio grows as I build.",
      items: [
        {
          title: "Decentralized Swarm Robotics Testbed",
          desc: "Architected a decentralized multi-agent testbed of 23 heterogeneous robots (rovers and drones) to evaluate swarm behavior and Game Theory algorithms. Built a vision/localization pipeline with OpenCV and ArUco markers running on Raspberry Pi for real-world validation.",
          tags: ["Python", "OpenCV", "ArUco", "Raspberry Pi", "Swarm Robotics", "Game Theory"],
          image: "images/projects/swarm.jpg",
          links: [
            { label: "Paper", href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ" },
            { label: "GitHub", href: "https://github.com/niospinag" }
          ]
        },
        {
          title: "ROS2 Nav2 Autonomous Navigation",
          desc: "Maintained and integrated the ROS2 Nav2 stack for differential-drive robots, ensuring platform stability for autonomous navigation. Developed and tested ROS2 nodes in Python and C++ to process sensor data and orchestrate behaviors, validated through high-fidelity Gazebo simulations.",
          tags: ["ROS2", "Nav2", "Python", "C++", "Gazebo", "Ubuntu"],
          image: "images/projects/nav2.jpg",
          links: [
            { label: "GitHub", href: "https://github.com/niospinag" }
          ]
        },
        {
          title: "ML Goal Distribution Model",
          desc: "Engineered and deployed Random Forest models in Python to optimize business goal distribution, raising branch commission success rates from 50% to 85%. Architected GCP (BigQuery) and SQL Server pipelines processing ~1 TB of historical data with complex stored procedures.",
          tags: ["Python", "Random Forest", "GCP", "BigQuery", "SQL Server", "Looker Studio"],
          image: "images/projects/ml-bank.jpg",
          links: [
            { label: "Details on request", href: "mailto:nestorivan.o@hotmail.com" }
          ]
        },
        {
          title: "24-Hour Rapid Prototyping Pipeline",
          desc: "Established a 24-hour rapid prototyping pipeline (SolidWorks, Cura, 3D printing) to design, print and deploy custom hardware modifications directly onto an autonomous delivery robot fleet, slashing hardware iteration time and maximizing fleet uptime in harsh weather conditions.",
          tags: ["SolidWorks", "Cura", "3D Printing", "PCB", "Field Operations"],
          image: "images/projects/prototyping.jpg",
          links: [
            { label: "GitHub", href: "https://github.com/niospinag" }
          ]
        }
      ]
    },
    publications: {
      kicker: "Research",
      title: "Publications",
      subtitle: "Peer-reviewed and conference publications in robotics and control.",
      citedLabel: "Cited by",
      abstractLabel: "Conference abstract",
      preprintLabel: "Preprint",
      scholarBtn: "View full profile on Google Scholar",
      items: [
        {
          year: "2021",
          title: "COVID-Bot: UV-C based autonomous sanitizing robotic platform for COVID-19",
          authors: "E. C. Camacho, N. I. Ospina, J. M. Calderón",
          venue: "IFAC-PapersOnLine 54 (13), 317-322",
          badge: "cited",
          count: 22,
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2021",
          title: "Argrohbots: An affordable and replicable ground homogeneous robot swarm testbed",
          authors: "N. I. Ospina, E. Mojica-Nava, L. G. Jaimes, J. M. Calderón",
          venue: "IFAC-PapersOnLine 54 (13), 256-261",
          badge: "cited",
          count: 13,
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2021",
          title: "Event-Triggered Control for Weight-Unbalanced Directed Robot Networks",
          authors: "J. D. Pabón, G. A. Cardona, N. I. Ospina, J. Calderón, E. Mojica-Nava",
          venue: "2021 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
          badge: "cited",
          count: 1,
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2022",
          title: "Argrohbots: An affordable and replicable ground homogeneous robot swarm testbed",
          authors: "N. I. Ospina, E. Mojica-Nava, J. M. Calderón",
          venue: "Florida Scientist 85 (2), 64-65",
          badge: "abstract",
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2022",
          title: "COVID-Bot: UV-C based autonomous sanitizing robotic platform for COVID-19",
          authors: "C. Camacho, N. Ospina, J. Calderón",
          venue: "Florida Scientist 85 (2), 65-65",
          badge: "abstract",
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2021",
          title: "Event-Triggered Control for Weight-Unbalanced Directed Networks",
          authors: "J. D. Pabón, G. A. Cardona, N. I. Ospina, J. Calderón, E. Mojica-Nava",
          venue: "arXiv preprint arXiv:2108.09609",
          badge: "preprint",
          href: "https://arxiv.org/abs/2108.09609"
        }
      ]
    },
    gallery: {
      kicker: "CAD & 3D",
      title: "3D Design & Prototyping",
      subtitle: "Functional parts, sensor mounts and robot components designed for additive manufacturing.",
      btn: "View Sketchfab / CAD Files",
      items: [
        { title: "Lidar Sensor Mount", image: "images/gallery/lidar-mount.jpg" },
        { title: "Custom Robot Chassis", image: "images/gallery/chassis.jpg" },
        { title: "Waterproof PCB Enclosure", image: "images/gallery/pcb-enclosure.jpg" },
        { title: "Actuator Mechanism", image: "images/gallery/actuator.jpg" }
      ]
    },
    experience: {
      kicker: "Career",
      title: "Work Experience",
      items: [
        {
          role: "Data Analyst / Machine Learning",
          company: "Banco Falabella",
          location: "Bogotá, Colombia",
          date: "May 2026 — Present",
          bullets: [
            "Engineered and deployed Random Forest ML models in Python to optimize business goal distribution, increasing branch commission success rates from 50% to 85%.",
            "Architected scalable data pipelines using GCP (BigQuery) and SQL Server to process large-scale historical datasets (~1 TB), developing complex Stored Procedures and use cases.",
            "Designed automated, real-time dashboards in Looker Studio and used advanced Excel (ODBC integrations) to translate complex data into actionable intelligence for C-level executives."
          ]
        },
        {
          role: "Robotics Software Engineer",
          company: "Unlimited Robotics",
          location: "Bogotá, Colombia",
          date: "May 2024 — Aug 2025",
          bullets: [
            "Supported maintenance and integration of the ROS2 Nav2 stack for differential-drive robots, ensuring platform stability for autonomous navigation tasks.",
            "Developed and tested ROS2 nodes in Python and C++ to process sensor data and orchestrate robot behaviors, validating control logic through high-fidelity Gazebo simulations.",
            "Managed Linux-based environments (Ubuntu) using Bash scripting to automate background processes, deployment pipelines and reliable startup sequences."
          ]
        },
        {
          role: "Reliability Engineer (Field Operations)",
          company: "Kiwicampus S.A.S. (Kiwibot)",
          location: "Orono, Maine, USA",
          date: "Dec 2023 — Apr 2024",
          bullets: [
            "Slashed hardware iteration time by establishing a 24-hour rapid prototyping pipeline (SolidWorks, Cura, 3D printing) to design, print and deploy custom modifications directly onto the autonomous delivery robot fleet.",
            "Diagnosed and resolved critical hardware/software failures in harsh weather conditions, troubleshooting complex PCB and sensor issues to maximize fleet uptime."
          ]
        },
        {
          role: "Graduate Research Engineer",
          company: "Bethune-Cookman University & UNAL",
          location: "Daytona Beach, FL, USA",
          date: "Jan 2020 — Jun 2021",
          bullets: [
            "Architected a decentralized multi-agent testbed of 23 heterogeneous robots (15 small, 4 medium, 2 large rovers and 2 drones) to evaluate swarm behavior and Game Theory algorithms.",
            "Developed a precise vision/localization pipeline using Python, OpenCV and ArUco markers, integrating software with Raspberry Pi hardware for real-world validation.",
            "Co-authored a peer-reviewed scientific paper detailing the findings of the multi-agent control strategies."
          ]
        },
        {
          role: "English Immersion & Cultural Exchange Program",
          company: "Career Sabbatical",
          location: "United States",
          date: "Jul 2021 — Nov 2023",
          bullets: [
            "Relocated to the United States to participate in immersive summer camps, achieving professional working proficiency in English and developing strong cross-cultural communication skills."
          ]
        }
      ]
    },
    skills: {
      kicker: "Toolbox",
      title: "Technical Skills",
      groups: [
        {
          title: "Robotics & Vision",
          items: ["ROS / ROS2 (Nav2)", "OpenCV", "ArUco Markers", "Gazebo", "CoppeliaSim", "Swarm Robotics"]
        },
        {
          title: "AI & Data",
          items: ["Machine Learning", "Random Forest", "GCP", "BigQuery", "SQL Server", "Looker Studio"]
        },
        {
          title: "Programming",
          items: [
            { name: "Python", lvl: "Advanced" },
            { name: "SQL", lvl: "Advanced" },
            { name: "Bash / Shell", lvl: "Advanced" },
            { name: "C++", lvl: "Familiar" }
          ]
        },
        {
          title: "Hardware & Prototyping",
          items: ["NVIDIA Jetson", "Raspberry Pi", "PCB Troubleshooting", "3D Printing (Cura)", "SolidWorks"]
        }
      ]
    },
    education: {
      kicker: "Education",
      title: "Academic Background",
      items: [
        {
          school: "Universidad Nacional de Colombia",
          degree: "Master's Degree in Industrial Automation",
          date: "Jun 2021",
          location: "Bogotá, Colombia"
        },
        {
          school: "Universidad Nacional de Colombia",
          degree: "Bachelor's Degree in Electrical Engineering",
          date: "Jun 2018",
          location: "Bogotá, Colombia"
        }
      ]
    },
    contact: {
      kicker: "Contact",
      title: "Let's build something intelligent",
      cta: "Whether you have a robotics project, a data challenge or just want to connect — my inbox is always open.",
      cards: [
        { label: "Email", value: "nestorivan.o@hotmail.com", href: "mailto:nestorivan.o@hotmail.com" },
        { label: "GitHub", value: "github.com/niospinag", href: "https://github.com/niospinag" },
        { label: "LinkedIn", value: "linkedin.com/in/nestor-ospina", href: "https://linkedin.com/in/nestor-ospina" },
        { label: "Google Scholar", value: "scholar.google.com/citations", href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ" },
        { label: "Sketchfab", value: "sketchfab.com/niospinag", href: "https://sketchfab.com/niospinag" }
      ]
    },
    footer: {
      text: "© 2026 Nestor I. Ospina Gaitan",
      built: "Built with HTML, CSS & vanilla JS"
    }
  },

  es: {
    nav: {
      logo: "nestor<span>.</span>dev",
      items: [
        { id: "about", label: "Sobre mí" },
        { id: "projects", label: "Proyectos" },
        { id: "publications", label: "Publicaciones" },
        { id: "gallery", label: "Diseño 3D" },
        { id: "experience", label: "Experiencia" },
        { id: "skills", label: "Habilidades" },
        { id: "contact", label: "Contacto" }
      ]
    },
    hero: {
      badge: "Abierto a nuevos retos",
      name: "Nestor I. Ospina Gaitan",
      role: "Ingeniero de Software en Robótica e IA",
      location: "Bogotá, Colombia",
      tagline: "Construyo sistemas inteligentes que se mueven: desde robots autónomos que navegan el mundo real hasta pipelines de datos que impulsan mejores decisiones.",
      ctas: [
        { id: "projects", label: "Ver proyectos", primary: true },
        { id: "cv", label: "Descargar CV", href: "files/Nestor_Ospina_CV.pdf", primary: false }
      ],
      socials: [
        { label: "GitHub", href: "https://github.com/niospinag" },
        { label: "LinkedIn", href: "https://linkedin.com/in/nestor-ospina" },
        { label: "Scholar", href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ" },
        { label: "Sketchfab", href: "https://sketchfab.com/niospinag" }
      ]
    },
    about: {
      kicker: "Sobre mí",
      title: "Conectando la IA con el mundo físico",
      photoBadge: "Robótica e IA",
      paragraphs: [
        "Ingeniero de Software en Robótica e IA con <strong>M.Sc. en Automatización Industrial</strong> y una sólida base en <strong>Machine Learning</strong>, <strong>ROS2</strong> e <strong>ingeniería de datos</strong>.",
        "He diseñado modelos predictivos de IA, orquestado pipelines de datos a gran escala (~1 TB) y desarrollado sistemas de control descentralizados para enjambres de robots heterogéneos.",
        "Disfruto usar Python, GCP y herramientas de simulación (Gazebo) para conectar los algoritmos de IA con los sistemas de navegación autónoma del mundo real."
      ],
      focus: [
        { title: "Robótica Autónoma", desc: "Navegación con ROS2 / Nav2, robótica de enjambres y desarrollo basado en simulación con Gazebo." },
        { title: "Datos e IA", desc: "Modelos predictivos, pipelines a gran escala en GCP / BigQuery y dashboards para la toma de decisiones." },
        { title: "Prototipado Rápido", desc: "Desde piezas impresas en 3D y reparación de PCBs hasta sistemas con NVIDIA Jetson y Raspberry Pi." }
      ]
    },
    projects: {
      kicker: "Portafolio",
      title: "Proyectos Destacados",
      placeholderNote: "Más proyectos en camino: este portafolio crece a medida que construyo.",
      items: [
        {
          title: "Testbed Descentralizado de Enjambres de Robots",
          desc: "Diseñé un testbed multi-agente descentralizado de 23 robots heterogéneos (rovers y drones) para evaluar comportamiento de enjambres y algoritmos de Teoría de Juegos. Construí un pipeline de visión/localización con OpenCV y marcadores ArUco ejecutándose en Raspberry Pi para validación en el mundo real.",
          tags: ["Python", "OpenCV", "ArUco", "Raspberry Pi", "Swarm Robotics", "Teoría de Juegos"],
          image: "images/projects/swarm.jpg",
          links: [
            { label: "Paper", href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ" },
            { label: "GitHub", href: "https://github.com/niospinag" }
          ]
        },
        {
          title: "Navegación Autónoma con ROS2 Nav2",
          desc: "Mantuve e integré el stack ROS2 Nav2 para robots de tracción diferencial, garantizando estabilidad en tareas de navegación autónoma. Desarrollé y probé nodos ROS2 en Python y C++ para procesar datos de sensores y orquestar comportamientos, validados con simulaciones de alta fidelidad en Gazebo.",
          tags: ["ROS2", "Nav2", "Python", "C++", "Gazebo", "Ubuntu"],
          image: "images/projects/nav2.jpg",
          links: [
            { label: "GitHub", href: "https://github.com/niospinag" }
          ]
        },
        {
          title: "Modelo ML de Distribución de Metas",
          desc: "Diseñé e implementé modelos Random Forest en Python para optimizar la distribución de metas comerciales, elevando la tasa de éxito de comisiones de las sucursales del 50% al 85%. Arquitecté pipelines en GCP (BigQuery) y SQL Server que procesan ~1 TB de datos históricos con stored procedures complejos.",
          tags: ["Python", "Random Forest", "GCP", "BigQuery", "SQL Server", "Looker Studio"],
          image: "images/projects/ml-bank.jpg",
          links: [
            { label: "Detalles bajo solicitud", href: "mailto:nestorivan.o@hotmail.com" }
          ]
        },
        {
          title: "Pipeline de Prototipado Rápido en 24 Horas",
          desc: "Establecí un pipeline de prototipado rápido de 24 horas (SolidWorks, Cura, impresión 3D) para diseñar, imprimir y desplegar modificaciones de hardware personalizadas en una flota de robots de entrega autónomos, reduciendo el tiempo de iteración y maximizando el uptime de la flota en condiciones climáticas adversas.",
          tags: ["SolidWorks", "Cura", "Impresión 3D", "PCB", "Operaciones en Campo"],
          image: "images/projects/prototyping.jpg",
          links: [
            { label: "GitHub", href: "https://github.com/niospinag" }
          ]
        }
      ]
    },
    publications: {
      kicker: "Investigación",
      title: "Publicaciones",
      subtitle: "Publicaciones revisadas por pares y de congresos en robótica y control.",
      citedLabel: "Citado por",
      abstractLabel: "Resumen de congreso",
      preprintLabel: "Preprint",
      scholarBtn: "Ver perfil completo en Google Scholar",
      items: [
        {
          year: "2021",
          title: "COVID-Bot: UV-C based autonomous sanitizing robotic platform for COVID-19",
          authors: "E. C. Camacho, N. I. Ospina, J. M. Calderón",
          venue: "IFAC-PapersOnLine 54 (13), 317-322",
          badge: "cited",
          count: 22,
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2021",
          title: "Argrohbots: An affordable and replicable ground homogeneous robot swarm testbed",
          authors: "N. I. Ospina, E. Mojica-Nava, L. G. Jaimes, J. M. Calderón",
          venue: "IFAC-PapersOnLine 54 (13), 256-261",
          badge: "cited",
          count: 13,
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2021",
          title: "Event-Triggered Control for Weight-Unbalanced Directed Robot Networks",
          authors: "J. D. Pabón, G. A. Cardona, N. I. Ospina, J. Calderón, E. Mojica-Nava",
          venue: "2021 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
          badge: "cited",
          count: 1,
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2022",
          title: "Argrohbots: An affordable and replicable ground homogeneous robot swarm testbed",
          authors: "N. I. Ospina, E. Mojica-Nava, J. M. Calderón",
          venue: "Florida Scientist 85 (2), 64-65",
          badge: "abstract",
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2022",
          title: "COVID-Bot: UV-C based autonomous sanitizing robotic platform for COVID-19",
          authors: "C. Camacho, N. Ospina, J. Calderón",
          venue: "Florida Scientist 85 (2), 65-65",
          badge: "abstract",
          href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ"
        },
        {
          year: "2021",
          title: "Event-Triggered Control for Weight-Unbalanced Directed Networks",
          authors: "J. D. Pabón, G. A. Cardona, N. I. Ospina, J. Calderón, E. Mojica-Nava",
          venue: "arXiv preprint arXiv:2108.09609",
          badge: "preprint",
          href: "https://arxiv.org/abs/2108.09609"
        }
      ]
    },
    gallery: {
      kicker: "CAD & 3D",
      title: "Diseño 3D y Prototipado",
      subtitle: "Partes funcionales, soportes de sensores y componentes robóticos diseñados para manufactura aditiva.",
      btn: "Ver Sketchfab / Archivos CAD",
      items: [
        { title: "Soporte de Sensor Lidar", image: "images/gallery/lidar-mount.jpg" },
        { title: "Chasis de Robot Personalizado", image: "images/gallery/chassis.jpg" },
        { title: "Carcasa Impermeable para PCB", image: "images/gallery/pcb-enclosure.jpg" },
        { title: "Mecanismo Actuador", image: "images/gallery/actuator.jpg" }
      ]
    },
    experience: {
      kicker: "Trayectoria",
      title: "Experiencia Laboral",
      items: [
        {
          role: "Data Analyst / Machine Learning",
          company: "Banco Falabella",
          location: "Bogotá, Colombia",
          date: "May 2026 — Actualidad",
          bullets: [
            "Diseñé e implementé modelos de ML (Random Forest) en Python para optimizar la distribución de metas comerciales, elevando la tasa de éxito de comisiones de las sucursales del 50% al 85%.",
            "Arquitecté pipelines de datos escalables con GCP (BigQuery) y SQL Server para procesar conjuntos históricos a gran escala (~1 TB), desarrollando Stored Procedures y casos de uso complejos.",
            "Diseñé dashboards automatizados y en tiempo real en Looker Studio y usé Excel avanzado (integraciones ODBC) para convertir datos complejos en inteligencia accionable para directivos C-level."
          ]
        },
        {
          role: "Robotics Software Engineer",
          company: "Unlimited Robotics",
          location: "Bogotá, Colombia",
          date: "May 2024 — Ago 2025",
          bullets: [
            "Mantuve e integré el stack ROS2 Nav2 para robots de tracción diferencial, garantizando estabilidad de la plataforma en tareas de navegación autónoma.",
            "Desarrollé y probé nodos ROS2 en Python y C++ para procesar datos de sensores y orquestar comportamientos de robots, validando la lógica de control con simulaciones de alta fidelidad en Gazebo.",
            "Gestioné entornos Linux (Ubuntu) usando scripts Bash para automatizar procesos en segundo plano, pipelines de despliegue y secuencias de arranque confiables."
          ]
        },
        {
          role: "Reliability Engineer (Field Operations)",
          company: "Kiwicampus S.A.S. (Kiwibot)",
          location: "Orono, Maine, EE. UU.",
          date: "Dic 2023 — Abr 2024",
          bullets: [
            "Reduje el tiempo de iteración de hardware al establecer un pipeline de prototipado rápido de 24 horas (SolidWorks, Cura, impresión 3D) para diseñar, imprimir y desplegar modificaciones personalizadas directamente en la flota de robots de entrega autónomos.",
            "Diagnostiqué y resolví fallas críticas de hardware y software en condiciones climáticas adversas, solucionando problemas complejos de PCBs y sensores para maximizar el uptime de la flota."
          ]
        },
        {
          role: "Graduate Research Engineer",
          company: "Bethune-Cookman University & UNAL",
          location: "Daytona Beach, FL, EE. UU.",
          date: "Ene 2020 — Jun 2021",
          bullets: [
            "Arquitecté un testbed multi-agente descentralizado de 23 robots heterogéneos (15 pequeños, 4 medianos, 2 rovers grandes y 2 drones) para evaluar comportamiento de enjambres y algoritmos de Teoría de Juegos.",
            "Desarrollé un pipeline preciso de visión/localización con Python, OpenCV y marcadores ArUco, integrando el software con hardware Raspberry Pi para validación en el mundo real.",
            "Coautoricé un paper científico revisado por pares que detalla los hallazgos de las estrategias de control multi-agente."
          ]
        },
        {
          role: "Programa de Inmersión en Inglés e Intercambio Cultural",
          company: "Sabático Profesional",
          location: "Estados Unidos",
          date: "Jul 2021 — Nov 2023",
          bullets: [
            "Me mudé a Estados Unidos para participar en campamentos de verano inmersivos, logrando competencia profesional en inglés y desarrollando sólidas habilidades de comunicación intercultural."
          ]
        }
      ]
    },
    skills: {
      kicker: "Caja de herramientas",
      title: "Habilidades Técnicas",
      groups: [
        {
          title: "Robótica y Visión",
          items: ["ROS / ROS2 (Nav2)", "OpenCV", "Marcadores ArUco", "Gazebo", "CoppeliaSim", "Robótica de Enjambres"]
        },
        {
          title: "IA y Datos",
          items: ["Machine Learning", "Random Forest", "GCP", "BigQuery", "SQL Server", "Looker Studio"]
        },
        {
          title: "Programación",
          items: [
            { name: "Python", lvl: "Avanzado" },
            { name: "SQL", lvl: "Avanzado" },
            { name: "Bash / Shell", lvl: "Avanzado" },
            { name: "C++", lvl: "Familiar" }
          ]
        },
        {
          title: "Hardware y Prototipado",
          items: ["NVIDIA Jetson", "Raspberry Pi", "Reparación de PCB", "Impresión 3D (Cura)", "SolidWorks"]
        }
      ]
    },
    education: {
      kicker: "Educación",
      title: "Formación Académica",
      items: [
        {
          school: "Universidad Nacional de Colombia",
          degree: "Maestría en Automatización Industrial",
          date: "Jun 2021",
          location: "Bogotá, Colombia"
        },
        {
          school: "Universidad Nacional de Colombia",
          degree: "Ingeniería Eléctrica",
          date: "Jun 2018",
          location: "Bogotá, Colombia"
        }
      ]
    },
    contact: {
      kicker: "Contacto",
      title: "Construyamos algo inteligente",
      cta: "Ya sea un proyecto de robótica, un reto de datos o simplemente quieres conectar: mi bandeja de entrada siempre está abierta.",
      cards: [
        { label: "Email", value: "nestorivan.o@hotmail.com", href: "mailto:nestorivan.o@hotmail.com" },
        { label: "GitHub", value: "github.com/niospinag", href: "https://github.com/niospinag" },
        { label: "LinkedIn", value: "linkedin.com/in/nestor-ospina", href: "https://linkedin.com/in/nestor-ospina" },
        { label: "Google Scholar", value: "scholar.google.com/citations", href: "https://scholar.google.com/citations?hl=es&user=LRhuGL8AAAAJ" },
        { label: "Sketchfab", value: "sketchfab.com/niospinag", href: "https://sketchfab.com/niospinag" }
      ]
    },
    footer: {
      text: "© 2026 Nestor I. Ospina Gaitan",
      built: "Hecho con HTML, CSS y JS puro"
    }
  }
};