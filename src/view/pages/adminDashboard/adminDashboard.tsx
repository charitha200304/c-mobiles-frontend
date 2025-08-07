import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Package, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define Order and Product types for type safety
type Order = {
  totalPrice?: number;
  itemPrice?: number;
  date?: string;
  createdAt?: string;
  _id?: string;
  id?: string;
  username?: string;
  status?: string;
  // Add other fields as needed
};
type Product = {
  price?: number;
  stock?: number;
  category?: string;
  // Add other fields as needed
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch('http://localhost:3000/api/orders/get-all-orders'),
          fetch('http://localhost:3000/api/products/get-all-products'),
        ]);
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        setOrders(Array.isArray(ordersData.data) ? ordersData.data : ordersData.orders || ordersData || []);
        setProducts(productsData.data || productsData.products || productsData || []);
      } catch (err) {
        // Optionally handle error
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- Real analytics calculations ---
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || o.itemPrice || 0), 0);
  const avgOrderValue = totalOrders > 0 ? revenue / totalOrders : 0;
  const itemsSold = orders.length; // You can update this to sum items if you track quantity

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const inventoryValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);
  const categoriesCount = new Set(products.map(p => p.category || 'Unknown')).size;

  // --- Prepare data for chart ---
  // Example: Group orders by month for sales overview
  const chartData = (() => {
    const map = new Map();
    orders.forEach(order => {
      const dateString = order.date || order.createdAt;
      if (!dateString) return; // skip orders with no date
      const date = dateString ? new Date(dateString) : new Date();
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const prev = map.get(month) || { sales: 0, orders: 0 };
      map.set(month, {
        sales: prev.sales + (order.totalPrice || order.itemPrice || 0),
        orders: prev.orders + 1,
      });
    });
    // Sort by month ascending
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([name, val]) => ({ name, ...val }));
  })();

  // --- Recent Orders ---
  const recentOrders = [...orders]
    .sort((a, b) => {
      // Sort by id (string compare, fallback to '')
      const idA = a._id?.toString() || a.id?.toString() || '';
      const idB = b._id?.toString() || b.id?.toString() || '';
      return idB.localeCompare(idA);
    })
    .slice(0, 5)
    .map(order => ({
      id: order._id?.toString() || order.id?.toString() || 'N/A',
      customer: order.username || 'Unknown',
      amount: `$${(order.totalPrice || order.itemPrice || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      status: order.status || 'Unknown',
    }));

  if (isLoading) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-gray-500">Avg. Order Value: ${avgOrderValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-gray-500">Items Sold: {itemsSold}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-gray-500">Categories: {categoriesCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${inventoryValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-gray-500">Stock: {totalStock}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                <Bar dataKey="orders" fill="#93c5fd" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id || Math.random()} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.id || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{order.customer || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount || 'N/A'}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}