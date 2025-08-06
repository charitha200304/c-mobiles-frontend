import { useState } from 'react';
import { Search, MoreHorizontal, Check, X, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data - replace with actual data from your API
const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2023-06-15',
    status: 'completed',
    total: 1299.98,
    items: 2,
    payment: 'Credit Card'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2023-06-16',
    status: 'processing',
    total: 599.99,
    items: 1,
    payment: 'PayPal'
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    date: '2023-06-16',
    status: 'shipped',
    total: 2345.97,
    items: 3,
    payment: 'Credit Card'
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Williams',
    date: '2023-06-17',
    status: 'pending',
    total: 789.99,
    items: 1,
    payment: 'Bank Transfer'
  },
];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'shipped':
        return <Badge variant="info">Shipped</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusActions = (status: string) => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
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
            ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
          <p className="text-2xl font-bold">
            ${(orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Items Sold</h3>
          <p className="text-2xl font-bold">
            {orders.reduce((sum, order) => sum + order.items, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}