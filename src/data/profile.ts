/**
 * Single source of truth for all site content.
 * Every component imports from here — edit data, not markup.
 */

/* ------------------------------------------------------------------ *
 * TYPES
 * ------------------------------------------------------------------ */
export type Accent = 'neon' | 'cyan' | 'amber' | 'magenta';

/** Prefix public URLs with Astro's base so assets also work on /<repo>/ pages. */
const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export interface Metric {
  value: string;
  /** numeric part used by the count-up animation */
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  detail: string;
  accent: Accent;
  icon: string;
}

export interface StackGroup {
  id: string;
  title: string;
  code: string;
  icon: string;
  accent: Accent;
  items: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  /** short one-liner shown when the timeline node is collapsed */
  summary: string;
  achievements: { text: string; metric?: string }[];
  stack: string[];
  accent: Accent;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  description: string;
  challenge: string;
  approach: string[];
  impact: { label: string; value: string }[];
  stack: string[];
  icon: string;
  accent: Accent;
  /** optional 3D asset shown inside the case-study modal */
  model?: string;
}

export interface ModelAsset {
  id: string;
  label: string;
  sublabel: string;
  src: string;
  poster?: string;
  cameraOrbit?: string;
  fieldOfView?: string;
  exposure?: string;
  specs: { k: string; v: string }[];
}

export interface RobotGalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  modelId: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  date: string;
  icon: string;
}

/* ------------------------------------------------------------------ *
 * PROFILE
 * ------------------------------------------------------------------ */
export const profile = {
  name: 'Nestor Ivan Ospina Gaitan',
  shortName: 'Nestor Ospina',
  role: 'Robotics Software Engineer',
  roleSuffix: 'Robotics, Control & Design',
  tagline:
    'Magíster en Automatización Industrial con más de 5 años de experiencia liderando el desarrollo de plataformas robóticas, algoritmos de control y diseño mecánico CAD.',
  location: 'Bogotá, Colombia',
  timezone: 'GMT-5',
  email: 'niospinag@unal.edu.co',
  phone: '+57 3002924631',
  phoneHref: '+573002924631',
  links: {
    github: 'https://github.com/niospinag',
    linkedin: 'https://www.linkedin.com/in/niospinag',
  },
  cv: publicAsset('/cv/nestor-ospina-cv.pdf'),
  status: 'Disponible para nuevos retos',
  languages: [
    { name: 'Español', level: 'Nativo', value: 100 },
    { name: 'Inglés', level: 'Competencia profesional', value: 85 },
  ],
  certifications: [
    {
      name: 'PMP® — Project Management Professional',
      issuer: 'Project Management Institute',
      icon: 'lucide:badge-check',
    },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * HERO METRICS
 * ------------------------------------------------------------------ */
export const metrics: Metric[] = [
  {
    value: '+50%',
    target: 50,
    prefix: '+',
    suffix: '%',
    label: 'Eficiencia en implementación',
    detail: 'Ganancia de eficiencia operativa mediante automatización de procesos.',
    accent: 'neon',
    icon: 'lucide:gauge',
  },
  {
    value: '+25%',
    target: 25,
    prefix: '+',
    suffix: '%',
    label: 'Precisión en navegación',
    detail: 'Mejora en precisión de navegación y control de robots móviles.',
    accent: 'cyan',
    icon: 'lucide:crosshair',
  },
  {
    value: '-60%',
    target: 60,
    prefix: '-',
    suffix: '%',
    label: 'Tiempo de validación',
    detail: 'Reducción del tiempo de validación de algoritmos con plataforma de pruebas dedicada.',
    accent: 'amber',
    icon: 'lucide:timer',
  },
  {
    value: '99%',
    target: 99,
    suffix: '%',
    label: 'Evasión de colisiones',
    detail: 'Precisión en evasión de colisiones para sistemas multi-agente en entornos dinámicos.',
    accent: 'magenta',
    icon: 'lucide:shield-check',
  },
];

/* ------------------------------------------------------------------ *
 * TECH STACK MATRIX
 * ------------------------------------------------------------------ */
export const stackGroups: StackGroup[] = [
  {
    id: 'robotics',
    title: 'Robótica & Control',
    code: 'RTC-01',
    icon: 'lucide:bot',
    accent: 'neon',
    items: [
      'ROS',
      'Algoritmos de Control',
      'Navegación Autónoma',
      'Sensor Integration',
      'Hardware-Software Integration',
    ],
  },
  {
    id: 'software',
    title: 'Programación & Datos',
    code: 'SFT-02',
    icon: 'lucide:code-xml',
    accent: 'cyan',
    items: ['Python', 'C++', 'MATLAB', 'Data Analytics', 'Control de Flotas'],
  },
  {
    id: 'cad',
    title: 'Diseño CAD & Prototipado',
    code: 'CAD-03',
    icon: 'lucide:box',
    accent: 'amber',
    items: [
      'SolidWorks',
      'Fusion 360',
      'AutoCAD',
      'Inventor',
      'Manufactura Aditiva (Impresión 3D)',
    ],
  },
  {
    id: 'embedded',
    title: 'Hardware Embebido',
    code: 'EMB-04',
    icon: 'lucide:cpu',
    accent: 'magenta',
    items: ['Jetson', 'Raspberry Pi', 'Arduino', 'Sensores y Actuadores'],
  },
];

/* ------------------------------------------------------------------ *
 * EXPERIENCE
 * ------------------------------------------------------------------ */
export const experience: ExperienceEntry[] = [
  {
    company: 'Unlimited Robotics',
    role: 'Software Engineer',
    location: 'Bogotá, Colombia',
    start: 'May 2024',
    end: 'Presente',
    current: true,
    summary:
      'Desarrollo de soluciones robóticas 3D, algoritmos de control y plataformas de validación.',
    achievements: [
      {
        text: 'Desarrollo de soluciones robóticas 3D y algoritmos de control de movimiento y navegación para plataformas autónomas.',
      },
      {
        text: 'Diseño de una plataforma de pruebas dedicada para la validación sistemática de algoritmos de control.',
        metric: '-60% tiempo de testeo',
      },
      {
        text: 'Modernización de la flota robótica y diseño de entornos de manufactura aditiva y de pruebas.',
      },
    ],
    stack: ['ROS', 'Python', 'C++', 'SolidWorks', 'Jetson', 'Impresión 3D'],
    accent: 'neon',
  },
  {
    company: 'Kiwicampus S.A.S. (Kiwibot)',
    role: 'Junior Maintenance Engineer',
    location: 'Orono, Maine, USA',
    start: 'Dic 2023',
    end: 'May 2024',
    current: false,
    summary:
      'Analítica de flotas de entrega autónoma, mantenimiento predictivo y diagnóstico en campo.',
    achievements: [
      {
        text: 'Análisis de datos y tracking de flotas de robots de entrega autónoma.',
        metric: '+28% eficiencia de pedidos',
      },
      {
        text: 'Mantenimiento, diagnóstico y reparación del 95% de la flota robótica activa.',
        metric: '95% de la flota',
      },
      {
        text: 'Implementación de estrategias de mantenimiento predictivo.',
        metric: '-30% fallas operativas',
      },
    ],
    stack: ['Python', 'Data Analytics', 'Fleet Management', 'Diagnóstico HW'],
    accent: 'cyan',
  },
  {
    company: 'Universidad Nacional de Colombia',
    role: 'Assistant Professor',
    location: 'Bogotá, Colombia',
    start: 'Jul 2018',
    end: 'Nov 2022',
    current: false,
    summary:
      'Docencia de laboratorio en ingeniería eléctrica, control y automatización.',
    achievements: [
      {
        text: 'Instructor de laboratorio para más de 200 estudiantes en cursos de ingeniería eléctrica, control y automatización.',
        metric: '+200 estudiantes',
      },
      {
        text: 'Gestión, mantenimiento y disponibilidad de equipos de laboratorio para más de 15 cursos.',
        metric: '+15 cursos',
      },
    ],
    stack: ['MATLAB', 'Control', 'Electrónica', 'Docencia'],
    accent: 'amber',
  },
];

/* ------------------------------------------------------------------ *
 * PROJECTS
 * ------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    id: 'covid-bot',
    title: 'COVID Bot',
    subtitle: 'Autonomous UV-C Disinfection Robot',
    category: 'Robótica Móvil',
    period: '2020 — 2022',
    description:
      'Robot autónomo de desinfección por luz UV-C con diseño mecánico a medida, sensórica integrada y navegación autónoma en interiores.',
    challenge:
      'Desinfectar áreas hospitalarias y de alto tráfico sin exponer personal a radiación UV-C, manteniendo autonomía de navegación y trazabilidad de cada ciclo.',
    approach: [
      'Diseño mecánico completo del chasis, torre UV-C y soportes de sensórica en CAD, optimizado para manufactura aditiva.',
      'Arquitectura de control distribuida: Jetson para percepción y planificación, Raspberry Pi para telemetría, Arduino para actuadores.',
      'Navegación autónoma con ROS, mapeo del entorno y rutinas de cobertura por zonas.',
      'Interlocks de seguridad y monitoreo de presencia humana para operación segura de UV-C.',
    ],
    impact: [
      { label: 'Cobertura', value: 'Multi-zona' },
      { label: 'Control', value: 'Distribuido' },
      { label: 'Stack', value: 'ROS / Jetson' },
    ],
    stack: ['Python', 'C++', 'ROS', 'Jetson', 'Raspberry Pi', 'Arduino', 'Impresión 3D'],
    icon: 'lucide:sun',
    accent: 'neon',
  },
  {
    id: 'multi-agent-avoidance',
    title: 'Multi-Agent Collision Avoidance',
    subtitle: 'Sistema de evasión de colisiones multi-robot',
    category: 'Control & Algoritmos',
    period: '2021 — 2022',
    description:
      'Navegación independiente multi-robot con 99% de precisión en la prevención de colisiones dentro de entornos dinámicos.',
    challenge:
      'Coordinar trayectorias de varios agentes que comparten espacio con obstáculos móviles, sin un controlador centralizado y con latencia mínima.',
    approach: [
      'Control por visión con cámara cenital para estimación de posición y velocidad de todos los agentes.',
      'Algoritmos de evasión descentralizados con predicción de trayectorias y resolución de conflictos.',
      'Plataforma de pruebas instrumentada para validación sistemática y repetible de los algoritmos.',
      'Barrido de parámetros y análisis de datos para ajustar márgenes de seguridad y agresividad de maniobra.',
    ],
    impact: [
      { label: 'Precisión', value: '99%' },
      { label: 'Validación', value: '-60% tiempo' },
      { label: 'Agentes', value: 'Multi-robot' },
    ],
    stack: ['Python', 'Control por Visión', 'Multi-Agent Systems', 'OpenCV', 'Data Analytics'],
    icon: 'lucide:radar',
    accent: 'cyan',
  },
  {
    id: 'fleet-analytics',
    title: 'Data-Driven Robot Tracking',
    subtitle: 'Fleet Analytics — Kiwibot',
    category: 'Datos & Flotas',
    period: '2023 — 2024',
    description:
      'Modelos predictivos y telemetría en tiempo real para la optimización logística de flotas de robots de entrega autónoma.',
    challenge:
      'Convertir telemetría cruda de cientos de robots en decisiones de mantenimiento y ruteo que reduzcan tiempos muertos y fallas en campo.',
    approach: [
      'Pipeline de ingesta y limpieza de telemetría de flota (batería, odometría, eventos de error, rutas).',
      'Dashboards de tracking en tiempo real con KPIs de disponibilidad y eficiencia de pedidos.',
      'Modelos predictivos de falla para anticipar mantenimiento y priorizar intervenciones.',
      'Protocolos de diagnóstico y reparación estandarizados para el equipo de campo.',
    ],
    impact: [
      { label: 'Eficiencia pedidos', value: '+28%' },
      { label: 'Fallas operativas', value: '-30%' },
      { label: 'Flota atendida', value: '95%' },
    ],
    stack: ['Python', 'Data Analytics', 'Fleet Management', 'Telemetría', 'SQL'],
    icon: 'lucide:activity',
    accent: 'amber',
  },
  {
    id: 'testing-environment',
    title: 'Artificial Testing Environment',
    subtitle: 'Diseño de entorno de validación robótica',
    category: 'Diseño CAD',
    period: '2022 — 2024',
    description:
      'Infraestructura física y digital de un entorno hospitalario artificial para la validación sistemática de robots.',
    challenge:
      'Reproducir un entorno hospitalario realista de forma controlada, repetible y de bajo costo para validar algoritmos antes del despliegue.',
    approach: [
      'Modelado CAD paramétrico de la infraestructura: pasillos, puertas, camas, mobiliario y obstáculos.',
      'Optimización de costos mediante selección de materiales y diseño para manufactura aditiva.',
      'Gemelo digital del entorno para simulación y pruebas de navegación offline.',
      'Montaje físico instrumentado con puntos de referencia para control por visión.',
    ],
    impact: [
      { label: 'Tiempo de testeo', value: '-60%' },
      { label: 'Costo', value: 'Optimizado' },
      { label: 'Entregable', value: 'Físico + Digital' },
    ],
    stack: ['SolidWorks', 'Diseño 3D', 'Cost Optimization', 'Impresión 3D', 'Simulación'],
    icon: 'lucide:layout-grid',
    accent: 'magenta',
  },
];

/* ------------------------------------------------------------------ *
 * 3D MODEL LIBRARY (Digital Twin Viewer)
 * ------------------------------------------------------------------ */
export const models: ModelAsset[] = [
  {
    id: 'larry-chassis',
    label: 'Larry · Chasis DuraOmni',
    sublabel: 'Chasis con ruedas DuraOmni de 6″',
    src: publicAsset('/models/cad/larry-chassis.glb'),
    poster: publicAsset('/assets/robot-gallery/larry-chassis.png'),
    cameraOrbit: '35deg 68deg auto',
    fieldOfView: '36deg',
    exposure: '1',
    specs: [
      { k: 'Tipo', v: 'Chasis robótico' },
      { k: 'Tracción', v: 'DuraOmni · 6″' },
      { k: 'Origen', v: 'SolidWorks · glTF Draco' },
      { k: 'Archivo', v: '1.0 MB' },
    ],
  },
  {
    id: 'mecanum-robot',
    label: 'Mecanum Robot',
    sublabel: 'Plataforma con ruedas mecanum',
    src: publicAsset('/models/cad/mecanum-robot.glb'),
    poster: publicAsset('/assets/robot-gallery/mecanum-robot.png'),
    cameraOrbit: '-40deg 62deg auto',
    fieldOfView: '34deg',
    exposure: '1',
    specs: [
      { k: 'Tipo', v: 'Plataforma móvil' },
      { k: 'Tracción', v: 'Ruedas mecanum' },
      { k: 'Origen', v: 'SolidWorks · glTF Draco' },
      { k: 'Archivo', v: '99 KB' },
    ],
  },
  {
    id: 'omni-v1',
    label: 'Omnidireccional · V1',
    sublabel: 'Plataforma con ruedas omni',
    src: publicAsset('/models/cad/omnidirectional-v1.glb'),
    poster: publicAsset('/assets/robot-gallery/omnidirectional-v1.png'),
    cameraOrbit: '35deg 72deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Tipo', v: 'Robot móvil' },
      { k: 'Tracción', v: 'Ruedas omni' },
      { k: 'Origen', v: 'SolidWorks · glTF Draco' },
      { k: 'Archivo', v: '888 KB' },
    ],
  },
  {
    id: 'omni-v2',
    label: 'Omnidireccional · V2',
    sublabel: 'Segunda exportación del ensamble omni',
    src: publicAsset('/models/cad/omnidirectional-v2.glb'),
    poster: publicAsset('/assets/robot-gallery/omnidirectional-v1.png'),
    cameraOrbit: '35deg 72deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Tipo', v: 'Robot móvil' },
      { k: 'Tracción', v: 'Ruedas omni' },
      { k: 'Origen', v: 'SolidWorks · glTF Draco' },
      { k: 'Archivo', v: '860 KB' },
    ],
  },
  {
    id: 'robot-assembly-shell',
    label: 'Robot Ensamble · carcasa',
    sublabel: 'Ensamble completo con cubierta',
    src: publicAsset('/models/cad/robot-assembly-shell.glb'),
    poster: publicAsset('/assets/robot-gallery/robot-assembly-shell.png'),
    cameraOrbit: '30deg 68deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Tipo', v: 'Ensamble de robot' },
      { k: 'Configuración', v: 'Con carcasa' },
      { k: 'Origen', v: 'SolidWorks · glTF Draco' },
      { k: 'Archivo', v: '121 KB' },
    ],
  },
  {
    id: 'robot-assembly-internals',
    label: 'Robot Ensamble · interior',
    sublabel: 'Sin carcasa · componentes internos visibles',
    src: publicAsset('/models/cad/robot-assembly-internals.glb'),
    poster: publicAsset('/assets/robot-gallery/robot-assembly-internals.png'),
    cameraOrbit: '30deg 68deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Tipo', v: 'Ensamble de robot' },
      { k: 'Configuración', v: 'Exportación sin carcasa' },
      { k: 'Vista', v: 'Componentes internos' },
      { k: 'Archivo', v: '92 KB' },
    ],
  },
  {
    id: 'robot2',
    label: 'Robot2 · ensamble',
    sublabel: 'Plataforma robótica con electrónica integrada',
    src: publicAsset('/models/cad/robot2.glb'),
    poster: publicAsset('/assets/robot-gallery/robot2.png'),
    cameraOrbit: '35deg 72deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Tipo', v: 'Ensamble CAD' },
      { k: 'Elementos', v: 'Chasis, motores y electrónica' },
      { k: 'Origen', v: 'SolidWorks · glTF Draco' },
      { k: 'Archivo', v: '1.5 MB' },
    ],
  },
  {
    id: 'robot22',
    label: 'Robot22 · revisión',
    sublabel: 'Exportación revisada del ensamble Robot2',
    src: publicAsset('/models/cad/robot22-revision.glb'),
    poster: publicAsset('/assets/robot-gallery/robot2.png'),
    cameraOrbit: '35deg 72deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Tipo', v: 'Ensamble CAD' },
      { k: 'Elementos', v: 'Chasis, motores y electrónica' },
      { k: 'Origen', v: 'SolidWorks · glTF Draco' },
      { k: 'Archivo', v: '1.5 MB' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * DESIGN SCREENSHOTS — linked to the matching 3D model in the viewer.
 * ------------------------------------------------------------------ */
export const robotGallery: RobotGalleryItem[] = [
  {
    id: 'larry-chassis',
    title: 'Larry · Chasis DuraOmni',
    description: 'Vista de diseño del chasis con ruedas omnidireccionales.',
    image: publicAsset('/assets/robot-gallery/larry-chassis.png'),
    modelId: 'larry-chassis',
  },
  {
    id: 'chassis-detail',
    title: 'Chasis · detalle CAD',
    description: 'Captura adicional del diseño mecánico del chasis.',
    image: publicAsset('/assets/robot-gallery/chassis-detail.png'),
    modelId: 'larry-chassis',
  },
  {
    id: 'mecanum-robot',
    title: 'Plataforma Mecanum',
    description: 'Ensamble móvil con ruedas mecanum.',
    image: publicAsset('/assets/robot-gallery/mecanum-robot.png'),
    modelId: 'mecanum-robot',
  },
  {
    id: 'omnidirectional',
    title: 'Robot omnidireccional',
    description: 'Vista CAD de la plataforma con ruedas omni.',
    image: publicAsset('/assets/robot-gallery/omnidirectional-v1.png'),
    modelId: 'omni-v1',
  },
  {
    id: 'robot-assembly-shell',
    title: 'Robot Ensamble · con carcasa',
    description: 'Configuración exterior del ensamble móvil.',
    image: publicAsset('/assets/robot-gallery/robot-assembly-shell.png'),
    modelId: 'robot-assembly-shell',
  },
  {
    id: 'robot-assembly-internals',
    title: 'Robot Ensamble · vista interna',
    description: 'La misma plataforma exportada sin la carcasa.',
    image: publicAsset('/assets/robot-gallery/robot-assembly-internals.png'),
    modelId: 'robot-assembly-internals',
  },
  {
    id: 'robot2',
    title: 'Robot2 · ensamble CAD',
    description: 'Modelo del ensamble con chasis, accionamiento y electrónica.',
    image: publicAsset('/assets/robot-gallery/robot2.png'),
    modelId: 'robot2',
  },
];

/* ------------------------------------------------------------------ *
 * EDUCATION
 * ------------------------------------------------------------------ */
export const education: EducationEntry[] = [
  {
    degree: 'Magíster en Ingeniería — Automatización Industrial',
    institution: 'Universidad Nacional de Colombia',
    location: 'Bogotá, Colombia',
    date: 'Dic 2022',
    icon: 'lucide:graduation-cap',
  },
  {
    degree: 'Ingeniero Eléctrico',
    institution: 'Universidad Nacional de Colombia',
    location: 'Bogotá, Colombia',
    date: 'Jun 2018',
    icon: 'lucide:graduation-cap',
  },
];

/* ------------------------------------------------------------------ *
 * NAV
 * ------------------------------------------------------------------ */
export const nav = [
  { id: 'hero', label: 'Inicio', index: '00' },
  { id: 'stack', label: 'Stack', index: '01' },
  { id: 'experience', label: 'Experiencia', index: '02' },
  { id: 'projects', label: 'Proyectos', index: '03' },
  { id: 'viewer', label: 'CAD 3D', index: '04' },
  { id: 'about', label: 'Perfil', index: '05' },
  { id: 'contact', label: 'Contacto', index: '06' },
] as const;

/* ------------------------------------------------------------------ *
 * THEME ACCENT LOOKUP (Tailwind can't see dynamic class names, so every
 * variant that can be produced by data must be written out literally.)
 * ------------------------------------------------------------------ */
export const accentClasses: Record<
  Accent,
  { text: string; bg: string; border: string; dot: string; shadow: string; grad: string }
> = {
  neon: {
    text: 'text-neon',
    bg: 'bg-neon/10',
    border: 'border-neon/40',
    dot: 'bg-neon',
    shadow: 'shadow-[0_0_28px_-6px_rgba(61,255,158,0.55)]',
    grad: 'from-neon/25 via-neon/5',
  },
  cyan: {
    text: 'text-cyan',
    bg: 'bg-cyan/10',
    border: 'border-cyan/40',
    dot: 'bg-cyan',
    shadow: 'shadow-[0_0_28px_-6px_rgba(41,224,255,0.5)]',
    grad: 'from-cyan/25 via-cyan/5',
  },
  amber: {
    text: 'text-amber',
    bg: 'bg-amber/10',
    border: 'border-amber/40',
    dot: 'bg-amber',
    shadow: 'shadow-[0_0_28px_-6px_rgba(255,181,69,0.45)]',
    grad: 'from-amber/25 via-amber/5',
  },
  magenta: {
    text: 'text-magenta',
    bg: 'bg-magenta/10',
    border: 'border-magenta/40',
    dot: 'bg-magenta',
    shadow: 'shadow-[0_0_28px_-6px_rgba(255,93,162,0.45)]',
    grad: 'from-magenta/25 via-magenta/5',
  },
};
