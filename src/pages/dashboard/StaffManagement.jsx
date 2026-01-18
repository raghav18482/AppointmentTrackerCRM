import React, { useState, useEffect, useRef } from 'react';
import { User, Shield, Edit2, Trash2, Plus, X, MoreVertical, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './BusinessSetup.css'; // Reuse basic layout styles
import './DashboardStyles.css'; // Specific table and modal styles
import './StaffManagement.css'; // New styles

import { staffService } from '../../services/staffService';

const StaffManagement = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null); // For editing
    const [activeMenuId, setActiveMenuId] = useState(null); // For dropdown

    const businessId = localStorage.getItem('business_id');

    // Load staff on mount
    useEffect(() => {
        if (businessId) {
            fetchStaff();
        } else {
            setLoading(false);
        }
    }, [businessId]);

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const data = await staffService.getAllStaff(businessId);
            setStaff(data);
        } catch (err) {
            console.error("Error fetching staff:", err);
            setError("Failed to load staff members.");
        } finally {
            setLoading(false);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-menu-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const getRoleBadge = (role) => {
        // Normalize role string just in case
        const normalizedRole = role ? role.toUpperCase() : 'STAFF';
        switch (normalizedRole) {
            case 'OWNER': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">OWNER</span>;
            case 'MANAGER': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">MANAGER</span>;
            case 'COUNTER': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">COUNTER</span>;
            default: return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-400">{normalizedRole}</span>;
        }
    };

    const handleEdit = (user) => {
        setCurrentStaff(user);
        setIsModalOpen(true);
        setActiveMenuId(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this staff member?')) {
            setStaff(staff.filter(s => s.id !== id));
        }
        setActiveMenuId(null);
    };

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!businessId) {
            alert("Please set up your business first.");
            return;
        }

        try {
            setLoading(true);
            if (currentStaff) {
                // Edit mode (Not implemented fully for API yet, just UI update simulation)
                // TODO: Add update endpoint integration
                alert("Edit functionality not fully integrated with API yet.");
            } else {
                // Add mode
                const newStaffData = {
                    email: formData.get('email'),
                    password: formData.get('password'),
                    role: formData.get('role').toLowerCase()
                };

                await staffService.createStaff(businessId, newStaffData);
                await fetchStaff(); // Refresh list
            }
            closeModal();
        } catch (err) {
            console.error("Error saving staff:", err);
            alert("Failed to save staff member. Please check inputs.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentStaff(null);
    };

    if (!businessId) {
        return (
            <div className="max-w-4xl mx-auto py-12 text-center">
                <div className="glass-panel p-12 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-6">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Business Setup Required</h2>
                    <p className="text-slate-400 mb-8 max-w-md">
                        You need to set up your business profile before you can manage staff members.
                    </p>
                    <Link to="/dashboard/business" className="btn-primary">
                        Go to Business Setup
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Headers and Table... (unchanged) */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
                    <p className="text-slate-400">Manage access and roles for your team.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
                    <Plus size={18} /> Add Staff
                </button>
            </div>

            <div className="glass-panel overflow-visible">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700 bg-slate-800/30">
                            <th className="p-4 font-semibold text-slate-300">Name</th>
                            <th className="p-4 font-semibold text-slate-300">Email</th>
                            <th className="p-4 font-semibold text-slate-300">Role</th>
                            <th className="p-4 font-semibold text-slate-300">Status</th>
                            <th className="p-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.length === 0 ? (
                            <tr>
                                <td colspan="5" className="p-8 text-center text-slate-500">
                                    No staff members found. Add your first staff member!
                                </td>
                            </tr>
                        ) : (
                            staff.map(user => (
                                <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-800/20 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                                <User size={16} />
                                            </div>
                                            <span className="font-medium text-white">{user.name || user.user_email || 'Unknown User'}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-400">{user.user_email || user.email}</td>
                                    <td className="p-4">{getRoleBadge(user.role)}</td>
                                    <td className="p-4">
                                        <span className="flex items-center gap-2 text-sm text-slate-300">
                                            <span className={`w-2 h-2 rounded-full ${user.user_is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {user.user_is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right relative action-menu-container">
                                        <button
                                            onClick={(e) => toggleMenu(e, user.id)}
                                            className={`action-btn-custom ${activeMenuId === user.id ? 'active' : ''}`}
                                            title="Actions"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeMenuId === user.id && (
                                            <div className="custom-dropdown-menu">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="dropdown-item"
                                                >
                                                    <Edit2 size={16} /> Edit Details
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="dropdown-item danger-action"
                                                >
                                                    <Trash2 size={16} /> Remove Member
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="glass-panel w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-bold mb-6">{currentStaff ? 'Edit Staff' : 'Add New Staff'}</h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="form-group">
                                <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                                <input
                                    name="name"
                                    defaultValue={currentStaff?.name || ''}
                                    className="w-full"
                                    placeholder="John Doe (Optional)"
                                />
                            </div>

                            <div className="form-group">
                                <label className="block text-sm text-slate-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={currentStaff?.user_email || currentStaff?.email || ''}
                                    className="w-full"
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>

                            {!currentStaff && (
                                <div className="form-group">
                                    <label className="block text-sm text-slate-400 mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full"
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label className="block text-sm text-slate-400 mb-1">Role</label>
                                <select name="role" defaultValue={currentStaff?.role?.toUpperCase() || 'COUNTER'} className="w-full">
                                    <option value="COUNTER">Counter Staff</option>
                                    <option value="MANAGER">Manager</option>
                                    <option value="OWNER">Owner</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={closeModal} className="btn-outline flex-1 justify-center">Cancel</button>
                                <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Save Staff'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffManagement;
