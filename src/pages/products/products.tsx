import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import './Products.css';

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category?: Category;
  images: string[];
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data: Product[] = await res.json();

        const filteredProducts = data.filter(
          (product) => product.category?.id !== 6
        );

        setProducts(filteredProducts);
        setFiltered(filteredProducts);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      alert("Added to cart!");
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="app-container">
      <Container fluid className="main-content">
        <Row className="h-100">
          <Col md={9} className="main-section">
            <SearchBar onChange={handleSearchChange} value={search} />
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
