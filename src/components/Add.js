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
        const newItem = { title };   //When the key and value have the same name, you can use the shorthand { keyName }, instead of writing it as { keyName: keyName }.

        // Using the addItem function (imported from the API module) to send the new item data
        // The function is asynchronous, so we await its response
        const addedItem = await addItem(newItem);

    
        
            onItemAdded(addedItem);  // The purpose is to inform the parent component that a new item has been added. 
            // This is a common pattern in React called "lifting state up", where a child component communicates changes to its parent.
            // The addedItem is passed as an argument, allowing the parent component to update its state 

            setTitle('');  //This line resets the input field to an empty string after successfully adding the item.

        
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
