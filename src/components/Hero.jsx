import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full mx-auto max-w-6xl px-6 pt-10 md:pt-16">
      <motion.h1
        className="text-4xl md:text-6xl font-semibold tracking-tight text-emerald-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Nahida — Whisper of Morning Light
      </motion.h1>
      <motion.p
        className="mt-3 text-emerald-900/80 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
      >
        Nahida, guardian of knowledge and nature. Small and gentle, yet wise as the light between the trees.
      </motion.p>
    </section>
  );
}
