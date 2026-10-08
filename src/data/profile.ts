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
  context?: string;
  description: string;
  scope: string;
  approach: string[];
  highlights: { label: string; value: string }[];
  stack: string[];
  icon: string;
  accent: Accent;
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
  name: 'Nestor I. Ospina Gaitan',
  shortName: 'Nestor Ospina',
  role: 'Robotics and AI Software Engineer',
  roleSuffix: 'Robotics, AI & Control',
  tagline:
    'M.Sc. in Industrial Automation with strong foundation in Machine Learning, ROS2, and data engineering. Proven ability to design AI predictive models, orchestrate large-scale data pipelines (~1 TB), and develop decentralized control systems for heterogeneous robot swarms.',
  location: 'Bogotá, Colombia',
  timezone: 'GMT-5',
  email: 'nestorivan.o@hotmail.com',
  phone: '+57 3002924631',
  phoneHref: '+573002924631',
  links: {
    github: 'https://github.com/niospinag',
    linkedin: 'https://www.linkedin.com/in/nestor-ospina',
  },
  cv: publicAsset('/cv/nestor-ospina-cv.pdf'),
  status: 'Active Technical Portfolio',
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Professional Working Proficiency' },
  ],
  certifications: [
    {
      name: 'PMP® — Project Management Professional',
      icon: 'lucide:badge-check',
    },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * HERO METRICS
 * ------------------------------------------------------------------ */
export const metrics: Metric[] = [
  {
    value: '+35%',
    target: 35,
    prefix: '+',
    suffix: '%',
    label: 'Commission Success Rate',
    detail: 'Branch commission success increased from 50% to 85%.',
    accent: 'neon',
    icon: 'lucide:gauge',
  },
  {
    value: '~1TB',
    target: 1,
    suffix: 'TB',
    label: 'Data Pipeline Scale',
    detail: 'Large-scale historical datasets processed via GCP.',
    accent: 'cyan',
    icon: 'lucide:database',
  },
  {
    value: '23',
    target: 23,
    suffix: '',
    label: 'Heterogeneous Robots',
    detail: 'Multi-agent testbed with rovers and drones.',
    accent: 'amber',
    icon: 'lucide:bot',
  },
  {
    value: '99%',
    target: 99,
    suffix: '%',
    label: 'Collision Avoidance',
    detail: 'Precision in multi-agent collision avoidance.',
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
    title: 'Robotics & Vision',
    code: 'RTC-01',
    icon: 'lucide:bot',
    accent: 'neon',
    items: [
      'ROS/ROS2 (Nav2)',
      'Gazebo / CoppeliaSim',
      'Swarm Robotics',
      'OpenCV & ArUco Markers',
      'Autonomous Navigation',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data Engineering',
    code: 'AI-02',
    icon: 'lucide:brain',
    accent: 'cyan',
    items: ['Machine Learning (Random Forest)', 'GCP BigQuery', 'SQL Server', 'Looker Studio', 'Data Pipelines (~1 TB)'],
  },
  {
    id: 'software',
    title: 'Programming Languages',
    code: 'SFT-03',
    icon: 'lucide:code-xml',
    accent: 'amber',
    items: ['Python (Advanced)', 'C++ (Familiar)', 'SQL (Advanced)', 'Bash/Shell'],
  },
  {
    id: 'hardware',
    title: 'Hardware & Prototyping',
    code: 'EMB-04',
    icon: 'lucide:cpu',
    accent: 'magenta',
    items: ['NVIDIA Jetson', 'Raspberry Pi', 'PCB Troubleshooting', '3D Printing (SolidWorks, Cura)'],
  },
];

/* ------------------------------------------------------------------ *
 * EXPERIENCE
 * ------------------------------------------------------------------ */
export const experience: ExperienceEntry[] = [
  {
    company: 'Banco Falabella',
    role: 'Data Analyst / Machine Learning',
    location: 'Bogotá, Colombia',
    start: 'May 2026',
    end: 'Present',
    current: true,
    summary:
      'ML models for business optimization and scalable data pipelines.',
    achievements: [
      {
        text: 'Engineered and deployed Random Forest ML models in Python to optimize business goal distribution, increasing branch commission success rates from 50% to 85%.',
      },
      {
        text: 'Architected scalable data pipelines using GCP (BigQuery) and SQL Server to process large-scale historical datasets (~1 TB).',
      },
      {
        text: 'Designed automated real-time dashboards in Looker Studio and advanced Excel (ODBC) for C-level executives.',
      },
    ],
    stack: ['Python', 'Random Forest', 'GCP BigQuery', 'SQL Server', 'Looker Studio'],
    accent: 'neon',
  },
  {
    company: 'Unlimited Robotics',
    role: 'Robotics Software Engineer',
    location: 'Bogotá, Colombia',
    start: 'May 2024',
    end: 'Aug 2025',
    current: false,
    summary:
      'ROS2 Nav2 stack maintenance and autonomous navigation development.',
    achievements: [
      {
        text: 'Supported maintenance and integration of the ROS2 Nav2 stack for differential-drive robots, ensuring platform stability.',
      },
      {
        text: 'Developed and tested ROS2 nodes in Python and C++ to process sensor data and orchestrate robot behaviors.',
      },
      {
        text: 'Managed Linux-based environments (Ubuntu), utilizing Bash scripting to automate deployment pipelines.',
      },
    ],
    stack: ['ROS2', 'Python', 'C++', 'Gazebo', 'Jetson', 'Ubuntu'],
    accent: 'cyan',
  },
  {
    company: 'Kiwicampus S.A.S. (Kiwibot)',
    role: 'Reliability Engineer (Field Operations)',
    location: 'Orono, Maine, USA',
    start: 'Dec 2023',
    end: 'Apr 2024',
    current: false,
    summary:
      'Rapid prototyping and field maintenance of autonomous delivery robots.',
    achievements: [
      {
        text: 'Established 24-hour rapid prototyping pipeline (SolidWorks, Cura, 3D printing) to design, print, and deploy custom modifications onto the fleet.',
        metric: '24-hour pipeline',
      },
      {
        text: 'Diagnosed and resolved critical hardware/software failures in harsh weather conditions.',
        metric: 'Max fleet uptime',
      },
    ],
    stack: ['SolidWorks', '3D Printing (Cura)', 'PCB Troubleshooting', 'Raspberry Pi'],
    accent: 'amber',
  },
  {
    company: 'Bethune-Cookman University & UNAL',
    role: 'Graduate Research Engineer',
    location: 'Daytona Beach, FL, USA',
    start: 'Jan 2020',
    end: 'Jun 2021',
    current: false,
    summary:
      'Multi-agent swarm robotics research and vision-based localization.',
    achievements: [
      {
        text: 'Architected a decentralized multi-agent testbed with 23 heterogeneous robots (15 small, 4 medium, 2 large rovers, 2 drones).',
        metric: '23 robots',
      },
      {
        text: 'Developed vision/localization pipeline using Python, OpenCV, and ArUco markers, integrating with Raspberry Pi hardware.',
      },
      {
        text: 'Co-authored peer-reviewed paper on multi-agent control strategies (Google Scholar).',
      },
    ],
    stack: ['Python', 'OpenCV', 'ArUco Markers', 'Raspberry Pi', 'Swarm Robotics'],
    accent: 'magenta',
  },
];

/* ------------------------------------------------------------------ *
 * PROJECTS
 * ------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    id: 'multi-agent-swarm',
    title: 'Multi-Agent Swarm System',
    subtitle: 'Decentralized Heterogeneous Robot Swarm',
    category: 'Swarm Robotics',
    description:
      'Decentralized multi-agent testbed with 23 heterogeneous robots (15 small, 4 medium, 2 large rovers, and 2 drones) for evaluating swarm behavior and Game Theory algorithms.',
    scope:
      'Research platform for multi-agent control strategies and real-world validation of swarm robotics algorithms.',
    approach: [
      'Designed decentralized architecture for heterogeneous robot coordination.',
      'Developed vision-based localization pipeline using Python, OpenCV, and ArUco markers.',
      'Integrated software with Raspberry Pi hardware for real-world validation.',
    ],
    highlights: [
      { label: 'Robots', value: '23 heterogeneous' },
      { label: 'Control', value: 'Decentralized' },
      { label: 'Validation', value: 'Real-world' },
    ],
    stack: ['Python', 'OpenCV', 'ArUco Markers', 'Raspberry Pi', 'Swarm Robotics'],
    icon: 'lucide:bot',
    accent: 'neon',
  },
  {
    id: 'fleet-analytics',
    title: 'Fleet Analytics Dashboard',
    subtitle: 'Data-Driven Robot Fleet Management',
    category: 'Data Engineering',
    context: 'Kiwibot · Reliability Engineer · Orono, Maine · Dec 2023 - Apr 2024',
    description:
      'Analytics and telemetry for autonomous delivery robot fleet optimization with predictive maintenance strategies.',
    scope:
      'Data analytics and real-time telemetry applied to autonomous delivery fleet logistics management.',
    approach: [
      'Fleet tracking and operational data analysis.',
      'Real-time telemetry for logistics optimization.',
      'Predictive models and maintenance for autonomous delivery robots.',
    ],
    highlights: [
      { label: 'Fleet managed', value: '95%+ uptime' },
      { label: 'Rapid prototyping', value: '24-hour pipeline' },
      { label: 'Field operations', value: 'All-weather' },
    ],
    stack: ['Python', 'Data Analytics', 'Fleet Management', '3D Printing'],
    icon: 'lucide:activity',
    accent: 'cyan',
  },
  {
    id: 'ros2-nav2',
    title: 'ROS2 Nav2 Integration',
    subtitle: 'Autonomous Navigation Stack',
    category: 'Autonomous Navigation',
    description:
      'ROS2 Nav2 stack maintenance and integration for differential-drive robots, ensuring platform stability for autonomous navigation tasks.',
    scope:
      'Support and development of ROS2 navigation stack for autonomous mobile platforms.',
    approach: [
      'ROS2 Nav2 stack maintenance and integration for differential-drive robots.',
      'Developed and tested ROS2 nodes in Python and C++ for sensor data processing.',
      'Validated control logic through high-fidelity Gazebo simulations.',
    ],
    highlights: [
      { label: 'Platform', value: 'ROS2 Nav2' },
      { label: 'Simulation', value: 'Gazebo' },
      { label: 'Languages', value: 'Python, C++' },
    ],
    stack: ['ROS2', 'Python', 'C++', 'Gazebo', 'Jetson', 'Ubuntu'],
    icon: 'lucide:navigation',
    accent: 'amber',
  },
  {
    id: 'ml-business-optimization',
    title: 'ML Business Optimization',
    subtitle: 'Random Forest for Commission Success',
    category: 'Machine Learning',
    context: 'Banco Falabella · Data Analyst / ML · Bogotá, Colombia · May 2026 - Present',
    description:
      'Machine learning models deployed to optimize business goal distribution, significantly increasing branch commission success rates from 50% to 85%.',
    scope:
      'End-to-end ML pipeline from model design to deployment for business optimization.',
    approach: [
      'Engineered and deployed Random Forest models in Python.',
      'Architected scalable data pipelines using GCP (BigQuery) and SQL Server (~1 TB).',
      'Designed real-time dashboards in Looker Studio for C-level executives.',
    ],
    highlights: [
      { label: 'Success rate', value: '50% → 85%' },
      { label: 'Data scale', value: '~1 TB' },
      { label: 'Dashboards', value: 'Looker Studio' },
    ],
    stack: ['Python', 'Random Forest', 'GCP BigQuery', 'SQL Server', 'Looker Studio'],
    icon: 'lucide:brain',
    accent: 'magenta',
  },
  {
    id: 'rapid-prototyping',
    title: 'Rapid Prototyping Pipeline',
    subtitle: '24-Hour Design-to-Deploy System',
    category: 'Hardware & Manufacturing',
    description:
      'Established 24-hour rapid prototyping pipeline for designing, printing, and deploying custom modifications directly onto autonomous delivery robots.',
    scope:
      'Complete rapid prototyping workflow from CAD design to physical deployment on fleet robots.',
    approach: [
      'Designed custom parts using SolidWorks.',
      '3D printing pipeline with Cura for rapid manufacturing.',
      'Direct deployment onto autonomous delivery robot fleet.',
    ],
    highlights: [
      { label: 'Cycle time', value: '24 hours' },
      { label: 'Design', value: 'SolidWorks' },
      { label: 'Manufacturing', value: '3D Printing' },
    ],
    stack: ['SolidWorks', 'Cura', '3D Printing', 'PCB Troubleshooting'],
    icon: 'lucide:factory',
    accent: 'neon',
  },
];

/* ------------------------------------------------------------------ *
 * 3D MODEL LIBRARY (Digital Twin Viewer)
 * ------------------------------------------------------------------ */
export const models: ModelAsset[] = [
  {
    id: 'larry-chassis',
    label: 'Larry · DuraOmni Chassis',
    sublabel: 'Chassis with 6″ DuraOmni wheels',
    src: publicAsset('/models/cad/larry-chassis.glb'),
    poster: publicAsset('/assets/robot-gallery/larry-chassis.png'),
    cameraOrbit: '35deg 68deg auto',
    fieldOfView: '36deg',
    exposure: '1',
    specs: [
      { k: 'Type', v: 'Robotic chassis' },
      { k: 'Traction', v: 'DuraOmni · 6″' },
      { k: 'Origin', v: 'SolidWorks · glTF Draco' },
      { k: 'File', v: '1.0 MB' },
    ],
  },
  {
    id: 'mecanum-robot',
    label: 'Mecanum Robot',
    sublabel: 'Platform with mecanum wheels',
    src: publicAsset('/models/cad/mecanum-robot.glb'),
    poster: publicAsset('/assets/robot-gallery/mecanum-robot.png'),
    cameraOrbit: '-40deg 62deg auto',
    fieldOfView: '34deg',
    exposure: '1',
    specs: [
      { k: 'Type', v: 'Mobile platform' },
      { k: 'Traction', v: 'Mecanum wheels' },
      { k: 'Origin', v: 'SolidWorks · glTF Draco' },
      { k: 'File', v: '99 KB' },
    ],
  },
  {
    id: 'omni-v1',
    label: 'Omnidirectional · V1',
    sublabel: 'Platform with omni wheels',
    src: publicAsset('/models/cad/omnidirectional-v1.glb'),
    poster: publicAsset('/assets/robot-gallery/omnidirectional-v1.png'),
    cameraOrbit: '35deg 72deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Type', v: 'Mobile robot' },
      { k: 'Traction', v: 'Omni wheels' },
      { k: 'Origin', v: 'SolidWorks · glTF Draco' },
      { k: 'File', v: '888 KB' },
    ],
  },
  {
    id: 'omni-v2',
    label: 'Omnidirectional · V2',
    sublabel: 'Variant 2 of the omnidirectional robot',
    src: publicAsset('/models/cad/omnidirectional-v2.glb'),
    poster: publicAsset('/assets/robot-gallery/omnidirectional-v1.png'),
    cameraOrbit: '35deg 72deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Type', v: 'Mobile robot' },
      { k: 'Traction', v: 'Omni wheels' },
      { k: 'Origin', v: 'SolidWorks · glTF Draco' },
      { k: 'File', v: '860 KB' },
    ],
  },
  {
    id: 'robot-assembly-shell',
    label: 'Robot Assembly · shell',
    sublabel: 'Complete assembly with cover',
    src: publicAsset('/models/cad/robot-assembly-shell.glb'),
    poster: publicAsset('/assets/robot-gallery/robot-assembly-shell.png'),
    cameraOrbit: '30deg 68deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Type', v: 'Robot assembly' },
      { k: 'Configuration', v: 'With shell' },
      { k: 'Origin', v: 'SolidWorks · glTF Draco' },
      { k: 'File', v: '121 KB' },
    ],
  },
  {
    id: 'robot-assembly-internals',
    label: 'Robot Assembly · internals',
    sublabel: 'Without shell · internal components visible',
    src: publicAsset('/models/cad/robot-assembly-internals.glb'),
    poster: publicAsset('/assets/robot-gallery/robot-assembly-internals.png'),
    cameraOrbit: '30deg 68deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Type', v: 'Robot assembly' },
      { k: 'Configuration', v: 'Shell exported separately' },
      { k: 'View', v: 'Internal components' },
      { k: 'File', v: '92 KB' },
    ],
  },
  {
    id: 'robot2',
    label: 'Robot2 · assembly',
    sublabel: 'Robotic platform with integrated electronics',
    src: publicAsset('/models/cad/robot2.glb'),
    poster: publicAsset('/assets/robot-gallery/robot2.png'),
    cameraOrbit: '35deg 72deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Type', v: 'CAD assembly' },
      { k: 'Elements', v: 'Chassis, motors and electronics' },
      { k: 'Origin', v: 'SolidWorks · glTF Draco' },
      { k: 'File', v: '1.5 MB' },
    ],
  },
  {
    id: 'robot22',
    label: 'Robot22',
    sublabel: 'Robot22 CAD assembly',
    src: publicAsset('/models/cad/robot22-revision.glb'),
    poster: publicAsset('/assets/robot-gallery/robot2.png'),
    cameraOrbit: '35deg 72deg auto',
    fieldOfView: '32deg',
    exposure: '1',
    specs: [
      { k: 'Type', v: 'CAD assembly' },
      { k: 'Elements', v: 'Chassis, motors and electronics' },
      { k: 'Origin', v: 'SolidWorks · glTF Draco' },
      { k: 'File', v: '1.5 MB' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * DESIGN SCREENSHOTS — linked to the matching 3D model in the viewer.
 * ------------------------------------------------------------------ */
export const robotGallery: RobotGalleryItem[] = [
  {
    id: 'larry-chassis',
    title: 'Larry · DuraOmni Chassis',
    description: 'Design view of the chassis with omnidirectional wheels.',
    image: publicAsset('/assets/robot-gallery/larry-chassis.png'),
    modelId: 'larry-chassis',
  },
  {
    id: 'chassis-detail',
    title: 'Chassis · CAD detail',
    description: 'Additional capture of the chassis mechanical design.',
    image: publicAsset('/assets/robot-gallery/chassis-detail.png'),
    modelId: 'larry-chassis',
  },
  {
    id: 'mecanum-robot',
    title: 'Mecanum Platform',
    description: 'Mobile assembly with mecanum wheels.',
    image: publicAsset('/assets/robot-gallery/mecanum-robot.png'),
    modelId: 'mecanum-robot',
  },
  {
    id: 'omnidirectional',
    title: 'Omnidirectional Robot',
    description: 'CAD view of the platform with omni wheels.',
    image: publicAsset('/assets/robot-gallery/omnidirectional-v1.png'),
    modelId: 'omni-v1',
  },
  {
    id: 'robot-assembly-shell',
    title: 'Robot Assembly · with shell',
    description: 'Exterior configuration of the mobile assembly.',
    image: publicAsset('/assets/robot-gallery/robot-assembly-shell.png'),
    modelId: 'robot-assembly-shell',
  },
  {
    id: 'robot-assembly-internals',
    title: 'Robot Assembly · internal view',
    description: 'Same platform exported without the shell.',
    image: publicAsset('/assets/robot-gallery/robot-assembly-internals.png'),
    modelId: 'robot-assembly-internals',
  },
  {
    id: 'robot2',
    title: 'Robot2 · CAD assembly',
    description: 'Assembly model with chassis, actuators and electronics.',
    image: publicAsset('/assets/robot-gallery/robot2.png'),
    modelId: 'robot2',
  },
];

/* ------------------------------------------------------------------ *
 * EDUCATION
 * ------------------------------------------------------------------ */
export const education: EducationEntry[] = [
  {
    degree: "Master's Degree in Industrial Automation",
    institution: 'Universidad Nacional de Colombia',
    location: 'Bogotá, Colombia',
    date: 'Jun 2021',
    icon: 'lucide:graduation-cap',
  },
  {
    degree: 'Bachelor\'s Degree in Electrical Engineering',
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
  { id: 'hero', label: 'Home', index: '00' },
  { id: 'stack', label: 'Stack', index: '01' },
  { id: 'experience', label: 'Experience', index: '02' },
  { id: 'projects', label: 'Projects', index: '03' },
  { id: 'viewer', label: '3D CAD', index: '04' },
  { id: 'about', label: 'Profile', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
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

export const sectionHref = (id: string) => `${import.meta.env.BASE_URL}#${id}`;

export const projectsIndexHref = () => `${import.meta.env.BASE_URL}proyectos/`;

export const projectHref = (id: string) => `${import.meta.env.BASE_URL}proyectos/${id}/`;
