import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, Users, ShoppingCart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to signin page
    navigate('/signin');
  };
  
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>
            <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                        isActive(item.href)
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto mb-4">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              {navItems.find((item) => isActive(item.href))?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <div className="w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff"
                  alt="Admin"
                  className="w-full h-full"
                />
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
