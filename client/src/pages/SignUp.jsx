import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const SignUp = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post('/api/auth/register', formData);
      setCurrentUser(data);
      sessionStorage.setItem('user', data);
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
      <h2 className="mb-4">Welcome</h2>
      <Form style={{ width: 300 }} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={handleChange} name="email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleChange}
            name="password"
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button type="submit">Create Account</Button>
        </Form.Group>
      </Form>
      <Link className="mt-4" to="/login">
        Already have an account? Login
      </Link>
    </Container>
  );
};

export default SignUp;
