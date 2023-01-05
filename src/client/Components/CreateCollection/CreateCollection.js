import './CreateCollection.scss';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateCollection = () => {
  const [title, setTitle] = useState('');
  const user_id = useSelector((state) => state.user.user_id);

  function handleCreate() {
    const url = 'http://localhost:8080/api/collections/create';
    const create = {
      method: 'POST',
      body: JSON.stringify({ user_id, title }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(url, create)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        <label htmlFor="Title">Title:</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Collection Title Here"
        ></input>
        <button onClick={handleCreate}>Create New Collection</button>
      </div>
    </>
  );
};

export default CreateCollection;
