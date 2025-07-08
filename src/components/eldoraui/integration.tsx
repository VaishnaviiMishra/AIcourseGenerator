"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { JSX, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import { Marquee } from "../eldoraui/marquee";

const tiles = [
  {
    icon: <Image 
      src="/nextjs.svg" 
      alt="Next.js" 
      width={32} 
      height={32} 
      className="size-full"
    />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-40 blur-[15px]"></div>
    ),
  },
  {
    icon: <Image 
      src="/Zod.svg" 
      alt="Zod" 
      width={32} 
      height={32} 
      className="size-full"
    />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-40 blur-[15px]"></div>
    ),
  },
  {
    icon: <Image 
      src="/tailwind.svg" 
      alt="Tailwind" 
      width={32} 
      height={32} 
      className="size-full"
    />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-40 blur-[15px]"></div>
    ),
  },
  {
    icon: <Image 
      src="/Prisma.svg" 
      alt="Prisma" 
      width={32} 
      height={32} 
      className="size-full"
    />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-40 blur-[15px]"></div>
    ),
  },
  {
    icon: <Image 
      src="/Openai.svg" 
      alt="OpenAI" 
      width={32} 
      height={32} 
      className="size-full"
    />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-40 blur-[15px]"></div>
    ),
  },
  {
    icon: <Image 
      src="/Langchain.svg" 
      alt="Langchain" 
      width={32} 
      height={32} 
      className="size-full"
    />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-40 blur-[15px]"></div>
    ),
  },
];

function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Card({ icon, bg }: { icon: JSX.Element; bg: JSX.Element }) {
  const id = useId();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { 
          delay: Math.random() * 0.5, 
          ease: "easeOut", 
          duration: 0.8 
        },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative size-24 cursor-pointer overflow-hidden rounded-2xl border p-5",
        "bg-card [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05)]",
        "transform-gpu border-border hover:border-primary transition-all duration-300"
      )}
    >
      {icon}
      {bg}
    </motion.div>
  );
}

export function Integrations() {
  const [randomTiles, setRandomTiles] = useState<typeof tiles[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRandomTiles([
        shuffleArray([...tiles]),
        shuffleArray([...tiles]),
        shuffleArray([...tiles]),
        shuffleArray([...tiles])
      ]);
    }
  }, []);

  return (
    <section id="integrations" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
          >
            Built With Modern Technologies
          </motion.h2>
          
          <div className="relative w-full overflow-hidden">
            {randomTiles.map((tileSet, index) => (
              <Marquee
                key={`marquee-${index}`}
                reverse={index % 2 === 0}
                className={`${index % 2 === 0 ? '[--duration:20s]' : '[--duration:25s]'} mb-4`}
                repeat={4}
              >
                {tileSet.map((tile, idx) => (
                  <Card key={`tile-${index}-${idx}`} {...tile} />
                ))}
              </Marquee>
            ))}
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-background/80 dark:bg-background/80 rounded-full p-8 backdrop-blur-sm">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground">
                  Cutting Edge Stack
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}