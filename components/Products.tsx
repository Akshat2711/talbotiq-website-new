"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Cpu } from 'lucide-react';
import CircularGallery from '@/helper/CircularGallery';

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
              if (index < iteration) return text[index];
              if (letter === " ") return " "; 
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          if (interval !== null) clearInterval(interval);
          if (loopInterval) loopTimeout = setTimeout(runScramble, loopInterval);
        }
        iteration += 1 / 2;
      }, 30); 
    };

    runScramble();

    return () => {
      if (interval !== null) clearInterval(interval);
      if (loopTimeout !== null) clearTimeout(loopTimeout);
    };
  }, [text, isInView, loopInterval]);

  return <span ref={ref}>{displayText}</span>;
}

// --- Helper to convert HEX to RGB for Canvas gradients ---
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
    : '0,0,0';
};

// --- Mocked Product Data with Colors and Relevant Images ---
const stackedProducts = [
  {
    id: "virtual-recruiter",
    category: "AI Agents",
    name: "Virtual Recruiter",
    description: "An autonomous agent that sources, screens, and engages candidates 24/7 without human intervention.",
    mockCode: "agent.deploy({ role: 'Technical Sourcer' })",
    bgColor: "#2e0854", // Deep Purple
    accentColor: "#c084fc", // Purple-400
    // Tech interview / recruiting image
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" 
  },
  {
    id: "custom-ai-agents",
    category: "AI Agents",
    name: "Custom Agent Builder",
    description: "Build bespoke agents for any workflow. Connect your data sources and let the LLM handle the reasoning.",
    mockCode: "workflow.trigger('on_data_ingest').run(Agent)",
    bgColor: "#1e1b4b", // Deep Indigo
    accentColor: "#818cf8", // Indigo-400
    // Nodes / Code image
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "ats",
    category: "Talent & Team Tools",
    name: "Intelligent ATS",
    description: "Applicant tracking on autopilot. Automatically rank inbound applications based on semantic skill matching.",
    mockCode: "candidates.filter(c => c.score > 0.85)",
    bgColor: "#022c22", // Deep Emerald
    accentColor: "#34d399", // Emerald-400
    // Dashboard / analytics image
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "document-parser",
    category: "Talent & Team Tools",
    name: "Document Parser",
    description: "Extract structured JSON data from CVs, PDFs, and unstructured text with near-perfect accuracy.",
    mockCode: "const data = await parser.extractJSON(pdf)",
    bgColor: "#042f2e", // Deep Teal
    accentColor: "#2dd4bf", // Teal-400
    // Documents / Parsing image
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "video-interview",
    category: "Talent Tools",
    name: "AI Video Interviewer",
    description: "Conduct automated preliminary interviews. Analyze sentiment, tone, and technical accuracy in real-time.",
    mockCode: "interview.analyze({ sentiment: true })",
    bgColor: "#451a03", // Deep Amber
    accentColor: "#fbbf24", // Amber-400
    // Video call image
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "cctv-analytics",
    category: "Security",
    name: "CCTV Analytics",
    description: "Real-time physical security intelligence. Detect anomalies, track foot traffic, and automate alerts.",
    mockCode: "camera.detectAnomalies({ risk: 'high' })",
    bgColor: "#4c0519", // Deep Rose
    accentColor: "#fb7185", // Rose-400
    // Camera / Security image
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ProductsSection() {
  const [galleryItems, setGalleryItems] = useState<{ image: string; text: string }[]>([]);

  useEffect(() => {
    const buildCards = async () => {
      const items = await Promise.all(stackedProducts.map(async (product) => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1100;
        const ctx = canvas.getContext('2d');
        if (!ctx) return { image: '', text: '' };

        // 1. Draw Solid Background Color
        ctx.fillStyle = product.bgColor;
        ctx.fillRect(0, 0, 800, 1100);

        // 2. Load & Draw Relevant Image (Top half)
        try {
          const img = new Image();
          img.crossOrigin = "anonymous"; 
          img.src = product.imageUrl;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
          
          // Draw the image filling the top half
          ctx.drawImage(img, 0, 0, 800, 550);

          // Blend the image seamlessly into the solid background color
          const rgbBg = hexToRgb(product.bgColor);
          const blend = ctx.createLinearGradient(0, 350, 0, 550);
          blend.addColorStop(0, `rgba(${rgbBg},0)`);
          blend.addColorStop(1, `rgba(${rgbBg},1)`);
          
          ctx.fillStyle = blend;
          ctx.fillRect(0, 350, 800, 200);
        } catch (e) {
          console.warn(`Could not load ref image for ${product.name}`, e);
        }

        // 3. Draw Category Tag
        ctx.fillStyle = product.accentColor; 
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(product.category.toUpperCase(), 50, 600);

        // 4. Draw Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 55px sans-serif';
        ctx.fillText(product.name, 50, 670);

        // 5. Draw Description (with word wrapping)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Slightly transparent white
        ctx.font = '30px sans-serif';
        const words = product.description.split(' ');
        let line = '';
        let y = 740;
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > 700 && n > 0) {
                ctx.fillText(line, 50, y);
                line = words[n] + ' ';
                y += 42;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, 50, y);

        // 6. Draw Mock Code Block
        y += 80;
        ctx.fillStyle = 'rgba(0,0,0,0.4)'; // Dark glass effect box
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(50, y, 700, 90, 16);
            ctx.fill();
        } else {
            ctx.fillRect(50, y, 700, 90);
        }

        ctx.fillStyle = product.accentColor;
        ctx.font = '22px monospace';
        ctx.fillText(`> ${product.mockCode}`, 80, y + 55);

        return {
          image: canvas.toDataURL('image/jpeg', 0.85),
          text: "" // Text is baked directly onto the texture
        };
      }));

      setGalleryItems(items);
    };

    buildCards();
  }, []);

  return (
    <section 
      id="products" 
      className="bg-[#09090b] text-white py-12 md:py-16 lg:py-20 w-full font-sans border-t border-white/5 relative"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-[500px] bg-[#7000FF]/5 blur-[150px] md:blur-[200px] rounded-full pointer-events-none z-0" />

      <div className="w-full px-4 sm:px-6 md:px-12 xl:px-24 relative z-10">
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
      </div>

      <div className="w-[100vw] ml-[calc(50%-50vw)] sm:w-full sm:ml-0 relative z-50 mt-4 md:mt-12">
        <div style={{ height: '1000px', position: 'relative' }} className="w-full">
          {galleryItems.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-white/50 animate-pulse font-mono">
              [ Generating Interfaces... ]
            </div>
          ) : (
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.05}
            />
          )}
        </div>
      </div>
    </section>
  );
}