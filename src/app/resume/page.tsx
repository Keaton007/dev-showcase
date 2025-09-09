"use client";

import React from 'react';
import { FaDownload, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import styles from './resume.module.css';

const ResumePage = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Keaton Jones Resume.docx';
    link.download = 'Keaton Jones Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <FaArrowLeft className={styles.backIcon} />
          Back to Portfolio
        </Link>
        <h1 className={styles.title}>Keaton Jones - Resume</h1>
        <button onClick={handleDownload} className={styles.downloadButton}>
          <FaDownload className={styles.downloadIcon} />
          Download Resume
        </button>
      </div>

      <div className={styles.resumeContainer}>
        <div className={styles.resume}>
          <iframe
            src="/Keaton Jones Resume.docx"
            className={styles.resumeIframe}
            title="Keaton Jones Resume"
          />
          <div className={styles.fallbackMessage}>
            <p>If the resume doesn't display above, you can:</p>
            <ul>
              <li>Click the download button above to get the Word document</li>
              <li>Try opening the document in a new tab: <a href="/Keaton Jones Resume.docx" target="_blank" rel="noopener noreferrer">Open Resume</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
