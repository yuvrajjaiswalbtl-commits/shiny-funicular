import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, ChevronUp, ChevronDown } from 'lucide-react';
import { sound } from '../services/soundService';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(sound.isAmbientActive());
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [volume, setVolume] = useState<number>(sound.getVolume());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    sound.subscribeAmbientState((active) => setIsPlaying(active));
  }, []);

  const handleTogglePlay = () => {
    sound.playChime();
    const active = sound.toggleAmbientSound();
    setIsPlaying(active);
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    sound.setMuted(nextMute);
    setIsMuted(nextMute);
    if (!nextMute) {
      sound.playWoodClick();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <div className="flex flex-col items-start">
        {/* Expanded Controls Panel */}
        {isExpanded && (
          <div className="mb-2 p-3 rounded-2xl bg-slate-900/95 dark:bg-[#070e1c]/95 border border-amber-500/30 text-white shadow-2xl backdrop-blur-md w-60 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                Himalayan Soundscape
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-white"
                aria-label="Collapse audio controls"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="py-2.5">
              <p className="text-[11px] text-slate-300">
                Procedural Tibetan singing bowl drone synthesized via Web Audio API.
              </p>

              {/* Volume Slider */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Sound Volume</span>
                  <span className="tabular-nums font-mono">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={handleToggleMute}
                className="text-[11px] text-slate-300 hover:text-amber-400 flex items-center gap-1.5"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isMuted ? "Unmute" : "Mute Sound"}</span>
              </button>

              <button
                type="button"
                onClick={handleTogglePlay}
                className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Compact Floating Audio Badge */}
        <div className="flex items-center gap-1.5 p-1.5 pl-3 rounded-full bg-slate-900/90 dark:bg-[#070e1c]/90 border border-amber-500/30 text-white shadow-xl backdrop-blur-md">
          {/* Animated Waveform when playing */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="flex items-center gap-2 text-xs font-medium text-slate-200 hover:text-amber-400 transition-colors focus:outline-none"
            title={isPlaying ? "Pause ambient soundscape" : "Play ambient Himalayan soundscape"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-amber-400" />
            )}

            <span className="text-[11px] hidden sm:inline">
              {isPlaying ? "Singing Bowl" : "Sound"}
            </span>

            {isPlaying && !isMuted ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce" style={{ height: '60%', animationDelay: '0ms' }} />
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce" style={{ height: '40%', animationDelay: '300ms' }} />
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce" style={{ height: '80%', animationDelay: '450ms' }} />
              </div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            )}
          </button>

          <span className="w-px h-4 bg-white/20 mx-0.5" />

          {/* Expand / Settings Chevron */}
          <button
            type="button"
            onClick={() => {
              sound.playWoodClick();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-amber-400 hover:bg-white/10 transition-colors"
            aria-label="Expand sound settings"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
