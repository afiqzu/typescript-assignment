import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import { SettingsProvider } from "./context/SettingsContext";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => {
    return (
        <SettingsProvider>
            <NotificationProvider>
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route index element={<Main />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </NotificationProvider>
        </SettingsProvider>
    );
};

export default App;
