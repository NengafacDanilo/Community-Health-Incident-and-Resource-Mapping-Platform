import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function GradientBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      bgRef.current.style.setProperty('--mouse-x', `${x}%`);
      bgRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Animated gradient background */}
      <div 
        ref={bgRef}
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50" />
        
        {/* Animated blobs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, transparent 70%)',
            left: 'var(--mouse-x)',
            top: 'var(--mouse-y)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
            left: `calc(100% - var(--mouse-x))`,
            top: `calc(100% - var(--mouse-y))`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
            left: `calc(var(--mouse-x) * 0.8)`,
            top: `calc(var(--mouse-y) * 1.2)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%)',
            left: `calc(100% - var(--mouse-x) * 0.7)`,
            top: `calc(var(--mouse-y) * 0.9)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </>
  );
}
