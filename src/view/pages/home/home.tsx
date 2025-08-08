import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Smartphone, Shield, Truck, Star } from "lucide-react";
import EmailSubscription from '@/components/emailsubscription'; // <-- IMPORT THE NEW COMPONENT

const featuredProducts = [
  {
    name: "Apple iPhone 15",
    price: 1299,
    image: "/iphone 15.webp",
    description: "Flagship Apple smartphone with A16 chip and advanced camera.",
    rating: 4.8
  },
  {
    name: "Samsung S25 Ultra",
    price: 1199,
    image: "/samsung s25 ultra.webp",
    description: "Premium Samsung flagship with top-tier display and camera.",
    rating: 4.7
  },
  {
    name: "Xiaomi 15 Ultra",
    price: 999,
    image: "/15-Ultra.jpg",
    description: "High-end Xiaomi device with Leica optics and fast charging.",
    rating: 4.6
  },
];

export function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Background Video */}
            <section className="relative min-h-screen overflow-hidden">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="src/assets/videos/homescreen video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-white-500/80 to-white-600/80"></div>
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col justify-center min-h-screen">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Premium Mobile
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Experience
              </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                            Discover the latest smartphones, accessories, and cutting-edge technology at C-Mobiles.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-2 bg-white text-black text-lg font-medium px-8 py-4 rounded-md hover:bg-gray-100 transition"
                            >
                                Shop Now <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center gap-2 border border-white text-white text-lg font-medium px-8 py-4 rounded-md hover:bg-white hover:text-black transition"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose C-Mobiles?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We provide exceptional service and premium products to enhance your mobile experience
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[Smartphone, Shield, Truck].map((Icon, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-8 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">
                                        {index === 0
                                            ? "Latest Technology"
                                            : index === 1
                                                ? "Warranty Protection"
                                                : "Fast Delivery"}
                                    </h3>
                                    <p className="text-gray-600">
                                        {index === 0
                                            ? "Access to the newest smartphones and cutting-edge mobile technology from top brands worldwide."
                                            : index === 1
                                                ? "Comprehensive warranty coverage and reliable after-sales support for all your purchases."
                                                : "Quick and secure delivery service to get your new device in your hands as soon as possible."}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Preview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
                        <p className="text-xl text-gray-600">Discover our most popular smartphones and accessories</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {featuredProducts.map((product) => (
                            <Card key={product.name} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                                <CardContent className="p-0">
                                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center overflow-hidden">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                        <p className="text-gray-600 mb-4">{product.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-orange-500">${product.price}</span>
                                            <Button className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold text-lg px-8 py-4 rounded-md hover:from-orange-500 hover:to-red-600"
                        >
                            View All Products <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section - Replaced with EmailSubscription Component */}
            <section className="py-20 bg-gradient-to-r from-orange-400 to-red-500">
                <div className="container mx-auto px-4 text-center">
                    {/* The EmailSubscription component already has its own styling for the gradient, text, etc. */}
                    {/* So we just need to render it here. */}
                    <EmailSubscription />
                </div>
            </section>
        </div>
    );
}