
import React from 'react';

export default function ProductModal({ form, setForm, editId, handleSubmit, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-black">X</button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-semibold">{editId ? 'Edit' : 'Add'} Product</h3>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full border p-2 rounded" required />
                    <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" type="number" className="w-full border p-2 rounded" required />
                    <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" type="number" className="w-full border p-2 rounded" required />
                    <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="w-full border p-2 rounded" required />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
                        {editId ? "Update" : "Add"} Product
                    </button>
                </form>
            </div>
        </div>
    );
}
