import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function DisplayItem() {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        const result = await axios.get("http://localhost:8080/inventory");
        const data = result.data;

        setInventory(data);
    };

    const UpdateNavigate = (id) => {
        window.location.href = `/updateitem/${id}`;
    };

    const deleteItem = async (id) => {
        const confirmationMessage = window.confirm('Are you sure you want to delete this item?');
        if (confirmationMessage) {
            try {
                await axios.delete(`http://localhost:8080/inventory/${id}`);
                loadInventory();
                alert('Item deleted successfully');
            } catch (error) {
                alert('Error deleting item', error);
            }
        }
    };

    const generatePDF = async () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Inventory Management Report", 105, 20, { align: "center" });

        // Add Border
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277);

        doc.setFontSize(12);
        doc.text("Generated Report with Graph", 105, 30, { align: "center" });

        // Capture the Graph as an Image
        addTableToPDF(doc);
    };

    const addTableToPDF = (doc) => {
        autoTable(doc, {
            startY: 50,
            head: [['Item Id', 'Name', 'Category', 'Quantity', 'Details']],
            body: inventory.map(item => [
                item.itemId,
                item.itemName,
                item.itemCategory,
                item.itemQty,
                item.itemDetails
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: [255, 255, 255],
                fontSize: 12,
                fontStyle: "bold",
            },
            bodyStyles: {
                fontSize: 10,
                textColor: [0, 0, 0],
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240],
            },
            styles: {
                cellPadding: 4,
            },
        });

        doc.save("inventory_report.pdf");
    };
      // Filter inventory based on search term
      const filteredInventory = inventory.filter(item =>
        Object.values(item).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory Item</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <button
                onClick={generatePDF}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Generate PDF
            </button>

            {/* Inventory Table */}
            <table className="min-w-full bg-white border border-gray-300 mt-6">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Item Id</th>
                        <th className="py-2 px-4 border">Item Image</th>
                        <th className="py-2 px-4 border">Item Name</th>
                        <th className="py-2 px-4 border">Category</th>
                        <th className="py-2 px-4 border">Quantity</th>
                        <th className="py-2 px-4 border">Details</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInventory.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border">{item.itemId}</td>
                            <td className="py-2 px-4 border">
                                <img 
                                    src={`http://localhost:8080/uploads/${item.itemImage}`} 
                                    alt={item.itemName || "Item image"} 
                                    className="w-24 h-24 object-cover rounded"
                                />
                            </td>
                            <td className="py-2 px-4 border">{item.itemName}</td>
                            <td className="py-2 px-4 border">{item.itemCategory}</td>
                            <td className="py-2 px-4 border">{item.itemQty}</td>
                            <td className="py-2 px-4 border">{item.itemDetails}</td>
                            <td className="py-2 px-4 border">
                                <button onClick={() => UpdateNavigate(item.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                                <button onClick={() => deleteItem(item.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

           
        </div>
    );
}

export default DisplayItem;
