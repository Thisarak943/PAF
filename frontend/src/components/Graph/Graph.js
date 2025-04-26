import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

const Graph = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        fetchInventoryData();
    }, []);

    const fetchInventoryData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/inventory");
            const data = response.data;

            // Filter items with quantity lower than 10
            const lowStock = data.filter(item => item.itemQty < 10);
            setLowStockItems(lowStock);

            setInventoryData(data);
        } catch (error) {
            console.error("Error fetching inventory data", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Inventory Data Analysis</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={inventoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="itemName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="itemQty" name="Quantity">
                        {inventoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.itemQty < 10 ? "red" : "#8884d8"} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
           {lowStockItems.length > 0 && (
    <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Items with Low Stock:</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Item Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lowStockItems.map((item, index) => (
                        <tr
                            key={item.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {item.itemName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {item.itemQty}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)}
        </div>
    );
};

export default Graph;
