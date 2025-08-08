import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { Star, Filter, Grid, List, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react";
import axios from 'axios';
import { useCart } from "@/context/CartContext";
import type { ProductDataForFrontend } from "@/types";

// Helper function to get image based on product name
function getProductImage(productName: string) {
    const name = productName.toLowerCase();
    if (name === "iphone 15") return "/iphone 15.webp";
    if (name === "iphone 16") return "/iphone 16.jpg";
    if (name === "huawei pro 15") return "/huawei-mate-50-pro-770x433.jpg";
    if (name === "xiaomi 15") return "/15-Ultra.jpg";
    if (name.includes("oneplus")) return "/oneplus.webp";
    if (name === "samsung s25 ultra") return "/samsung s25 ultra.webp";
    return "/redmi note 13.png";
}

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductDataForFrontend[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products/get-all-products');
                if (response.data.success) {
                    setProducts(response.data.data);
                } else {
                    setError(response.data.message || "Failed to fetch products");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("An error occurred while fetching products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            {/* Header */}
            <section className="bg-gradient-to-r from-orange-400 to-red-500 py-16">
                <div className="container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
                    <p className="text-xl opacity-90">Discover the latest smartphones and mobile technology</p>
                </div>
            </section>

            {/* Filters and Controls */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                            <select className="px-4 py-2 border rounded-lg">
                                <option>All Brands</option>
                                <option>Apple</option>
                                <option>Samsung</option>
                                <option>Google</option>
                                <option>OnePlus</option>
                            </select>
                            <select className="px-4 py-2 border rounded-lg">
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Rating</option>
                                <option>Newest</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group"
                            >
                                <CardContent className="p-0">
                                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                                        <img
                                            src={getProductImage(product.name)}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-6 bg-white rounded-t-lg"
                                        />
                                        {product.isOnSale && (
                                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-red-500">
                                                Sale
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-500">{product.category}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm text-gray-600">{product.rating}</span>
                                                {/* <span className="text-sm text-gray-400">({product.reviews})</span> */}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-2xl font-bold text-orange-500">${product.price}</span>
                                            {product.isOnSale && product.originalPrice && (
                                                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600"
                                                onClick={() => addToCart(product)}
                                            >
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                Add to Cart
                                            </Button>
                                            <Button variant="outline" className="px-4 bg-transparent">
                                                ♡
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <Button size="lg" variant="outline" className="px-8 bg-transparent">
                            Load More Products
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}