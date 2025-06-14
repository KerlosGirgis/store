import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./layout.css";
export default function Layout() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
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
          <p className=" text-light">© 2025S Store. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
