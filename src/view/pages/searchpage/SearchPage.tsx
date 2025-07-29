// src/view/pages/search/SearchPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Star, Loader2, Frown, XCircle } from 'lucide-react';

// Define a basic interface for a product based on your backend's IProduct
interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl?: string;
    // Add any other fields your product model has that you want to display
}

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchQuery) {
                setProducts([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:3000/api/products/search?q=${encodeURIComponent(searchQuery)}`);
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching search results:', err);
                if (axios.isAxiosError(err) && err.response) {
                    setError(err.response.data.message || 'Failed to fetch search results.');
                } else {
                    setError('An unexpected error occurred while fetching search results.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    return (
        <div className="container mx-auto px-4 py-20 min-h-[calc(100vh-120px)]">
            <h1 className="text-4xl font-bold text-center mb-10">
                Search Results for "<span className="text-orange-500">{searchQuery}</span>"
            </h1>

            {loading && (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                    <p className="ml-3 text-xl text-gray-600">Loading products...</p>
                </div>
            )}

            {error && (
                <div className="flex flex-col items-center justify-center h-48 text-red-600">
                    <XCircle className="w-10 h-10 mb-4" />
                    <p className="text-xl font-semibold">{error}</p>
                    <p className="text-gray-500">Please try again later or refine your search.</p>
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="flex flex-col items-center justify-center h-48 text-gray-700">
                    <Frown className="w-10 h-10 mb-4" />
                    <p className="text-xl font-semibold">No products found.</p>
                    <p className="text-gray-500">Try a different search term or browse our categories.</p>
                    <Link to="/products">
                        <Button className="mt-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                            Browse All Products
                        </Button>
                    </Link>
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card key={product._id} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                            <CardContent className="p-0">
                                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-t-lg" />
                                    ) : (
                                        <Smartphone className="w-24 h-24 text-gray-400" />
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 truncate">{product.name}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
                                        <Button className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}