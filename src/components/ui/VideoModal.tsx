import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: mute and play
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
      setIsPlaying(true);
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          
          {/* Heavy Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020407]/90 backdrop-blur-2xl cursor-pointer"
          />

          {/* Modal Container - Taller on mobile and fills without blackbars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative z-10 w-full max-w-sm sm:max-w-3xl md:max-w-4xl h-[78vh] sm:h-[650px] max-h-[88vh] rounded-3xl bg-[#080C14] border border-kbj-green/40 shadow-[0_0_90px_rgba(34,197,94,0.3)] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#0A0E17]/95 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-kbj-green animate-pulse" />
                <span className="font-mono text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">
                  KBJ TRADING // Presentación
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player - object-cover removes all blackbars completely */}
            <div className="relative flex-1 w-full bg-[#030508] overflow-hidden group">
              <video
                ref={videoRef}
                src="/videomodal.mp4"
                playsInline
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Center Play Overlay Icon when paused */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-kbj-green/90 text-slate-950 flex items-center justify-center shadow-glow-green hover:scale-110 transition-transform"
                >
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </button>
              )}

              {/* Video Overlay Controls */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-kbj-lime" />}
                  </button>
                </div>

                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Footer Call to Action */}
            <div className="px-5 py-3.5 bg-[#0A0E17]/95 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
              <span className="text-xs text-slate-400 font-sans hidden sm:inline">
                Formación institucional personalizada 1 a 1.
              </span>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-kbj-green text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-kbj-lime transition-all active:scale-95 text-center"
              >
                INGRESAR AL SITIO →
              </button>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
