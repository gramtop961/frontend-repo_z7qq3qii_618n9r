import React, { useEffect, useMemo, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

// Optional: provide a Spline scene URL via the `scene` query param, e.g.
// ?scene=https://prod.spline.design/xxxxx/scene.splinecode
// If not provided, the component shows an ethereal fallback with particles and rays

const getQueryParam = (key) => {
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get(key);
  } catch (e) {
    return null;
  }
};

const FloatingParticles = ({ count = 80 }) => {
  const particles = useMemo(() =>
    new Array(count).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.25,
    })), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: 'blur(0.5px)',
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const VolumetricRays = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ rotate, y: translate }}
    >
      <div className="absolute -top-20 -left-10 w-[60%] h-[80%] bg-gradient-to-b from-yellow-200/20 via-emerald-200/10 to-transparent blur-3xl rounded-3xl" />
      <div className="absolute top-10 right-0 w-[45%] h-[70%] bg-gradient-to-b from-emerald-200/25 via-white/10 to-transparent blur-2xl rounded-3xl" />
      <div className="absolute bottom-10 left-1/4 w-[30%] h-[50%] bg-gradient-to-b from-white/10 to-transparent blur-2xl rounded-3xl" />
    </motion.div>
  );
};

const HoverPetals = ({ active }) => {
  const petals = useMemo(() => new Array(12).fill(0).map((_, i) => ({ id: i })), []);
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute w-2 h-3 bg-emerald-200/70 rounded-full"
          style={{ left: '50%', top: '50%' }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 160,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

export default function Scene3D() {
  const [hovered, setHovered] = useState(false);
  const [sceneUrl, setSceneUrl] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const qp = getQueryParam('scene');
    if (qp) setSceneUrl(qp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-[80vh] rounded-2xl overflow-hidden bg-gradient-to-b from-white via-emerald-50 to-emerald-100/40 shadow-[inset_0_0_60px_rgba(255,255,255,0.6)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {sceneUrl ? (
        <Spline scene={sceneUrl} style={{ width: '100%', height: '100%' }} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-40 h-40 rounded-full bg-emerald-200/40 backdrop-blur-md border border-white/40 shadow-2xl"
            animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
        </div>
      )}

      <VolumetricRays />
      <FloatingParticles />
      <HoverPetals active={hovered} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-emerald-50/80 via-white/10 to-transparent" />

      {!sceneUrl && (
        <div className="absolute bottom-4 right-4 text-xs text-emerald-900/70 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
          Tip: attach your Spline scene with ?scene=YOUR_URL
        </div>
      )}
    </div>
  );
}
