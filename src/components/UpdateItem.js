// src/components/UpdateItem.js

import { useState, useEffect } from 'react';
import { updateItem } from '../services/apiService';

const UpdateItem = ({ item, onItemUpdated, closeEditForm }) => {
  // Initialize state with the current item data
  const [title, setTitle] = useState(item.title || '');
  const [body, setBody] = useState(item.body || '');

  // Effect to update local state if item prop changes
  useEffect(() => {
    setTitle(item.title);
    setBody(item.body);
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = { title, body };
    const result = await updateItem(item.id, updatedItem);
    onItemUpdated(result); // Call the parent callback with the updated item
    closeEditForm(); // Close the edit form after update
  };

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-semibold mb-2">Update Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Title"
          />
        </div>
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Body"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Update Item
        </button>
        <button
          type="button"
          onClick={closeEditForm}
          className="btn btn-secondary w-full mt-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
