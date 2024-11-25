// src/components/List.js

// Import React to use JSX syntax, which is required for creating components
import React from 'react';

// Import the Delete component, which will handle the deletion of an item
import Delete from './Delete';

// The List component receives props: items, onDelete, and onEdit
const List = ({ items, onDelete, onEdit }) => {
    return (
        // Main container of the component
        <div>
            {/* Header for the List component */}
            <h2>Item List</h2>

            {/* The <ul> element is used to create an unordered list of items */}
            <ul>
                {/* Check if 'items' array exists and has more than 0 elements */}
                {items && items.length > 0 ? (
                    // Map through the 'items' array and return a <li> for each item
                    items.map((item) => (
                        // Each <li> needs a unique key for efficient re-rendering by React
                        <li key={item.id}>
                            {/* Display the title of each item */}
                            {item.title}

                            {/* Edit button that triggers the onEdit function passed as prop */}
                            <button onClick={() => onEdit(item)}>Edit</button>

                            {/* The Delete component is used here to handle deletion of the item */}
                            {/* Pass the item's id and onDelete function as props to Delete */}
                            <Delete id={item.id} onDeleted={onDelete} />
                        </li>
                    ))
                ) : (
                    // If the 'items' array is empty or undefined, display a message
                    <p>No items available</p>
                )}
            </ul>
        </div>
    );
};

// Default props in case the parent component does not pass 'items'
List.defaultProps = {
  items: [],  // Ensures that 'items' defaults to an empty array
};

// Export the List component for use in other parts of the application
export default List;
