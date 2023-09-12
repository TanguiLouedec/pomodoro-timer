"use client"

import styles from "./StartStopButton.module.css"
import { useState } from "react"

type ButtonProps = {
    onClick: () => void
}

export default function StartStopButton(props: ButtonProps): JSX.Element {

    const [isRunning, setIsRunning] = useState(false)

    const handleClick = () => {
        setIsRunning(!isRunning)
        props.onClick()
    }

    const combinedClass = `
        ${styles.btn} 
        ${isRunning ? styles.running : styles.stopped}
    `
    return (
        <button type="button" onClick={handleClick} className={combinedClass}>{isRunning? "Stop" : "Start"}</button>
    )
}