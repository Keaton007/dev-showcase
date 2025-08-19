import React from 'react';
import styles from '../styles/HeroSection.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.textBlock}>
          <h1 className={styles.heading}>
            <span className={styles.keatonGradient}>I&apos;m Keaton,</span><br />
            <span className={styles.subheading}>a Software Developer</span>
          </h1>
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