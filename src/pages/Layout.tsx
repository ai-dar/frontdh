// src/pages/Layout.tsx
import { Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import UniversitiesListPage from "./UniversitiesListPage";
import UniversityDetailsPage from "./UniversityDetailsPage";
import ComparePage from "./ComparePage";
import ScrollToTop from "../components/ScrollToTop";

export default function Layout() {
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    const navLinkClass = (path: string) => {
        const baseClass = "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95";
        const activeClass = isActive(path)
            ? "bg-[#5dc7c5] text-white shadow-md shadow-[#5dc7c5]/30"
            : "bg-white text-[#5dc7c5] border-2 border-[#5dc7c5] hover:bg-[#5dc7c5] hover:text-white hover:shadow-md hover:shadow-[#5dc7c5]/30";
        return `${baseClass} ${activeClass}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex justify-center items-center py-4 gap-3 flex-wrap">
                        <Link
                            to="/"
                            className={navLinkClass("/")}
                        >
                            Главная
                        </Link>

                        <Link
                            to="/universities"
                            className={navLinkClass("/universities")}
                        >
                            Университеты
                        </Link>

                        <Link
                            to="/compare"
                            className={navLinkClass("/compare")}
                        >
                            Сравнение
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="min-h-[calc(100vh-80px)]">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/universities" element={<UniversitiesListPage />} />
                    <Route path="/universities/:id" element={<UniversityDetailsPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                </Routes>
            </main>
        </div>
    );
}
