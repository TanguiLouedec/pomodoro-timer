"use client"

import styles from "./page.module.css"
import { useState, useEffect } from 'react';

export default function TimerComponent() {

  const defaultTime = 25 * 60
  const smallBreakTime = 5 * 60
  const bigBreakTime = 30 * 60

  const [currentTime, setCurrentTime] = useState(defaultTime)
  const [timer, setTimer] = useState(defaultTime); // Timer in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
      let intervalId: string | number | NodeJS.Timeout | undefined;

      if (isActive && timer > 0) {
          intervalId = setInterval(() => {
              setTimer(prevTimer => prevTimer - 1);
          }, 1000);
      } else if (!timer) {
          setIsActive(false);
      }

      return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [isActive, timer]);

  const displayMinutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const displaySeconds = String(timer % 60).padStart(2, '0');

  const handleReset = () => {
    setIsActive(false)
    setTimer(currentTime)
  }

  const handleWorkPhase = () => {
    setIsActive(false)
    setCurrentTime(defaultTime)
    setTimer(defaultTime)
  }

  const handleSmallBreak = () => {
    setIsActive(false)
    setCurrentTime(smallBreakTime)
    setTimer(smallBreakTime)
  }

  const handleBigBreak = () => {
    setIsActive(false)
    setCurrentTime(bigBreakTime)
    setTimer(bigBreakTime)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.clock}>
          <p>{`${displayMinutes}:${displaySeconds}`}</p>
          <button onClick={handleReset} className={`material-icons md-48 ${styles.resetBtn}`}>
            restart_alt
          </button>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnRow}>
            <button onClick={() => setIsActive(!isActive)} className={isActive? `material-icons md-48 ${styles.disableBtn}` : `material-icons md-48 ${styles.activeBtn}`}>
                <span className={`material-icons md-48 ${styles.icon}`}>{isActive ? 'pause_circle_outline' : 'play_circle_outline'}</span>
            </button>
          </div>
          <div className={styles.btnRow}>
            <button onClick={handleWorkPhase} className={styles.defaultBtn}>
              <span className={`material-icons md-48 ${styles.icon}`}>work_outline</span>
            </button>
            <button onClick={handleSmallBreak} className={styles.defaultBtn}>
              <span className={`material-icons md-48 ${styles.icon}`}>coffee</span>
            </button>
            <button onClick={handleBigBreak} className={styles.defaultBtn}>
              <span className={`material-icons md-48 ${styles.icon}`}>park</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
