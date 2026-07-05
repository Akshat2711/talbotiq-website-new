"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  loopInterval?: number | null;
}

// --- Helper Component for the Gibberish Text Effect ---
function ScrambleText({ text, loopInterval = null }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!isInView) {
      setDisplayText(text); 
      return;
    }

    // FIX: Using only alphanumeric and non-breaking symbols. 
    // Removed -, /, \, ?, and — to prevent rapid line-wrap flickering!
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let interval: ReturnType<typeof setInterval> | null = null;
    let loopTimeout: ReturnType<typeof setTimeout> | null = null;

    const runScramble = () => {
      let iteration = 0;
      if (interval !== null) clearInterval(interval);

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

        iteration += 1 / 2; // Speed of reveal
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

    return (
    <span ref={ref} className="relative inline-block">
        <span className="invisible">
        {text}
        </span>

        <span className="absolute inset-0">
        {displayText}
        </span>
    </span>
    );
}

// --- Main Section Component ---
export default function SolutionSection() {
  const boxVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const } 
    }
  };

  return (
    <section 
      id="solution" 
      aria-labelledby="solution-heading" 
      className="bg-[#09090b] text-white py-24 md:py-32 overflow-hidden w-full font-sans border-t border-white/5"
    >
      <div className="w-full px-6 md:px-12 xl:px-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
            The Solution
          </p>
          <h2 id="solution-heading" className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 max-w-4xl">
            One ecosystem that turns all six problems into promises.
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            No IT department required — onboarding, support, and intelligence are built right in. The same six frustrations, resolved.
          </p>
        </motion.div>

        {/* Full-Width Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Box 1: Text Highlights with LOOPING Scramble Effect */}
          <motion.div 
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            // FIX: Added min-h-[380px] and lg:min-h-[420px] to act as a structural shock-absorber
            className="lg:col-span-5 bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col justify-center min-h-[380px] lg:min-h-[420px]"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug tracking-tight min-h-[4.5em]">
              <ScrambleText text="Intuitive orchestration and private networking for " loopInterval={10000} />
              <span className="text-[#a855f7] transition-colors hover:text-[#d8b4fe] cursor-default inline-block">
                <ScrambleText text="AI agents" loopInterval={10000} />
              </span>
              {', '}
              <span className="text-[#22c55e] transition-colors hover:text-[#86efac] cursor-default inline-block">
                <ScrambleText text="vector databases" loopInterval={10000} />
              </span>
              {', '}
              <span className="text-[#ef4444] transition-colors hover:text-[#fca5a5] cursor-default inline-block">
                <ScrambleText text="cron jobs" loopInterval={10000} />
              </span>
              {', '}
              <span className="text-[#d946ef] transition-colors hover:text-[#f0abfc] cursor-default inline-block">
                <ScrambleText text="workflows" loopInterval={10000} />
              </span>
              {', '}
              <span className="text-[#3b82f6] transition-colors hover:text-[#93c5fd] cursor-default inline-block">
                <ScrambleText text="inference endpoints" loopInterval={10000} />
              </span>
              {', '}
              <span className="text-[#f59e0b] transition-colors hover:text-[#fcd34d] cursor-default inline-block">
                <ScrambleText text="background tasks" loopInterval={10000} />
              </span>
              {', '}
              <span className="text-neutral-500">
                <ScrambleText text="model caches, edge nodes, isolated environments." loopInterval={10000} />
              </span>
            </h3>
          </motion.div>

          {/* Box 2: Previews (Spans 7 cols) */}
          <motion.div 
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 overflow-hidden relative group"
          >
            <div className="flex-1 z-10 flex flex-col justify-center">
              <h3 className="text-2xl font-medium mb-3">Full-stack previews for every model update</h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Iterate quickly with ephemeral previews of your entire AI architecture for every prompt or weight change.
              </p>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors w-fit">
                Preview environment docs &rarr;
              </a>
            </div>
            
            <div className="flex-1 relative min-h-[150px] w-full bg-[#0a0a0c] border border-white/10 rounded-lg p-4 shadow-2xl transform md:translate-x-4 md:translate-y-4 group-hover:-translate-y-1 transition-transform duration-500">
               <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-mono text-neutral-300">PR #402</span>
                 <span className="text-[10px] text-neutral-500 ml-auto">Deploy preview</span>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between items-center bg-white/5 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer">
                    <span className="text-[10px] text-green-400 font-mono">✔ API Gateway</span>
                    <span className="text-[10px] text-neutral-500">Live</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer">
                    <span className="text-[10px] text-green-400 font-mono">✔ LLM Router</span>
                    <span className="text-[10px] text-neutral-500">Live</span>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Box 3: Autoscaling Chart (Spans 12 cols, wide) */}
          <motion.div 
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-12 bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="md:w-1/3 z-10 relative">
              <h3 className="text-3xl font-medium mb-3">Load-based autoscaling that handles 100x traffic bursts</h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Keep your AI workloads running smoothly through viral moments, seasonal spikes, and launch days.
              </p>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors w-fit">
                Autoscaling docs &rarr;
              </a>
            </div>
            
            <div className="md:w-2/3 h-64 w-full relative z-10 flex items-end ml-auto">
               <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-white/10 px-4 pt-4 pb-0">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-white/5"></div>
                  ))}
               </div>
               
               <svg viewBox="0 0 1000 200" className="w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none">
                  <motion.path 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    d="M0,200 L0,150 L100,160 L200,120 L300,170 L400,90 L500,140 L600,40 L700,120 L800,20 L900,80 L1000,10 L1000,200 Z" 
                    fill="url(#purpleGradient)" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    d="M0,150 L100,160 L200,120 L300,170 L400,90 L500,140 L600,40 L700,120 L800,20 L900,80 L1000,10" 
                    fill="none" 
                    stroke="#a855f7" 
                    strokeWidth="3" 
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                  />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
               </svg>
            </div>
          </motion.div>

          {/* Box 4: Workflows as Code (Spans 6 cols) */}
          <motion.div 
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-6 bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-medium mb-3">Durable, long-running agent workflows as code</h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Deploy reliable multi-agent setups and background processes at scale without wiring up queues, workers, and retry logic.
              </p>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors w-fit">
                Workflow docs &rarr;
              </a>
            </div>
            
            <div className="w-full bg-[#0a0a0c] border border-white/10 rounded-t-xl p-5 shadow-2xl mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <pre className="font-mono text-[11px] leading-loose text-neutral-300 overflow-hidden">
                 <code>
                   <span className="text-purple-400">export const</span> <span className="text-blue-300">analyzeDocument</span> = <span className="text-yellow-200">workflow</span>({'{'}<br/>
                   &nbsp;&nbsp;id: <span className="text-green-300">'doc-analyzer'</span>,<br/>
                   &nbsp;&nbsp;<span className="text-blue-200">step</span>: <span className="text-purple-400">async</span> ({'{'} input {'}'}) =&gt; {'{'}<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">const</span> text = <span className="text-purple-400">await</span> <span className="text-yellow-200">extractText</span>(input.file);<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">const</span> embeddings = <span className="text-purple-400">await</span> <span className="text-yellow-200">vectorize</span>(text);<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> embeddings;<br/>
                   &nbsp;&nbsp;{'}'}<br/>
                   {'}'});
                 </code>
               </pre>
            </div>
          </motion.div>

          {/* Box 5: Databases (Spans 6 cols) */}
          <motion.div 
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-6 bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-medium mb-3">Enterprise-grade Vector Databases</h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Deploy fully-managed databases with point-in-time recovery, high availability, and built-in semantic search.
              </p>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors w-fit">
                Database docs &rarr;
              </a>
            </div>
            
            <div className="w-full bg-[#0a0a0c] border border-white/10 rounded-t-xl p-5 shadow-2xl mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-sm bg-blue-500 flex items-center justify-center">
                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                   </div>
                   <span className="text-sm font-medium">pg-vector-main</span>
                 </div>
                 <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Available</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 rounded p-3 cursor-pointer hover:bg-white/10 transition-colors">
                   <div className="text-[10px] text-neutral-500 mb-2">CONNECTIONS</div>
                   <svg viewBox="0 0 100 20" className="w-full h-4 stroke-blue-400 fill-none stroke-2">
                     <path d="M0,10 Q25,20 50,5 T75,15 T100,10" />
                   </svg>
                 </div>
                 <div className="bg-white/5 rounded p-3 cursor-pointer hover:bg-white/10 transition-colors">
                   <div className="text-[10px] text-neutral-500 mb-2">MEMORY</div>
                   <svg viewBox="0 0 100 20" className="w-full h-4 stroke-purple-400 fill-none stroke-2">
                     <path d="M0,15 L20,15 L40,5 L60,10 L80,18 L100,15" />
                   </svg>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Box 6: Logs (Spans 12 cols, wide) */}
          <motion.div 
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-12 bg-[#121212] border border-white/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center overflow-hidden group"
          >
            <div className="md:w-1/2">
              <h3 className="text-3xl font-medium mb-3">Integrated logs and telemetry for AI services</h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed max-w-lg">
                See critical metrics for all of your agent infrastructure from day zero, and stream telemetry to external tools automatically.
              </p>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors w-fit">
                Observability docs &rarr;
              </a>
            </div>
            
            <div className="md:w-1/2 w-full bg-[#0a0a0c] border border-white/10 rounded-lg shadow-2xl relative overflow-hidden group-hover:border-white/20 transition-colors duration-500">
               <div className="w-full h-8 bg-[#1a1a1c] border-b border-white/5 flex items-center px-4 gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                 <div className="ml-auto text-[10px] text-neutral-500 font-mono">live-logs / agent-inference</div>
               </div>
               
               <div className="p-4 font-mono text-[10px] md:text-xs leading-loose">
                 <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="flex gap-4">
                   <span className="text-neutral-500 w-24 shrink-0">14:02:11.04</span>
                   <span className="text-blue-400 w-12 shrink-0">INFO</span>
                   <span className="text-neutral-300 truncate">Initialized VectorDB connection [pool_size=10]</span>
                 </motion.div>
                 
                 <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="flex gap-4">
                   <span className="text-neutral-500 w-24 shrink-0">14:02:12.18</span>
                   <span className="text-purple-400 w-12 shrink-0">REQ</span>
                   <span className="text-neutral-300 truncate">POST /v1/chat/completions - Status: 200 (124ms)</span>
                 </motion.div>
                 
                 <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }} className="flex gap-4 bg-red-500/10 -mx-4 px-4 py-1 border-l-2 border-red-500">
                   <span className="text-neutral-500 w-24 shrink-0">14:02:15.89</span>
                   <span className="text-red-400 w-12 shrink-0">ERR</span>
                   <span className="text-red-300 truncate">Rate limit exceeded for endpoint API. Retrying...</span>
                 </motion.div>
                 
                 <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }} transition={{ delay: 1.2 }} viewport={{ once: true }} className="flex gap-4 mt-1">
                   <span className="text-neutral-500 w-24 shrink-0">14:02:16.02</span>
                   <span className="text-green-400 w-12 shrink-0">OK</span>
                   <span className="text-neutral-300 truncate">Autoscaling triggered: +2 instances provisioned.</span>
                 </motion.div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}