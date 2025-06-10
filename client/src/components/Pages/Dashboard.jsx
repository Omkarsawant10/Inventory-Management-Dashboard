
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PRODUCT_API_END_POINT, USER_API_END_POINT } from '../../utils/constants';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ name: '', quantity: '', price: '', category: '' });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${PRODUCT_API_END_POINT}/get`, { withCredentials: true });
            setProducts(data.products);
        } catch (err) {
            toast.error(err?.response?.data?.message && "Unauthorized. Redirecting to login...");
            navigate('/');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${PRODUCT_API_END_POINT}/update/${editId}`, form, { withCredentials: true });
                toast.success("Product updated!");
            } else {
                await axios.post(`${PRODUCT_API_END_POINT}/add`, form, { withCredentials: true });
                toast.success("Product added!");
            }
            fetchProducts();
            setForm({ name: '', quantity: '', price: '', category: '' });
            setModalOpen(false);
            setEditId(null);
        } catch (err) {
            toast.error(err?.response?.data?.message && "Operation failed.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`${PRODUCT_API_END_POINT}/delete/${id}`, { withCredentials: true });
                toast.success("Product deleted");
                fetchProducts();
            } catch (err) {
                toast.error(err?.response?.data?.message && "Delete failed");
            }
        }
    };

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message && "Logout failed");
        }
    };

    const openEdit = (product) => {
        setForm(product);
        setEditId(product._id);
        setModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Inventory Dashboard</h2>
                    <div className="space-x-2">
                        <button onClick={() => setModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">+ Add Product</button>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Log Out</button>
                    </div>
                </div>
                <ProductTable products={products} openEdit={openEdit} handleDelete={handleDelete} />
            </div>

            {modalOpen && (
                <ProductModal
                    form={form}
                    setForm={setForm}
                    editId={editId}
                    handleSubmit={handleSubmit}
                    onClose={() => {
                        setModalOpen(false);
                        setEditId(null);
                        setForm({ name: '', quantity: '', price: '', category: '' });
                    }}
                />
            )}
        </div>
    );
}
