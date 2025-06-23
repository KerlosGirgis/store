import "./notFound.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <svg
        width="250"
        height="250"
        viewBox="0 0 250 250"
        className="error-image"
      >
        <circle cx="125" cy="125" r="50" fill="#6c5ce7" className="planet" />
        <circle cx="125" cy="125" r="45" fill="#5b4cc4" className="planet" />
        <g className="astronaut">
          <circle cx="180" cy="100" r="20" fill="#f8f9fa" />
          <rect x="170" y="120" width="20" height="40" fill="#f8f9fa" rx="10" />
          <circle cx="180" cy="100" r="15" fill="#e0e0e0" />
          <rect x="177" y="95" width="6" height="10" fill="#343a40" />
          <circle cx="183" cy="100" r="2" fill="#343a40" />
          <rect
            x="160"
            y="130"
            width="10"
            height="20"
            fill="#f8f9fa"
            rx="5"
            transform="rotate(20 160 130)"
          />
          <rect
            x="190"
            y="130"
            width="10"
            height="20"
            fill="#f8f9fa"
            rx="5"
            transform="rotate(-20 190 130)"
          />
        </g>
        <circle cx="50" cy="50" r="2" fill="#ffffff" />
        <circle cx="80" cy="30" r="1" fill="#ffffff" />
        <circle cx="200" cy="40" r="1.5" fill="#ffffff" />
        <circle cx="230" cy="70" r="1" fill="#ffffff" />
        <circle cx="180" cy="200" r="2" fill="#ffffff" />
        <circle cx="40" cy="180" r="1.5" fill="#ffffff" />
        <circle cx="220" cy="220" r="1" fill="#ffffff" />
        <circle cx="120" cy="220" r="1.5" fill="#ffffff" />
      </svg>
      <button
        className="btn btn-primary btn-lg px-5 py-3 mt-5 rounded-4"
        onClick={() => navigate("/store")}
      >
        Return to Earth (Home)
      </button>
    </div>
  );
}
