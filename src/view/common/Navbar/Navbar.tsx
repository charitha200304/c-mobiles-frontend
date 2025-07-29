// src/view/common/Navbar/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose
} from "@/components/ui/sheet";
import { Menu, Smartphone, Search, ShoppingCart, User } from "lucide-react";
import SearchOverlay from '@/components/SearchOverlay';

interface NavItem {
    name: string;
    href: string;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State for mobile sheet
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false); // NEW STATE for search overlay

    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems: NavItem[] = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
    ];

    // Function to close mobile sheet and open search overlay
    const handleMobileSearchClick = () => {
        setIsOpen(false); // Close mobile sheet
        setIsSearchOverlayOpen(true); // Open search overlay
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${!isHomePage ? 'bg-black shadow-md' : scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className={`absolute inset-0 -z-10 ${!isHomePage || scrolled ? 'bg-black' : 'bg-transparent'} transition-all duration-300`}></div>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">C-Mobiles</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`relative px-2 py-1 transition-all duration-300 font-medium ${(!isHomePage || scrolled) ? 'text-white' : 'text-white/90 hover:text-white'}
                  before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-orange-400 before:to-red-500 before:transition-all before:duration-300
                  hover:before:w-full`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search Button */}
                        <Button
                            variant="ghost"
                            className={`group relative overflow-hidden ${!isHomePage || scrolled ? 'text-white' : 'text-white/90'} h-10 w-10 p-2`}
                            onClick={() => setIsSearchOverlayOpen(true)}
                        >
                            <Search className="w-5 h-5 z-10 group-hover:scale-110 transition-transform duration-300" />
                        </Button>
                        <Button variant="ghost" className={`group relative overflow-hidden ${!isHomePage || scrolled ? 'text-white' : 'text-white/90'} h-10 w-10 p-2`}>
                            <ShoppingCart className="w-5 h-5 z-10 group-hover:scale-110 transition-transform duration-300" />
                        </Button>
                        <Link to="/signup" className="group">
                            <Button variant="ghost" className={`relative overflow-hidden ${!isHomePage || scrolled ? 'text-white' : 'text-white/90'} h-10 w-10 p-2`}>
                                <User className="w-5 h-5 z-10 group-hover:scale-110 transition-transform duration-300" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <button
                                className={`md:hidden ${!isHomePage || scrolled ? 'text-white hover:bg-primary-dark' : 'text-white/90 hover:bg-white/10'} h-10 w-10 p-2`}
                                onClick={() => setIsOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent className="fixed right-0 top-0 z-50 h-full w-3/4 max-w-sm bg-black p-6 shadow-lg border-l border-gray-800">
                            <div className="flex flex-col space-y-6 mt-8">
                                {navItems.map((item) => (
                                    <SheetClose key={item.name}>
                                        <Link
                                            to={item.href}
                                            className="block text-gray-300 hover:text-white transition-colors text-lg py-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </SheetClose>
                                ))}
                                <Link
                                    to="/signup"
                                    className="block w-full py-2 px-4 text-center rounded-md border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>

                                {/* Mobile Icons */}
                                <div className="flex items-center space-x-4 pt-6 border-t border-gray-800">
                                    <Button
                                        variant="ghost"
                                        className="h-10 w-10 p-2 text-gray-300 hover:text-white"
                                        onClick={handleMobileSearchClick}
                                    >
                                        <Search className="w-5 h-5" />
                                    </Button>
                                    <Link to="/cart" className="text-gray-300 hover:text-white">
                                        <Button variant="ghost" className="h-10 w-10 p-2">
                                            <ShoppingCart className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link to="/account" className="text-gray-300 hover:text-white">
                                        <Button variant="ghost" className="h-10 w-10 p-2">
                                            <User className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Render the SearchOverlay component */}
            <SearchOverlay
                isOpen={isSearchOverlayOpen}
                onClose={() => setIsSearchOverlayOpen(false)}
            />
        </nav>
    );
}