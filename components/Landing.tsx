"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/ui/Navbar'; // Ensure this path is correct for your project

export default function LandingPage() {
  const capabilities = [
    { title: "AI Strategy & Consulting" },
    { title: "AI Agent & Bot Development" },
    { title: "Embedded Edge AI" },
    { title: "Full Stack Development & AI Integration" },
  ];

  // --- Typewriter Effect State & Logic ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Words to cycle through in the typewriter
  const words = ["what's next", "agent scaling", "data pipelines", "edge deployments"];

  useEffect(() => {
    let ticker = setTimeout(() => {
      handleTyping();
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const handleTyping = () => {
    const i = loopNum % words.length;
    const fullText = words[i];

    setText(
      isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
    );

    // Faster speed when deleting
    setTypingSpeed(isDeleting ? 40 : 100);

    // If word is fully typed out, pause before deleting
    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 2000);
    } 
    // If word is fully deleted, move to next word
    else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-hidden flex flex-col selection:bg-green-500/30 relative">
      
      {/* Top Promotional Banner */}
      <div className="w-full bg-[#34d399] text-black text-xs md:text-sm font-medium py-2 px-4 flex justify-center items-center gap-2 z-30 relative">
        <span>Get in touch with us.</span>
        <button className="bg-black text-white px-3 py-1 rounded text-xs hover:bg-neutral-800 transition-colors">
          Contact Us
        </button>
      </div>

      {/* Stepped / Pyramid Interactive Grid */}
      <div className="absolute top-12 right-0 w-full md:w-[60vw] h-[80vh] grid grid-cols-8 md:grid-cols-12 grid-rows-12 gap-0 opacity-40 mix-blend-screen z-0 pointer-events-auto">
        {Array.from({ length: 144 }).map((_, i) => {
          const row = Math.floor(i / 12);
          const col = i % 12;
          const isVisible = col >= Math.floor(row / 1.5) + 3;

          return (
            <div 
              key={i} 
              className={`group relative transition-all duration-500 ease-out overflow-hidden
                ${isVisible 
                  ? 'border-[0.5px] border-white/[0.2] hover:duration-0 hover:border-green-500/50 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                  : 'border-transparent'
                }
              `}
            >
              {isVisible && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-0 flex flex-col justify-between py-[15%] px-[10%]">
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col relative z-10 pt-12 md:pt-24 pointer-events-none px-6 md:px-12 xl:px-24">
        
        {/* Hero Top Section */}
        <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-12 xl:gap-24">
          
          {/* Left Side: Content */}
          <div className="flex-1 flex flex-col justify-center z-20 pb-20 lg:pb-0 pointer-events-auto max-w-3xl w-full">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400 sm:text-sm">
              Talbotiq Platform
            </p>
            
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-medium leading-[1.05] tracking-tight mb-8 min-h-[220px] md:min-h-[280px]">
              The AI ecosystem <br />
              that simplifies <br />
              operations & <br />
              <span className="text-yellow-400">predicts</span>{' '}
              <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#16a34a] inline-block min-w-[20px]">
                {text}
              </span>
              {/* Blinking Cursor */}
              <span className="inline-block w-2 md:w-3 h-[40px] md:h-[60px] bg-[#22c55e]/60 ml-2 align-middle animate-pulse" />
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-xl leading-relaxed">
              One self-running platform that connects your tools, anticipates challenges, and works alongside your team to scale your business.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a href="#cta" className="bg-white text-black px-6 py-3.5 rounded font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2">
                Get a demo
              </a>
              <a href="#solution" className="bg-transparent border border-neutral-600 text-white px-6 py-3.5 rounded font-medium hover:bg-white/5 transition-colors">
                See how it works
              </a>
            </div>
          </div>

          {/* Right Side: Animated SVG */}
          <div className="flex-1 w-full flex items-center justify-center z-20 pointer-events-none lg:h-auto min-h-[300px] md:min-h-[500px]">
            {/* The pointer-events-auto on the img ensures hover interactions with the SVG still work if it contains any interactivity */}
            <img 
              src="/assets/landing_animation.svg" 
              alt="Talbotiq AI Animation" 
              className="w-full h-full max-w-[800px] object-contain pointer-events-auto drop-shadow-2xl"
            />
          </div>
          
        </div>

        {/* Horizontal Capabilities Footbar Section */}
        <div className="mt-20 w-full border-t border-white/10 pt-12 pb-24 z-20 pointer-events-auto">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="flex items-start justify-center lg:justify-start"
              >
                <div className="h-10 w-[1px] bg-white/30 hidden lg:block mr-5 shrink-0" />
                
                <div className="text-center lg:text-left">
                  <p className="text-sm font-medium tracking-wide text-white/80 md:text-base max-w-[20ch] mx-auto lg:mx-0 leading-snug">
                    {cap.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Global Background Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-900/10 blur-[150px] pointer-events-none z-0" />
    </div>
  );
}