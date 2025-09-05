"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import {
  FaReact, FaNodeJs, FaDocker,
  FaDatabase, FaVuejs, FaGithub as FaGithubIcon, FaBitbucket,
  FaHtml5, FaJs
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb,
  SiPostgresql, SiMysql, SiGraphql, SiNestjs, SiPostman,
  SiInsomnia, SiSwagger, SiJest, SiKubernetes, SiJenkins
} from 'react-icons/si';
import styles from '../styles/PersonalShowcase.module.css';

const projects = [
  {
    id: 1,
    title: "Coding Flashcards",
    description: "An interactive flashcard application designed to help developers learn and memorize programming concepts, algorithms, and syntax across multiple languages.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "/projects/coding-flashcards.jpg",
    github: "https://github.com/Keaton007/coding-flashcards",
    live: "#",
    featured: true
  },
  {
    id: 2,
    title: "Scuba Planner",
    description: "A comprehensive dive planning application that helps scuba divers plan their dives, track dive logs, and manage equipment. Features dive site information and safety calculations.",
    technologies: ["Next.js", "React", "PostgreSQL", "TailwindCSS"],
    image: "/projects/scuba-planner.jpg",
    github: "https://github.com/Keaton007/scuba-planner",
    live: "#",
    featured: true
  },
  {
    id: 3,
    title: "AI Profile Chat Bot",
    description: "An intelligent chatbot that creates personalized AI profiles based on user interactions. Features real-time conversation analysis and adaptive personality development.",
    technologies: ["React", "OpenAI", "WebSocket", "Node.js"],
    image: "/projects/ai-chatbot.jpg",
    github: "https://github.com/Keaton007/ai-profile-chatbot",
    live: "#",
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
    image: "/certificates/fullstack.jpg",
    certificateUrl: "/Boot Camp Certificate.pdf"
  }
];

const techIcons = [
  // Frontend Development
  { icon: <FaReact />, name: 'React', color: '#61DAFB' },
  { icon: <SiNextdotjs />, name: 'Next.js', color: '#000000' },
  { icon: <FaVuejs />, name: 'Vue.js', color: '#4FC08D' },
  { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
  { icon: <FaJs />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <FaHtml5 />, name: 'HTML', color: '#E34F26' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#06B6D4' },
  
  // Backend Development
  { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
  { icon: <SiNestjs />, name: 'NestJS', color: '#E0234E' },
  { icon: <FaDatabase />, name: 'C#', color: '#239120' },
  { icon: <FaDatabase />, name: '.NET', color: '#512BD4' },
  { icon: <SiGraphql />, name: 'GraphQL', color: '#E10098' },
  
  // Database & Storage
  { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
  { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
  { icon: <SiMysql />, name: 'MySQL', color: '#4479A1' },
  { icon: <FaDatabase />, name: 'SQL', color: '#336791' },
  
  // DevOps & Tools
  { icon: <FaDocker />, name: 'Docker', color: '#2496ED' },
  { icon: <SiKubernetes />, name: 'Kubernetes', color: '#326CE5' },
  { icon: <SiJenkins />, name: 'Jenkins', color: '#D24939' },
  { icon: <FaGithubIcon />, name: 'GitHub', color: '#181717' },
  { icon: <FaBitbucket />, name: 'Bitbucket', color: '#0052CC' },
  
  // Testing & Quality
  { icon: <SiJest />, name: 'Jest', color: '#C21325' },
  { icon: <SiPostman />, name: 'Postman', color: '#FF6C37' },
  { icon: <SiInsomnia />, name: 'Insomnia', color: '#4000BF' },
  
  // Other Technologies
  { icon: <FaDatabase />, name: 'Kafka', color: '#231F20' },
  { icon: <SiSwagger />, name: 'Swagger', color: '#85EA2D' },
];

const tabs = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'skills', label: 'My Skills' }
];

const PersonalShowcase = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  // Define which icons belong to which category
  const categoryIconMap = {
    'Frontend Development': [0, 1, 2, 3, 4, 5, 6], // React, Next.js, Vue.js, TypeScript, JavaScript, HTML, Tailwind CSS
    'Backend Development': [7, 8, 9, 10, 11], // Node.js, NestJS, C#, .NET, GraphQL
    'Database & Storage': [12, 13, 14, 15], // MongoDB, PostgreSQL, MySQL, SQL
    'DevOps & Tools': [16, 17, 18, 19, 20], // Docker, Kubernetes, Jenkins, GitHub, Bitbucket
    'Testing & Quality': [21, 22, 23], // Jest, Postman, Insomnia
    'Other Technologies': [24, 25] // Kafka, Swagger
  };

  const handleCategoryHover = (category: string) => {
    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
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
            <span className={styles.projectLinkDisabled}>
              <FaGithub className={styles.linkIcon} />
              <span>Code</span>
            </span>
            <span className={styles.projectLinkDemoDisabled}>
              <FaExternalLinkAlt className={styles.linkDemoIcon} />
              <span>Live Demo</span>
            </span>
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
            {cert.certificateUrl && (
              <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className={styles.certificateLink}>
                View Certificate
              </a>
            )}
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
        {techIcons.map((tech, index) => {
          const isHighlighted = hoveredCategory && categoryIconMap[hoveredCategory as keyof typeof categoryIconMap]?.includes(index);
          return (
            <div 
              key={index} 
              className={`${styles.iconItem} ${isHighlighted ? styles.iconItemHighlighted : ''}`} 
              title={tech.name}
            >
              <div className={styles.iconWrapper} style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <span className={styles.iconName}>{tech.name}</span>
            </div>
          );
        })}
      </div>
      <div 
        className={styles.skillsCard}
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
          <div 
            className={`${styles.skillCategory} ${hoveredCategory === 'Frontend Development' ? styles.skillCategoryHovered : ''}`}
            onMouseEnter={() => handleCategoryHover('Frontend Development')}
            onMouseLeave={handleCategoryLeave}
          >
            <div className={styles.skillMain}>Frontend Development</div>
            <div className={styles.skillSub}>React, Next.js, Vue.js, TypeScript, JavaScript, HTML, Tailwind CSS</div>
          </div>
          <div 
            className={`${styles.skillCategory} ${hoveredCategory === 'Backend Development' ? styles.skillCategoryHovered : ''}`}
            onMouseEnter={() => handleCategoryHover('Backend Development')}
            onMouseLeave={handleCategoryLeave}
          >
            <div className={styles.skillMain}>Backend Development</div>
            <div className={styles.skillSub}>Node.js, NestJS, C#, .NET, REST APIs, GraphQL</div>
          </div>
          <div 
            className={`${styles.skillCategory} ${hoveredCategory === 'Database & Storage' ? styles.skillCategoryHovered : ''}`}
            onMouseEnter={() => handleCategoryHover('Database & Storage')}
            onMouseLeave={handleCategoryLeave}
          >
            <div className={styles.skillMain}>Database & Storage</div>
            <div className={styles.skillSub}>MongoDB, PostgreSQL, MySQL, SQL</div>
          </div>
          <div 
            className={`${styles.skillCategory} ${hoveredCategory === 'DevOps & Tools' ? styles.skillCategoryHovered : ''}`}
            onMouseEnter={() => handleCategoryHover('DevOps & Tools')}
            onMouseLeave={handleCategoryLeave}
          >
            <div className={styles.skillMain}>DevOps & Tools</div>
            <div className={styles.skillSub}>Docker, Kubernetes, Jenkins, GitHub, Bitbucket, CI/CD</div>
          </div>
          <div 
            className={`${styles.skillCategory} ${hoveredCategory === 'Testing & Quality' ? styles.skillCategoryHovered : ''}`}
            onMouseEnter={() => handleCategoryHover('Testing & Quality')}
            onMouseLeave={handleCategoryLeave}
          >
            <div className={styles.skillMain}>Testing & Quality</div>
            <div className={styles.skillSub}>Jest, Postman, Insomnia, API Testing</div>
          </div>
          <div 
            className={`${styles.skillCategory} ${hoveredCategory === 'Other Technologies' ? styles.skillCategoryHovered : ''}`}
            onMouseEnter={() => handleCategoryHover('Other Technologies')}
            onMouseLeave={handleCategoryLeave}
          >
            <div className={styles.skillMain}>Other Technologies</div>
            <div className={styles.skillSub}>Kafka, Swagger, Containerized Services</div>
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