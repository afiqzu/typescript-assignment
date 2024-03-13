import React, { useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { useToast } from "../hooks/useToast";

const Settings = () => {
    const { settings, updateSettings } = useSettings();
    const [count, setCount] = useState(settings.notificationCount);
    const [position, setPosition] = useState(settings.position);
    const [disappearTime, setDisappearTime] = useState(settings.disappearTime);
    const { showToast, ToastComponent } = useToast();

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setCount(value);
    };

    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setPosition(value);
    };

    const handleDisappearTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setDisappearTime(value);
    };
    const handleSave = () => {
        updateSettings({ notificationCount: count, position: position, disappearTime: disappearTime });
        showToast("Settings saved");
    };

    return (
        <div className="settings-container">
            <div className="settings-tab">
                <div className="title">
                    <p>Notification count</p>
                </div>
                <input
                    type="number"
                    value={count}
                    onChange={handleCountChange}
                />
            </div>
            <div className="settings-tab">
                <div className="title">
                    <p>Notification position</p>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <div>
                        <label htmlFor="position1">Position 1</label>
                        <input
                            type="radio"
                            id="position1"
                            name="position"
                            value={1}
                            checked={position === 1}
                            onChange={handlePositionChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="position2">Position 2</label>
                        <input
                            type="radio"
                            id="position2"
                            name="position"
                            value={2}
                            checked={position === 2}
                            onChange={handlePositionChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="position3">Position 3</label>
                        <input
                            type="radio"
                            id="position3"
                            name="position"
                            value={3}
                            checked={position === 3}
                            onChange={handlePositionChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="position4">Position 4</label>
                        <input
                            type="radio"
                            id="position4"
                            name="position"
                            value={4}
                            checked={position === 4}
                            onChange={handlePositionChange}
                        />
                    </div>
                </div>
            </div>
            <div className="settings-tab">
                <div className="title">
                    <p>Notification disappear time</p>
                </div>
                <input
                    type="number"
                    value={disappearTime}
                    onChange={handleDisappearTimeChange}
                />
                <p> sec</p>
            </div>
            <button className="save-button" onClick={handleSave}>Save settings</button>
            {ToastComponent}
        </div>
    );
};
export default Settings;
