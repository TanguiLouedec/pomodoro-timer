import styles from "./SettingsModal.module.css"

import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
}

const SettingsModal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null

    return (
        <div className={styles.overlay}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export default SettingsModal