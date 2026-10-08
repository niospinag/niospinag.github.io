# Resumen del Proyecto — Portfolio Robótica

## Identificación
- **Nombre**: nestor-ospina-portfolio
- **Autor**: Nestor Ivan Ospina Gaitan
- **Rol**: Robotics Software Engineer
- **URL**: https://niospinag.github.io
- **Repo**: https://github.com/niospinag/pagina_web2

## Stack Tecnológico
| Capa | Tecnología |
|------|------------|
| Framework | Astro 7 (SSG, cero JS por defecto) |
| Estilos | Tailwind CSS v4 (configuración CSS-first) |
| 3D | @google/model-viewer + three.js |
| Iconos | Lucide vía astro-icon |
| Tipografías | Space Grotesk Variable + JetBrains Mono Variable |
| Deploy | GitHub Pages con GitHub Actions |

## Estructura del Proyecto
```
/
├── src/
│   ├── data/profile.ts        # Única fuente de contenido (todo tipado)
│   ├── styles/global.css     # Tailwind v4: @theme, tokens, componentes HUD
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   └── proyectos/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── components/           # 14 componentes Astro
├── public/
│   ├── cv/nestor-ospina-cv.pdf
│   ├── models/cad/*.glb      # 8 modelos 3D optimizados (Draco + WebP)
│   ├── assets/draco/         # Decoder local
│   ├── assets/robot-gallery/  # 7 capturas de SolidWorks
│   └── projects/<slug>/       # Fotos, videos, docs por proyecto
├── scripts/generate-assets.mjs
└── .github/workflows/deploy.yml
```

## Datos del Perfil (en profile.ts)
- **Nombre**: Nestor Ivan Ospina Gaitan
- **Email**: niospinag@unal.edu.co
- **Teléfono**: +57 3002924631
- **Ubicación**: Bogotá, Colombia (GMT-5)
- **GitHub**: https://github.com/niospinag
- **LinkedIn**: https://www.linkedin.com/in/nestor-ospina

## Proyectos (5 casos)
1. **covid-bot** — Robot autónomo de desinfección UV-C
2. **multi-agent-avoidance** — Sistema de evasión de colisiones multi-robot
3. **fleet-analytics** — Analítica de flotas (Kiwibot)
4. **testing-environment** — Entorno de validación robótica
5. **unlimited-robotics** — Plataformas robóticas y control

## Experiencia Laboral
1. **Unlimited Robotics** — Software Engineer (May 2024 - Presente)
2. **Kiwibot** — Junior Maintenance Engineer (Dic 2023 - May 2024)
3. **Universidad Nacional de Colombia** — Assistant Professor (Jul 2018 - Nov 2022)

## Modelos 3D Disponibles (8)
larry-chassis, mecanum-robot, omnidirectional-v1, omnidirectional-v2,
robot-assembly-shell, robot-assembly-internals, robot2, robot22

## Comandos
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build estático
npm run preview    # servir ./dist
```

## Notas Importantes
- Node.js ≥ 22.12 (fijado en .nvmrc: 22.23.2)
- Contenido en español (locale es_CO)
- Diseño industrial/dark mode con acentos neon/cyan/amber/magenta
- Modelos 3D comprimidos ~6.1 MB total (originales ~179 MB en media/)
- Media/ está en .gitignore (no se sube al repo)
- 4 proyectos tienen carpetas en public/projects/ para fotos/videos/docs

## Workflow de Deploy
GitHub Actions → GitHub Pages (Actions/deploy-pages)

## Personalización
- Editar `src/data/profile.ts` para todo el contenido
- Agregar modelos GLB en `public/models/cad/`
- Agregar proyectos en `public/projects/<slug>/{photos,videos,docs}/`
