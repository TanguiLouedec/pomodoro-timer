"use client"

import styles from "./page.module.css"
import { useState, useEffect } from 'react';

export default function TimerComponent() {
  const [timer, setTimer] = useState(25 * 60); // Timer in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
      let intervalId: string | number | NodeJS.Timeout | undefined;

      if (isActive && timer > 0) {
          intervalId = setInterval(() => {
              setTimer(prevTimer => prevTimer - 1);
          }, 1000);
      } else if (!timer) {
          setIsActive(false);
          alert('Timer finished!');
      }

      return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [isActive, timer]);

  const displayMinutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const displaySeconds = String(timer % 60).padStart(2, '0');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p>{`${displayMinutes}:${displaySeconds}`}</p>
        <button onClick={() => setIsActive(!isActive)} className={isActive? styles.disableBtn : styles.activeBtn}>
            {isActive ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
}
