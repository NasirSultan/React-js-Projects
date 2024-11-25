// src/components/Add.js
import React, { useState } from 'react'; // Importing React library and useState hook from React
import { addItem } from '../api/api'; // Importing the addItem function from the API module to handle adding an item

// Define the Add component that will allow the user to add a new item
const Add = ({ onItemAdded }) => {
    // useState hook to manage the state of the 'title' input field
    const [title, setTitle] = useState('');

    // The handleSubmit function is triggered when the form is submitted
    const handleSubmit = async (e) => {
        // Prevents the default form submission behavior, which would cause the page to reload
        e.preventDefault();

        // Creating a new item object with the title from the input field
        const newItem = { title };

        // Using the addItem function (imported from the API module) to send the new item data
        // The function is asynchronous, so we await its response
        const addedItem = await addItem(newItem);

        // If the item was successfully added, we update the parent component with the new item
        // This is achieved by calling the onItemAdded function passed as a prop
        if (addedItem) {
            onItemAdded(addedItem);  // Passing the added item back to the parent component
            setTitle('');  // Resetting the title input field to an empty string after successful addition
        }
    };

    return (
        <div>
            <h2>Add New Item</h2>  {/* Displaying a header to inform the user */}
            
            {/* The form that contains the input field and submit button */}
            <form onSubmit={handleSubmit}> {/* The form's onSubmit event triggers handleSubmit */}
                <input
                    type="text"  // Defining the input field type as 'text'
                    value={title}  // Binding the input value to the 'title' state variable
                    onChange={(e) => setTitle(e.target.value)}  // Updating 'title' state when the user types in the input
                    placeholder="Enter item title"  // Placeholder text for the input field
                />
                {/* A submit button to trigger the form submission */}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

// Export the Add component so it can be used in other parts of the application
export default Add;
