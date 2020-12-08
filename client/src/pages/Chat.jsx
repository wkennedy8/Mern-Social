import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const Chat = ({ history }) => {
  const [conversation, setConversation] = useState([]);
  const { setLoading, loading } = useContext(AppContext);
  const { id } = useParams();

  const createConversation = async () => {
    try {
      const { data } = await axios.post(`/api/conversations`, { user: id });
      setConversation(data);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    createConversation();
    // eslint-disable-next-line
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    try {
      const { data } = await axios.post(
        `/api/conversations/${conversation[0]?._id}/message`,
        {
          body: e.target.elements.message.value
        },
        { withCredentials: true }
      );
      form.reset();
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Button onClick={() => history.goBack()}>Go Back</Button>
      {conversation[0]?.messages.map((message) => {
        return (
          <Paper key={message._id}>
            <Typography>
              {message.sender.username}: {message.body} {message.createdAt}
            </Typography>
          </Paper>
        );
      })}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control id="message" />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Send</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Chat;
