import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { Star, Filter, Grid, List } from "lucide-react"

export default function ProductsPage() {
    const products = [
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            brand: "Apple",
            price: 1199,
            originalPrice: 1299,
            rating: 4.8,
            reviews: 245,
            image: "/placeholder.svg?height=300&width=300&text=iPhone+15+Pro",
            badge: "Best Seller",
        },
        {
            id: 2,
            name: "Samsung Galaxy S24 Ultra",
            brand: "Samsung",
            price: 1099,
            originalPrice: 1199,
            rating: 4.7,
            reviews: 189,
            image: "/placeholder.svg?height=300&width=300&text=Galaxy+S24",
            badge: "New",
        },
        {
            id: 3,
            name: "Google Pixel 8 Pro",
            brand: "Google",
            price: 899,
            originalPrice: 999,
            rating: 4.6,
            reviews: 156,
            image: "/placeholder.svg?height=300&width=300&text=Pixel+8+Pro",
            badge: "Sale",
        },
        {
            id: 4,
            name: "OnePlus 12",
            brand: "OnePlus",
            price: 799,
            originalPrice: 849,
            rating: 4.5,
            reviews: 98,
            image: "/placeholder.svg?height=300&width=300&text=OnePlus+12",
            badge: "Popular",
        },
        {
            id: 5,
            name: "Xiaomi 14 Ultra",
            brand: "Xiaomi",
            price: 699,
            originalPrice: 749,
            rating: 4.4,
            reviews: 87,
            image: "/placeholder.svg?height=300&width=300&text=Xiaomi+14",
            badge: "Value",
        },
        {
            id: 6,
            name: "Nothing Phone 2",
            brand: "Nothing",
            price: 599,
            originalPrice: 649,
            rating: 4.3,
            reviews: 76,
            image: "/placeholder.svg?height=300&width=300&text=Nothing+Phone",
            badge: "Unique",
        },
    ]

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
                                    <div className="relative">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-64 object-cover rounded-t-lg"
                                        />
                                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-red-500">
                                            {product.badge}
                                        </Badge>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-500">{product.brand}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm text-gray-600">{product.rating}</span>
                                                <span className="text-sm text-gray-400">({product.reviews})</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-2xl font-bold text-orange-500">${product.price}</span>
                                            <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600">
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
