import { useState } from 'react';
import { Search, MoreHorizontal, Check, X, Truck, Package, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the new OrderType based on your request
type OrderType = {
  id: string;
  userId: number;
  username: string;
  itemName: string;
  itemPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string; // Added date for display
};

// Initialize orders as an empty array - this is where your actual order data would go
const orders: OrderType[] = [];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const [newOrder, setNewOrder] = useState({ // State for new order form data
    userId: null as number | null, // Changed initial state to null
    username: '',
    itemName: '',
    itemPrice: null as number | null, // Changed initial state to null
    status: 'pending' as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  });

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get the correct status badge
  const getStatusBadge = (status: OrderType['status']) => {
    switch (status) {
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'shipped':
        return <Badge variant="info">Shipped</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Helper function for dropdown menu actions based on status
  const getStatusActions = (status: OrderType['status']) => {
    switch (status) {
      case 'pending':
        return (
            <>
              <DropdownMenuItem>
                <Check className="mr-2 h-4 w-4" />
                <span>Mark as Processing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <X className="mr-2 h-4 w-4" />
                <span>Cancel Order</span>
              </DropdownMenuItem>
            </>
        );
      case 'processing':
        return (
            <DropdownMenuItem>
              <Truck className="mr-2 h-4 w-4" />
              <span>Mark as Shipped</span>
            </DropdownMenuItem>
        );
      case 'shipped':
        return (
            <DropdownMenuItem>
              <Package className="mr-2 h-4 w-4" />
              <span>Mark as Delivered</span>
            </DropdownMenuItem>
        );
      default:
        return null;
    }
  };

  // Handler for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({
      ...prev,
      // If the value is an empty string, set the state to null, otherwise convert to number
      [name]: value === '' ? null : Number(value),
    }));
  };

  // Handler for status select change
  const handleStatusChange = (value: OrderType['status']) => {
    setNewOrder(prev => ({ ...prev, status: value }));
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderToAdd: OrderType = {
      id: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, // Simple ID generation
      date: new Date().toISOString().split('T')[0], // Current date
      // Use 0 if the value is null, otherwise use the value
      userId: newOrder.userId || 0,
      username: newOrder.username,
      itemName: newOrder.itemName,
      // Use 0 if the value is null, otherwise use the value
      itemPrice: newOrder.itemPrice || 0,
      status: newOrder.status,
    };

    // In a real application, you would send orderToAdd data to your API here
    console.log('New order submitted:', orderToAdd);

    // Reset form and hide it
    setNewOrder({
      userId: null,
      username: '',
      itemName: '',
      itemPrice: null,
      status: 'pending',
    });
    setIsFormVisible(false);
  };

  // Conditional rendering for the "Add New Order" form
  if (isFormVisible) {
    return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Add New Order</h2>
            <Button variant="ghost" onClick={() => setIsFormVisible(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                  id="userId"
                  name="userId"
                  type="number"
                  value={newOrder.userId ?? ''} // Use nullish coalescing to display empty string if null
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                  id="username"
                  name="username"
                  value={newOrder.username}
                  onChange={e => setNewOrder(prev => ({ ...prev, username: e.target.value }))}
                  required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                    id="itemName"
                    name="itemName"
                    value={newOrder.itemName}
                    onChange={e => setNewOrder(prev => ({ ...prev, itemName: e.target.value }))}
                    required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="itemPrice">Item Price</Label>
                <Input
                    id="itemPrice"
                    name="itemPrice"
                    type="number"
                    value={newOrder.itemPrice ?? ''} // Use nullish coalescing to display empty string if null
                    onChange={handleInputChange}
                    required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newOrder.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsFormVisible(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Order
              </Button>
            </div>
          </form>
        </div>
    );
  }

  // Main view with table and summary cards
  return (
      <div className="space-y-6">
        <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsFormVisible(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Order
            </Button>
          </div>
        </div>

        {/* Order Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold">
              ${orders.reduce((sum, order) => sum + order.itemPrice, 0).toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
            <p className="text-2xl font-bold">
              {orders.length > 0 ? `$${(orders.reduce((sum, order) => sum + order.itemPrice, 0) / orders.length).toFixed(2)}` : '$0.00'}
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Items Sold</h3>
            <p className="text-2xl font-bold">
              {orders.length}
            </p>
          </div>
        </div>

        <div className="rounded-md border">
          {filteredOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.username}</TableCell>
                        <TableCell>{order.itemName}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">${order.itemPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <span>View Details</span>
                              </DropdownMenuItem>
                              {getStatusActions(order.status)}
                              <DropdownMenuItem className="text-red-600">
                                <span>Delete Order</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
          ) : (
              <div className="py-16 text-center text-gray-500">
                <h3 className="mb-2 text-lg font-medium">No orders found</h3>
                <p className="text-sm">
                  Click the "Add Order" button to create your first order.
                </p>
              </div>
          )}
        </div>
      </div>
  );
}
