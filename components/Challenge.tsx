"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  loopInterval?: number | null;
}

// --- Safe Scramble Text Helper ---
function ScrambleText({ text, loopInterval = null }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!isInView) {
      setDisplayText(text); 
      return;
    }

    // Safe characters that don't trigger CSS layout thrashing/word-wrap issues
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>";
    let interval: ReturnType<typeof setInterval> | null = null;
    let loopTimeout: ReturnType<typeof setTimeout> | null = null;

    const runScramble = () => {
      let iteration = 0;
      if (interval) clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (letter === " ") return " "; 
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          if (interval !== null) {
            clearInterval(interval);
          }
          if (loopInterval) {
            loopTimeout = setTimeout(runScramble, loopInterval);
          }
        }

        iteration += 1 / 2; // Reveal speed
      }, 30); 
    };

    runScramble();

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
      if (loopTimeout !== null) {
        clearTimeout(loopTimeout);
      }
    };
  }, [text, isInView, loopInterval]);

  return <span ref={ref}>{displayText}</span>;
}

// --- Data ---
const challenges = [
  {
    id: "easy-simple",
    title: "Too complex to start",
    description: "Most tools require weeks of configuration, specialized knowledge, and endless tutorials just to get to 'hello world'.",
  },
  {
    id: "affordable",
    title: "Priced out of reach",
    description: "Enterprise software comes with enterprise price tags and hidden fees, locking growing companies out of the best tools.",
  },
  {
    id: "self-manageable",
    title: "No IT team to run it",
    description: "You need a platform that runs itself, not one that requires hiring a dedicated DevOps engineer just to keep the lights on.",
  },
  {
    id: "one-ecosystem",
    title: "Tools that don't talk",
    description: "Data gets siloed across different applications, creating a fragmented workflow and making a unified source of truth impossible.",
  },
  {
    id: "proactive",
    title: "Always reacting, never ahead",
    description: "Finding out about a problem after it impacts your customers instead of predicting and resolving it before it happens.",
  },
  {
    id: "clear-roi",
    title: "No view of the payoff",
    description: "Pouring capital into software subscriptions without a clear dashboard showing exactly what it's returning to your business.",
  },
];

export default function ChallengeSection() {
  // Container variants for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Individual card variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } 
    },
  };

  return (
    <section className="bg-[#09090b] text-white py-24 md:py-32 overflow-hidden w-full font-sans border-t border-white/5">
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-6 md:px-12 xl:px-24">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-24 max-w-7xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-tight">
            <ScrambleText text="Growing companies inherit" /> <br className="hidden md:block" />
            <ScrambleText text="complexity they never chose." />
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl">
            Most SMEs are stuck between tools too basic to matter and enterprise software too costly and complex to adopt.
          </p>
        </motion.div>

        {/* 3-Column Grid with Staggered Animations */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
        >
          {challenges.map((challenge, index) => (
            <motion.div variants={itemVariants} key={challenge.id} className="flex flex-col group">
              
              {/* Numbered Badge */}
              <div className="w-6 h-6 bg-[#7000FF] text-white text-xs font-bold flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {index + 1}
              </div>
              
              <h3 className="text-2xl font-medium mb-3 tracking-tight">
                <ScrambleText text={challenge.title} />
              </h3>
              
              <p className="text-sm md:text-base text-neutral-400 mb-8 leading-relaxed md:h-[80px]">
                {challenge.description}
              </p>

              {/* Abstract Mock UIs with Micro-Animations */}
              <div className="bg-[#121212] border border-white/5 rounded-lg p-5 flex-1 min-h-[220px] shadow-xl relative overflow-hidden flex flex-col justify-center group-hover:border-white/10 transition-colors duration-500">
                
                {index === 0 && (
                  // Mock 1: Complexity
                  <div className="w-full flex flex-col gap-3 opacity-80">
                    <div className="text-xs text-neutral-500 font-mono mb-2">AWS_CONFIG_V9_FINAL.yaml</div>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1, delay: 0.2 }} className="h-2 bg-neutral-800 rounded"></motion.div>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} transition={{ duration: 1, delay: 0.3 }} className="h-2 bg-neutral-800 rounded ml-4"></motion.div>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "50%" }} transition={{ duration: 1, delay: 0.4 }} className="h-2 bg-neutral-800 rounded ml-8"></motion.div>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "83%" }} transition={{ duration: 1, delay: 0.5 }} className="h-2 bg-neutral-800 rounded ml-4"></motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 }}
                      className="h-8 w-full bg-red-900/20 border border-red-500/30 rounded mt-2 flex items-center px-3"
                    >
                      <span className="text-[10px] text-red-400 font-mono">Error: Missing 43 dependencies</span>
                    </motion.div>
                  </div>
                )}

                {index === 1 && (
                  // Mock 2: Priced out
                  <div className="w-full flex flex-col opacity-80">
                    <div className="flex justify-between items-end border-b border-white/10 pb-3 mb-3">
                      <span className="text-sm text-neutral-400 font-medium">Enterprise Tier</span>
                      <span className="text-xl text-white font-mono">$8,500<span className="text-xs text-neutral-500">/mo</span></span>
                    </div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex justify-between items-center py-2">
                      <span className="text-xs text-neutral-500">Overage fees</span>
                      <span className="text-xs text-neutral-300 font-mono">+$1,240.00</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex justify-between items-center py-2">
                      <span className="text-xs text-neutral-500">Support add-on</span>
                      <span className="text-xs text-neutral-300 font-mono">+$500.00</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-between items-center py-2 border-t border-white/5 mt-1">
                      <span className="text-xs text-neutral-400 font-medium">Total</span>
                      <span className="text-sm text-red-400 font-mono">$10,240.00</span>
                    </motion.div>
                  </div>
                )}

                {index === 2 && (
                  // Mock 3: No IT team
                  <div className="w-full bg-[#0a0a0a] border border-white/5 rounded p-4 font-mono text-[11px] leading-relaxed opacity-90 h-full flex flex-col justify-center">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-neutral-500">$ kubectl get pods</motion.div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-red-400 mt-1">CrashLoopBackOff: pod/api-gateway</motion.div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-neutral-500 mt-4">$ helm rollback</motion.div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-red-400 mt-1">Error: revision not found.</motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, type: "spring" }} className="text-yellow-400/80 mt-4 bg-yellow-400/10 inline-block px-2 py-1 rounded w-fit">
                      ⚠️ DevOps intervention required
                    </motion.div>
                  </div>
                )}

                {index === 3 && (
                  // Mock 4: Tools that don't talk
                  <div className="w-full flex items-center justify-center gap-4 opacity-80">
                     <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-20 h-24 bg-[#1a1a1a] border border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 z-10">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                        </div>
                        <span className="text-[10px] text-neutral-500">CRM Data</span>
                     </motion.div>
                     
                     <div className="flex-1 flex items-center justify-center relative">
                        {/* Animating the dashed line drawing */}
                        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ originX: 0 }} className="w-full h-[1px] bg-red-500/50 border-t border-dashed border-red-500 relative"></motion.div>
                        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 1 }} className="absolute w-5 h-5 rounded-full bg-red-950 border border-red-500 flex items-center justify-center z-10">
                           <span className="text-[10px] text-red-500 font-bold">✕</span>
                        </motion.div>
                     </div>

                     <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-20 h-24 bg-[#1a1a1a] border border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 z-10">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-[10px] text-neutral-500">Marketing</span>
                     </motion.div>
                  </div>
                )}

                {index === 4 && (
                  // Mock 5: Always reacting
                  <div className="w-full flex flex-col gap-2 relative mt-4">
                    <div className="absolute -top-6 left-0 text-[10px] text-neutral-500 uppercase tracking-wider">Alert Center</div>
                    
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full bg-[#1a1a1a] border border-white/5 p-3 rounded-md flex items-start gap-3 opacity-50">
                       <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1"></div>
                       <div>
                         <div className="text-xs text-neutral-300">Warning: Latency Spike</div>
                         <div className="text-[10px] text-neutral-500 mt-1">2 hours ago</div>
                       </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: "spring" }} className="w-full bg-red-900/10 border border-red-500/20 p-3 rounded-md flex items-start gap-3 mt-2">
                       <div className="w-2 h-2 rounded-full bg-red-500 mt-1 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
                       <div>
                         <div className="text-xs text-red-400 font-medium">Critical: Database Overload</div>
                         <div className="text-[10px] text-neutral-500 mt-1">Impacted users: 4,209 (Now)</div>
                       </div>
                    </motion.div>
                  </div>
                )}

                {index === 5 && (
                  // Mock 6: No view of payoff
                  <div className="w-full h-full flex flex-col justify-end pt-8 opacity-80">
                     <div className="flex justify-between items-end mb-4 px-2">
                       <span className="text-[10px] text-neutral-500">Q3 ROI Projection</span>
                       <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} className="text-xs text-neutral-400 font-mono">Unknown</motion.span>
                     </div>
                     <div className="w-full h-24 border-b border-l border-white/10 relative flex items-end justify-between px-2 pb-0 pt-4">
                        {/* Animated Bars */}
                        <motion.div initial={{ height: 0 }} whileInView={{ height: "100%" }} transition={{ duration: 0.5, delay: 0.1 }} className="w-1/6 bg-neutral-800/50 rounded-t-sm origin-bottom"></motion.div>
                        <motion.div initial={{ height: 0 }} whileInView={{ height: "80%" }} transition={{ duration: 0.5, delay: 0.2 }} className="w-1/6 bg-neutral-800/50 rounded-t-sm origin-bottom"></motion.div>
                        <motion.div initial={{ height: 0 }} whileInView={{ height: "60%" }} transition={{ duration: 0.5, delay: 0.3 }} className="w-1/6 bg-neutral-800/50 rounded-t-sm origin-bottom"></motion.div>
                        <motion.div initial={{ height: 0 }} whileInView={{ height: "30%" }} transition={{ duration: 0.5, delay: 0.4 }} className="w-1/6 bg-neutral-800/50 rounded-t-sm origin-bottom"></motion.div>
                        <motion.div initial={{ height: 0 }} whileInView={{ height: "10%" }} transition={{ duration: 0.5, delay: 0.5 }} className="w-1/6 bg-red-900/30 border-t border-red-500/50 rounded-t-sm flex items-start justify-center pt-2 origin-bottom">
                           <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} className="text-[16px] text-red-500 leading-none mt-[-20px]">?</motion.span>
                        </motion.div>
                     </div>
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}