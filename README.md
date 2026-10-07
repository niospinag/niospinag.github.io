# Nestor Ivan Ospina Gaitan — Robotics Portfolio

Portafolio estático de ingeniería robótica con estética industrial / telemetría
(RViz-style, dark mode estricto). Construido con **Astro (SSG) + Tailwind CSS v4 +
`@google/model-viewer`**, desplegado en **GitHub Pages** mediante GitHub Actions.

## Stack

| Capa        | Tecnología                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| Framework   | Astro 7 (SSG, cero JS por defecto, islas)                                  |
| Estilos     | Tailwind CSS v4 (`@tailwindcss/vite`, configuración CSS-first)             |
| Iconos      | Lucide vía `astro-icon` (SVG inline en build, 0 JS en cliente)             |
| 3D          | `@google/model-viewer` + `three` (carga diferida por IntersectionObserver) |
| Tipografías | Space Grotesk Variable + JetBrains Mono Variable (auto-alojadas)           |
| Deploy      | GitHub Actions → GitHub Pages, listo para dominio personalizado            |

## Requisitos y comandos

Node.js **≥ 22.12** (`.nvmrc` fija la versión probada: `22.23.2`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build estático (corre gen:assets --if-missing antes)
npm run preview    # sirve ./dist
npm run gen:assets # regenera .glb / CV.pdf / og-cover.png (sobrescribe)
```

`prebuild` ejecuta `generate-assets.mjs --if-missing`: solo crea los assets que
no existan, así tus modelos/CV reales nunca se pisan en un build.

## Árbol del proyecto

```
.
├── .github/workflows/deploy.yml      # CI/CD → GitHub Pages
├── astro.config.mjs                  # site/base + sitemap + astro-icon + Tailwind (vite)
├── tsconfig.json  ·  package.json  ·  .nvmrc
├── scripts/
│   └── generate-assets.mjs           # writer propio de .glb / PDF / PNG (sin deps)
├── public/
│   ├── favicon.svg  ·  robots.txt  ·  og-cover.png (1200×630)
│   ├── cv/nestor-ospina-cv.pdf       # ← REEMPLAZA con tu CV real
│   ├── assets/
│   │   ├── draco/                    # decoder local + aviso Apache 2.0
│   │   └── robot-gallery/            # siete capturas de SolidWorks
│   └── models/
│       ├── cad/                      # ocho GLB optimizados de tus exportaciones
│       └── *.glb                     # placeholders de ejemplo
└── src/
    ├── data/profile.ts               # TODO el contenido tipado en un solo lugar
    ├── styles/global.css             # Tailwind v4: @theme, tokens, componentes HUD
    ├── layouts/BaseLayout.astro      # <head> SEO/OG/JSON-LD + nav + footer + JS global
    ├── pages/index.astro             # composición de secciones
    ├── pages/404.astro
    └── components/
        ├── Background.astro          # grid HUD + glows + grain (fijo, z -10)
        ├── Nav.astro                 # barra HUD, scroll-spy, reloj BOG, menú móvil
        ├── Hero.astro                # nombre, efecto scramble, CTAs, terminal telemetría
        ├── MetricBadge.astro         # tarjetas de métricas con count-up
        ├── SectionHeader.astro       # cabecera de sección reutilizable
        ├── TechStack.astro           # matriz por dominios (tabs accesibles)
        ├── Experience.astro          # línea de tiempo expandible + rail animado
        ├── Projects.astro            # cards + <dialog> de case study
        ├── ModelViewer.astro         # wrapper reusable de <model-viewer>
        ├── ViewerSection.astro       # visor, ocho modelos + galería de capturas
        ├── About.astro               # formación, idiomas, certs y referencias
        └── Footer.astro              # contacto, copiar correo, redes, toast
```

## Tailwind CSS v4 (configuración CSS-first)

No hay `tailwind.config.js`: en v4 el tema vive en CSS, en
`src/styles/global.css`, dentro de `@theme` (colores, tipografías y motion
tokens que generan utilidades como `bg-neon`, `font-mono`, `animate-blink`):

```css
@import "tailwindcss";

@theme {
  --color-void: #04070a;              /* superficies slate/zinc profundas */
  --color-neon: #3dff9e;              /* acento verde neón */
  --color-cyan: #29e0ff;              /* acento cian */
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
  --animate-blink: blink 1.15s steps(2, start) infinite;
}
```

El plugin se registra en `astro.config.mjs` bajo `vite.plugins` (la vía
`integrations` + `@astrojs/tailwind` es legacy de Tailwind 3 y no aplica en v4):

```js
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ vite: { plugins: [tailwindcss()] } });
```

Las piezas de diseño reutilizables (`.panel`, `.corners`, `.chip`, `.btn`,
`.label`, `.reveal`, `.skeleton`, `.bar-grow`, `.hud-grid`, `.scanlines`,
`.noise`) están en `@layer components` del mismo archivo, junto con los
overrides de `<model-viewer>`.

## Componente `<ModelViewer />`

`src/components/ModelViewer.astro` envuelve el web component oficial con:

- **Carga diferida**: `model-viewer` + `three` (~1 MB) se importan con
  `import()` dinámico solo cuando el visor entra en viewport; el JS inicial
  de la página no los paga.
- Modelos Draco y **decoder autoalojado** en `public/assets/draco/` (no requiere CDN).
- **Skeleton de carga** con barra de progreso real (evento `progress`) y
  **estado de error** con guía de diagnóstico.
- **Controles HUD**: auto-rotación, zoom ±, reset de cámara; más órbita y
  pellizco nativos (`camera-controls`).
- IBL `environment-image="neutral"`, sombra suave y `reveal="auto"`.

Uso:

```astro
<ModelViewer
  src="/models/cad/mecanum-robot.glb"
  alt="Plataforma móvil Mecanum"
  cameraOrbit="35deg 72deg auto"
  fieldOfView="32deg"
  exposure="1"
  autoRotate
  controls
/>
```

Los ocho modelos originales de `media/` sumaban ~179 MB; sus versiones GLB
optimizadas con Draco y WebP suman **~6.1 MB** y están en `public/models/cad/`.
Las siete capturas están en `public/assets/robot-gallery/`. La carpeta original
`media/` se conserva en tu equipo, pero está en `.gitignore` para no subir los
CAD pesados ni duplicar el repo. Los modelos llegan desde el propio sitio GitHub
Pages; no hace falta un hosting externo.

La pareja `Robot Ensamble` tiene dos variantes del mismo diseño: con carcasa y
sin carcasa. En la segunda se omitió la cubierta en la exportación de CAD, para
inspeccionar el interior sin cambiar transparencia ni materiales.

Para repetir la optimización de un nuevo `.gltf` con sus archivos `.bin` antes de
copiar el `.glb` optimizado a `public/models/cad/`:

```bash
npx --yes @gltf-transform/cli optimize media/mi-robot/mi-robot.gltf \
  public/models/cad/mi-robot.glb \
  --compress draco --texture-compress webp --texture-size 1024 \
  --simplify false --flatten false --instance false --join false --palette false
```

`--instance false` evita instancias de malla que no permiten inspeccionar cada
pieza individual en el grafo de escena del visor. Luego actualiza `models[]` y
`robotGallery[]` en `src/data/profile.ts`. Mantén los fuentes `.SLDPRT/.SLDASM`
fuera de la carpeta pública si no quieres divulgarlos.

## Contenido

Todo el texto vive tipado en `src/data/profile.ts` (perfil, métricas, stack,
experiencia, proyectos, modelos 3D, educación, galería, nav). Editar datos no requiere
tocar markup. Los acentos por sección se resuelven con `accentClasses`, que
declara literalmente cada variante de Tailwind para que el compilador las vea.

## Despliegue en GitHub Pages

1. Sube el repo y crea la rama principal (`main`).
2. En el repo: **Settings → Pages → Source: “GitHub Actions”**.
3. Haz push: `.github/workflows/deploy.yml` construye con `npm ci && npm run
   build` y publica `./dist` con `actions/deploy-pages`.

### Dominio personalizado

- **Settings → Pages → Custom domain** = `tudominio.com` y activa *Enforce HTTPS*.
- Crea `public/CNAME` con **solo** el dominio: `echo "tudominio.com" > public/CNAME`.
- Configura en tu registrador los registros que pide GitHub
  (A `185.199.108-111.153` + CNAME `www → <user>.github.io`).
- Opcional: variable de repositorio `SITE_URL` = `https://tudominio.com`
  (canonical, sitemap y OG). Si no la defines, el workflow usa
  `base_url` de `actions/configure-pages`.

### Project page (`<user>.github.io/<repo>`)

`astro.config.mjs` deriva `base` del pathname de `SITE_URL`, así que basta con
dejar que el workflow inyecte `SITE_URL=${{ steps.pages.outputs.base_url }}`
(ya lo hace). Actualiza también el host en `public/robots.txt`.

## Rendimiento

- HTML 100 % estático; el único JS inicial son ~5 KB de interacciones vanilla.
- El runtime 3D va en chunk aparte y se carga bajo demanda; los ocho modelos
  comprimidos pesan ~6.1 MB en total.
- Fuentes variables auto-alojadas con `unicode-range` (solo se baja el subset latino).
- `prefers-reduced-motion` respetado en reveal, count-up, scramble y animaciones.
- Sin trackers ni CDNs: fuentes, capturas, modelos y decoder Draco auto-alojados.

## Licencia

MIT — contenido y datos profesionales © Nestor Ivan Ospina Gaitan.
