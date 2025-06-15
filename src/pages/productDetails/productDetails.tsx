import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./productDetails.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // const [showCard, setShowCard] = useState(true);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const images = product?.images || [];

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        await axios
          .get(`https://api.escuelajs.co/api/v1/products/${id}`)
          .then((res) => setProduct(res.data))
          .catch((err) => setError(err.message));
        setLoading(false);
        // const response = await axios.get(`https://api.escuelajs.co/api/v1/products`);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };
    getProductDetails();
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <p className="empty text-danger fw-bold text-center mt-5 mb-5 p-5 ">
        This Product id is not found
      </p>
    );
  return (
    <>
      {/* {showCard ? ( */}
      <div className="card-container my-5 text-white ">
        <div className="container-fluid  px-4 py-3">
          <div className="row mb-4">
            <div className="col-12">
              {product && (
                <Link to={`/products`} className="text-decoration-none">
                  <button className="btn btn-link px-3 text-white border border-1 border-secondary-subtle rounded-pill  text-decoration-none">
                    <i className="bi bi-arrow-left me-2"></i>
                    <span>Back</span>
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-2 col-3 order-1">
              <div className="d-flex flex-column gap-3">
                {images.map((img: any, index: any) => (
                  <div
                    key={index}
                    className={`thumbnail-container ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Product view ${index + 1}`}
                      className="img-fluid rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        border:
                          selectedImage === index
                            ? "2px solid #fff"
                            : "1px solid #444",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-5 col-9 order-2 order-md-2">
              <div className="main-image-container">
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
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
                <h1 className="h2 fw-bold mb-3">{product?.title}</h1>

                <p className=" w-25 text-center border border-1 border-secondary-subtle rounded-pill mb-1">
                  {product?.category?.name || "Uncategorized"}
                </p>

                <div className="product-description mb-4 mt-5">
                  <p className="   text-secondary fs-5 fw-light">
                    {product?.description || "No description available."}
                  </p>
                </div>

                <div className="d-flex  justify-content-between align-items-center ">
                  <div>
                    <p>Price</p>
                    <div className="price-section ">
                      <h3 className="h2 fw-bold text-white">
                        $
                        {product
                          ? (product.price * quantity).toFixed(2)
                          : "0.00"}{" "}
                      </h3>
                    </div>
                  </div>

                  <div className="social-buttons d-flex gap-2 justify-content-end">
                    <button
                      className="btn btn-primary rounded d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          background: "transparent",
                        }}
                      >
                        <i className="bi bi-plus"></i>
                      </span>
                    </button>

                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="form-control text-light text-center w-25 bg-dark rounded d-flex align-items-center justify-content-center"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />

                    <button
                      className="btn btn-danger rounded d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          background: "transparent",
                        }}
                      >
                        <i className="bi bi-dash"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
