import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, Monitor, Mail, Github, Linkedin, Phone } from "lucide-react";
import AnimatedLogo from "./Animations/AnimatedLogo";
import Typewriter from "typewriter-effect";
import ParticlesBackground from "./particles/ParticlesBackground";
import DevImage3D from "./devImage/DevImage3D";
import DevIntroHover from "./DevIntro/DevIntroHover";
import {
  SiReact,
  SiRedux,
  SiTypescript,
  SiNextdotjs,
  SiHtml5,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiGraphql,
  SiChakraui,
  SiJest,
  SiCypress,
  SiBootstrap,
  SiJavascript,
  SiCss3,
  SiNodedotjs,
  SiRedis,
  // SiMocha
  // SiChai
} from "react-icons/si";
import "./App.css"
import lint from "./assets/projects/lint.png"
import rps from "./assets/projects/rps.png"
// import SuspenseFallback from "./SuspenseFallback";
// import ParticlesBackground from "./ParticlesBackground";

/**
 * Three.js MERN Portfolio – Single-File React App
 * -------------------------------------------------
 * - Animated navbar with section scroll & mobile drawer
 * - Profile section: description (left), animated 3D avatar (right)
 * - Tech stack split: Frontend / Backend / Testing
 * - Contact section (client-side validation)
 * - Multi-theme system (Light / Dark / Purple / Emerald / Ocean / AMOLED)
 * - TailwindCSS utility classes + CSS variables theme engine
 * - Framer Motion micro-interactions
 * - React Three Fiber scene with animated blob avatar
 *
 * NOTE: This single file assumes Tailwind is available. If not, you can inline CSS.
 * NPM deps: @react-three/fiber, @react-three/drei, framer-motion, lucide-react
 */

// ---------- Theme Engine ----------
const THEMES = [
  { id: "light", label: "Light", vars: { "--bg": "#f8fafc", "--card": "#ffffff", "--fg": "#0f172a", "--muted": "#475569", "--primary": "#2563eb", "--ring": "#93c5fd" } },
  { id: "dark", label: "Dark", vars: { "--bg": "#0b1220", "--card": "#0f172a", "--fg": "#e2e8f0", "--muted": "#94a3b8", "--primary": "#38bdf8", "--ring": "#38bdf8" } },
  { id: "purple", label: "Purple", vars: { "--bg": "#0f0a19", "--card": "#1a102b", "--fg": "#f3e8ff", "--muted": "#c4b5fd", "--primary": "#a78bfa", "--ring": "#a78bfa" } },
  { id: "emerald", label: "Emerald", vars: { "--bg": "#071712", "--card": "#0b2420", "--fg": "#d1fae5", "--muted": "#a7f3d0", "--primary": "#34d399", "--ring": "#34d399" } },
  { id: "ocean", label: "Ocean", vars: { "--bg": "#06141f", "--card": "#0b2535", "--fg": "#e0f2fe", "--muted": "#bae6fd", "--primary": "#22d3ee", "--ring": "#22d3ee" } },
  { id: "amoled", label: "AMOLED", vars: { "--bg": "#000000", "--card": "#0a0a0a", "--fg": "#e5e7eb", "--muted": "#9ca3af", "--primary": "#10b981", "--ring": "#10b981" } },
];

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio_theme") || "dark");
  useEffect(() => {
    const def = THEMES.find(t => t.id === theme) || THEMES[1];
    const root = document.documentElement;
    Object.entries(def.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    localStorage.setItem("portfolio_theme", def.id);
  }, [theme]);
  return { theme, setTheme };
}

// ---------- Shared UI ----------
function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
      style={{ borderColor: "var(--muted)", color: "var(--fg)", background: "color-mix(in oklab, var(--card) 80%, var(--primary))" }}>
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>{eyebrow}</div>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold" style={{ color: "var(--fg)" }}>{title}</h2>
      {subtitle && <p className="mt-2 text-sm md:text-base" style={{ color: "var(--muted)" }}>{subtitle}</p>}
    </div>
  );
}

// ---------- Three.js Avatar ----------
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="rounded-xl px-4 py-2 text-sm" style={{ background: "var(--card)", color: "var(--fg)", border: "1px solid var(--ring)" }}>
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function AnimatedBlob({ speed = 1, wireframe = false }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t / 2) * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <icosahedronGeometry args={[1.2, 6]} />
      {/* Custom shader-ish wobble via normal scale + emissive */}
      <meshStandardMaterial
        metalness={0.2}
        roughness={0.3}
        wireframe={wireframe}
        color="#7c3aed"
        emissive="#06b6d4"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

function AvatarScene() {
  const lightRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t) * 3;
      lightRef.current.position.z = Math.cos(t) * 3;
    }
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} intensity={18} distance={18} color={"#22d3ee"} position={[3, 2, 3]} />
      <spotLight intensity={8} angle={0.35} penumbra={0.3} position={[-6, 6, 4]} color={"#a78bfa"} castShadow />
      <AnimatedBlob />
      <OrbitControls enablePan={false} enableZoom={false} />
    </>
  );
}

// ---------- Navbar ----------
const NAV = [
  { id: "about", label: "Profile" },
  { id: "home", label: "Home" },
  { id: "stack", label: "Tech" },
  { id: "contact", label: "Contact" },
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: [0, 0.5, 1] }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV.map((n) => n.id));

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[70%] rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 bg-white/10 dark:bg-black/30 transition-all">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        {/* <a
          href="#home"
          className="text-2xl font-extrabold tracking-tight relative"
          style={{ color: "var(--fg)" }}
        >
          dev<span className="text-[var(--primary)]">/portfolio</span>
        </a> */}
        <AnimatedLogo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${active === item.id ? "text-[var(--primary)]" : "text-[var(--fg)]"
                }`}
            >
              {item.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[var(--primary)] shadow-[0_0_10px_var(--primary)] transition-transform duration-300 ${active === item.id ? "scale-x-100" : "hover:scale-x-100"
                  }`}
              />
            </a>
          ))}
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </nav>

        {/* Mobile Menu */}
        <button
          className="md:hidden p-3 rounded-xl border border-white/30 text-[var(--fg)] hover:shadow-[0_0_10px_var(--primary)] transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col gap-4 px-8 py-6 border-t border-white/20 bg-white/20 dark:bg-black/40 backdrop-blur-xl rounded-b-3xl">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg text-[var(--fg)] hover:bg-[var(--primary)] hover:text-[var(--bg)] transition"
            >
              {item.label}
            </a>
          ))}
          <ThemeSwitcher theme={theme} setTheme={setTheme} fullWidth />
        </div>
      </div>
    </header>
  );
}





function ThemeSwitcher({ theme, setTheme, fullWidth }) {
  const [open, setOpen] = useState(false);
  const current = THEMES.find(t => t.id === theme) || THEMES[0];
  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button onClick={() => setOpen(v => !v)} className={`flex items-center ${fullWidth ? "w-full justify-between" : ""} gap-2 rounded-xl border px-3 py-2 text-sm`}
        style={{ color: "var(--fg)", borderColor: "var(--ring)", background: "var(--card)" }}>
        {themeIcon(theme)}
        <span>{current.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border p-1" style={{ borderColor: "var(--ring)", background: "var(--card)" }}>
          {THEMES.map(t => (
            <button key={t.id} onClick={() => { setTheme(t.id); setOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:opacity-90" style={{ color: "var(--fg)" }}>
              {themeIcon(t.id)}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function themeIcon(id) {
  switch (id) {
    case "light": return <Sun size={16} />;
    case "dark": return <Moon size={16} />;
    default: return <Monitor size={16} />;
  }
}

// ---------- Sections ----------


function Home() {
  const socialLinks = [
    { Icon: Mail, href: "mailto:chinthasiva872@gmail.com", label: "Email" },
    { Icon: Github, href: "https://github.com/chintasiva", label: "GitHub", newTab: true },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/chinta-sivanarayana-b73806231/", label: "LinkedIn", newTab: true },
    { Icon: Phone, href: "tel:+916302661377", label: "Phone" },
  ];
  return (
    <section id="home" className="relative min-h-[90svh]">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2">
        {/* LEFT SIDE - Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              background: "var(--primary)",
              color: "var(--bg)",
            }}
          >
            Hi, I'm a MERN Developer
          </p>

          <h1
            className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "var(--fg)" }}
          >
            <span className="block">I build</span>
            <span className="text-[var(--primary)]">
              <Typewriter
                options={{
                  strings: [
                    "Scalable Web Apps",
                    "Clean Architectures",
                    "Delightful UX",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </span>
          </h1>

          <p
            className="mt-4 max-w-prose text-sm md:text-base"
            style={{ color: "var(--muted)" }}
          >
            Full-stack JavaScript engineer specializing in Node.js backends and
            React frontends. Focused on performance, accessibility, and testing
            with a passion for delivering professional-grade software.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-xl px-4 py-2 text-sm font-medium"
              style={{
                background: "var(--primary)",
                color: "var(--bg)",
              }}
            >
              Contact Me
            </a>
            <a
              href="#stack"
              className="rounded-xl px-4 py-2 text-sm font-medium border"
              style={{
                borderColor: "var(--ring)",
                color: "var(--fg)",
              }}
            >
              Tech Stack
            </a>
          </div>

          <div className="flex justify-center md:justify-start mt-6 gap-6">
            {socialLinks.map(({ Icon, href, label, newTab }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noreferrer" : undefined}
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 rounded-full"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: idx * 0.15,
                }}
                whileHover={{
                  scale: 1.4,
                  rotate: 15,
                  color: "var(--primary)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2), 0 0 10px var(--primary)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
                style={{ color: "var(--muted)", background: "var(--card)" }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE - 3D Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-[380px] md:h-[520px] rounded-2xl overflow-hidden relative"
          style={{
            background:
              "radial-gradient(circle at center, var(--primary)20, transparent 70%)",
          }}
        >
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              background: "transparent",
            }}
          >
            {/* Particle System */}
            <ParticlesBackground />

            {/* Lights */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* 3D Objects */}
            <AvatarScene />
            <DevImage3D />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}



function SuspenseFallback() {
  return <Loader />;
}


const techStacks = {
  Frontend: [
    { name: "React", icon: SiReact },
    { name: "Redux", icon: SiRedux },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "HTML5", icon: SiHtml5 },
    { name: "CSS3", icon: SiCss3 },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Bootstrap", icon: SiBootstrap },
    { name: "ChakraUI", icon: SiChakraui },
  ],
  Backend: [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Mongoose", icon: SiMongoose },
    { name: "GraphQL", icon: SiGraphql },
    { name: "Redis", icon: SiRedis },
  ],
  Testing: [
    { name: "Jest", icon: SiJest },
    { name: "Cypress", icon: SiCypress },
    // { name: "Mocha", icon: SiMocha },
    // { name: "Chai", icon: SiChai },
  ],
};

// Individual 3D Tech Logo
function TechLogo({ icon: Icon, name, position }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        {/* HTML overlay for the icon */}
        <Html center>
          <div className="p-4 rounded-xl border" style={{ borderColor: "var(--ring)", background: "var(--card)" }}>
            <Icon size={48} color="var(--primary)" />
            <div style={{ color: "var(--fg)", marginTop: 4, fontSize: 14 }}>{name}</div>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

function TechStack3DSection() {
  // Layout positions for each logo (spread them out in 3D space)
  const positions = [
    [0, 3, 0],
    [2.1, 2.2, 1.5],
    [-2, 2.5, -1],
    [1.5, -2.3, 2],
    [-1.8, -2, -2.2],
    [0, -3, 0],
    [2.2, -1.5, -2.1],
    [-2.3, 1.7, 2.2],
    [1, 2.8, -2.5],
    [-1.2, -2.5, 2.3],
    [2.5, 0, 1.5],
    [-2.5, 0, -1.5],
    [1.8, 1.5, 2.3],
    [-1.5, -1.8, -2.2],
    [0, 0, 3],
    [0, 0, -3],
    [2, -2, 0],
    [-2, 2, 0],
    [1.2, -2.5, -1.8],
    [-1.8, 2.5, 1.2],
    [2.3, 1, -1.5],
    [-2.1, -1, 1.8]
  ];


  const allTechs = [...techStacks.Frontend, ...techStacks.Backend, ...techStacks.Testing];

  return (
    <section id="stack" className="h-screen py-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold" style={{ color: "var(--fg)" }}>Technologies I Use</h2>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          {allTechs.map((tech, idx) => (
            <TechLogo key={tech.name} icon={tech.icon} name={tech.name} position={positions[idx % positions.length]} />
          ))}
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </section>
  );
}

function LogoBadge({ abbr, label }) {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-full border text-sm font-bold"
      style={{ borderColor: "var(--ring)", color: "var(--bg)", background: "var(--primary)" }}
      title={label} aria-label={label}>
      {abbr}
    </div>
  );
}

function ProjectsSection() {

  const projects = [
    {
      title: "LINT E-Commerce",
      description: "LINT is online e-commerce website which will provide the clothes, jewelry, handbags etc.",
      tech: [SiReact, SiRedux, SiChakraui, SiCss3, SiNodedotjs, SiExpress, SiMongoose, SiMongodb],
      github: "https://github.com/chintasiva/LINT",
      live: "https://lint-ecommerce.netlify.app/",
      image: lint
    },
    {
      title: "GAME-RPS",
      description: "Rock Paper Scissors is a gamimg application. It works like the actual rules of the Rock Paper Sicssors game.",
      tech: [SiReact, SiCss3],
      github: "https://github.com/chintasiva/Rock-Paper-Scissors",
      live: "https://rps-chintasiva.vercel.app/",
      image: rps
    },
    // Add more projects
  ];

  return (
    <section className="bg-[var(--bg)] min-h-screen flex flex-col justify-center items-center py-40">
      {projects.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-4xl my-12 px-6"
        >
          <div className="relative group">
            {/* Project Card */}
            <div className="relative bg-[var(--card)] rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 overflow-hidden">

              {/* Project Image */}
              {project.image && (
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-2xl object-cover w-full h-48 md:h-full shadow-lg"
                  />
                </div>
              )}

              {/* Animated Border */}
              <span className="absolute inset-0 pointer-events-none z-10 rounded-3xl border-[3px] border-transparent">
                <span className="absolute inset-0 border-[3px] border-t-[var(--ring)] border-r-[var(--ring)] rounded-3xl animate-borderLoop"></span>
              </span>

              {/* Top and Bottom Glow on Hover */}
              <span className="absolute left-0 right-0 top-0 h-1 rounded-t-3xl bg-[var(--ring)] opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300"></span>
              <span className="absolute left-0 right-0 bottom-0 h-1 rounded-b-3xl bg-[var(--ring)] opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300"></span>

              {/* Card Content */}
              <div className="flex flex-col gap-6 md:gap-4 items-center md:items-start z-20 w-full md:w-2/3">
                <h3 className="text-3xl font-bold mb-4" style={{ color: "var(--fg)" }}>
                  {project.title}
                </h3>
                <p className="text-[var(--muted)] max-w-md">{project.description}</p>

                <div className="flex gap-4 mt-4 flex-wrap">
                  {project.tech.map((Icon, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.5, rotateY: 360 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="text-4xl text-[var(--ring)]"
                    >
                      <Icon />
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6 flex-wrap">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-[var(--ring)] text-[var(--bg)] font-semibold hover:opacity-80 transition"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg border border-[var(--ring)] text-[var(--ring)] font-semibold hover:bg-[var(--ring)] hover:text-[var(--bg)] transition"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );


}

function Contact() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    // naive client-side validation
    if (!state.name || !state.email || !state.message) {
      setError("Please fill all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      setError("Please enter a valid email.");
      return;
    }
    // Replace with your API call or EmailJS
    console.log("Contact form submitted:", state);
    setSent(true);
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader eyebrow="Contact" title="Let’s build something" subtitle="Reach out for freelance, full-time roles, or collaborations." />
        <form onSubmit={onSubmit} className="rounded-2xl border p-6" style={{ borderColor: "var(--ring)", background: "var(--card)" }}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>Name</label>
              <input value={state.name} onChange={e => setState({ ...state, name: e.target.value })}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                style={{ borderColor: "var(--ring)", background: "transparent", color: "var(--fg)", boxShadow: "0 0 0 1px transparent" }}
                onFocus={e => (e.target.style.boxShadow = `0 0 0 2px var(--ring) inset`)}
                onBlur={e => (e.target.style.boxShadow = `0 0 0 1px transparent`)}
                placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>Email</label>
              <input value={state.email} onChange={e => setState({ ...state, email: e.target.value })}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                style={{ borderColor: "var(--ring)", background: "transparent", color: "var(--fg)" }}
                placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>Message</label>
            <textarea value={state.message} onChange={e => setState({ ...state, message: e.target.value })}
              className="min-h-[140px] w-full rounded-xl border px-3 py-2 outline-none focus:ring"
              style={{ borderColor: "var(--ring)", background: "transparent", color: "var(--fg)" }}
              placeholder="Tell me about your project..." />
          </div>
          {error && <p className="mt-3 text-sm" style={{ color: "salmon" }}>{error}</p>}
          {sent ? (
            <div className="mt-4 rounded-xl border p-3 text-sm" style={{ borderColor: "var(--ring)", color: "var(--fg)" }}>
              Thanks! I’ll get back to you shortly.
            </div>
          ) : (
            <div className="mt-6 flex items-center gap-3">
              <button type="submit" className="rounded-xl px-4 py-2 text-sm font-medium" style={{ background: "var(--primary)", color: "var(--bg)" }}>Send Message</button>
              <a href="mailto:chinthasiva872@gmail.com" className="text-sm underline" style={{ color: "var(--muted)" }}>or email directly</a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="py-10 border-t" style={{ borderColor: "var(--ring)", background: "var(--card)" }}>
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <div className="flex items-center gap-3" style={{ color: "var(--muted)" }}>
          <a href="#home" className="hover:opacity-80">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

// ---------- App ----------
export default function App() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    // Smooth scroll
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Global style variables for focus ring, selection */}
      <style>{`
        :root { --bg:#0b1220; --card:#0f172a; --fg:#e2e8f0; --muted:#94a3b8; --primary:#38bdf8; --ring:#38bdf8 }
        ::selection { background: var(--primary); color: var(--bg) }
        .glow { box-shadow: 0 10px 40px -6px color-mix(in oklab, var(--primary) 60%, transparent) }
      `}</style>

      <Navbar theme={theme} setTheme={setTheme} />
      <main className="space-y-8">
        <DevIntroHover />
        <Home />
        <TechStack3DSection />
        <ProjectsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
