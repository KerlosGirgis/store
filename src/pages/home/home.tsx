import { useState, useEffect } from "react";
import "./home.css";

type Category = {
  id: number;
  name: string;
  image: string;
};

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#f8f9fa" }}>
            Welcome
          </h2>
        </div>

        <div className="row g-4">
          {categories
            .filter((_, idx) => [0, 1, 3, 4].includes(idx))
            .map((cat) => (
              <div key={cat.id} className="col-6">
                <div
                  className={`card h-100 border-0 transition-all duration-300 rounded-5 ${
                    hoveredCard === cat.id ? "shadow-lg" : "shadow"
                  }`}
                  style={{
                    backgroundColor: "#1a1c1d",
                    transform:
                      hoveredCard === cat.id
                        ? "translateY(-5px)"
                        : "translateY(0)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredCard(cat.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="card-body p-4 text-center bg-dark rounded-5">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#1a1c1d",
                        color: "white",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h5
                      className="card-title fw-bold mb-3"
                      style={{ color: "white" ,background:"transparent"}}
                    >
                      {cat.name}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
