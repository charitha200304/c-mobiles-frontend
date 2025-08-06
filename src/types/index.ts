export interface ProductDataForFrontend {
    id: string;
    name: string;
    image: string;
    rating: number;
    specs: string[];
    price: number;
    originalPrice?: number;
    currency: string;
    isOnSale: boolean;
    description?: string;
    stock?: number;
    category?: string;
}
