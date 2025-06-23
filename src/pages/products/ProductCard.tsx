import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

type ProductCardProps = {
  product: Product;
  onAddToCart: () => void;
  onViewDetails: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
  <Link to={`/product/${product.id}`} className="text-decoration-none">
    <Card
      className="h-100 product-card clickable-card"
      // onClick={onViewDetails}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image-container">
        <Card.Img
          variant="top"
          src={product.images?.[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://placehold.co/300x200/6c757d/ffffff?text=No+Image";
          }}
          className="product-image"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-white fw-bold">{product.title}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description.length > 60
            ? product.description.slice(0, 60) + "..."
            : product.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="text-white fw-bold fs-5">${product.price}</span>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart();
            }}
            className="add-to-cart-btn"
          >
            Add To Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  </Link>
);

export default ProductCard;
