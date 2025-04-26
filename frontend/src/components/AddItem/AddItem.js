import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [inventory, setInventory] = useState({
    itemId: '',
    itemName: '',
    itemCategory: '',
    itemQty: '',
    itemDetails: '',
    itemImage: null
  });

  const { itemId, itemName, itemCategory, itemQty, itemDetails } = inventory;

  const onInputChange = (e) => {
    if (e.target.name === 'itemImage') {
      setInventory({ ...inventory, itemImage: e.target.files[0] });
    } else {
      setInventory({ ...inventory, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', inventory.itemImage);
    let imageName = "";
    if (inventory.itemImage) {
      const formData = new FormData();
      formData.append('file', inventory.itemImage);
      try {
        const response = await axios.post("http://localhost:8080/inventory/itemImg", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageName = response.data;
      } catch (error) {
        alert("Error uploading image");
        return;
      }
    }
    const updateInventory = { ...inventory, itemImage: imageName };
    await axios.post("http://localhost:8080/Inventory", updateInventory);
    alert("Item added successfully");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Add Item</h2>
      <form id="itemForm" onSubmit={(e) => onSubmit(e)} className="w-full max-w-lg">
        <label className="block text-sm font-medium text-gray-700">Item ID:</label>
        <input
          type="text"
          id="itemId"
          name="itemId"
          required
          onChange={(e) => onInputChange(e)}
          value={itemId}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          required
          onChange={(e) => onInputChange(e)}
          value={itemName}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Category:</label>
        <select
          id="itemCategory"
          name="itemCategory"
          onChange={(e) => onInputChange(e)}
          required
          value={itemCategory}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          <option value="" disabled>Select Item Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Other">Other</option>
        </select>
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Quantity:</label>
        <input
          type="number"
          name="itemQty"
          id="itemQty"
          required
          onChange={(e) => onInputChange(e)}
          value={itemQty}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Details:</label>
        <textarea
          name="itemDetails"
          id="itemDetails"
          required
          onChange={(e) => onInputChange(e)}
          value={itemDetails}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Image:</label>
        <input
          type="file"
          name="itemImage"
          id="itemImage"
          accept="image/*"
          onChange={(e) => onInputChange(e)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Add Item</button>
      </form>

    </div>
  );
};

export default AddItem;
