"use client";

import React, { useState, useEffect } from 'react';
import styles from '../styles/AboutSection.module.css';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
      setOverlayOpacity(isDark ? 1 : 0);
    };

    // Check on mount
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const wasDark = isDarkMode;
          const isNowDark = document.documentElement.classList.contains('dark');
          
          if (wasDark !== isNowDark) {
            setIsTransitioning(true);
            setIsDarkMode(isNowDark);
            
            // Smoothly animate the overlay opacity
            if (isNowDark) {
              // Light to dark: fade in overlay
              setOverlayOpacity(1);
            } else {
              // Dark to light: fade out overlay
              setOverlayOpacity(0);
            }
            
            // Remove transitioning class after transition completes
            setTimeout(() => {
              setIsTransitioning(false);
            }, 5000);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [isDarkMode]);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>About Me</h2>
        <div className={styles.fourBoxGrid}>
          {/* Top Left - My Journey Text */}
          <div className={styles.box}>
            <h3 className={styles.subheading}>My Journey</h3>
            <p className={styles.paragraph}>
              My journey as a developer began with workflow automation and UI building in Pega, 
              but my passion for building impactful software quickly led me to full-stack development. 
              I love exploring new technologies, collaborating with creative teams, and crafting solutions that make a difference. 
              Whether I&apos;m architecting scalable systems or designing intuitive interfaces, 
              I&apos;m driven by curiosity and a desire to learn. 
              Outside of coding, you&apos;ll find me scuba diving, hiking, or spending time with my family. 
              Let&apos;s build something amazing together!
            </p>
          </div>
          
          {/* Top Right - Road Image */}
          <div className={styles.box}>
            <img 
              src="/images/roadimage.jpg" 
              alt="Journey road" 
              className={styles.sectionImage}
            />
          </div>
          
          {/* Bottom Left - Coding Image */}
          <div className={styles.box}>
            <img 
              src="/images/codingimage.jpg" 
              alt="Coding workspace" 
              className={styles.sectionImage}
            />
          </div>
          
          {/* Bottom Right - Why I Code Text */}
          <div className={styles.box}>
            <h3 className={styles.subheading}>Why I Code</h3>
            <p className={styles.paragraph}>
              I love the creativity of coding. There&apos;s something magical about taking an idea from your imagination 
              and watching it come to life on screen. Every problem is a puzzle waiting to be solved, 
              and I get genuine joy from finding elegant solutions to complex challenges.
            </p>
            <p className={styles.paragraph}>
              But what really drives me is seeing people actually use what I build. There&apos;s no better feeling 
              than watching someone interact with your code and seeing that moment when it clicks - 
              when they realize this tool or feature makes their life easier, their work more efficient, 
              or their day a little brighter. That&apos;s why I code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 