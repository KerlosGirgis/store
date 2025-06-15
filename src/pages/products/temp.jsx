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
            <Card.Title className="text-white fw-bold ">{product.title}</Card.Title>
            <Card.Text className="text-muted  small flex-grow-1">
                {product.description.length > 60
                    ? product.description.slice(0, 60) + "..."
                    : product.description}
            </Card.Text>
            <div className="small mb-3">
                <Button
                    variant="outline-light"
                    size="sm"
                    className="view-details-btn"
                    onClick={onViewDetails}
                >
                    View Details
                </Button>
            </div>

            
            <div className="d-flex justify-content-between align-items-center mt-auto">
                <span className="text-white fw-bold fs-5">${product.price}</span>
                <Button size="sm" onClick={onAddToCart} className="add-to-cart-btn"
                >
                    Add To Cart
                </Button>
            </div>
        </Card.Body>
    </Card>
);

export default ProductCard;
