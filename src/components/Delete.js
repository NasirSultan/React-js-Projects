// src/components/Delete.js

// Importing React to use JSX and React components
import React from 'react';

// Importing the deleteItem function from our API helper, which will handle the deletion logic
import { deleteItem } from '../api/api';

// Define the Delete component, which is a functional component in React.
// It receives two props: id (the id of the item to be deleted) and onDeleted (a callback function to update the parent component's state)
const Delete = ({ id, onDeleted }) => {
    
    // handleDelete function will be called when the user clicks on the "Delete" button
    const handleDelete = async () => {
        // The deleteItem function is called with the id of the item to be deleted.
        // It is an asynchronous function, so we use await to wait for the operation to complete before moving on.
        await deleteItem(id);

        // After deleting the item from the database (or wherever it's stored),
        // we call the onDeleted callback function to notify the parent component (e.g., App.js) that the item was deleted.
        // The parent component can then update its state to remove the deleted item from the UI.
        onDeleted(id);
    };

    // Return the JSX structure for rendering the "Delete" button.
    // When the button is clicked, the handleDelete function will be invoked.
    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    );
};

// Export the Delete component so it can be used in other parts of the application.
export default Delete;
