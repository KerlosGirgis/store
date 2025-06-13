import { ListGroup } from "react-bootstrap";

type SidebarProps = {
  onSelect: (category: string) => void;
};

const categories = ["All", "Clothes", "Electronics", "Furniture", "Shoes", "Miscellaneous"];

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => (
  <div className="sidebar-container">
    <h5 className="mb-3 text-purple d-flex align-items-center">
      <span className="purple-dot me-2"></span>
      Categories
    </h5>
    <ListGroup variant="flush" className="sidebar-list">
      {categories.map((cat) => (
        <ListGroup.Item
          action
          key={cat}
          className="sidebar-item"
          onClick={() => onSelect(cat)}
          
        >
          {cat}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default Sidebar;
