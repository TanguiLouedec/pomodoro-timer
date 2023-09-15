"use client"

import styles from "./page.module.scss"
import { useState, useEffect } from 'react';

import SettingsModal from "@/components/SettingsModal/SettingsModal";

export default function TimerComponent() {

  const [defaultTime, setDefaultTime] = useState(25 * 60)
  const [smallBreakTime, setSmallBreakTime] = useState(5 * 60)
  const [bigBreakTime, setBigBreakTime] = useState(30 * 60)

  const [currentTime, setCurrentTime] = useState(defaultTime)
  const [timer, setTimer] = useState(defaultTime)
  const [isActive, setIsActive] = useState(false)

  const [isSettingsOpen, setIsSettingsOpen] = useState(true)

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined

    if (isActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
      }, 1000)
    } else if (!timer) {
      setIsActive(false)
    }

    return () => clearInterval(intervalId)
  }, [isActive, timer])

  const displayMinutes = String(Math.floor(timer / 60)).padStart(2, '0')
  const displaySeconds = String(timer % 60).padStart(2, '0')

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

  const handleModal = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const handleSettingsSave = () => {
    let wt = document.getElementById("defTime") as HTMLInputElement
    let st = document.getElementById("smTime") as HTMLInputElement
    let bt = document.getElementById("bgTime") as HTMLInputElement

    if (!isNaN(parseFloat(wt.value)) && isFinite(parseFloat(wt.value))) {
      setDefaultTime(parseFloat(wt.value) * 60)
    }

    if (!isNaN(parseFloat(st.value)) && isFinite(parseFloat(st.value))) {
      setSmallBreakTime(parseFloat(st.value) * 60)
    }

    if (!isNaN(parseFloat(bt.value)) && isFinite(parseFloat(bt.value))) {
      setBigBreakTime(parseFloat(bt.value) * 60)
    }

    setIsSettingsOpen(false)
  }

  return (
    <div className={styles.page}>

      <SettingsModal isOpen={isSettingsOpen}>
        <div className={styles.settingsForm}>
          <input type="number" name="defTime" id="defTime" placeholder={`${defaultTime / 60}`} />
          <input type="number" name="smTime" id="smTime" placeholder={`${smallBreakTime / 60}`} />
          <input type="number" name="bgTime" id="bgTime" placeholder={`${bigBreakTime / 60}`} />
          <button onClick={handleSettingsSave} className={styles.defaultBtn}>
            <span className={`material-icons md-48 ${styles.icon}`}>save</span>
          </button>
        </div>
      </SettingsModal>

      <div className={styles.container}>
        <div className={styles.clock}>
          <p>{`${displayMinutes}:${displaySeconds}`}</p>
          <button onClick={handleReset} className={`material-icons md-48 ${styles.resetBtn}`}>
            restart_alt
          </button>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnRow}>
            <button onClick={() => setIsActive(!isActive)} className={isActive ? `material-icons md-48 ${styles.disableBtn}` : `material-icons md-48 ${styles.activeBtn}`}>
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
          <div className={styles.btnRow}>
            <button onClick={handleModal} className={styles.defaultBtn}>
              <span className={`material-icons md-48 ${styles.icon}`}>settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
