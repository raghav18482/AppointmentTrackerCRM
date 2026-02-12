import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Store, CheckCircle, XCircle, Edit2, Trash2, Save, X, AlertTriangle } from 'lucide-react';
import { businessService } from '../../services/businessService';
import './BusinessSetup.css'; // Reuse styles

const CounterSetup = () => {
    const [formData, setFormData] = useState({
        name: '',
        business_id: localStorage.getItem('business_id') || '',
        is_active: true
    });
    const [counters, setCounters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Edit State
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', is_active: true });

    // Delete Confirmation State
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const fetchCounters = async () => {
        if (!formData.business_id) return;

        try {
            setFetching(true);
            const data = await businessService.getCounters(formData.business_id);
            setCounters(data);
        } catch (err) {
            console.error('Error fetching counters:', err);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (formData.business_id) {
            fetchCounters();
        }
    }, [formData.business_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!formData.business_id) {
            setError("Business ID is required. Please create a business first and paste the ID here.");
            setLoading(false);
            return;
        }

        try {
            const response = await businessService.createCounter(formData.business_id, {
                name: formData.name,
                is_active: formData.is_active
            });
            console.log('Counter Created:', response);
            setSuccess(`Counter "${response.name}" created successfully!`);
            // Reset name only, keep business ID for faster entry
            setFormData(prev => ({ ...prev, name: '' }));
            fetchCounters(); // Refresh list
        } catch (err) {
            console.error('Error creating counter:', err);
            setError(err.response?.data?.detail || 'Failed to create counter.');
        } finally {
            setLoading(false);
        }
    };

    // Edit Handlers
    const handleEditClick = (counter) => {
        setEditingId(counter.id);
        setEditForm({ name: counter.name, is_active: counter.is_active });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({ name: '', is_active: true });
    };

    const handleSaveEdit = async () => {
        if (!editForm.name.trim()) return;

        try {
            await businessService.updateCounter(formData.business_id, editingId, editForm);
            setEditingId(null);
            fetchCounters();
            setSuccess('Counter updated successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Error updating counter:', err);
            setError('Failed to update counter');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Delete Handlers
    const handleDeleteClick = (counter) => {
        setDeleteConfirmation(counter);
    };

    const handleCancelDelete = () => {
        setDeleteConfirmation(null);
    };

    const handleConfirmDelete = async () => {
        if (!deleteConfirmation) return;

        try {
            await businessService.deleteCounter(formData.business_id, deleteConfirmation.id);
            setDeleteConfirmation(null);
            fetchCounters();
            setSuccess(`Counter "${deleteConfirmation.name}" deleted successfully`);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Error deleting counter:', err);
            setError('Failed to delete counter');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Counter Management</h1>
                <p className="text-slate-400">Add counters to your business (e.g. Counter 1, Dr. Smith, Barber seat 1).</p>
            </div>

            <div className="glass-panel p-8">
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-lg mb-6">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <label className="block text-sm text-slate-400 mb-2">Business ID</label>
                        <input
                            type="text"
                            name="business_id"
                            value={formData.business_id}
                            onChange={handleChange}
                            placeholder="Paste Business ID from Business Setup"
                            className="w-full"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">Found in the response after creating a business.</p>
                    </div>

                    <div className="form-group">
                        <label className="block text-sm text-slate-400 mb-2">Counter Name</label>
                        <div className="relative">
                            <Store className="absolute left-3 top-3 text-slate-500" size={20} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Dr. Strange - Ortho"
                                className="w-full pl-10"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                            id="is_active"
                            style={{ width: 'auto' }}
                        />
                        <label htmlFor="is_active" className="text-sm cursor-pointer">Active Counter</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center py-3"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : <><Plus size={20} className="mr-2" /> Add Counter</>}
                    </button>
                </form>
            </div>

            {/* Counters List */}
            <div className="glass-panel p-8 mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Your Counters</h2>
                    {fetching && <Loader2 className="animate-spin text-slate-400" size={20} />}
                </div>

                <div className="space-y-4">
                    {counters.length > 0 ? (
                        counters.map((counter) => (
                            <div
                                key={counter.id}
                                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 transition-all hover:border-slate-600"
                            >
                                {editingId === counter.id ? (
                                    // Edit Mode
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="flex-1 max-w-xs">
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={editForm.is_active}
                                                onChange={(e) => setEditForm({ ...editForm, is_active: e.target.value === 'true' })}
                                                className="px-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm text-slate-300"
                                            >
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2 ml-auto">
                                            <button
                                                onClick={handleSaveEdit}
                                                className="p-2 rounded-full bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors"
                                                title="Save"
                                            >
                                                <Save size={18} />
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="p-2 rounded-full bg-slate-700 text-slate-400 hover:bg-slate-600 transition-colors"
                                                title="Cancel"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${counter.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                <Store size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{counter.name}</h3>
                                                <p className="text-xs text-slate-400 mt-0.5">ID: {counter.id}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="mr-4">
                                                {counter.is_active ? (
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-500">
                                                        <CheckCircle size={12} />
                                                        Active
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-xs font-medium text-slate-400">
                                                        <XCircle size={12} />
                                                        Inactive
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEditClick(counter)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(counter)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-lg">
                            <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Store className="text-slate-500" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-300">No counters yet</h3>
                            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                                Create your first counter above to start managing your queues.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirmation && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-xl">
                        <div className="flex items-center gap-4 mb-4 text-red-500">
                            <div className="bg-red-500/10 p-3 rounded-full">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Delete Counter?</h3>
                        </div>

                        <p className="text-slate-300 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-white">"{deleteConfirmation.name}"</span>?
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                            >
                                Delete Counter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CounterSetup;
