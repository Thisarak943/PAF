import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateItem = () => {

    const {id} = useParams();
    const [formData, setFormData] = useState({
        itemId: '',
        itemName: '',
        itemCategory: '',
        itemQty: '',
        itemDetails: '',
        itemImage: null,

    });
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/inventory/${id}`);
                const itemData = response.data;
                setFormData({
                    itemId: itemData.itemId || '',
                    itemName: itemData.itemName || '',
                    itemCategory: itemData.itemCategory || '',
                    itemQty: itemData.itemQty || '',
                    itemDetails: itemData.itemDetails || '',
                    itemImage: null,
                });
            } catch (error) {
                console.error('error fetch data ',error);
            }
            
        };
        fetchItemData();
    },[id]);

    const onInputChange = (e) => {
        const {name,value,files} = e.target;
        setFormData({
            ...formData,
             [name]: files ? files[0] : value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const  data  = new FormData();
        data.append('itemDetails',JSON.stringify({
            itemId:formData.itemId,
            itemName:formData.itemName,
            itemCategory:formData.itemCategory,
            itemDetails:formData.itemDetails,
            itemQty:formData.itemQty,
        }));
        if (formData.itemImage){
            data.append('file',formData.itemImage);
        }
        try{
            await axios.put(`http://localhost:8080/inventory/${id}`,data);
            alert('Item updated successfully');
            //window.location.reload();
            window.location.href = '/allitem';
        }catch(error){
            console.error('error updating item',error);
            alert('Error updating item');
        }
    };
    

  return (
    <div>
      
      <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Update Item</h2>
      <form id="itemForm" onSubmit={onSubmit} className="w-full max-w-lg">
        <label className="block text-sm font-medium text-gray-700">Item ID:</label>
        <input
          type="text"
          id="itemId"
          name="itemId"
          required
          onChange={onInputChange}
          value={formData.itemId}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          required
          onChange={onInputChange}
          value={formData.itemName}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Category:</label>
        <select
          id="itemCategory"
          name="itemCategory"
          onChange={ onInputChange}
          required
          value={formData.itemCategory}
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
          onChange={onInputChange}
          value={formData.itemQty}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Details:</label>
        <textarea
          name="itemDetails"
          id="itemDetails"
          required
          onChange={onInputChange}
          value={formData.itemDetails}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Item Image:</label>
        <input
          type="file"
          name="itemImage"
          id="itemImage"
          accept="image/*"
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Update Item</button>
      </form>

    </div>

    </div>
  )
}

export default UpdateItem
