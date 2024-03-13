import React, { createContext, useContext, useEffect, useState } from "react";

interface Settings {
    notificationCount: number;
    position: number;
    disappearTime: number;
}

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
    notificationCount: 5,
    position: 1,
    disappearTime: 5
};

const settingsKey = "appSettings";

const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    updateSettings: () => false
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const initialSettings = JSON.parse(localStorage.getItem(settingsKey) || JSON.stringify(defaultSettings));
    const [settings, setSettings] = useState<Settings>(initialSettings);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings((prevSettings) => {
            const updatedSettings = { ...prevSettings, ...newSettings };
            localStorage.setItem(settingsKey, JSON.stringify(updatedSettings));
            return updatedSettings;
        });
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === settingsKey) {
                const newSettings = JSON.parse(event.newValue || "{}");
                setSettings(newSettings);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
