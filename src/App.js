import { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="main">
      <div className="navbar">
        <h2>formance</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="user-info">
          <span className="user-logo">U</span>
          <p>user</p>
        </div>
      </div>
      <UserList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
