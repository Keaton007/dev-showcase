"use client";

import React, { useState, useRef, useEffect } from 'react';
import Calendar from './Calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaFacebook, FaInstagram, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import styles from '../styles/ContactSection.module.css';

// Helper function to calculate duration between start and end time
const calculateDuration = (startTime: string, endTime: string): number => {
  if (!startTime || !endTime) return 60; // Default 1 hour
  
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60)); // Convert to minutes
};

const Contact = () => {
  const [meetingCardStyle, setMeetingCardStyle] = useState({});
  const [connectCardStyle, setConnectCardStyle] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [events, setEvents] = useState<Array<{
    id: number;
    title: string;
    date: Date;
    time: string;
    duration: number;
    type: string;
    name: string;
    phone: string;
    email: string;
    startTime: string;
    endTime: string;
  }>>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({
    name: '',
    phone: '',
    email: '',
    startTime: '',
    endTime: ''
  });
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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventModal(true);
    setNewEvent({
      name: '',
      phone: '',
      email: '',
      startTime: '09:00',
      endTime: '10:00'
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedDate && newEvent.name && newEvent.startTime && newEvent.endTime) {
      const newEventData = {
        id: Date.now(),
        title: newEvent.name,
        date: selectedDate,
        time: newEvent.startTime,
        duration: calculateDuration(newEvent.startTime, newEvent.endTime),
        type: 'meeting',
        name: newEvent.name,
        phone: newEvent.phone,
        email: newEvent.email,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime
      };
      
      setEvents(prev => [...prev, newEventData]);
      setShowEventModal(false);
      setNewEvent({
        name: '',
        phone: '',
        email: '',
        startTime: '',
        endTime: ''
      });
    }
  };

  return (
    <>
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
                <li><a href="https://www.facebook.com/keatonjonesy" target="_blank" rel="noopener noreferrer" className={styles.link}><FaFacebook className={styles.linkIcon} />Facebook</a></li>
                <li><a href="https://www.instagram.com/keats_09/" target="_blank" rel="noopener noreferrer" className={styles.link}><FaInstagram className={styles.linkIcon} />Instagram</a></li>
              </ul>
            </motion.div>
        </motion.div>
        <div className={styles.calendarWrapper}>
          <Calendar events={events} onDateClick={handleDateClick} />
        </div>
      </div>
    </section>

    {/* Full-Screen Event Modal */}
    <AnimatePresence>
      {showEventModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[10002] p-4 backdrop-blur-sm"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10002
          }}
          onClick={() => setShowEventModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                Add Event for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
              </h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Event Form */}
            <form className="space-y-6" onSubmit={handleAddEvent}>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newEvent.phone}
                  onChange={(e) => setNewEvent({...newEvent, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newEvent.email}
                  onChange={(e) => setNewEvent({...newEvent, email: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Enter email"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium"
                >
                  Add Event
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Contact; 