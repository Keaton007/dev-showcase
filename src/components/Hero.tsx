import React from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import styles from '../styles/HeroSection.module.css';

const GITHUB_URL = 'https://github.com/Keaton007';
const LINKEDIN_URL = 'https://www.linkedin.com/in/keaton-jones-577640236/';
const RESUME_URL = '/Keaton_Jones_Resume';

const Hero = () => {
  return (
    <section id="hero" className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.textBlock}>
          <h1 className={styles.heading}>
            <span className={styles.keatonGradient}>I&apos;m Keaton,</span><br />
            <span className={styles.subheading}>a Software Developer</span>
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