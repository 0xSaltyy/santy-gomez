"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play, Square, Volume2 } from "lucide-react";

type ArticleAudioPlayerProps = {
  title: string;
  abstract?: string | null;
  content: string;
};

function cleanMarkdownForSpeech(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function ArticleAudioPlayer({ title, abstract, content }: ArticleAudioPlayerProps) {
  const reduceMotion = useReducedMotion();
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(1);

  const speechText = useMemo(() => [title, abstract, content].filter(Boolean).map((part) => cleanMarkdownForSpeech(String(part))).join(". "), [title, abstract, content]);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window);

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function play() {
    if (!supported) {
      return;
    }

    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      setSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = rate;
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  function pause() {
    window.speechSynthesis.pause();
    setPaused(true);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  }

  return (
    <motion.section
      className="mt-9 rounded-lg border border-white/75 bg-white/70 p-5 shadow-soft backdrop-blur-xl print:hidden"
      initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-80px" }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.16em] text-forest">
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Listen to this article
          </p>
          <p className="mt-2 text-sm leading-6 text-ink/60">{supported ? "A browser-based audio reading of the title, abstract, and article body." : "Audio reading is not supported in this browser."}</p>
        </div>
        {supported ? (
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="button-secondary min-h-10 px-3 py-2 text-xs" onClick={play}>
              <Play className="h-4 w-4" aria-hidden="true" />
              {speaking && paused ? "Resume" : "Play"}
            </button>
            <button type="button" className="button-secondary min-h-10 px-3 py-2 text-xs" onClick={pause} disabled={!speaking || paused}>
              <Pause className="h-4 w-4" aria-hidden="true" />
              Pause
            </button>
            <button type="button" className="button-secondary min-h-10 px-3 py-2 text-xs" onClick={stop} disabled={!speaking && !paused}>
              <Square className="h-4 w-4" aria-hidden="true" />
              Stop
            </button>
            <select className="input-field mt-0 min-h-10 w-auto py-2 text-xs" value={rate} onChange={(event) => setRate(Number(event.target.value))} aria-label="Audio speed">
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}
