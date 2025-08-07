import { useState, useEffect, useCallback } from 'react';
import { Search, MoreHorizontal, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

// Define the Order type for better type safety
export type OrderType = {
  id: number;
  _id?: string;
  userId: number;
  username: string;
  itemName: string;
  itemPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  itemStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalPrice: number;
  date: string;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editOrderId, setEditOrderId] = useState<string | number | null>(null);
  const [showDeleteId, setShowDeleteId] = useState<string | number | null>(null);

  const [newOrder, setNewOrder] = useState({
    userId: '',
    username: '',
    itemName: '',
    itemPrice: '',
    status: 'pending' as OrderType['status'],
    itemStatus: 'pending' as OrderType['itemStatus'],
    totalPrice: '',
    date: '',
  });

  // Fetch orders when component mounts
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/orders/get-all-orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      console.log('Fetched orders response:', data); // Debug: log backend response
      // Map and normalize orders for the table
      let rawOrders = [];
      if (Array.isArray(data)) {
        rawOrders = data;
      } else if (Array.isArray(data.data)) {
        rawOrders = data.data;
      } else if (Array.isArray(data.orders)) {
        rawOrders = data.orders;
      }
      // Map fields to required shape
      const mappedOrders = rawOrders.map((order: any) => ({
        id: order.id ?? order._id ?? '',
        _id: order._id ?? order.id ?? '',
        userId: order.userId,
        username: order.username,
        itemName: order.itemName,
        itemPrice: order.itemPrice ?? order.totalPrice ?? 0,
        status: order.status ?? order.itemStatus ?? 'pending',
        itemStatus: order.itemStatus ?? order.status ?? 'pending',
        totalPrice: order.totalPrice ?? order.itemPrice ?? 0,
        date: order.date ?? order.createdAt ?? '',
      }));
      // Sort orders by id ascending (to match DB and UI expectations)
      const sortedOrders = mappedOrders.sort((a: OrderType, b: OrderType) => {
        const aId = typeof a.id === 'number' ? a.id : parseInt(a.id) || 0;
        const bId = typeof b.id === 'number' ? b.id : parseInt(b.id) || 0;
        return aId - bId; // ascending order
      });
      setOrders(sortedOrders);
      if (!Array.isArray(rawOrders)) {
        setError('Unexpected response format from backend');
        toast.error('Unexpected response format from backend');
      }
    } catch (err) {
      setError('Failed to load orders');
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (order: OrderType & { _id?: string }) => {
    if (!order._id) {
      toast.error('This order cannot be edited because it does not have a valid backend ID.');
      return;
    }
    setEditOrderId(order._id);
    setIsFormVisible(true);
    setNewOrder({
      userId: String(order.userId),
      username: order.username,
      itemName: order.itemName,
      itemPrice: String(order.itemPrice),
      status: order.status as OrderType['status'],
      itemStatus: order.itemStatus as OrderType['itemStatus'],
      totalPrice: String(order.totalPrice),
      date: order.date,
    });
  };

  const handleDelete = async (id: string | number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/orders/delete-order/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete order');
      await fetchOrders();
      toast.success('Order deleted');
    } catch (err) {
      toast.error('Failed to delete order');
    } finally {
      setIsLoading(false);
      setShowDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const orderData = {
        ...newOrder,
        userId: Number(newOrder.userId),
        itemPrice: Number(newOrder.itemPrice),
        totalPrice: Number(newOrder.totalPrice),
      };
      // Only use the new backend endpoint for placing a new order
      if (!editOrderId) {
        const response = await fetch('http://localhost:3000/api/orders/place', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Failed to place order');
        await fetchOrders();
        setNewOrder({ userId: '', username: '', itemName: '', itemPrice: '', status: 'pending' as OrderType['status'], itemStatus: 'pending' as OrderType['itemStatus'], totalPrice: '', date: '' });
        setIsFormVisible(false);
        setEditOrderId(null);
        toast.success('Order placed successfully!');
      } else {
        // Existing logic for editing an order
        let putId = editOrderId;
        let orderForEdit = null;
        if (editOrderId && orders.length > 0) {
          orderForEdit = orders.find(o => String(o._id) === String(editOrderId) || String(o.id) === String(editOrderId));
          if (orderForEdit && orderForEdit._id) {
            putId = orderForEdit._id;
          } else {
            toast.error('This order cannot be updated because it does not have a valid backend ID.');
            setIsLoading(false);
            return;
          }
        }
        if (putId) {
          const response = await fetch(`http://localhost:3000/api/orders/update-order/${putId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
          });
          if (!response.ok) throw new Error('Failed to save order');
          await fetchOrders();
          setNewOrder({ userId: '', username: '', itemName: '', itemPrice: '', status: 'pending' as OrderType['status'], itemStatus: 'pending' as OrderType['itemStatus'], totalPrice: '', date: '' });
          setIsFormVisible(false);
          setEditOrderId(null);
          toast.success('Order updated successfully!');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the order');
      toast.error(err instanceof Error ? err.message : 'An error occurred while saving the order');
    } finally {
      setIsLoading(false);
    }
  };

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

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    // Defensive: skip if order or order.id is undefined/null
    if (!order || order.id === undefined || order.id === null) return false;
    return (
      order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.username && order.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

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
                  value={newOrder.userId} 
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="itemPrice">Item Price</Label>
                <Input
                    id="itemPrice"
                    name="itemPrice"
                    type="number"
                    value={newOrder.itemPrice} 
                    onChange={handleInputChange}
                    required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="totalPrice">Total Price</Label>
                <Input
                    id="totalPrice"
                    name="totalPrice"
                    type="number"
                    value={newOrder.totalPrice} 
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newOrder.status} onValueChange={(value) => setNewOrder(prev => ({ ...prev, status: value as OrderType['status'] }))}>
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
            </div>
            <div className="grid gap-2">
              <Label htmlFor="itemStatus">Item Status</Label>
              <Select value={newOrder.itemStatus} onValueChange={(value) => setNewOrder(prev => ({ ...prev, itemStatus: value as OrderType['itemStatus'] }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select item status" />
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
              ${orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
            <p className="text-2xl font-bold">
              {orders.length > 0 ? `$${(orders.reduce((sum, order) => sum + order.totalPrice, 0) / orders.length).toFixed(2)}` : '$0.00'}
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
          {isLoading ? (
            <div className="py-16 text-center text-gray-500">
              <h3 className="mb-2 text-lg font-medium">Loading...</h3>
            </div>
          ) : error ? (
            <div className="py-16 text-center text-red-600">
              <h3 className="mb-2 text-lg font-medium">{error}</h3>
            </div>
          ) : filteredOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Item Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders
                  .slice() // Create a shallow copy to avoid mutating state
                  .sort((a: OrderType, b: OrderType) => {
                    const aId = typeof a.id === 'number' ? a.id : parseInt(a.id) || 0;
                    const bId = typeof b.id === 'number' ? b.id : parseInt(b.id) || 0;
                    return aId - bId;
                  })
                  .map((order, idx) => (
                    <TableRow key={order._id || order.id}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{order.username}</TableCell>
                      <TableCell>{order.itemName}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getStatusBadge(order.itemStatus)}</TableCell>
                      <TableCell className="text-right">${order.itemPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${order.totalPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        {order._id ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(order)}>
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => setShowDeleteId(order._id!)}>
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <span style={{ color: '#888', fontStyle: 'italic' }}>Not editable</span>
                        )}
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
        {showDeleteId !== null && (
          <AlertDialog open onOpenChange={() => setShowDeleteId(null)}>
            <AlertDialogContent className="max-w-md rounded-lg p-6">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  Delete Order
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-gray-700">
                  Are you sure you want to <span className="font-semibold text-red-600">delete</span> this order? <br />This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-row justify-end gap-2 mt-6">
                <AlertDialogCancel className="px-4 py-2 border rounded-md hover:bg-gray-100 transition" onClick={() => setShowDeleteId(null)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition" onClick={() => handleDelete(showDeleteId!)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
  );
}
