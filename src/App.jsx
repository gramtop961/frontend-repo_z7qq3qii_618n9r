import React from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Scene3D from './components/Scene3D';
import LorePanel from './components/LorePanel';
import AmbientAudio from './components/AmbientAudio';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-50 via-white to-emerald-50 text-emerald-900">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8),rgba(255,255,255,0)_60%),radial-gradient(ellipse_at_bottom_right,rgba(209,250,229,0.6),rgba(209,250,229,0)_60%)]" />
      </div>

      <header className="relative mx-auto max-w-6xl px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 backdrop-blur border border-emerald-400/30" />
            <span className="font-medium tracking-tight">Forest Atelier</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-emerald-900/70">
            <a className="hover:text-emerald-900" href="#scene">Scene</a>
            <a className="hover:text-emerald-900" href="#lore">Lore</a>
          </nav>
        </motion.div>
      </header>

      <main className="relative space-y-8 md:space-y-10 pb-16">
        <Hero />

        <section id="scene" className="px-6">
          <Scene3D />
        </section>

        <section id="lore">
          <LorePanel />
        </section>

        <section className="px-6 max-w-6xl mx-auto">
          <motion.div
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
            }}
          >
            {["Breath", "Blink", "Tresses"].map((label, i) => (
              <motion.div
                key={label}
                className="rounded-2xl border border-emerald-200/60 bg-white/70 backdrop-blur p-5 shadow"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                <h3 className="font-medium">{label}</h3>
                <p className="text-sm text-emerald-900/80 mt-1">
                  Subtle idle motion crafted to feel alive — gentle rhythms, quiet presence.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <footer className="relative px-6 py-10 text-center text-sm text-emerald-900/70">
        Made with light, leaves, and code.
      </footer>

      <AmbientAudio />
    </div>
  );
}
