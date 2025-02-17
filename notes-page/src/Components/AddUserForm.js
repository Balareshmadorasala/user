import React, { useState } from "react";
import { Button, Modal, Form, Table, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Updated CSS file

const AddUserForm = () => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]); // Stores user data
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Number of users per page

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: "student",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, formData]); // Add new user
    setFormData({ name: "", email: "", contact: "", password: "", role: "student" }); // Reset form
    handleClose();
  };

  // Delete user and adjust pagination
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);

    // Adjust page number if needed
    const newTotalPages = Math.ceil(updatedUsers.length / usersPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container mt-4">
      {/* Right-Aligned Add User Button */}
      <div className="button-wrapper">
        <Button variant="danger" onClick={handleShow}>
          Add User
        </Button>
      </div>

      {/* Show Table Only When Users Exist */}
      {users.length > 0 && (
        <div className="table-wrapper">
          <div className="table-responsive"> {/* Responsive Table Wrapper */}
            <Table bordered hover className="mt-3 text-center">
              <thead className="table-header">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(indexOfFirstUser + index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination Buttons */}
          <div className="pagination-wrapper">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>

            <span className="current-page">{currentPage}</span>

            <button
              onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={currentPage >= totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal Form */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-heading">Add User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <div className="input-wrapper">
                  <label className="input-label">Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="text-input" required />
                </div>
              </Col>
              <Col md={6}>
                <div className="input-wrapper">
                  <label className="input-label">Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="text-input" required />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="input-wrapper">
                  <label className="input-label">Contact:</label>
                  <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="text-input" required />
                </div>
              </Col>
              <Col md={6}>
                <div className="input-wrapper">
                  <label className="input-label">Password:</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="text-input" required />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="input-wrapper">
                  <label className="input-label">Role:</label>
                  <select name="role" value={formData.role} onChange={handleChange} className="dropdown-select">
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
              </Col>
            </Row>

            <div className="button-group">
              <Button variant="success" type="submit">
                Submit
              </Button>
              <Button variant="danger" onClick={handleClose} className="ms-2">
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddUserForm;



