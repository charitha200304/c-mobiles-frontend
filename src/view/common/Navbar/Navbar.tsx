import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent
} from "@/components/ui/sheet";
import { Menu, Smartphone, Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
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
                            <Link key={item.name} to={item.href} className="text-gray-300 hover:text-white transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                            <ShoppingCart className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                            <User className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-white">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="fixed right-0 top-0 z-50 h-full w-3/4 max-w-sm bg-black p-6 shadow-lg border-l border-gray-800">
                            <div className="flex flex-col space-y-6 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="text-gray-300 hover:text-white transition-colors text-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="flex items-center space-x-4 pt-6 border-t border-gray-800">
                                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                                        <Search className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                                        <ShoppingCart className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                                        <User className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
