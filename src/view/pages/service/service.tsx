import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Wrench, Shield, Truck, HeadphonesIcon, Smartphone, Battery } from "lucide-react"

export default function ServicesPage() {
    const services = [
        {
            icon: Wrench,
            title: "Device Repair",
            description: "Professional repair services for all major smartphone brands with genuine parts and warranty.",
            features: ["Screen replacement", "Battery replacement", "Water damage repair", "Software troubleshooting"],
        },
        {
            icon: Shield,
            title: "Extended Warranty",
            description: "Comprehensive protection plans to keep your device covered beyond manufacturer warranty.",
            features: ["Accidental damage coverage", "Theft protection", "24/7 support", "Quick replacement"],
        },
        {
            icon: Truck,
            title: "Express Delivery",
            description: "Fast and secure delivery service to get your new device delivered quickly and safely.",
            features: ["Same-day delivery", "Free shipping over $100", "Tracking included", "Secure packaging"],
        },
        {
            icon: HeadphonesIcon,
            title: "Technical Support",
            description: "Expert technical support to help you get the most out of your mobile devices.",
            features: ["Setup assistance", "Data transfer", "App recommendations", "Performance optimization"],
        },
        {
            icon: Smartphone,
            title: "Trade-In Program",
            description: "Get the best value for your old device with our hassle-free trade-in program.",
            features: ["Instant quotes", "Fair pricing", "Any condition accepted", "Easy process"],
        },
        {
            icon: Battery,
            title: "Device Maintenance",
            description: "Keep your device running like new with our comprehensive maintenance services.",
            features: ["Performance checkup", "Software updates", "Storage optimization", "Security scan"],
        },
    ]

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-400 to-red-500 py-20">
                <div className="container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Comprehensive mobile services to keep you connected. From repairs to support, we've got everything you need
                        for your mobile devices.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                                <CardContent className="p-8">
                                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-6">
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                    <p className="text-gray-600 mb-6">{service.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600">
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Need Help with Your Device?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Our expert technicians are ready to help. Contact us today for a free consultation and quote for any of our
                        services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 px-8"
                        >
                            Get Free Quote
                        </Button>
                        <Button size="lg" variant="outline" className="px-8 bg-transparent">
                            Call Us Now
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
