// src/App.js
import React, { useState, useEffect } from 'react';
import List from './components/List'; // Import the List component to display items
import Add from './components/Add'; // Import the Add component to add new items
import Update from './components/Update'; // Import the Update component to edit existing items
import { fetchItems } from './api/api';  // Import the API function that fetches the list of items from a server or database

// Main functional component for our React app
function App() {
    // State hooks:
    const [items, setItems] = useState([]);  // State to hold the list of items (initially an empty array)
    const [editingItem, setEditingItem] = useState(null);  // State to store the item being edited (null initially, meaning no item is being edited)

    // useEffect hook to run the fetchItems function when the component mounts
    // The empty dependency array ensures that the effect runs only once when the component first loads
    useEffect(() => {
        // Function to fetch the list of items from an API (or database) when the component mounts
        const getItems = async () => {
            const data = await fetchItems(); // Await the result of fetchItems, which returns a promise
            setItems(data); // Once the data is fetched, update the 'items' state with the fetched data
        };
        getItems(); // Call the getItems function
    }, []); // Empty dependency array means this effect runs only once

    // Handler function for adding a new item to the list
    const handleItemAdded = (newItem) => {
        setItems([...items, newItem]); // Add the new item to the existing list by creating a new array with the current items and the new item
    };

    // Handler function for updating an existing item in the list
    const handleItemUpdated = (updatedItem) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item)); 
        // Map over the current items and replace the item with the updated item based on the id
        setEditingItem(null);  // Close the edit form after updating by setting editingItem to null
    };

    // Handler function for deleting an item from the list
    const handleItemDeleted = (id) => {
        setItems(items.filter(item => item.id !== id));  // Filter out the item with the matching id from the items array
    };

    // Handler function for initiating the edit process on an item
    const handleEdit = (item) => {
        setEditingItem(item); // Set the item to be edited in the editingItem state
    };

    // Handler function for canceling the edit process
    const handleCancelEdit = () => {
        setEditingItem(null); // Close the edit form by setting editingItem back to null
    };

    return (
        <div>
            <h1>React CRUD App</h1> {/* Title of the app */}
            <Add onItemAdded={handleItemAdded} /> {/* The Add component that takes care of adding new items, passing the handleItemAdded function as a prop */}
            
            {/* Conditionally render either the Update component (if an item is being edited) or the List component (if no item is being edited) */}
            {editingItem ? (
                <Update
                    item={editingItem} // Pass the item being edited to the Update component
                    onItemUpdated={handleItemUpdated} // Pass the function to handle item update to the Update component
                    onCancel={handleCancelEdit} // Pass the cancel function to the Update component
                />
            ) : (
                <List
                    items={items} // Pass the current list of items to the List component
                    onDelete={handleItemDeleted} // Pass the delete handler to the List component
                    onEdit={handleEdit} // Pass the edit handler to the List component
                />
            )}
        </div>
    );
}

export default App; // Export the App component so it can be used elsewhere
