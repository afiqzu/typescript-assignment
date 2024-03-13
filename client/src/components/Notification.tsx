import React, { useEffect, useRef } from "react";
import { useSettings } from "../context/SettingsContext";
import { useNotifications } from "../context/NotificationContext";

const Notification = () => {
    const { notifications, setNotifications } = useNotifications();
    const { settings } = useSettings();
    const timeoutIdsRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

    useEffect(() => {
        notifications.forEach((notification) => {
            if (!timeoutIdsRef.current[notification.msg_id]) {
                timeoutIdsRef.current[notification.msg_id] = setTimeout(() => {
                    setNotifications((prevNotifications) => {
                        return prevNotifications.filter((n) => n.msg_id !== notification.msg_id);
                    });
                }, settings.disappearTime * 1000);
            }
        });
    }, [notifications, settings.disappearTime, setNotifications]);

    useEffect(() => {
        return () => {
            Object.values(timeoutIdsRef.current).forEach(clearTimeout);
        };
    }, []);

    const handleDismiss = (msg_id: string) => {
        setNotifications((prevNotifications) => {
            const updatedNotifications = prevNotifications.filter((notification) => notification.msg_id !== msg_id);
            localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
            return updatedNotifications;
        });
    };

    const clearNotifications = () => {
        setNotifications([]);
        localStorage.setItem("notifications", "[]");
    };

    return (
        <div className={`notification-wrapper p${settings.position}`}>
            <div className={`notification-stack position-${settings.position}`}>
                {notifications.slice(0, settings.notificationCount).map((notification) => (
                    <div key={notification.msg_id}
                        className={`notification p${settings.position}`}
                    >
                        <p>{notification.msg}</p>
                        <button onClick={() => handleDismiss(notification.msg_id)}
                            style={{ fontSize: "20px" }}>&times;</button>
                    </div>
                ))}
            </div>
            {notifications.length - settings.notificationCount > 0 &&
                <div className="notifications-hidden">
                    + {notifications.length - settings.notificationCount} hidden notifications
                    <button onClick={clearNotifications}>Clear all</button>
                </div>
            }
        </div>
    );
};
export default Notification;
