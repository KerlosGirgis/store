import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setIsEmpty(parsedCart.length === 0);
    }
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setIsEmpty(updatedCart.length === 0);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setIsEmpty(true);
    navigate("/products/-1");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#18191A",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      <main className="container py-4">
        {isEmpty ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div
              style={{
                position: "relative",
                width: "128px",
                height: "128px",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  border: "2px solid #a855f7",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6h-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2H2" />
                  <path d="M10 16h4" />
                  <path d="M2 6l2 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2l2-14" />
                </svg>
              </div>
            </div>
            <h2 className="fw-bold mb-2">Your cart is empty</h2>
            <p style={{ color: "#aaa" }}>
              Start adding items to enjoy shopping!
            </p>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-9">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-3 p-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
                  style={{
                    backgroundColor: "#242526",
                    borderRadius: "0.5rem",
                    border: "1px solid #333",
                    gap: "1rem",
                  }}
                >
                  <div className="bg-transparent">
                    <h5 className="fw-bold mb-1 bg-transparent">{item.name}</h5>
                    <p className="mb-1 bg-transparent">
                      Price:{" "}
                      <strong className="bg-transparent">
                        ${item.price.toFixed(2)}
                      </strong>
                    </p>
                    <p className="mb-1 bg-transparent">
                      Subtotal:{" "}
                      <strong className="bg-transparent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </p>
                  </div>

                  <div className="d-flex align-items-center flex-wrap gap-2 bg-transparent">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#a855f7",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      +
                    </button>
                    <div
                      style={{
                        width: "50px",
                        textAlign: "center",
                        padding: "0.25rem 0",
                        border: "1px solid #333",
                        borderRadius: "0.375rem",
                        color: "#fff",
                      }}
                    >
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#a855f7",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-3">
              <div
                style={{
                  border: "1px solid #333",
                  borderRadius: "0.5rem",
                  padding: "1.5rem",
                  backgroundColor: "#242526",
                }}
              >
                <h2 className="fw-bold mb-3 bg-transparent">
                  Order Total: ${totalPrice.toFixed(2)}
                </h2>
                <p className="mb-4 bg-transparent">
                  Sales volume: {totalQuantity}
                </p>
                <button
                  onClick={handleCheckout}
                  className="btn w-100"
                  style={{
                    backgroundColor: "#a855f7",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.375rem",
                    fontWeight: "500",
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
