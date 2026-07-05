"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Eye, 
  Radar, 
  HeartHandshake, 
  BarChart3, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

// Adapted your TSX benefits + added a few to fill the 4x2 grid from the screenshot
const benefitsData = [
  {
    id: "clear-roi",
    title: "Clear ROI & Outcomes",
    description: "Outcomes you can see instantly. Stop guessing and start tracking exactly what your AI is returning to your business.",
    icon: Eye,
  },
  {
    id: "proactive-intelligence",
    title: "Proactive intelligence",
    description: "Intelligence that looks ahead. Catch bottlenecks and system overloads before they ever reach your end users.",
    icon: Radar,
  },
  {
    id: "assistance",
    title: "Assistance, not replacement",
    description: "The certainty that your people remain the point. Our agents work alongside your team to eliminate grunt work.",
    icon: HeartHandshake,
  },
  {
    id: "support-scales",
    title: "Support that scales",
    description: "Resolve up to ~90% of tier-1 tickets automatically with intelligent routing and context-aware LLM agents.",
    icon: BarChart3,
  },
  {
    id: "global-reach",
    title: "Global edge reach",
    description: "Inference deployed across 4 continents, ensuring low-latency responses for your users no matter where they are.",
    icon: Globe,
  },
  {
    id: "model-agnostic",
    title: "Model agnostic",
    description: "Swap between OpenAI, Anthropic, or open-source models seamlessly without rewriting your underlying infrastructure.",
    icon: Cpu,
  },
  {
    id: "isolated-environments",
    title: "Isolated environments",
    description: "Prevent non-production environments and experimental agents from accessing your live production databases.",
    icon: ShieldCheck,
  },
  {
    id: "auto-scaling",
    title: "Predictive auto-scaling",
    description: "Scale your vector databases and inference nodes automatically based on historical traffic patterns.",
    icon: Zap,
    badge: "COMING SOON"
  },
];

export default function BenefitsSection() {
  // Framer motion variants for the staggered grid reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section 
      id="benefits" 
      aria-labelledby="benefits-heading"
      className="bg-[#09090b] text-white py-24 md:py-32 overflow-hidden w-full font-sans border-t border-white/5"
    >
      <div className="w-full px-6 md:px-12 xl:px-24">
        
        {/* Section Heading matching the screenshot */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <h2 
            id="benefits-heading" 
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1.1]"
          >
            Intuitive infrastructure, <br className="hidden md:block" />
            designed for builders
          </h2>
          <p className="text-lg md:text-xl text-neutral-400">
            Confidence comes from clear returns, intelligence that looks ahead, and the certainty that your team stays in control.
          </p>
        </motion.div>

        {/* 4-Column Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {benefitsData.map((benefit) => {
            const Icon = benefit.icon;
            
            return (
              <motion.div 
                key={benefit.id} 
                variants={itemVariants}
                className="flex flex-col group cursor-default"
              >
                {/* Icon matching the green/teal accent from the image */}
                <div className="mb-4 text-[#34d399] transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                
                {/* Title and optional badge */}
                <h3 className="text-base font-medium text-neutral-200 mb-2 flex items-center flex-wrap gap-2 tracking-tight">
                  {benefit.title}
                  {benefit.badge && (
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-[#7000FF]/20 text-[#a855f7] border border-[#7000FF]/30 px-1.5 py-0.5 rounded-sm">
                      {benefit.badge}
                    </span>
                  )}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-neutral-500 leading-relaxed max-w-[280px]">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}