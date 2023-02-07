import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OldDesign from "./pages/Old_Design";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Market from './pages/Market';
import Settings from './pages/Settings';
import Images from "./pages/Images";

// export default function TheRoutes() {
//     return (
//         <Routes>
//             <Route path="/" element={<p>Home</p>} />
//             <Route path="market" element={<p>Market</p>} />
//             <Route path="settings" element={<p>Setting</p>} />
//             <Route path="reports" element={<p>Reports</p>} />
//             <Route path="olddesign" element={<p>old</p>} />
//             <Route path="users" element={<p>user</p>} />
//             <Route path="images" element={<p>imgs</p>} />
//         </Routes>
//     );
// }
export default function TheRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="market" element={<Market />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="olddesign" element={<OldDesign />} />
            <Route path="users" element={<Users />} />
            <Route path="images" element={<Images />} />
        </Routes>
    );
}