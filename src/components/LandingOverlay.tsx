"use client";

import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import styles from '../styles/LandingOverlay.module.css';

const GITHUB_URL = 'https://github.com/yourusername';
const LINKEDIN_URL = 'https://linkedin.com/in/yourusername';
const RESUME_URL = '/resume.pdf'; // Update with your actual resume link

const LandingOverlay = () => {
  const [hidden, setHidden] = useState(false);
  const [slidingUp, setSlidingUp] = useState(false);
  const [theme, setTheme] = useState(typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light');

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Slide up and then hide overlay
  const dismissOverlay = () => {
    setSlidingUp(true);
    setTimeout(() => setHidden(true), 900); // match CSS duration
  };

  useEffect(() => {
    const handleHide = () => {
      dismissOverlay();
    };
    window.addEventListener('scroll', handleHide, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleHide);
    };
  }, []);

  useEffect(() => {
    // Prevent scrolling when overlay is visible
    if (!hidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hidden]);

  if (hidden) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only trigger if clicking the overlay background or center content, not icon buttons
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains(styles.centerContent)) {
      dismissOverlay();
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles.overlay} ${slidingUp ? styles.slideUp : ''}`} onClick={handleOverlayClick}>
      <div className={styles.centerContent} onClick={handleOverlayClick}>
        <h1 className={styles.welcome}>Welcome to</h1>
        <h2 className={styles.portfolio}>My Portfolio Website</h2>
        <div className={styles.iconRow}>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.iconCircle} onClick={stopPropagation}>
            <FaGithub className={styles.icon} />
          </a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" aria-label="Resume" className={styles.iconCircle} onClick={stopPropagation}>
            <FaFileAlt className={styles.icon} />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.iconCircle} onClick={stopPropagation}>
            <FaLinkedin className={styles.icon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingOverlay; 