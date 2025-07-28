import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout";
import { Home } from "./view/pages/home/home";
import About from "./view/pages/about/about";
import Products from "./view/pages/products/products";
import Services from "./view/pages/service/service";
import Contact from "./view/pages/contact/contact";
import SignUp from "./view/pages/signup/signup";
import SignIn from "./view/pages/signin/signin";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;