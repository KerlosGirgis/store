import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  onChange: (term: string) => void;
  value?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onChange, value }) => (
  <div className="my-4">
    <InputGroup className="search-bar">
      <InputGroup.Text className="bg-dark border-0 text-purple">
        <FaSearch style={{background:"transparent"}} ></FaSearch>
      </InputGroup.Text>
      <Form.Control
        placeholder="Search..."
        onChange={(e) => onChange(e.target.value)}
        className="bg-dark text-white border-0 search-input"
        value={value}
      />
    </InputGroup>
  </div>
);

export default SearchBar;
