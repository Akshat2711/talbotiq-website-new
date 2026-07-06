"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Bot, Cpu, ShieldCheck } from "lucide-react";
import CardSwap, { Card } from '@/helper/CardSwap';

// Mocked service data combining your custom HOOKS, ICONS, and newly added solid backgrounds
const servicesData = [
  {
    id: "build-custom-agents",
    name: "Build Custom Agents",
    hook: "Mapped to your process — not a generic template.",
    description: "We engineer bespoke LLM-driven agents that integrate directly into your workflows, automating complex multi-step tasks unique to your business operations.",
    icon: Bot,
    accent: "text-purple-400",
    bgAccent: "bg-purple-500/20",
    borderAccent: "border-purple-500/30",
    cardBg: "bg-[#170a29]" // Solid dark purple
  },
  {
    id: "build-ai-applications",
    name: "Build AI Applications",
    hook: "From prototype to production, cutting-edge throughout.",
    description: "Full-stack development of AI-native software. We build scalable, high-performance applications with intelligent reasoning features baked in from day one.",
    icon: AppWindow,
    accent: "text-emerald-400",
    bgAccent: "bg-emerald-500/20",
    borderAccent: "border-emerald-500/30",
    cardBg: "bg-[#042016]" // Solid dark emerald
  },
  {
    id: "secure-ai-in-a-box",
    name: "Secure AI in a Box",
    hook: "Your data never leaves your walls.",
    description: "Enterprise-grade, on-premise AI deployments. We package and deliver powerful local models that run entirely within your secure, air-gapped infrastructure.",
    icon: ShieldCheck,
    accent: "text-blue-400",
    bgAccent: "bg-blue-500/20",
    borderAccent: "border-blue-500/30",
    cardBg: "bg-[#07182e]" // Solid dark blue
  },
  {
    id: "embedded-edge-ai",
    name: "Embedded Edge AI",
    hook: "Intelligence where the work actually happens.",
    description: "Deploying lightweight, highly-optimized neural networks directly onto edge devices for real-time processing without cloud dependency or latency.",
    icon: Cpu,
    accent: "text-yellow-400",
    bgAccent: "bg-yellow-500/20",
    borderAccent: "border-yellow-500/30",
    cardBg: "bg-[#261a04]" // Solid dark yellow
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#09090b] text-white py-16 md:py-24 overflow-hidden w-full font-sans border-t border-white/5 relative"
    >
      <div className="w-full px-6 md:px-12 xl:px-24 flex flex-col lg:flex-row gap-16 lg:gap-8 items-center min-h-[600px]">
        
        {/* Left Column: Text Content */}
        <div className="flex-1 w-full lg:max-w-xl z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
              The Services
            </p>
            <h2 
              id="services-heading" 
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-tight"
            >
              Beyond products <br className="hidden lg:block" />
              — we build with you.
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-8">
              When off-the-shelf isn't enough, our team designs and ships the AI itself — securely, and close to where your work happens.
            </p>
            
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white text-black font-medium hover:bg-neutral-200 transition-colors shadow-lg hover:shadow-white/20">
              Discuss a custom project
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Card Swap Animation */}
        <div className="flex-1 w-full relative h-[600px] md:h-[700px] flex items-center justify-center lg:justify-end">
          
          {/* Subtle glow behind the cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#7000FF]/15 blur-[120px] rounded-full pointer-events-none z-0" />
          
          {/* Increased max-width container to fit larger cards */}
          <div className="relative w-full h-full max-w-[650px] mt-12 lg:mt-0">
            <CardSwap
              width={520}       // Increased width
              height={420}      // Increased height
              cardDistance={50} // Slightly more spread
              verticalDistance={50}
              delay={2000}      // Faster swap (2 seconds)
              pauseOnHover={true}
              easing="elastic"
            >
              {servicesData.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={service.id}
                    // Applied specific background color, rounded corners, and larger padding
                    customClass={`p-10 md:p-12 flex flex-col justify-between rounded-3xl ${service.cardBg} border border-white/10 hover:border-white/25 transition-colors shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer group`}
                  >
                    {/* Card Header & Icon */}
                    <div>
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border ${service.borderAccent} ${service.bgAccent} ${service.accent} mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                        <Icon className="h-8 w-8" aria-hidden="true" />
                      </div>
                      <h3 className="text-3xl font-semibold text-white tracking-tight mb-3">
                        {service.name}
                      </h3>
                      <p className={`font-medium ${service.accent} mb-6 text-base`}>
                        {service.hook}
                      </p>
                    </div>

                    {/* Card Body */}
                    <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </Card>
                );
              })}
            </CardSwap>
          </div>

        </div>
      </div>
    </section>
  );
}