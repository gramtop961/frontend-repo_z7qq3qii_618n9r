import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

const LORE = [
  'In the hush of dawn, she listens — leaves tell stories only patient hearts can hear.',
  'Wisdom is a soft step; it never startles the forest, it walks with it.',
  'Light through the canopy becomes her language; every beam a gentle stanza.',
  'Tiny as a seed, vast as a library — she keeps memories the world forgot.',
];

export default function LorePanel() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const line = useMemo(() => LORE[index % LORE.length], [index]);

  return (
    <div className="relative w-full mx-auto max-w-6xl px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-4 py-2 shadow hover:bg-emerald-700 transition-colors"
          aria-expanded={open}
        >
          <BookOpen size={18} /> Lore
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % LORE.length)}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur text-emerald-800 px-3 py-2 shadow hover:bg-white"
        >
          <Sparkles size={18} /> New line
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-2xl border border-emerald-200/60 bg-white/70 backdrop-blur p-5 shadow-lg"
          >
            <p className="text-emerald-900/90 leading-relaxed">{line}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
