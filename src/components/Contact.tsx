"use client";

import React, { useState, useRef, useEffect } from 'react';
import Calendar from './Calendar';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from '../styles/ContactSection.module.css';

const Contact = () => {
  const [meetingCardStyle, setMeetingCardStyle] = useState({});
  const [connectCardStyle, setConnectCardStyle] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const meetingCardRef = useRef<HTMLDivElement>(null);
  const connectCardRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRef: React.RefObject<HTMLDivElement | null>, setCardStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = -(y - centerY) / 10;
    const rotateY = -(centerX - x) / 10;
    
    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = (setCardStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>) => {
    setCardStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>Let&apos;s Connect</h2>
          <p className={styles.paragraph}>I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
        </div>
        
        <motion.div className={styles.grid} variants={staggerContainer} initial="initial" animate="animate">
          <motion.div 
            ref={meetingCardRef}
            className={styles.card}
            variants={fadeInUp}
            onMouseMove={(e) => handleMouseMove(e, meetingCardRef, setMeetingCardStyle)}
            onMouseLeave={() => handleMouseLeave(setMeetingCardStyle)}
            style={meetingCardStyle}
          >
            {/* React-controlled overlay for smooth transitions */}
            <div 
              className={`${styles.cardOverlay} ${isTransitioning ? styles.transitioning : ''}`}
              style={{
                opacity: overlayOpacity,
                transition: 'opacity 5s ease-in-out'
              }}
            />
            
            <h3 className={styles.cardHeading}>Schedule a Meeting</h3>
            <p className={styles.cardDescription}>View my availability and schedule a meeting directly through the calendar. I&apos;ll receive a notification and add it to my schedule.</p>
            <div className={styles.status}><span>Available for meetings</span></div>
          </motion.div>
          <motion.div 
            ref={connectCardRef}
            className={styles.card}
            variants={fadeInUp}
            onMouseMove={(e) => handleMouseMove(e, connectCardRef, setConnectCardStyle)}
            onMouseLeave={() => handleMouseLeave(setConnectCardStyle)}
            style={connectCardStyle}
          >
            {/* React-controlled overlay for smooth transitions */}
            <div 
              className={`${styles.cardOverlay} ${isTransitioning ? styles.transitioning : ''}`}
              style={{
                opacity: overlayOpacity,
                transition: 'opacity 5s ease-in-out'
              }}
            />
            
            <h3 className={styles.cardHeading}>Other Ways to Connect</h3>
            <p className={styles.cardDescription}>Feel free to reach out through any of these channels:</p>
            <ul className={styles.linksList}>
              <li><a href="mailto:keatonjonesy@gmail.com" className={styles.link}><FaEnvelope className={styles.linkIcon} />keatonjonesy@gmail.com</a></li>
              <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.link}><FaGithub className={styles.linkIcon} />GitHub</a></li>
              <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className={styles.link}><FaLinkedin className={styles.linkIcon} />LinkedIn</a></li>
              <li><a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.link}><FaTwitter className={styles.linkIcon} />Twitter</a></li>
            </ul>
          </motion.div>
        </motion.div>
        <div className={styles.calendarWrapper}><Calendar /></div>
      </div>
    </section>
  );
};

export default Contact; 