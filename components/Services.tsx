"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Bot, Cpu, ShieldCheck } from "lucide-react";
import CardSwap, { Card } from '@/helper/CardSwap';

// Mocked service data combining your custom HOOKS and ICONS
const servicesData = [
  {
    id: "build-custom-agents",
    name: "Build Custom Agents",
    hook: "Mapped to your process — not a generic template.",
    description: "We engineer bespoke LLM-driven agents that integrate directly into your workflows, automating complex multi-step tasks unique to your business operations.",
    icon: Bot,
    accent: "text-purple-400",
    bgAccent: "bg-purple-500/10",
    borderAccent: "border-purple-500/20"
  },
  {
    id: "build-ai-applications",
    name: "Build AI Applications",
    hook: "From prototype to production, cutting-edge throughout.",
    description: "Full-stack development of AI-native software. We build scalable, high-performance applications with intelligent reasoning features baked in from day one.",
    icon: AppWindow,
    accent: "text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "border-emerald-500/20"
  },
  {
    id: "secure-ai-in-a-box",
    name: "Secure AI in a Box",
    hook: "Your data never leaves your walls.",
    description: "Enterprise-grade, on-premise AI deployments. We package and deliver powerful local models that run entirely within your secure, air-gapped infrastructure.",
    icon: ShieldCheck,
    accent: "text-blue-400",
    bgAccent: "bg-blue-500/10",
    borderAccent: "border-blue-500/20"
  },
  {
    id: "embedded-edge-ai",
    name: "Embedded Edge AI",
    hook: "Intelligence where the work actually happens.",
    description: "Deploying lightweight, highly-optimized neural networks directly onto edge devices for real-time processing without cloud dependency or latency.",
    icon: Cpu,
    accent: "text-yellow-400",
    bgAccent: "bg-yellow-500/10",
    borderAccent: "border-yellow-500/20"
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#09090b] text-white py-16 md:py-20 overflow-hidden w-full font-sans border-t border-white/5 relative"
    >
      <div className="w-full px-6 md:px-12 xl:px-24 flex flex-col lg:flex-row gap-12 lg:gap-8 items-center min-h-[520px]">
        
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
            
            <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
              Discuss a custom project
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Card Swap Animation */}
        <div className="flex-1 w-full relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center lg:justify-end">
          
          {/* Subtle glow behind the cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7000FF]/20 blur-[100px] rounded-full pointer-events-none z-0" />
          
          <div className="relative w-full h-full max-w-[500px]">
            <CardSwap
              width={450}
              height={350}
              cardDistance={40}
              verticalDistance={40}
              delay={4000} // Swaps every 4 seconds
              pauseOnHover={true}
              easing="elastic"
            >
              {servicesData.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={service.id}
                    customClass="p-8 md:p-10 flex flex-col justify-between bg-[#121212] border-white/10 hover:border-white/20 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group"
                  >
                    {/* Card Header & Icon */}
                    <div>
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${service.borderAccent} ${service.bgAccent} ${service.accent} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">
                        {service.name}
                      </h3>
                      <p className={`font-medium ${service.accent} mb-4 text-sm`}>
                        {service.hook}
                      </p>
                    </div>

                    {/* Card Body */}
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
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