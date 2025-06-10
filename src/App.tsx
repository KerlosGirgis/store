import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Layout from './layout/layout'
import About from './pages/about/about'
import Home from './pages/home/home'
import NotFound from './pages/notFound/notFound'
import Products from './pages/products/products'
import ProductDetails from './pages/productDetails/productDetails'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
