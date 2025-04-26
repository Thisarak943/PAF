import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Inventory Management</h1>
    <p className="text-lg text-gray-600 mb-8 text-center">
      Manage your inventory efficiently with our modern interface.
    </p>
    <div className="flex space-x-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => navigate("/additem")}
      >
        Add Item
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => navigate("/allitem")}
      >
        View Items
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => navigate("/graph")}
      >
        Graph view
      </button>
    </div>
  </div>
  );
};

export default Home;
