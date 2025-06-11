"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./productDetails.css"

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0)


  const thumbnailImages = [
    "https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-white-t-shirt-mockup-realistic-t-shirt-png-image_9906363.png",

    "https://img.freepik.com/premium-psd/t-shirt-with-blue-color-isolated-transparent-background_191095-23064.jpg",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy8VfYgsGGpN1CDR7YnFBhsmWwvwxFpJNo6SyzGKPVZLRzjwoB2IaexiE-si5Z2Ri0BXw&usqp=CAU",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtcx3Ai5axmHgbPFKQwgvMYjJU37b01gTSw&s",
  ]

  return (
    <div className="card-container my-5 text-white ">
      <div className="container-fluid  px-4 py-3">
        <div className="row mb-4">
          <div className="col-12">
            <button className="btn btn-link px-3 text-white border border-1 border-secondary-subtle rounded-pill  text-decoration-none">
              <i className="bi bi-arrow-left me-2"></i>
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="row">
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

          <div className="col-md-5 col-9 order-2 order-md-2">
            <div className="main-image-container">
              <img
                src={thumbnailImages[selectedImage] || "/placeholder.svg"}
                alt=" Hoodie"
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


          <div className="col-md-5 col-12 order-3">
            <div className="product-info">
              <h1 className="h2 fw-bold mb-3">Electronic Bronze Computer</h1>

              <p className=" w-25 text-center border border-1 border-secondary-subtle rounded-pill mb-1">Clothes</p>

              <div className="product-description mb-4 mt-5">
                <p className="   text-secondary fs-5 fw-light">
                  Boxtart's most advanced compression wear technology increases muscle oxygenation, stabilizes active
                  muscle
                </p>
              </div>


              <div className="d-flex  justify-content-between align-items-center ">
                <div>
                  <p>Price</p>
                  <div className="price-section ">
                    <h3 className="h2 fw-bold text-white">$ 666</h3>
                  </div>
                </div>


                <div className="buttons d-flex gap-2 justify-content-end">
                  <button
                    className="btn btn-primary rounded d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: "bold",background:"transparent" }}>+</span>
                  </button>

                  <input type="number" value={1} className="form-control text-light text-center w-25 bg-dark rounded d-flex align-items-center justify-content-center" id="exampleInputEmail1" aria-describedby="emailHelp" />




                  <button
                    className="btn btn-danger rounded d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: "bold", background: "transparent" }}>
                      <i style={{ background: "transparent" }} className="bi bi-trash"></i>
                    </span>
                  </button>
                </div>
              </div>




            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
