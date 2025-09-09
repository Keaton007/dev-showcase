"use client";

import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import styles from '../styles/HeroSection.module.css';

const GITHUB_URL = 'https://github.com/Keaton007';
const LINKEDIN_URL = 'https://www.linkedin.com/in/keaton-jones-577640236/';
const RESUME_URL = '/Keaton Jones Resume.pdf';

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentColor, setCurrentColor] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const titles = [
    'Software Developer',
    'Software Engineer',
    'Full Stack Developer',
    'Backend Engineer',
    'Frontend Engineer',
    'Web Developer',
    'Mobile App Developer',
    'Junior Software Developer',
    'Code Engineer',
    'Software Enthusiast'
  ];

  const lightModeColors = [
    '#FF4500', // Orange Red
    '#00F0FF', // Cyan
    '#4169E1', // Royal Blue
    '#32CD32', // Lime Green
    '#FF69B4', // Hot Pink
    '#9370DB', // Medium Purple
    '#FF6347', // Tomato
    '#20B2AA', // Light Sea Green
    '#FF1493', // Deep Pink
    '#DC143C'  // Crimson
  ];

  const darkModeColors = [
    '#FF4500', // Orange Red
    '#00F0FF', // Cyan
    '#4169E1', // Royal Blue
    '#32CD32', // Lime Green
    '#FF69B4', // Hot Pink
    '#FFD700', // Gold
    '#9370DB', // Medium Purple
    '#FF6347', // Tomato
    '#20B2AA', // Light Sea Green
    '#FF1493'  // Deep Pink
  ];

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        // Generate random index for title, ensuring it's different from current
        let newTitleIndex;
        do {
          newTitleIndex = Math.floor(Math.random() * titles.length);
        } while (newTitleIndex === currentTitle && titles.length > 1);
        
        // Generate random index for color, ensuring it's different from current
        const currentColors = isDarkMode ? darkModeColors : lightModeColors;
        let newColorIndex;
        do {
          newColorIndex = Math.floor(Math.random() * currentColors.length);
        } while (newColorIndex === currentColor && currentColors.length > 1);
        
        setCurrentTitle(newTitleIndex);
        setCurrentColor(newColorIndex);
        setIsVisible(true);
      }, 1000); // Half of the transition duration (2s / 2)
    }, 5000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [titles.length, currentTitle, isDarkMode, currentColor]);

  return (
    <section id="hero" className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.textBlock}>
          <h1 className={styles.heading}>
            <span className={styles.keatonGradient}>I&apos;m Keaton,</span><br />
            <span className={styles.subheading}>
              <span className={styles.staticText}>a</span> <span 
                className={`${styles.animatedTitle} ${isVisible ? styles.visible : styles.hidden}`}
                style={{ color: (isDarkMode ? darkModeColors : lightModeColors)[currentColor] }}
              >
                {titles[currentTitle]}
              </span>
            </span>
          </h1>
          <div className={styles.socialButtons}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialButton}>
              <FaGithub className={styles.socialIcon} />
              <span>GitHub</span>
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" aria-label="Resume" className={styles.socialButton}>
              <FaFileAlt className={styles.socialIcon} />
              <span>Resume</span>
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialButton}>
              <FaLinkedin className={styles.socialIcon} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <div className={styles.imageBlock}>
          <img 
            src="/images/avatar.JPG" 
            alt="Keaton - Software Developer" 
            className={styles.avatarImage}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero; 