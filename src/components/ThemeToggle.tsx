"use client";

import React, { useEffect, useState } from "react";

const switchWidth = 72;
const switchHeight = 32;
const knobSize = 28;

// Compact button for mobile/tablet
const compactButtonSize = 48;

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Only set state based on current class, do not default to dark mode
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [dark]);

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 32,
        zIndex: 10001,
        userSelect: "none",
      }}
    >
      {/* Desktop Toggle Switch - Only for screens larger than 1300px */}
      <div className="theme-toggle-desktop">
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDark((d) => !d)}
          style={{
            width: switchWidth,
            height: switchHeight,
            borderRadius: switchHeight / 2,
            border: "none",
            background: dark
              ? "linear-gradient(90deg, #222 0%, #00F0FF 100%)"
              : "linear-gradient(90deg, #FFD580 0%, #FF9900 50%, #FF4500 100%)",
            boxShadow: dark
              ? "0 2px 12px 0 #00F0FF55"
              : "0 2px 12px 0 #FFA50088",
            display: "flex",
            alignItems: "center",
            padding: 2,
            cursor: "pointer",
            transition: "background 2s, color 0.5s, border-color 0.5s, box-shadow 0.5s, fill 0.5s",
            position: "relative",
          }}
        >
          {/* Sliding knob with icon */}
          <span
            style={{
              position: "absolute",
              top: 2,
              left: dark ? switchWidth - knobSize - 2 : 2,
              width: knobSize,
              height: knobSize,
              borderRadius: "50%",
              background: dark ? "#00F0FF" : "#fffbe9",
              boxShadow: dark
                ? "0 2px 8px #00F0FF99"
                : "0 2px 8px #ef444455",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "left 0.5s, background 2s, color 0.5s, border-color 0.5s, box-shadow 0.5s, fill 0.5s",
              overflow: "hidden",
            }}
          >
            {/* Sun icon */}
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: dark ? 0 : 1,
                transition: "opacity 0.5s, color 0.5s, background 2s, border-color 0.5s, box-shadow 0.5s, fill 0.5s",
              }}
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><g><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></g></svg>
            </span>
            {/* Moon icon */}
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: dark ? 1 : 0,
                transition: "opacity 0.5s, color 0.5s, background 2s, border-color 0.5s, box-shadow 0.5s, fill 0.5s",
              }}
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            </span>
          </span>
        </button>
      </div>

      {/* Mobile/Tablet/Desktop Compact Button - For screens 1300px and below */}
      <div className="theme-toggle-mobile">
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDark((d) => !d)}
          style={{
            width: compactButtonSize,
            height: compactButtonSize,
            borderRadius: "50%",
            border: "none",
            background: dark
              ? "linear-gradient(135deg, #00F0FF 0%, #4169E1 100%)"
              : "linear-gradient(135deg, #FFD580 0%, #FF4500 100%)",
            boxShadow: dark
              ? "0 4px 16px 0 #00F0FF55"
              : "0 4px 16px 0 #FFA50088",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 2s, color 0.5s, border-color 0.5s, box-shadow 0.5s, fill 0.5s, transform 0.2s",
            position: "relative",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {/* Sun icon for light mode */}
          <span
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: dark ? 0 : 1,
              transition: "opacity 0.5s, color 0.5s, background 2s, border-color 0.5s, box-shadow 0.5s, fill 0.5s",
            }}
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><g><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></g></svg>
          </span>
          {/* Moon icon for dark mode */}
          <span
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: dark ? 1 : 0,
              transition: "opacity 0.5s, color 0.5s, background 2s, border-color 0.5s, box-shadow 0.5s, fill 0.5s",
            }}
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          </span>
        </button>
      </div>
    </div>
  );
} 