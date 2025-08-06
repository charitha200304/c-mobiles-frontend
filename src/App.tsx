// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './view/common/DefaultLayout/DefaultLayout';
import { Home } from './view/pages/home/home';
import Products from './view/pages/products/products';
import SignUp from './view/pages/auth/signup/SignUp.tsx';
import SignIn from './view/pages/auth/signin/SignIn.tsx';
import SearchPage from './view/pages/searchpage/SearchPage.tsx';

// --- NEW IMPORTS FOR ABOUT, SERVICES, CONTACT ---
import AboutPage from './view/pages/about/about.tsx';
import ServicesPage from './view/pages/service/service.tsx';
import ContactPage from './view/pages/contact/contact.tsx';
import { CartProvider } from './context/CartContext.tsx';
import AdminLayout from './view/common/AdminLayout/AdminLayout';
import AdminDashboard from './view/pages/adminDashboard/adminDashboard';
import AdminUsers from './view/pages/adminUsers/adminUsers';
import AdminProducts from './view/pages/adminProducts/adminProducts';
import AdminOrders from './view/pages/adminOrders/adminOrders';
// ---------------------------------------------

function App() {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={<Home />} />
                        <Route path="products" element={<Products />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="services" element={<ServicesPage />} />
                        <Route path="contact" element={<ContactPage />} />
                    </Route>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<AdminOrders />} />
                    </Route>
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;