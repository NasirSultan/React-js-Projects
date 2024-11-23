// src/components/AddItem.js

import { useState } from 'react';
import { addItem } from '../services/apiService';

const AddItem = ({ onItemAdded }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { title, body };
    const addedItem = await addItem(newItem);
    onItemAdded(addedItem); // Update the parent component with the new item
    setTitle('');
    setBody('');
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Add Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
