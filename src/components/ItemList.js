// src/components/ItemList.js

import { useEffect, useState } from 'react';
import { fetchItems } from '../services/apiService';
import DeleteItem from './DeleteItem';
import UpdateItem from './UpdateItem';
import AddItem from './AddItem';  // <-- Add this import

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited

  const loadItems = async () => {
    const items = await fetchItems();
    setItems(items);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemUpdated = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null); // Close the edit form
  };

  const handleItemDeleted = (deletedId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deletedId));
  };

  const openEditForm = (item) => {
    setEditingItem(item); // Set the item to be edited
  };

  const closeEditForm = () => {
    setEditingItem(null); // Close the edit form
  };

  return (
    <div className="mb-8">
      {editingItem ? (
        <UpdateItem
          item={editingItem}
          onItemUpdated={handleItemUpdated}
          closeEditForm={closeEditForm}
        />
      ) : (
        <AddItem onItemAdded={handleItemAdded} />
      )}
      
      <table className="table table-zebra w-full mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>
                <button
                  onClick={() => openEditForm(item)} // Open edit form for the clicked item
                  className="btn btn-warning btn-sm mr-2"
                >
                  Update
                </button>
                <DeleteItem itemId={item.id} onItemDeleted={handleItemDeleted} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
