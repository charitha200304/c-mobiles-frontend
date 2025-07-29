// src/components/EmailSubscription.tsx

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios'; // Import axios for API calls

export default function EmailSubscription() {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null); // Clear previous messages

        if (!email) {
            setMessage({ type: 'error', text: 'Email cannot be empty.' });
            return;
        }

        if (!validateEmail(email)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        setIsLoading(true);

        try {
            // Make the actual API call to your backend
            const response = await axios.post("http://localhost:3000/api/subscriptions/subscribe", { email });

            if (response.data.success) {
                setMessage({ type: 'success', text: response.data.message || 'Thank you for subscribing!' });
                setEmail(''); // Clear the input field on success
            } else {
                setMessage({ type: 'error', text: response.data.message || 'Failed to subscribe. Please try again.' });
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Network error. Please try again.';
                setMessage({ type: 'error', text: errorMessage });
                console.error('Email subscription failed (Axios error):', error.response?.data || error.message);
            } else {
                setMessage({ type: 'error', text: 'An unexpected error occurred.' });
                console.error('Email subscription failed (unexpected):', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-orange-500 to-red-600 py-16 px-6 text-white text-center rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
                Get the latest news about new products, exclusive deals, and mobile technology trends.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                <div className="relative w-full sm:w-2/3">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 pl-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
            </form>

            {message && (
                <div
                    className={`mt-6 p-3 rounded-lg flex items-center justify-center gap-2 max-w-md mx-auto
${message.type === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-green-800 border border-red-300'}`}
                >
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    <span>{message.text}</span>
                </div>
            )}
        </div>
    );
}