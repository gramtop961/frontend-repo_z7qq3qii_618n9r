import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientAudio() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;
    if (enabled) {
      const play = async () => {
        try { await audio.play(); } catch (e) { /* ignore */ }
      };
      play();
    } else {
      audio.pause();
    }
  }, [enabled]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setEnabled((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-2 text-emerald-900 shadow hover:bg-white"
      >
        {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="text-sm">{enabled ? 'Ambient on' : 'Ambient off'}</span>
      </button>
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/03/15/audio_b5f2a3c6b5.mp3" />
    </div>
  );
}
