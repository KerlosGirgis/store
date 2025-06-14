import { Button, Card } from "react-bootstrap";

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

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => (
  <Card className="h-100 product-card">
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
      <Card.Title
        className="text-white fw-bold"
        style={{ background: "transparent" }}
      >
        {product.title}
      </Card.Title>
      <Card.Text
        className="text-muted small flex-grow-1"
        style={{ background: "transparent" }}
      >
        {product.description.length > 60
          ? product.description.slice(0, 60) + "..."
          : product.description}
      </Card.Text>
      <Button
        variant="outline-light"
        size="sm"
        className="view-details-btn rounded-4 w-75 align-self-center mb-3"
        onClick={onViewDetails}
      >
        View Details
      </Button>

      <div
        className="d-flex justify-content-between align-items-center mt-auto"
        style={{ background: "transparent" }}
      >
        <span
          className="text-white fw-bold fs-5"
          style={{ background: "transparent" }}
        >
          ${product.price}
        </span>
        <Button variant="primary" size="sm" onClick={onAddToCart}>
          Add To Cart
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default ProductCard;
