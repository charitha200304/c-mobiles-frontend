import { Link } from "react-router-dom"
import { Smartphone, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                                <Smartphone className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">C-Mobiles</span>
                        </Link>
                        <p className="text-gray-400">Your trusted partner for premium mobile devices and exceptional service.</p>
                        <div className="flex space-x-4">
                            <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/products" className="text-gray-400 hover:text-white">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-400 hover:text-white">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/products?category=smartphones" className="text-gray-400 hover:text-white">
                                    Smartphones
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=accessories" className="text-gray-400 hover:text-white">
                                    Accessories
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=tablets" className="text-gray-400 hover:text-white">
                                    Tablets
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=smartwatch" className="text-gray-400 hover:text-white">
                                    Smart Watches
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>123 Mobile Street</li>
                            <li>Tech City, TC 12345</li>
                            <li>Phone: (555) 123-4567</li>
                            <li>Email: info@c-mobiles.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 C-Mobiles. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
