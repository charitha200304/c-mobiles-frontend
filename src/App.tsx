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
// ---------------------------------------------

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="search" element={<SearchPage />} />
                    {/* --- NEW ROUTES FOR ABOUT, SERVICES, CONTACT --- */}
                    <Route path="about" element={<AboutPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    {/* ----------------------------------------------- */}
                </Route>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;