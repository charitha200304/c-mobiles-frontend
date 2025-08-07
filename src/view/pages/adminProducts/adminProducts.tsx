import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit, Trash2, MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

// Define the Product type for better type safety
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  imageUrl?: string;
};

type NewProduct = {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  imageUrl: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByIdAsc, setSortByIdAsc] = useState(true);

  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: '',
  });

  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [showDeleteId, setShowDeleteId] = useState<number | null>(null);

  // Fetch products when component mounts
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/products/get-all-products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (product: Product) => {
    setEditProductId(product.id);
    setIsFormVisible(true);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      category: product.category,
      imageUrl: product.imageUrl || '',
    });
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Product deleted');
    } catch (err) {
      toast.error('Failed to delete product');
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
      const productData = {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      };

      let response;
      if (editProductId) {
        response = await fetch(`http://localhost:3000/api/products/${editProductId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(productData),
        });
      } else {
        response = await fetch('http://localhost:3000/api/products/save-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save product');
      }

      await fetchProducts();

      setNewProduct({
        name: '', description: '', price: '', stock: '', category: '', imageUrl: '',
      });
      setIsFormVisible(false);
      setEditProductId(null);
      toast.success(editProductId ? 'Product updated!' : 'Product added successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the product');
      toast.error(err instanceof Error ? err.message : 'An error occurred while saving the product');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="success">In Stock</Badge>;
      case 'low_stock':
        return <Badge variant="warning">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Remove duplicate products by id
  const uniqueProducts = Array.from(new Map(products.map(p => [p.id, p])).values());
  const filteredProducts = uniqueProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filteredProducts by ID
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortByIdAsc ? a.id - b.id : b.id - a.id
  );

  // Return the loading spinner or form view
  if (isLoading && !isFormVisible) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
    );
  }

  if (isFormVisible) {
    return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">{editProductId ? 'Edit Product' : 'Add New Product'}</h2>
            <Button
                variant="ghost"
                onClick={() => {
                  setIsFormVisible(false);
                  setError(null);
                  setEditProductId(null);
                }}
                disabled={isLoading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={newProduct.imageUrl}
                  onChange={handleInputChange}
              />
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormVisible(false);
                    setError(null);
                    setEditProductId(null);
                  }}
                  disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                ) : (
                    editProductId ? 'Update Product' : 'Save Product'
                )}
              </Button>
            </div>
          </form>
        </div>
    );
  }

  // Main table view
  return (
      <div className="space-y-6">
        <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  disabled={isLoading}
              />
            </div>
            <Button
                onClick={() => setIsFormVisible(true)}
                className="flex items-center space-x-2"
                disabled={isLoading}
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Button>
          </div>
        </div>

        {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Stock</h3>
            <p className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Inventory Value</h3>
            <p className="text-2xl font-bold">
              ${products.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Categories</h3>
            <p className="text-2xl font-bold">{[...new Set(products.map(p => p.category))].length}</p>
          </div>
        </div>

        <div className="rounded-md border">
          {sortedProducts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] cursor-pointer select-none flex items-center gap-1" onClick={() => setSortByIdAsc((prev) => !prev)}>
                      ID
                      <span>{sortByIdAsc ? '▲' : '▼'}</span>
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProducts.map((product, idx) => (
                      <TableRow key={`${product.id}-${idx}`}>
                        <TableCell className="font-medium">#{product.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/40';
                                  }}
                              />
                            </div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">{product.category}</TableCell>
                        <TableCell className="text-right font-medium">${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(product)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => setShowDeleteId(product.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
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
                <h3 className="mb-2 text-lg font-medium">No products found</h3>
                <p className="text-sm">
                  Click the "Add Product" button to create your first product.
                </p>
              </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-sm text-gray-500">
            Page 1 of 1
          </div>
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
        {showDeleteId !== null && (
          <AlertDialog open onOpenChange={() => setShowDeleteId(null)}>
            <AlertDialogContent className="max-w-md rounded-lg p-6">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-red-500" /> Delete Product
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-gray-700">
                  Are you sure you want to <span className="font-semibold text-red-600">delete</span> this product? <br />This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-row justify-end gap-2 mt-6">
                <AlertDialogCancel className="px-4 py-2 border rounded-md hover:bg-gray-100 transition" onClick={() => setShowDeleteId(null)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition" onClick={() => handleDelete(showDeleteId!)} disabled={isLoading}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
  );
}