// Dashboard.jsx
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../App";
const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
  });

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/persons`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("authToken");

  // Redirect to the login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      await axios.post(`${BACKEND_URL}/persons`, selectedUser);
      fetchUsers(); // Fetch updated user list after adding a new user
      setIsAddingUser(false);
      alert("User added");
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/persons/${selectedUser._id}`,
        selectedUser
      );
      fetchUsers(); // Fetch updated user list after editing a user
      setIsEditingUser(false);
    } catch (error) {
      console.error("Error editing user:", error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/persons/${selectedUser._id}`);
      fetchUsers(); // Fetch updated user list after deleting a user
      setIsEditingUser(false);
      alert("User Deleted Successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleCancelAddUser = () => {
    // Clear the input fields
    setSelectedUser({
      id: null,
      name: "",
      email: "",
      phone: "",
    });

    // Hide the add user section
    setIsAddingUser(false);
  };

  const handleCancelEditUser = () => {
    // Clear the input fields
    setSelectedUser({
      id: null,
      name: "",
      email: "",
      phone: "",
    });

    // Hide the edit user section
    setIsEditingUser(false);
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <div className="cards-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div>
              <strong>name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Phone:</strong> {user.phone}
            </div>
            <div className="button-container">
              <button
                onClick={() => {
                  setIsEditingUser(true);
                  setSelectedUser(user);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedUser(user);
                  handleDeleteUser();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddingUser ? (
        <div className="user-card">
          <h3>Add User</h3>
          <div>
            <label htmlFor="name">name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={selectedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={selectedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={selectedUser.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-container">
            <button onClick={handleAddUser}>Save</button>
            <button onClick={handleCancelAddUser}>Cancel</button>
          </div>
        </div>
      ) : isEditingUser ? (
        <div className="user-card">
          <h3>Edit User</h3>
          <div>
            <label htmlFor="name">name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={selectedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={selectedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={selectedUser.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-container">
            <button onClick={handleEditUser}>Save</button>
            <button onClick={handleCancelEditUser}>Cancel</button>
          </div>
        </div>
      ) : (
        <button
          className="add-user-button"
          onClick={() => setIsAddingUser(true)}
        >
          Add User
        </button>
      )}
    </div>
  );
};

export default Dashboard;
