import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import './Products.css';


const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        const cleaned = data.filter((p: any) => p.category?.id !== 6);

        // const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        // const json = await res.json();
        // const cleaned = json.data.filter((p: any) => p.category?.id !== 6);
        setProducts(cleaned);
        const params = new URLSearchParams(location.search);
        const categoryId = parseInt(params.get("categoryId") || "", 10);

        if (!isNaN(categoryId)) {
          setFiltered(cleaned.filter((p: any) => p.category?.id === categoryId));
        } else {
          setFiltered(cleaned);
        }
      } catch (err) {
        setError(`Failed to load products. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleCategorySelect = (category: string) => {
    if (category === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category?.name === category));
    }
    setSearch("");
  };

  const handleSearchChange = (term: string) => {
    setSearch(term);
    setFiltered(
      products.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleAddToCart = (product: Product) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/login");
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="app-container">
      <Container fluid className="main-content">
        <Row className="w-75 ">
          <SearchBar onChange={handleSearchChange} value={search} />

        </Row>
        <Row className="h-100">
          <Col md={9} className="main-section">

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="light" />
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <Row className="g-4">
                {filtered.map((product) => (
                  <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                      onViewDetails={() => handleViewDetails(product.id)}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
          <Col md={3} className="sidebar-section">
            <Sidebar onSelect={handleCategorySelect} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
