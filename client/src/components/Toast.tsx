import React, { useEffect } from "react";

interface ToastProps {
    message: string;
    toastState: "show" | "hide" | null;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, toastState, onClose }) => {
    useEffect(() => {
        if (toastState === "show") {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toastState, onClose]);

    const handleAnimationEnd = () => {
        if (toastState === "hide") {
            onClose();
        }
    };

    return (
        <div
            className={`toast ${toastState || ""}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <div className="toast-message">{message}</div>
            <button className="toast-close" onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default Toast;