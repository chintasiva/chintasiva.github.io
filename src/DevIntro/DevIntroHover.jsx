// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import dev from "../assets/shiva.jpg";

// export default function DevIntroHover() {
//   const [showIntro, setShowIntro] = useState(false);

//   return (
//     <section
//       className="flex items-center justify-center min-h-screen transition-colors duration-500"
//       style={{ background: "var(--bg)" }}
//     >
//       <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
//         <AnimatePresence mode="wait">
//           {!showIntro ? (
//             // Stage 1: Center glass 3D avatar
//             <motion.div
//               key="stage1"
//               onClick={() => setShowIntro(true)}
//               className="cursor-pointer rounded-full p-[2px]"
//               style={{
//                 perspective: 1000,
//                 background:
//                   "linear-gradient(135deg, var(--ring), transparent 60%)",
//                 boxShadow:
//                   "0 12px 40px rgba(0,0,0,.25), 0 0 0 1px color-mix(in oklab, var(--ring) 35%, transparent)",
//                 borderRadius: "9999px",
//               }}
//               initial={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
//               animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
//               exit={{ opacity: 0, scale: 0.1, rotateY: 30 }}
//               transition={{ duration: 0.9, ease: "easeInOut" }}
//               whileHover={{ rotateX: -6, rotateY: 10 }}
//             >
//               <div
//                 className="rounded-full"
//                 style={{
//                   padding: 14,
//                   backdropFilter: "blur(10px)",
//                   WebkitBackdropFilter: "blur(10px)",
//                   background:
//                     "linear-gradient(135deg, color-mix(in oklab, var(--card) 35%, transparent), color-mix(in oklab, var(--primary) 12%, transparent))",
//                   border:
//                     "1px solid color-mix(in oklab, var(--ring) 35%, transparent)",
//                 }}
//               >
//                 <img
//                   src={dev}
//                   alt="Developer"
//                   className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
//                   style={{
//                     boxShadow:
//                       "inset 0 0 20px rgba(255,255,255,.25), 0 10px 30px rgba(0,0,0,.25)",
//                   }}
//                 />
//               </div>
//             </motion.div>
//           ) : (
//             // Stage 2: Text right first, then stamp avatar left
//             <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
//               {/* Right side intro */}
//               <motion.div
//                 key="intro"
//                 className="text-center md:text-left md:order-2"
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
//               >
//                 <h1
//                   className="text-3xl md:text-4xl font-extrabold leading-tight"
//                   style={{ color: "var(--fg)" }}
//                 >
//                   Hi, I’m Shiva 👋
//                 </h1>
//                 <p
//                   className="mt-4 text-base md:text-lg leading-relaxed"
//                   style={{ color: "var(--muted)" }}
//                 >
//                   I am a full-stack developer specializing in the MERN stack (MongoDB,
//                   Express.js, React, Node.js). I build scalable, high-performance web
//                   applications with a focus on clean architecture, smooth user experiences,
//                   and modern best practices in development.
//                 </p>
//               </motion.div>

//               {/* Left side avatar stamp — visible on all screens */}
//               <motion.div
//                 key="stamp"
//                 className="flex items-center justify-center md:order-1"
//                 initial={{ opacity: 0, x: -420, scale: 2.6 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 900,
//                   damping: 18,
//                   mass: 0.5,
//                   delay: 0.8,
//                 }}
//                 style={{ willChange: "transform" }}
//               >
//                 <div
//                   className="rounded-full p-[2px]"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, var(--ring), transparent 60%)",
//                     borderRadius: "9999px",
//                     boxShadow:
//                       "0 14px 40px rgba(0,0,0,.30), 0 0 0 1px color-mix(in oklab, var(--ring) 35%, transparent)",
//                   }}
//                 >
//                   <img
//                     src={dev}
//                     alt="Developer"
//                     className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
//                     style={{
//                       background:
//                         "linear-gradient(135deg, color-mix(in oklab, var(--card) 35%, transparent), color-mix(in oklab, var(--primary) 12%, transparent))",
//                       boxShadow:
//                         "inset 0 0 20px rgba(255,255,255,.2), 0 10px 30px rgba(0,0,0,.25)",
//                     }}
//                   />
//                 </div>
//               </motion.div>
//             </div>

//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import dev from "../assets/shiva.jpg";

// export default function DevIntroHover() {
//   const [showIntro, setShowIntro] = useState(false);

//   return (
//     <section
//       className="flex items-center justify-center min-h-screen px-6 md:px-60 transition-colors duration-500"
//       style={{ background: "var(--bg)" }}
//     >
//       <div className="w-full max-w-6xl mx-auto">
//         <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
//           {/* Avatar */}
//           <motion.div
//             layout
//             onClick={() => !showIntro && setShowIntro(true)}
//             className={`cursor-pointer flex items-center justify-center ${
//               showIntro
//                 ? "md:justify-self-start justify-self-center"
//                 : "md:col-span-2 justify-self-center"
//             }`}
//             initial={false}
//             transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }} // smoother cubic-bezier
//             style={{
//               perspective: 1000,
//               background: "linear-gradient(135deg, var(--ring), transparent 60%)",
//               boxShadow:
//                 "0 12px 40px rgba(0,0,0,.25), 0 0 0 1px color-mix(in oklab, var(--ring) 35%, transparent)",
//               borderRadius: "9999px",
//             }}
//             whileHover={!showIntro ? { rotateX: -6, rotateY: 10 } : {}}
//           >
//             <div
//               className="rounded-full"
//               style={{
//                 padding: 14,
//                 backdropFilter: "blur(10px)",
//                 WebkitBackdropFilter: "blur(10px)",
//                 background:
//                   "linear-gradient(135deg, color-mix(in oklab, var(--card) 35%, transparent), color-mix(in oklab, var(--primary) 12%, transparent))",
//                 border: "1px solid color-mix(in oklab, var(--ring) 35%, transparent)",
//               }}
//             >
//               <img
//                 src={dev}
//                 alt="Developer"
//                 className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
//                 style={{
//                   boxShadow:
//                     "inset 0 0 20px rgba(255,255,255,.25), 0 10px 30px rgba(0,0,0,.25)",
//                 }}
//               />
//             </div>
//           </motion.div>

//           {/* Summary */}
//           {showIntro && (
//             <motion.div
//               key="intro"
//               className="text-center md:text-left md:order-2"
//               initial={{ opacity: 0, x: 120 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
//             >
//               <h1
//                 className="text-3xl md:text-4xl font-extrabold leading-tight"
//                 style={{ color: "var(--fg)" }}
//               >
//                 Hi, I’m Shiva 👋
//               </h1>
//               <p
//                 className="mt-4 text-base md:text-lg leading-relaxed"
//                 style={{ color: "var(--muted)" }}
//               >
//                 I am a full-stack developer specializing in the MERN stack
//                 (MongoDB, Express.js, React, Node.js). I build scalable,
//                 high-performance web applications with a focus on clean
//                 architecture, smooth user experiences, and modern best practices
//                 in development.
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dev from "../assets/shiva.jpg";

export default function DevIntroHover() {
  const [showIntro, setShowIntro] = useState(false);

  // Trigger animation automatically after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(true), 300); // delay for smoothness
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      className="flex items-center justify-center min-h-screen px-6 md:px-60 transition-colors duration-500"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Avatar */}
          <motion.div
            layout
            className={`cursor-pointer flex items-center justify-center ${showIntro
                ? "md:justify-self-start justify-self-center"
                : "md:col-span-2 justify-self-center"
              }`}
            initial={false}
            animate={showIntro ? { x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
            style={{
              perspective: 1000,
              background: "linear-gradient(135deg, var(--ring), transparent 60%)",
              boxShadow:
                "0 12px 40px rgba(0,0,0,.25), 0 0 0 1px color-mix(in oklab, var(--ring) 35%, transparent)",
              borderRadius: "9999px",
            }}
          >
            <div
              className="rounded-full"
              style={{
                padding: 14,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--card) 35%, transparent), color-mix(in oklab, var(--primary) 12%, transparent))",
                border: "1px solid color-mix(in oklab, var(--ring) 35%, transparent)",
              }}
            >
              <img
                src={dev}
                alt="Developer"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
                style={{
                  boxShadow:
                    "inset 0 0 20px rgba(255,255,255,.25), 0 10px 30px rgba(0,0,0,.25)",
                }}
              />
            </div>
          </motion.div>

          {/* Summary */}
          {showIntro && (
            <motion.div
              key="intro"
              className="text-center md:text-left md:order-2"
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <h1
                className="text-3xl md:text-4xl font-extrabold leading-tight"
                style={{ color: "var(--fg)" }}
              >
                Hi, I’m Shiva Narayana👋
              </h1>
              <p
                className="mt-4 text-base md:text-lg leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                I am a full-stack developer specializing in the MERN stack
                (MongoDB, Express.js, React, Node.js). I build scalable,
                high-performance web applications with a focus on clean
                architecture, smooth user experiences, and modern best practices
                in development.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

