import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMainClick = () => {
        navigate("/");
    };

    const handleSettingsClick = () => {
        navigate("/settings");
    };

    return (
        <>
            <div className="navbar">
                <h3>Notification task</h3>
                <button
                    className={`nav-button ${location.pathname === "/" ? "active-nav-button" : ""}`}
                    onClick={handleMainClick}>
                    Main
                </button>
                <button
                    className={`nav-button ${location.pathname === "/settings" ? "active-nav-button" : ""}`}
                    onClick={handleSettingsClick}>
                    Settings
                </button>
            </div>
        </>
    );
};
