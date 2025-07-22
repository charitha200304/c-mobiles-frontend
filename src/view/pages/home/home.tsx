import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Smartphone, Shield, Truck, Star } from "lucide-react"

export function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Background Video */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Background Video */}
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="src/assets/videos/homescreen video.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                </video>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black-400/80 via-red-500/80 to-pink-600/80"></div>
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col justify-center min-h-screen">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Premium Mobile
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Experience
              </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                            Discover the latest smartphones, accessories, and cutting-edge technology at C-Mobiles. Your gateway to
                            the future.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">
                                <Link to="/products" className="flex items-center gap-2 hover:no-underline">
                                    Shop Now <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 bg-transparent"
                            >
                                <Link to="/about" className="hover:no-underline">Learn More</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
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
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Smartphone className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Latest Technology</h3>
                                <p className="text-gray-600">
                                    Access to the newest smartphones and cutting-edge mobile technology from top brands worldwide.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Warranty Protection</h3>
                                <p className="text-gray-600">
                                    Comprehensive warranty coverage and reliable after-sales support for all your purchases.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Truck className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
                                <p className="text-gray-600">
                                    Quick and secure delivery service to get your new device in your hands as soon as possible.
                                </p>
                            </CardContent>
                        </Card>
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
                        {[1, 2, 3].map((item) => (
                            <Card key={item} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                                <CardContent className="p-0">
                                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                                        <Smartphone className="w-24 h-24 text-gray-400" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Premium Smartphone {item}</h3>
                                        <p className="text-gray-600 mb-4">Latest flagship device with advanced features</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-orange-500">$899</span>
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
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-lg px-8 py-4"
                        >
                            <Link href="/products" className="flex items-center gap-2">
                                View All Products <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-gradient-to-r from-orange-400 to-red-500">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto text-white">
                        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Get the latest news about new products, exclusive deals, and mobile technology trends.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <Button className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
