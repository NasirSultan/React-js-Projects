// src/components/Update.js
import React, { useState, useEffect } from 'react';  // Importing React and necessary hooks
import { updateItem } from '../api/api';  // Importing the API function to update an item

// The Update component is responsible for rendering a form where the user can update an item's title.
// It receives three props:
// - item: The item object to be updated, which contains at least an 'id' and 'title'.
// - onItemUpdated: A callback function to notify the parent component when the item has been updated.
// - onCancel: A callback function to handle when the user cancels the update process.
const Update = ({ item, onItemUpdated, onCancel }) => {
    // Declaring a piece of state for managing the title input field value. The initial value is set to the title of the item passed in as a prop.
    const [title, setTitle] = useState(item.title);

    // handleSubmit is the function triggered when the form is submitted.
    // It asynchronously calls the updateItem function to update the item in the backend/API.
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents the default form submission behavior (page reload)
        
        // Prepare the updated item data. Here, we only update the title, but it can include more fields.
        const updatedItem = { title };

        // Call the API function updateItem, passing the item's id and the updated data.
        const result = await updateItem(item.id, updatedItem);
        
        // If the update is successful, the result will be returned from the API call.
        if (result) {
            onItemUpdated(result); // Notify the parent component that the item has been updated successfully.
        }
    };

    // The useEffect hook ensures that the title is updated when the 'item' prop changes.
    // This is especially useful if the parent component is passing a new item for editing.
    useEffect(() => {
        setTitle(item.title);  // Set the state of 'title' to the new item's title.
    }, [item]); // This effect runs whenever the 'item' prop changes.

    return (
        <div>
            <h2>Update Item</h2>
            {/* The form that handles the update */}
            <form onSubmit={handleSubmit}>
                {/* The input field where the user can edit the title of the item */}
                <input
                    type="text"
                    value={title}  // The value of the input field is controlled by the 'title' state.
                    onChange={(e) => setTitle(e.target.value)}  // Updates the 'title' state as the user types.
                    placeholder="Enter new title"  // Placeholder text when the input is empty.
                />
                
                {/* The submit button to update the item */}
                <button type="submit">Update</button>
                
                {/* The cancel button to exit the update mode without saving */}
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

// Exporting the Update component to be used elsewhere in the application
export default Update;
