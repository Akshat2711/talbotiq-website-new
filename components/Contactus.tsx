"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Mail, MapPin, ArrowRight, Terminal } from 'lucide-react';

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

export default function ContactSection() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }
    }
  };

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="bg-[#09090b] text-white py-24 md:py-32 w-full font-sans border-t border-white/5 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#34d399]/5 blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7000FF]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="w-full px-6 md:px-12 xl:px-24 relative z-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          
          {/* Left Column: Text & Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col h-full"
          >
            <motion.p variants={itemVariants} className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
              Get in touch
            </motion.p>
            
            <motion.h2 
              variants={itemVariants}
              id="contact-heading" 
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-tight"
            >
              <ScrambleText text="Ready to build the future?" loopInterval={8000} />
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-neutral-400 max-w-lg leading-relaxed mb-12">
              Whether you're looking for a custom AI agent, a full ERP migration, or just exploring what's possible, our engineering team is ready to help.
            </motion.p>

            {/* Contact Details Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 group hover:border-[#34d399]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#34d399]/10 flex items-center justify-center mb-4 text-[#34d399] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium mb-1">Chat with us</h4>
                <p className="text-sm text-neutral-500 mb-2">Our friendly team is here to help.</p>
                <a href="mailto:hello@talbotiq.com" className="text-sm text-white hover:text-[#34d399] transition-colors">hello@talbotiq.com</a>
              </div>

              <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 group hover:border-[#7000FF]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#7000FF]/10 flex items-center justify-center mb-4 text-[#7000FF] group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-white font-medium mb-1">Visit us</h4>
                <p className="text-sm text-neutral-500 mb-2">HQ in the heart of tech.</p>
                <p className="text-sm text-white">San Francisco, CA</p>
              </div>
            </motion.div>

            {/* Mock Terminal UI to keep the developer vibe */}
            <motion.div variants={itemVariants} className="mt-auto w-full bg-[#0a0a0c] border border-white/10 rounded-lg shadow-2xl overflow-hidden max-w-md">
               <div className="w-full h-8 bg-[#1a1a1c] border-b border-white/5 flex items-center px-4 gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                 <div className="ml-auto text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                   <Terminal className="w-3 h-3" /> routing / support-agent
                 </div>
               </div>
               <div className="p-4 font-mono text-[10px] leading-loose">
                 <div className="flex gap-4">
                   <span className="text-neutral-500 w-16">0ms</span>
                   <span className="text-green-400 w-10">SYS</span>
                   <span className="text-neutral-300">Awaiting inbound inquiry...</span>
                 </div>
                 <div className="flex gap-4 opacity-50">
                   <span className="text-neutral-500 w-16"></span>
                   <span className="text-neutral-500 w-10"></span>
                   <span className="text-neutral-500">Ready to route to human_team</span>
                 </div>
               </div>
            </motion.div>
          </motion.div>

          {/* Right Column: The Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-[#121212] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              {/* Form Ambient Hover Glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#34d399]/10 blur-[100px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
              
              <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-xs font-medium text-neutral-400">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      placeholder="Jane"
                      className="bg-[#0a0a0c] border border-white/5 rounded-lg p-4 text-white placeholder:text-neutral-600 focus:border-[#34d399]/50 focus:ring-1 focus:ring-[#34d399]/50 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-xs font-medium text-neutral-400">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      placeholder="Doe"
                      className="bg-[#0a0a0c] border border-white/5 rounded-lg p-4 text-white placeholder:text-neutral-600 focus:border-[#34d399]/50 focus:ring-1 focus:ring-[#34d399]/50 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-medium text-neutral-400">Work Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="jane@company.com"
                    className="bg-[#0a0a0c] border border-white/5 rounded-lg p-4 text-white placeholder:text-neutral-600 focus:border-[#34d399]/50 focus:ring-1 focus:ring-[#34d399]/50 outline-none transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-xs font-medium text-neutral-400">Company Name</label>
                  <input 
                    type="text" 
                    id="company" 
                    placeholder="Acme Corp"
                    className="bg-[#0a0a0c] border border-white/5 rounded-lg p-4 text-white placeholder:text-neutral-600 focus:border-[#34d399]/50 focus:ring-1 focus:ring-[#34d399]/50 outline-none transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-medium text-neutral-400">How can we help?</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    placeholder="Tell us about your project, goals, or current bottlenecks..."
                    className="bg-[#0a0a0c] border border-white/5 rounded-lg p-4 text-white placeholder:text-neutral-600 focus:border-[#34d399]/50 focus:ring-1 focus:ring-[#34d399]/50 outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="mt-4 w-full bg-[#34d399] text-black font-semibold rounded-lg p-4 flex items-center justify-center gap-2 hover:bg-[#2bb482] transition-colors shadow-[0_0_20px_rgba(52,211,153,0.2)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <p className="text-[10px] text-neutral-500 text-center mt-2">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}