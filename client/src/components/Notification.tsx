import React, { useEffect } from "react";
import { useSettings } from "../context/SettingsContext";
import { useNotifications } from "../context/NotificationContext";

const Notification = () => {
    const { notifications, setNotifications } = useNotifications();
    const { settings } = useSettings();

    useEffect(() => {
        const timerIds = notifications.map(notification =>
            setTimeout(() => {
                setNotifications((prevNotifications) => {
                    return prevNotifications.filter(n => n.msg_id !== notification.msg_id);
                });
            }, settings.disappearTime * 1000)
        );
        return () => {
            timerIds.forEach(clearTimeout);
        };
    }, [notifications, settings.disappearTime, setNotifications]);

    const handleDismiss = (msg_id: string) => {
        setNotifications((prevNotifications) => {
            const updatedNotifications = prevNotifications.filter(notification => notification.msg_id !== msg_id);
            localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
            return updatedNotifications;
        });
    };

    const clearNotifications = () => {
        setNotifications([]);
        localStorage.setItem("notifications", "[]");
    };


    return (
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
            {notifications.length - settings.notificationCount > 0 &&
                <div className="notifications-hidden">
                    {notifications.length - settings.notificationCount} older notifications
                    <button onClick={clearNotifications}>Clear all</button>
                </div>
            }
        </div>
    );
};
export default Notification;
