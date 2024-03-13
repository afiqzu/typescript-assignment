import React, { createContext, useState, useEffect, useContext } from "react";
import { Notification } from "../types";

interface NotificationContextValue {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationContext = createContext<NotificationContextValue>({
    notifications: [],
    setNotifications: () => false
});

interface NotificationProviderProps {
    children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
            setNotifications(JSON.parse(storedNotifications));
        }
    }, []);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:9000/events");
        eventSource.onmessage = (event) => {
            const newNotification: Notification = JSON.parse(event.data);
            setNotifications((prevNotifications) => {
                const updatedNotifications = [newNotification, ...prevNotifications];
                localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
                return updatedNotifications;
            });
        };
        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "notifications") {
                const storedNotifications = event.newValue;
                if (storedNotifications) {
                    setNotifications(JSON.parse(storedNotifications));
                }
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
