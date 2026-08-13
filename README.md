# niospinag.github.io

Personal website of **Nestor I. Ospina Gaitan** — Robotics & AI Software Engineer.

Static single-page site built with plain HTML/CSS/JS (no build step), bilingual
(EN/ES toggle), hosted on GitHub Pages: <https://niospinag.github.io>

## Structure

```
├── index.html          # Single-page site (all sections)
├── css/style.css       # Dark tech theme, responsive
├── js/
│   ├── main.js         # Menu, scroll animations, scroll spy
│   └── i18n.js         # EN/ES translations + language toggle
└── assets/
    ├── img/
    │   ├── profile.jpg         # Profile photo (drop here)
    │   ├── projects/           # Project photos: nav2.jpg, swarm.jpg, ml-goals.jpg, prototyping.jpg
    │   └── gallery/            # 3D renders: lidar-mount.jpg, chassis.jpg, pcb-enclosure.jpg, actuator.jpg
    └── pdf/
        └── Nestor_Ospina_CV.pdf  # Downloadable CV (drop here)
```

Images/PDF dropped with those exact names appear on the site automatically —
placeholders are shown until then.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
