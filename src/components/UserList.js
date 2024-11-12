import { useEffect, useState } from "react";
import "./UserList.css";

import { addUser, deleteUser, updateUser } from "../services/userServices";
import UserCard from "./UserCard";

export default function UserList({ searchTerm }) {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", dob: "" });
  const [count, setCount] = useState(0);
  const [openUser, setOpenUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const API_URL = "http://localhost:5000/users";

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(API_URL);
      const data = await res.json();

      setUsers(data);
      setCount(data.length);
    }

    fetchData();
  }, [users]);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      const updatedUser = await updateUser(editId, formData);
      setUsers(users.map((user) => (user.id === editId ? updatedUser : user)));
    } else {
      const newUser = await addUser(formData);
      setUsers([...users, newUser]);
    }

    setFormData({ name: "", email: "", dob: "" });
    setShowPopup(false);
    setEditId(null);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setShowPopup(true);
    setEditId(user.id);
    setFormData({ name: user.name, email: user.email, dob: user.dob });
  };

  const handleClose = (e) => {
    setShowPopup(false);
    setFormData({ name: "", email: "", dob: "" });
    setEditId(null);
  };

  function handleOpenCard(user) {
    setOpenUser(true);
    setSelectedUser(user);
  }

  function handleCloseCard() {
    setOpenUser(false);
    setSelectedUser(null);
  }

  return (
    <div className="data">
      {openUser && <UserCard onClick={handleCloseCard} user={selectedUser} />}
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <form onSubmit={handleSubmit}>
              <div className="header">
                <h2>Create User</h2>
                <span onClick={handleClose}>
                  <i class="ri-close-line"></i>
                </span>
              </div>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <button type="submit">{editId ? "Update" : "Add"} User</button>
            </form>
          </div>
        </div>
      )}
      <div className="overview">
        <h2>User details</h2>
        <h3>Registered Users - {count}</h3>
        <h4 onClick={() => setShowPopup(true)}>Add new</h4>
      </div>
      <div className="user-details">
        {filteredUsers.map((user) => (
          <ul className="user-list">
            <li className="list" key={user.id}>
              <h4>{user.name}</h4>
              <p>{user.dob}</p>
              <p>{user.email}</p>
              <div className="action-btn">
                <i class="ri-eye-fill" onClick={() => handleOpenCard(user)}></i>
                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
