"use client";

import React from 'react';
import Image from 'next/image';
import styles from '../styles/AboutSection.module.css';

const About = () => {

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
            <Image 
              src="/images/roadimage.jpg" 
              alt="Journey road" 
              className={styles.sectionImage}
              width={800}
              height={320}
            />
          </div>
          
          {/* Bottom Left - Coding Image */}
          <div className={styles.box}>
            <Image 
              src="/images/codingimage.jpg" 
              alt="Coding workspace" 
              className={styles.sectionImage}
              width={800}
              height={320}
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