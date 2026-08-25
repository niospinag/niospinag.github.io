# Nestor Ospina — Portfolio

Sitio web de presentación personal, desplegado en GitHub Pages: **https://niospinag.github.io**

- Bilingüe (EN/ES) con toggle persistente.
- Tema dark, responsive, sin frameworks (HTML/CSS/JS vanilla).
- SEO reforzado: Open Graph, Twitter Cards y datos estructurados JSON-LD.

## Estructura

```
├── index.html            # Página única + meta tags SEO y JSON-LD
├── assets/
│   ├── css/style.css     # Estilos del tema
│   ├── js/data.js        # TODO el contenido bilingüe (¡edita aquí!)
│   └── js/main.js        # Render, toggle de idioma, menú móvil
├── images/               # Foto de perfil y capturas de proyectos
├── files/
│   └── CV_Nestor_Ospina.pdf
├── favicon.svg
├── sitemap.xml
└── robots.txt
```

## Cómo agregar un proyecto

1. Abre `assets/js/data.js`.
2. Copia una entrada dentro de `projects.items` en **EN** y en **ES** (mismo índice en ambos).
3. Coloca la imagen en `images/projects/` y apunta `image` a ella (si no existe, se muestra un placeholder automáticamente).
4. Guarda y recarga. Eso es todo.

Ejemplo de entrada:

```js
{
  title: "Nombre del proyecto",
  desc: "Descripción corta y clara.",
  tags: ["Python", "ROS2"],
  image: "images/projects/mi-proyecto.jpg",
  links: [
    { label: "GitHub", href: "https://github.com/niospinag" },
    { label: "Demo", href: "https://..." }
  ]
}
```

> Si el proyecto es de trabajo con datos sensibles (NDA), describe solo lo genérico y no subas capturas internas.

## Cómo actualizar otros contenidos

- **Foto de perfil**: reemplaza `images/profile.jpg`.
- **CV descargable**: coloca el PDF en `files/CV_Nestor_Ospina.pdf`.
- **Paper/Publicaciones**: edita `publications.items` en `data.js` y pega tu link de Google Scholar.
- **Links de Scholar**: reemplaza `https://scholar.google.com/` por tu URL real en `data.js`.

## Probar localmente

```bash
cd pagina_web
python3 -m http.server 8000
# Abre http://localhost:8000
```

## Desplegar en GitHub Pages

Requisito: el repositorio debe llamarse exactamente **`niospinag.github.io`** (nombre de usuario de GitHub).

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/niospinag/niospinag.github.io.git
git push -u origin main
```

GitHub Pages sirve el sitio automáticamente desde la rama `main` en:
**https://niospinag.github.io**

> Si el repo ya existe como privado, recuerda hacerlo público (Settings → Danger Zone → Change visibility).