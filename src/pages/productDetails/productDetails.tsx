"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./productDetails.css"

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0)

  const productImages = [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ]

  const thumbnailImages = [
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
  ]

  return (
    <div className="bg-dark text-white min-vh-100">
      <div className="container-fluid px-4 py-3">
        {/* Header with back button */}
        <div className="row mb-4">
          <div className="col-12">
            <button className="btn btn-link text-white p-0 text-decoration-none">
              <i className="bi bi-arrow-left me-2"></i>
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="row">
          {/* Left side - Thumbnails */}
          <div className="col-md-2 col-3 order-1">
            <div className="d-flex flex-column gap-3">
              {thumbnailImages.map((thumb, index) => (
                <div
                  key={index}
                  className={`thumbnail-container ${selectedImage === index ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={thumb || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="img-fluid rounded"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      border: selectedImage === index ? "2px solid #fff" : "1px solid #444",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Center - Main product image */}
          <div className="col-md-5 col-9 order-2 order-md-2">
            <div className="main-image-container">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt="Electronic Bronze Computer Hoodie"
                className="img-fluid rounded"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                  backgroundColor: "#f8f9fa",
                }}
              />
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="col-md-5 col-12 order-3">
            <div className="product-info">
              <h1 className="h2 fw-bold mb-3">Electronic Bronze Computer</h1>

              <p className="text-muted mb-1">Clothes</p>

              <div className="product-description mb-4">
                <p className="mb-3">
                  Boxtart's most advanced compression wear technology increases muscle oxygenation, stabilizes active
                  muscle
                </p>
              </div>

              <div className="price-section mb-4">
                <h3 className="h1 fw-bold text-white">$ 666</h3>
              </div>

              {/* Social sharing buttons */}
              <div className="social-buttons d-flex gap-2">
                <button
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>f</span>
                </button>
                <button
                  className="btn btn-info rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>t</span>
                </button>
                <button
                  className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>@</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
