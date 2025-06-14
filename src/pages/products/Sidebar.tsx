import { useState } from "react";
import { ListGroup } from "react-bootstrap";

type SidebarProps = {
  onSelect: (category: string) => void;
};

const categories = ["All", "Clothes", "Electronics", "Furniture", "Shoes", "Miscellaneous"];

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSelect = (cat: string) => {
    setActiveCategory(cat);
    onSelect(cat);
  };

  return (
    <div className="sidebar-container bg-dark text-white p-3 rounded border border-secondary">
      <h4 className="mb-3 text-purple fw-semibold d-flex align-items-center">
        <i className="bi bi-grid-fill text-purple me-2"></i>
        Categories
      </h4>
      <ListGroup variant="flush" className="sidebar-list  p-2">
        {categories.map((cat) => (
          <ListGroup.Item
            action
            key={cat}
            className={`bg-dark text-white border-0 py-2 px-3 rounded-0 sidebar-item ${activeCategory === cat ? "active-sidebar" : ""
              }`} onClick={() => handleSelect(cat)}
          >
            {cat}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
