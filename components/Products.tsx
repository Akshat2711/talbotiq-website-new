"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Sparkles, Bot, Cpu, Users, FileText, Video, 
  Target, TrendingUp, CheckSquare, Cctv 
} from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/helper/ScrollstackAnimation'; // Update import path as needed

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

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>";
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
        iteration += 1 / 2;
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

// --- Mocked Product Data with Rich Colored Backgrounds ---
const stackedProducts = [
  {
    id: "virtual-recruiter",
    category: "AI Agents",
    name: "Virtual Recruiter",
    description: "An autonomous agent that sources, screens, and engages candidates 24/7 without human intervention.",
    icon: Bot,
    accent: "text-purple-300",
    cardBg: "bg-gradient-to-br from-[#2e0854] to-[#16022e]", 
    bgAccent: "bg-purple-500/30",
    borderAccent: "border-purple-500/30",
    mockCode: "agent.deploy({ role: 'Technical Sourcer', pipelines: ['GitHub', 'LinkedIn'] })"
  },
  {
    id: "custom-ai-agents",
    category: "AI Agents",
    name: "Custom Agent Builder",
    description: "Build bespoke agents for any workflow. Connect your data sources and let the LLM handle the reasoning.",
    icon: Cpu,
    accent: "text-indigo-300",
    cardBg: "bg-gradient-to-br from-[#1c1959] to-[#090826]", 
    bgAccent: "bg-indigo-500/30",
    borderAccent: "border-indigo-500/30",
    mockCode: "workflow.trigger('on_data_ingest').run(AnalysisAgent)"
  },
  {
    id: "ats",
    category: "Talent & Team Tools",
    name: "Intelligent ATS",
    description: "Applicant tracking on autopilot. Automatically rank inbound applications based on semantic skill matching.",
    icon: Users,
    accent: "text-emerald-300",
    cardBg: "bg-gradient-to-br from-[#023b2c] to-[#011a13]", 
    bgAccent: "bg-emerald-500/30",
    borderAccent: "border-emerald-500/30",
    mockCode: "candidates.filter(c => c.matchScore > 0.85).moveTo('Interview')"
  },
  {
    id: "document-parser",
    category: "Talent & Team Tools",
    name: "Document Parser",
    description: "Extract structured JSON data from CVs, PDFs, and unstructured text with near-perfect accuracy.",
    icon: FileText,
    accent: "text-teal-300",
    cardBg: "bg-gradient-to-br from-[#033b3d] to-[#011718]", 
    bgAccent: "bg-teal-500/30",
    borderAccent: "border-teal-500/30",
    mockCode: "const data = await parser.extractJSON(resume_pdf)"
  },
  {
    id: "video-interview",
    category: "Talent & Team Tools",
    name: "AI Video Interviewer",
    description: "Conduct automated preliminary interviews. Analyze sentiment, tone, and technical accuracy in real-time.",
    icon: Video,
    accent: "text-amber-300",
    cardBg: "bg-gradient-to-br from-[#4d2303] to-[#210e01]", 
    bgAccent: "bg-amber-500/30",
    borderAccent: "border-amber-500/30",
    mockCode: "interview.analyze({ sentiment: true, keyword_density: true })"
  },
  {
    id: "sales-crm",
    category: "Operations & Intelligence",
    name: "Predictive Sales CRM",
    description: "A CRM that tells you who to call next. Predictive pipeline management driven by real-time buying signals.",
    icon: TrendingUp,
    accent: "text-blue-300",
    cardBg: "bg-gradient-to-br from-[#072456] to-[#020e26]", 
    bgAccent: "bg-blue-500/30",
    borderAccent: "border-blue-500/30",
    mockCode: "leads.getHighestPropensityToBuy(limit=10)"
  },
  {
    id: "cctv-analytics",
    category: "Operations & Intelligence",
    name: "CCTV Analytics",
    description: "Real-time physical security intelligence. Detect anomalies, track foot traffic, and automate physical alerts.",
    icon: Cctv,
    accent: "text-rose-300",
    cardBg: "bg-gradient-to-br from-[#4d0726] to-[#240110]", 
    bgAccent: "bg-rose-500/30",
    borderAccent: "border-rose-500/30",
    mockCode: "camera_stream.detectAnomalies({ threshold: 'critical' })"
  }
];

export default function ProductsSection() {
  return (
    <section 
      id="products" 
      aria-labelledby="products-heading"
      className="bg-[#09090b] text-white py-12 md:py-16 lg:py-20 w-full font-sans border-t border-white/5 relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-[500px] bg-[#7000FF]/5 blur-[150px] md:blur-[200px] rounded-full pointer-events-none z-0" />

      {/* --- PADDED WRAPPER FOR HEADERS & BANNER --- */}
      <div className="w-full px-4 sm:px-6 md:px-12 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 text-center max-w-7xl mx-auto"
        >
          <p className="mb-3 md:mb-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] md:tracking-[0.25em] text-neutral-400">
            The Products
          </p>
          <h2 id="products-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 md:mb-6 leading-tight">
            <ScrambleText text="Every tool your business runs on" /> <br className="hidden sm:block" />
            <ScrambleText text="— finally one system." />
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed px-2">
            Most vendors sell you a CRM or an accounting system. Talbotiq is the whole ecosystem, AI-native from the core.
          </p>
        </motion.div>

        {/* Highlight / ERP Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#34d399]/20 bg-gradient-to-b from-[#34d399]/5 to-white/[0.02] p-6 sm:p-8 md:p-12 shadow-2xl relative"
        >
          <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 sm:opacity-20 pointer-events-none">
            <Sparkles className="w-20 h-20 sm:w-32 sm:h-32 text-[#34d399]" />
          </div>
          
          <div className="max-w-3xl relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3 md:mb-4 pr-12 sm:pr-0">
              Talbotiq OS — The central brain of your business.
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-neutral-400 mb-5 md:mb-6 leading-relaxed">
              Our unified ERP eliminates data silos by acting as the foundational reasoning engine for all connected micro-agents and tools below.
            </p>
            <p className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-neutral-400 sm:text-neutral-500 bg-black/50 px-2.5 sm:px-3 py-1.5 rounded">
              <Cpu className="h-3 w-3 sm:h-4 sm:w-4 text-[#34d399]" />
              AI-native · Fast + Large Context
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- FULL BLEED / EDGE-TO-EDGE BREAKOUT WRAPPER --- */}
      {/* w-[100vw] ml-[calc(50%-50vw)] breaks out of ALL parent padding exactly to the viewport edges on mobile */}
      <div className="w-[100vw] ml-[calc(50%-50vw)] sm:w-full sm:ml-0 mt-12 md:mt-20 px-0 sm:px-6 md:px-12 xl:px-24 relative z-10 overflow-hidden sm:overflow-visible">
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={120} 
          itemScale={0.04}
          stackPosition="25%"
        >
          {stackedProducts.map((product, idx) => {
            const Icon = product.icon;
            return (
              <ScrollStackItem 
                key={product.id}
                itemClassName="!h-auto !p-0 !bg-transparent !shadow-none !border-none !my-0 w-full"
              >
                {/* 
                  Dynamic Colored Background Applied Here.
                  - border-x-0 ensures no left/right borders are visible on mobile.
                  - min-h-[450px] ensures it grows significantly larger on big screens. 
                */}
                <div className={`w-full ${product.cardBg} border-y sm:border border-x-0 ${product.borderAccent} rounded-none sm:rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row gap-8 sm:gap-8 lg:gap-10 items-start lg:items-center justify-center overflow-hidden relative min-h-[450px] md:min-h-[500px] lg:min-h-[650px] xl:min-h-[750px]`}>
                  
                  {/* Background Graphic / Glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 ${product.bgAccent} blur-[80px] md:blur-[120px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3 md:translate-x-1/2 md:-translate-y-1/2 opacity-60`} />

                  {/* Content Left */}
                  <div className="flex-1 relative z-10 w-full flex flex-col justify-center">
                    <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] ${product.accent} mb-3 sm:mb-4`}>
                      {product.category}
                    </p>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-3 sm:mb-4 md:mb-6">
                      {product.name}
                    </h3>
                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                      {product.description}
                    </p>
                    
                    {/* Code Mockup Block */}
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-3 sm:p-4 font-mono text-[10px] sm:text-xs md:text-sm text-neutral-300 w-full sm:w-fit shadow-inner break-words sm:break-normal">
                      <span className="text-neutral-500 select-none mr-2 sm:mr-3">{'>'}</span>
                      <span className={product.accent}>{product.mockCode.split('(')[0]}</span>
                      <span className="text-white break-all sm:break-normal">({product.mockCode.split('(').slice(1).join('(')}</span>
                    </div>
                  </div>

                  {/* Visual Right */}
                  <div className="w-full lg:w-1/3 flex justify-center items-center relative z-10 mt-2 sm:mt-8 lg:mt-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center transform rotate-3 shadow-[0_15px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-transform hover:rotate-6 hover:scale-105 duration-300">
                      <Icon className={`w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 ${product.accent}`} strokeWidth={1} />
                    </div>
                  </div>

                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>

    </section>
  );
}