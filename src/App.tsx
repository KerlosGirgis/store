import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "devicon/devicon.min.css";
import Layout from "./layout/layout";
import About from "./pages/about/about";
import Home from "./pages/home/home";
import NotFound from "./pages/notFound/notFound";
import Products from "./pages/products/products";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Cart from "./pages/cart/cart";
import ProductDetails from "./pages/productDetails/productDetails";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/store" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/store/about" element={<About />} />
          <Route path="/store/products" element={<Products />} />
          <Route path="/store/product/:id" element={<ProductDetails />} />
          <Route path="/store/login" element={<Login />} />
          <Route path="/store/signup" element={<SignUp />} />
          <Route path="/store/cart" element={<Cart />} />
          <Route path="/store/*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
