import React, { useState, useEffect } from "react";
import Toast from "../components/Toast";

export const useToast = () => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastState, setToastState] = useState<"show" | "hide" | null>(null);

    useEffect(() => {
        if (toastMessage) {
            setToastState("show");
        }
    }, [toastMessage]);

    const showToast = (message: string) => {
        setToastMessage(message);
    };

    const hideToast = () => {
        setToastState("hide");
        setTimeout(() => {
            setToastMessage(null);
        }, 300); // Wait for the slide-out animation to complete
    };

    const ToastComponent = toastMessage ? (
        <Toast message={toastMessage} toastState={toastState} onClose={hideToast} />
    ) : null;

    return { showToast, ToastComponent };
};