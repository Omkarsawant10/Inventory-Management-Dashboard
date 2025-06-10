// ProductTable.jsx
import React from 'react';
import { MdOutlineEdit, MdDelete } from "react-icons/md";

export default function ProductTable({ products, openEdit, handleDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
                <thead className="bg-gray-200 text-gray-600">
                    <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Qty</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(prod => (
                        <tr key={prod._id} className="border-b">
                            <td className="p-2">{prod.name}</td>
                            <td className="p-2">{prod.quantity}</td>
                            <td className="p-2">{prod.price}</td>
                            <td className="p-2">{prod.category}</td>
                            <td className="p-2 space-x-2">
                                <button onClick={() => openEdit(prod)} className="text-black-500 hover:underline text-2xl"><MdOutlineEdit /></button>
                                <button onClick={() => handleDelete(prod._id)} className="text-red-500 hover:underline text-2xl"><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
