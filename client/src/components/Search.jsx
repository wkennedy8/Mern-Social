import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Avatar, Paper } from '@material-ui/core';
import axios from 'axios';

const Search = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  const getUsers = async () => {
    try {
      const { data } = await axios.get('/api/users', { withCredentials: true });
      setOptions(data);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setDisplay(true);
  };

  return (
    <div ref={wrapperRef}>
      <Form.Control
        type="text"
        name="search"
        placeholder="Find a friend..."
        onChange={handleChange}
        autoComplete="off"
      />
      {display && (
        <div>
          {options
            .filter(
              ({ username }) => username.indexOf(search.toLowerCase()) > -1
            )
            .map((user) => (
              <Link key={user._id} to={`/users/${user._id}`}>
                <Paper>
                  <Avatar src={user.avatar} alt={user.username} />
                  <p>{user.username}</p>
                </Paper>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
