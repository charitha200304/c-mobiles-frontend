import { useState, useEffect } from 'react';
import {
  Search,
  UserPlus,
  Mail,
  User,
  Shield,
  ShieldCheck,
  ShieldOff,
  Edit,
  Trash2,
  Users,
  MoreHorizontal,
  X // Added X icon for closing the form
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label'; // Added Label for form fields
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Added Select for role
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import UserProfile from './UserProfile';

// Define the User type for better type safety
type UserType = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  avatar?: string;
  address: string; // Added address
  phone: string;   // Added phone
};

export default function AdminUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortByIdAsc, setSortByIdAsc] = useState(true);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [showDeleteId, setShowDeleteId] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({ // State for new user form data
    name: '',
    email: '',
    password: '', // Password is optional, but included in the form
    address: '',
    phone: '',
    role: 'customer' as 'admin' | 'customer', // Default role for new users
  });
  const [profileUser, setProfileUser] = useState<UserType | null>(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/users/get-all-users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.data || []);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // Add/Edit User
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (editUserId) {
        response = await fetch(`http://localhost:3000/api/users/${editUserId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
      } else {
        response = await fetch('http://localhost:3000/api/users/save-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
      }
      if (!response.ok) throw new Error('Failed to save user');
      await fetchUsers();
      setNewUser({ name: '', email: '', password: '', address: '', phone: '', role: 'customer' });
      setIsFormVisible(false);
      setEditUserId(null);
    } catch (err) {
      setError('Failed to save user');
    } finally {
      setIsLoading(false);
    }
  };

  // Edit User
  const handleEdit = (user: UserType) => {
    setEditUserId(user.id);
    setIsFormVisible(true);
    // Only allow 'admin' or 'customer' roles in the form. If user is 'manager', default to 'customer'.
    let safeRole: 'admin' | 'customer' = user.role === 'admin' ? 'admin' : 'customer';
    setNewUser({
      name: user.name,
      email: user.email,
      password: '',
      address: user.address,
      phone: user.phone,
      role: safeRole,
    });
  };

  // Delete User
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      await fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setIsLoading(false);
      setShowDeleteId(null);
    }
  };

  // Sorting
  const sortedUsers = [...users].sort((a, b) => sortByIdAsc ? a.id - b.id : b.id - a.id);

  // Filtering
  const filteredUsers = sortedUsers.filter(user => {
    const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: UserType['role']) => {
    switch (role) {
      case 'admin':
        return <Badge variant="destructive" className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Admin</Badge>;
      case 'manager':
        return <Badge variant="secondary" className="flex items-center gap-1"><Shield className="h-3 w-3" /> Manager</Badge>;
      case 'customer':
      default:
        return <Badge variant="outline" className="flex items-center gap-1"><User className="h-3 w-3" /> Customer</Badge>;
    }
  };

  const getStatusBadge = (status: UserType['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
  };

  // Handler for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Handler for role select change
  const handleRoleChange = (value: 'admin' | 'customer') => {
    setNewUser(prev => ({ ...prev, role: value }));
  };

  // Conditional rendering: Show profile if profileUser is set
  if (profileUser) {
    return <UserProfile user={profileUser} onClose={() => setProfileUser(null)} />;
  }

  // Conditional rendering: Show form if isFormVisible is true
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="mb-4 text-red-500 font-semibold">{error}</div>
        <Button onClick={() => { setError(null); fetchUsers(); }}>Retry</Button>
      </div>
    );
  }

  if (isFormVisible) {
    return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">{editUserId ? 'Edit User' : 'Add New User'}</h2>
            <Button variant="ghost" onClick={() => { setIsFormVisible(false); setEditUserId(null); }}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password (optional)</Label>
              <Input
                  id="password"
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                  id="address"
                  name="address"
                  value={newUser.address}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsFormVisible(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editUserId ? 'Save Changes' : 'Add User'}
              </Button>
            </div>
          </form>
        </div>
    );
  }

  // Default rendering: Show user list and stats
  return (
      <div className="space-y-6">
        <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Role Filter */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsFormVisible(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <ShieldCheck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.status !== 'active').length}
                </p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <ShieldOff className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          {filteredUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] cursor-pointer select-none flex items-center gap-1" onClick={() => setSortByIdAsc((prev) => !prev)}>
                      ID
                      <span>{sortByIdAsc ? '▲' : '▼'}</span>
                    </TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, idx) => (
                      <TableRow key={user.id ? `user-${user.id}` : `idx-${idx}`}>
                        <TableCell className="font-medium">#{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="flex items-center">
                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem key="profile" onClick={() => setProfileUser(user)}>
                                <User className="mr-2 h-4 w-4" />
                                <span>View Profile</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem key="edit" onClick={() => handleEdit(user)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit User</span>
                              </DropdownMenuItem>
                              {user.role !== 'admin' && (
                                  <DropdownMenuItem key="delete" className="text-red-600" onClick={() => setShowDeleteId(user.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
          ) : (
              <div className="py-16 text-center text-gray-500">
                <h3 className="mb-2 text-lg font-medium">No users found</h3>
                <p className="text-sm">
                  Click the "Add User" button to create your first user.
                </p>
              </div>
          )}
        </div>
        {showDeleteId !== null && (
          <AlertDialog open onOpenChange={() => setShowDeleteId(null)}>
            <AlertDialogContent className="max-w-md rounded-lg p-6">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-red-500" /> Delete User
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-gray-700">
                  Are you sure you want to <span className="font-semibold text-red-600">delete</span> this user? <br />This action cannot be undone.
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
