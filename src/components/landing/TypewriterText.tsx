"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Speed of typing

    return () => clearInterval(interval);
  }, [text, started]);

  if (!started) return null;

  return (
    <motion.p 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="text-emerald-400/90"
    >
      {'>'} {displayedText}
    </motion.p>
  );
}
