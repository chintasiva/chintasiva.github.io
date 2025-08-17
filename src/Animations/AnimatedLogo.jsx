import { useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedLogo({ text = "shiva/portfolio", href = "#home" }) {
  const [hovered, setHovered] = useState(-1);

  return (
    <a
      href={href}
      className="inline-flex text-2xl font-extrabold tracking-tight cursor-pointer select-none"
      style={{ color: "var(--fg)" }}
      onMouseLeave={() => setHovered(-1)}  // reset when leaving the logo
      aria-label="Home"
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className={`inline-block transform-gpu ${ch === "/" ? "text-[var(--primary)]" : ""}`}
          style={{ willChange: "transform" }}
          onMouseEnter={() => setHovered(i)} // only one active at a time
          onFocus={() => setHovered(i)}      // keyboard support
          onBlur={() => setHovered(-1)}
          animate={{ y: hovered === i ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          {ch}
        </motion.span>
      ))}
    </a>
  );
}