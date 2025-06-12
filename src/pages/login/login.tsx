import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    setSuccess(false);

    const loginSuccess = await login(data.email, data.password);
    if (loginSuccess) {
      setSuccess(true);
      navigate("/products");
    } else {
      setError("Invalid credentials. Try: john@mail.com / changeme");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleDemoLogin = () => {
    setValue("email", "john@mail.com");
    setValue("password", "changeme");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: "#18191a", color: "#ffffff" }}
    >
      <div
        className="w-100 px-3 rounded-3"
        style={{
          maxWidth: "400px",
          boxShadow: "0 0 10px rgba(212, 209, 209, 0.5)",
        }}
      >
        <div className="text-center mb-4 mt-3">
          <ShoppingBag
            size={48}
            style={{ color: "#A855F7" }}
            className="mb-3"
          />
          <h2 className="fw-bold mb-2">Sign in to Shop</h2>
          <p className="text-light mb-0">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignupClick}
              className="btn btn-link p-0 fw-semibold"
              style={{
                color: "#A855F7",
                textDecoration: "none",
                fontSize: "inherit",
              }}
            >
              Sign up
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold mb-2">
              Email Address
            </label>
            <div className="input-group">
              <span
                className="input-group-text"
                style={{ backgroundColor: "#1A1D24", color: "#9CA3AF" }}
              >
                <Mail size={18} />
              </span>
              <input
                type="email"
                id="email"
                className="form-control border-0 shadow-none"
                style={{ backgroundColor: "#1A1D24", color: "#ffffff" }}
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold mb-2">
              Password
            </label>
            <div className="input-group">
              <span
                className="input-group-text"
                style={{ backgroundColor: "#1A1D24", color: "#9CA3AF" }}
              >
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control border-0 shadow-none"
                style={{ backgroundColor: "#1A1D24", color: "#ffffff" }}
                placeholder="Enter your password"
                {...register("password")}
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#1A1D24",
                  color: "#9CA3AF",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {error && (
            <div className="alert alert-danger py-2 border-0 rounded">
              <small>{error}</small>
            </div>
          )}
          {success && (
            <div className="alert alert-success py-2 border-0 rounded">
              <small>Login successful! Welcome back.</small>
            </div>
          )}

          <div
            className="p-3 rounded mb-3 border"
            style={{ backgroundColor: "rgba(26, 29, 36, 0.3)" }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <strong className="text-light d-block mb-1">
                  Demo Credentials:
                </strong>
                <div className="text-light opacity-75">
                  <div>Email: john@mail.com</div>
                  <div>Password: changeme</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="btn btn-sm"
                style={{
                  color: "#A855F7",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                }}
              >
                Use Demo
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold mb-4 mt-3"
            style={{
              backgroundColor: "#A855F7",
              color: "#fff",
              borderRadius: "8px",
              padding: "0.75rem",
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  style={{ width: "1rem", height: "1rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
