"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import {
  FaReact, FaNodeJs, FaPython, FaDocker,
  FaDatabase, FaVuejs, FaGithub as FaGithubIcon, FaBitbucket,
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb,
  SiPostgresql, SiMysql, SiGraphql, SiExpress, SiNestjs, SiPostman,
  SiInsomnia, SiSwagger, SiJest, SiCypress,
  SiSelenium, SiKubernetes
} from 'react-icons/si';
import styles from '../styles/PersonalShowcase.module.css';

const projects = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    description: "A smart task management application that uses AI to prioritize and organize your tasks based on deadlines, importance, and your work patterns.",
    technologies: ["React", "Node.js", "OpenAI", "MongoDB"],
    image: "/projects/task-manager.jpg",
    github: "https://github.com/yourusername/task-manager",
    live: "https://task-manager-demo.com",
    featured: true
  },
  {
    id: 2,
    title: "Real-time Chat Application",
    description: "A modern chat application with real-time messaging, file sharing, and video call capabilities. Built with WebRTC and WebSocket technologies.",
    technologies: ["Next.js", "Socket.io", "WebRTC", "TailwindCSS"],
    image: "/projects/chat-app.jpg",
    github: "https://github.com/yourusername/chat-app",
    live: "https://chat-app-demo.com",
    featured: true
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, shopping cart, payment processing, and order tracking.",
    technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
    image: "/projects/ecommerce.jpg",
    github: "https://github.com/yourusername/ecommerce",
    live: "https://ecommerce-demo.com",
    featured: true
  }
];

const certificates = [
  {
    id: 1,
    title: "C# Programming",
    issuer: "University of Utah",
    date: "2023",
    description: "Comprehensive C# programming certification covering object-oriented programming, .NET framework, and advanced C# features.",
    image: "/certificates/csharp.jpg"
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    issuer: "University of Utah",
    date: "2023",
    description: "Complete full-stack web development certification including frontend, backend, database design, and deployment strategies.",
    image: "/certificates/fullstack.jpg"
  }
];

const techIcons = [
  { icon: <FaReact />, name: 'React', color: '#61DAFB' },
  { icon: <SiNextdotjs />, name: 'Next.js', color: '#000000' },
  { icon: <FaVuejs />, name: 'Vue.js', color: '#4FC08D' },
  { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#06B6D4' },
  { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
  { icon: <SiExpress />, name: 'Express', color: '#000000' },
  { icon: <SiNestjs />, name: 'NestJS', color: '#E0234E' },
  { icon: <FaPython />, name: 'Python', color: '#3776AB' },
  { icon: <FaDatabase />, name: 'SQLDatabase', color: '#336791' },
  { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
  { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
  { icon: <SiMysql />, name: 'MySQL', color: '#4479A1' },
  { icon: <FaDocker />, name: 'Docker', color: '#2496ED' },
  { icon: <SiKubernetes />, name: 'Kubernetes', color: '#326CE5' },
  { icon: <FaGithubIcon />, name: 'GitHub', color: '#181717' },
  { icon: <FaBitbucket />, name: 'Bitbucket', color: '#0052CC' },
  { icon: <SiPostman />, name: 'Postman', color: '#FF6C37' },
  { icon: <SiInsomnia />, name: 'Insomnia', color: '#4000BF' },
  { icon: <SiSwagger />, name: 'Swagger', color: '#85EA2D' },
  { icon: <SiJest />, name: 'Jest', color: '#C21325' },
  { icon: <SiCypress />, name: 'Cypress', color: '#17202C' },
  { icon: <SiSelenium />, name: 'Selenium', color: '#43B02A' },
  { icon: <SiGraphql />, name: 'GraphQL', color: '#E10098' },
];

const tabs = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'skills', label: 'My Skills' }
];

const PersonalShowcase = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [skillsCardStyle, setSkillsCardStyle] = useState<React.CSSProperties>({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const skillsCardRef = useRef<HTMLDivElement>(null);

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

  const renderProjects = () => (
    <div className={styles.projectsGrid}>
      {projects.map((project) => (
        <div key={project.id} className={styles.projectCard}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>
          <div className={styles.techList}>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.techTag}>{tech}</span>
            ))}
          </div>
          <div className={styles.projectLinks}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
              <FaGithub className={styles.linkIcon} />
              <span>Code</span>
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.projectLinkDemo}>
              <FaExternalLinkAlt className={styles.linkDemoIcon} />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCertificates = () => (
    <div className={styles.certificatesGrid}>
      {certificates.map((cert) => (
        <div key={cert.id} className={styles.certificateCard}>
          <div className={styles.certificateImage}>
            <div className={styles.certificatePlaceholder}>
              <span className={styles.certificateIcon}>🏆</span>
            </div>
          </div>
          <div className={styles.certificateContent}>
            <h3 className={styles.certificateTitle}>{cert.title}</h3>
            <p className={styles.certificateIssuer}>{cert.issuer}</p>
            <p className={styles.certificateDate}>{cert.date}</p>
            <p className={styles.certificateDescription}>{cert.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className={styles.skillsContainer}>
      <div className={styles.iconsGrid}>
        {techIcons.map((tech, index) => (
          <div key={index} className={styles.iconItem} title={tech.name}>
            <div className={styles.iconWrapper} style={{ color: tech.color }}>
              {tech.icon}
            </div>
            <span className={styles.iconName}>{tech.name}</span>
          </div>
        ))}
      </div>
      <div 
        ref={skillsCardRef}
        className={styles.skillsCard}
        onMouseMove={(e) => handleMouseMove(e, skillsCardRef, setSkillsCardStyle)}
        onMouseLeave={() => handleMouseLeave(setSkillsCardStyle)}
        style={skillsCardStyle}
      >
        {/* React-controlled overlay for smooth transitions */}
        <div 
          className={`${styles.cardOverlay} ${isTransitioning ? styles.transitioning : ''}`}
          style={{
            opacity: overlayOpacity,
            transition: 'opacity 5s ease-in-out'
          }}
        />
        
        <h3 className={styles.skillsHeading}>Skills & Focus</h3>
        <div className={styles.skillsList}>
          <div className={styles.skillCategory}>
            <div className={styles.skillMain}>Frontend Development</div>
            <div className={styles.skillSub}>React, Next.js, Vue.js, TypeScript, Tailwind CSS</div>
          </div>
          <div className={styles.skillCategory}>
            <div className={styles.skillMain}>Backend Development</div>
            <div className={styles.skillSub}>Node.js, Express, NestJS, Python, REST APIs</div>
          </div>
          <div className={styles.skillCategory}>
            <div className={styles.skillMain}>Database & Storage</div>
            <div className={styles.skillSub}>MongoDB, PostgreSQL, MySQL, Redis</div>
          </div>
          <div className={styles.skillCategory}>
            <div className={styles.skillMain}>DevOps & Tools</div>
            <div className={styles.skillSub}>Docker, Kubernetes, GitHub, CI/CD</div>
          </div>
          <div className={styles.skillCategory}>
            <div className={styles.skillMain}>Testing & Quality</div>
            <div className={styles.skillSub}>Jest, Cypress, Selenium, API Testing</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="personalshowcase" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>Personal Showcase</h2>
          <p className={styles.paragraph}>Explore my projects, certifications, and technical skills.</p>
        </div>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tabContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={styles.tabPanel}
            >
              {activeTab === 'projects' && renderProjects()}
              {activeTab === 'certificates' && renderCertificates()}
              {activeTab === 'skills' && renderSkills()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PersonalShowcase; 