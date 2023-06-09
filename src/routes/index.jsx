import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Market from './pages/Market';
import Settings from './pages/Settings';
import About from './pages/About';


export default function TheRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="market" element={<Market />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<div>Error 404</div>} />
        </Routes>
    );
}