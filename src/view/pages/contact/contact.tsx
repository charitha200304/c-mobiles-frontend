import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-400 to-red-500 py-20">
                <div className="container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Get in touch with our team. We're here to help with any questions about our products and services.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" className="mt-1" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="How can we help you?" className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us more about your inquiry..."
                                            className="mt-1 min-h-[120px]"
                                        />
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                                <p className="text-gray-600 mb-8">
                                    We'd love to hear from you. Choose the most convenient way to reach us, and we'll get back to you as
                                    soon as possible.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6 flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Visit Our Store</h3>
                                            <p className="text-gray-600">
                                                123 Mobile Street
                                                <br />
                                                Tech City, TC 12345
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6 flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Call Us</h3>
                                            <p className="text-gray-600">
                                                (555) 123-4567
                                                <br />
                                                Mon-Fri 9AM-6PM
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6 flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Email Us</h3>
                                            <p className="text-gray-600">
                                                info@c-mobiles.com
                                                <br />
                                                support@c-mobiles.com
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6 flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Business Hours</h3>
                                            <p className="text-gray-600">
                                                Mon-Fri: 9AM-6PM
                                                <br />
                                                Sat-Sun: 10AM-4PM
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Find Us</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Interactive Map Coming Soon</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
