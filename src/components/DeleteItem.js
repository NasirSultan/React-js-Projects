// src/components/DeleteItem.js

import { deleteItem } from '../services/apiService';

const DeleteItem = ({ itemId, onItemDeleted }) => {
  const handleDelete = async () => {
    await deleteItem(itemId);
    onItemDeleted(itemId); // Remove the deleted item from the state
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger btn-sm">
      Delete
    </button>
  );
};

export default DeleteItem;
