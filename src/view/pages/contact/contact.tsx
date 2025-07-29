import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Loader2 } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            const response = await axios.post('http://localhost:3000/api/contact', formData);
            setSuccessMessage(response.data.message);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || 'Failed to send message.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

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
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                placeholder="John"
                                                className="mt-1"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                placeholder="Doe"
                                                className="mt-1"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="mt-1"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phoneNumber">Phone Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            type="tel"
                                            placeholder="(555) 123-4567"
                                            className="mt-1"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="How can we help you?"
                                            className="mt-1"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us more about your inquiry..."
                                            className="mt-1 min-h-[120px]"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {successMessage && (
                                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center" role="alert">
                                            {successMessage}
                                        </div>
                                    )}
                                    {errorMessage && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
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
                                {/* Visit Our Store Card */}
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

                                {/* Call Us Card */}
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

                                {/* Email Us Card */}
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

                                {/* Business Hours Card */}
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
                    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg"> {/* Added rounded corners and shadow */}
                        {/* Replace the placeholder div with your Google Maps iframe */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902269926573!2d79.85871377501314!3d6.902509593096522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25920d32f31d1%3A0x6e355b25208f23f!2sColombo%2007%2C%20Colombo!5e0!3m2!1sen!2slk!4v1709289255855!5m2!1sen!2slk"
                            width="100%"
                            height="450" // Set a fixed height
                            style={{ border: 0 }} // React requires style object
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Our Location on Google Maps" // Good for accessibility
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}