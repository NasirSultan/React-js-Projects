// src/App.js

import ItemList from './components/ItemList';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">React CRUD API</h1>
      <ItemList />
    </div>
  );
};

export default App;
