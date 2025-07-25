import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Clock, Globe } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-400 to-red-500 py-20">
                <div className="container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About C-Mobiles</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        We are passionate about connecting people with the latest mobile technology. Since our founding, we've been
                        committed to providing exceptional products and service.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
                        <div className="prose prose-lg mx-auto text-gray-600">
                            <p className="text-xl leading-relaxed mb-6">
                                Founded in 2015, C-Mobiles began as a small local store with a big vision: to make cutting-edge mobile
                                technology accessible to everyone. What started as a passion project has grown into a trusted
                                destination for mobile enthusiasts.
                            </p>
                            <p className="text-lg leading-relaxed mb-6">
                                Our team of mobile experts carefully curates every product in our inventory, ensuring that we offer only
                                the best devices from the world's leading manufacturers. We believe that the right mobile device can
                                transform how you work, play, and connect.
                            </p>
                            <p className="text-lg leading-relaxed">
                                Today, we serve thousands of customers worldwide, but our commitment remains the same: providing
                                exceptional products, expert advice, and outstanding customer service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
                    <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <Card className="border-0 shadow-lg text-center">
                            <CardContent className="p-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold mb-2">50K+</div>
                                <div className="text-gray-600">Happy Customers</div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg text-center">
                            <CardContent className="p-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold mb-2">15+</div>
                                <div className="text-gray-600">Awards Won</div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg text-center">
                            <CardContent className="p-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold mb-2">9</div>
                                <div className="text-gray-600">Years Experience</div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg text-center">
                            <CardContent className="p-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold mb-2">25+</div>
                                <div className="text-gray-600">Countries Served</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "CEO & Founder",
                                image: "/placeholder.svg?height=300&width=300&text=Sarah",
                            },
                            { name: "Mike Chen", role: "CTO", image: "/placeholder.svg?height=300&width=300&text=Mike" },
                            { name: "Emily Davis", role: "Head of Sales", image: "/placeholder.svg?height=300&width=300&text=Emily" },
                        ].map((member, index) => (
                            <Card key={index} className="border-0 shadow-lg text-center">
                                <CardContent className="p-6">
                                    <img
                                        src={member.image || "/placeholder.svg"}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                    />
                                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                    <p className="text-gray-600">{member.role}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
