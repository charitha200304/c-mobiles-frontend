// src/view/common/DefaultLayout/DefaultLayout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";

export function DefaultLayout() {
    // Removed all framer-motion animation for customer side (DefaultLayout)
    // Removed unused constant location

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}