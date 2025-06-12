import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  name: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setServerError("");
    setSuccess(false);

    const signupSuccess = await signup(data.name, data.email, data.password);
    if (signupSuccess) {
      setSuccess(true);
      navigate("/login");
    } else {
      setServerError("Failed to create account. Please try again.");
    }
  };

  const handleDemoFill = () => {
    setValue("name", "John Doe");
    setValue("email", "john.doe@mail.com");
    setValue("password", "changeme123");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 "
      style={{ backgroundColor: "#18191a", color: "#ffffff" }}
    >
      <div
        className="w-100 px-3 rounded-3"
        style={{
          maxWidth: "400px",
          boxShadow: "0 0 10px rgba(212, 209, 209, 0.5)",
        }}
      >
        <div className="text-center my-4">
          <ShoppingBag
            size={48}
            style={{ color: "#A855F7" }}
            className="mb-3"
          />
          <h2 className="fw-bold mb-2">Create Account</h2>
          <p className="text-secondary mb-0">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="btn btn-link p-0 fw-semibold"
              style={{
                color: "#A855F7",
                textDecoration: "none",
                fontSize: "inherit",
              }}
            >
              Sign in
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold mb-2">
              Full Name
            </label>
            <div className="input-group">
              <span
                className="input-group-text border-0"
                style={{
                  backgroundColor: "#1A1D24",
                  color: "#9CA3AF",
                  borderRadius: "8px 0 0 8px",
                }}
              >
                <User size={18} />
              </span>
              <input
                id="name"
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Enter your full name"
                style={{
                  backgroundColor: "#1A1D24",
                  color: "#ffffff",
                  borderRadius: "0 8px 8px 0",
                }}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold mb-2">
              Email Address
            </label>
            <div className="input-group">
              <span
                className="input-group-text border-0"
                style={{
                  backgroundColor: "#1A1D24",
                  color: "#9CA3AF",
                  borderRadius: "8px 0 0 8px",
                }}
              >
                <Mail size={18} />
              </span>
              <input
                id="email"
                type="email"
                className="form-control border-0 shadow-none"
                placeholder="Enter your email"
                style={{
                  backgroundColor: "#1A1D24",
                  color: "#ffffff",
                  borderRadius: "0 8px 8px 0",
                }}
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
                className="input-group-text border-0"
                style={{
                  backgroundColor: "#1A1D24",
                  color: "#9CA3AF",
                  borderRadius: "8px 0 0 8px",
                }}
              >
                <Lock size={18} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control border-0 shadow-none"
                placeholder="Enter your password"
                style={{ backgroundColor: "#1A1D24", color: "#ffffff" }}
                {...register("password")}
              />
              <span
                className="input-group-text border-0"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#1A1D24",
                  color: "#9CA3AF",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {serverError && (
            <div
              className="alert alert-danger py-2 border-0 rounded"
              style={{
                backgroundColor: "rgba(220, 53, 69, 0.1)",
                borderLeft: "3px solid #dc3545",
              }}
            >
              <small>{serverError}</small>
            </div>
          )}
          {success && (
            <div
              className="alert alert-success py-2 border-0 rounded"
              style={{
                backgroundColor: "transparent",
                borderLeft: "3px solid #198754",
              }}
            >
              <small className="text-success">
                Account created successfully! Welcome aboard.
              </small>
            </div>
          )}

          <div
            className="p-3 rounded mb-3 border"
            style={{
              backgroundColor: "rgba(26, 29, 36, 0.3)",
              borderColor: "#374151 !important",
              fontSize: "0.875rem",
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <strong className="text-secondary d-block mb-1">
                  Quick Fill:
                </strong>
                <div className="text-secondary opacity-75">
                  Use demo data to test signup
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="btn btn-sm"
                style={{
                  backgroundColor: "rgba(168, 85, 247, 0.1)",
                  color: "#A855F7",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                }}
              >
                Demo Fill
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold mb-3"
            disabled={loading}
            style={{
              backgroundColor: "#A855F7",
              borderColor: "#A855F7",
              color: "#fff",
              borderRadius: "8px",
              padding: "0.75rem",
              fontSize: "1rem",
            }}
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
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
