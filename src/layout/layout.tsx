import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./layout.css";
import { useEffect, useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  };

  useEffect(() => {
    setCartCount(getCartCount());

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cart") {
        setCartCount(getCartCount());
      }
    };
    window.addEventListener("storage", handleStorage);

    let lastCart = localStorage.getItem("cart");
    const interval = setInterval(() => {
      const currentCart = localStorage.getItem("cart");
      if (currentCart !== lastCart) {
        lastCart = currentCart;
        setCartCount(getCartCount());
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid px-4">
          <a
            className="navbar-brand"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Store
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/products")}
                >
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/about")}
                >
                  About
                </a>
              </li>
            </ul>
            <div className="user-actions">
              {user && (
                <div className="ms-auto me-3" style={{ position: "relative", cursor: "pointer" }} onClick={() => navigate("/cart")}> 
                  <i className="bi bi-cart3 fs-5 text-light"></i>
                  {cartCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        background: "#8b5cf6",
                        color: "#fff",
                        borderRadius: "50%",
                        minWidth: 20,
                        height: 20,
                        fontSize: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        padding: "2px 6px",
                        zIndex: 1,
                        boxShadow: "0 0 2px #333"
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </div>
              )}
              {user ? (
                <button
                  className="btn btn-logout"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <i className="bi bi-person"></i>Logout
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-login"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    <i className="bi bi-person"></i>Login
                  </button>
                  <button
                    className="btn btn-signup"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/signup")}
                  >
                    <i className="bi bi-person-plus"></i>Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <footer className="footer">
        <div className="container text-center">
          <p className=" text-light">© 2025 Store. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
