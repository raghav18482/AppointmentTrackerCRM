import React, { useState } from 'react';
import { Loader2, Building2 } from 'lucide-react';
import { businessService } from '../../services/businessService';

const BusinessSetup = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Salon',
        timezone: 'UTC'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await businessService.createBusiness(formData);
            console.log('Business Created:', response);
            setSuccess(`Business "${response.name}" created successfully!`);
            if (response.id) {
                localStorage.setItem('business_id', response.id);
                localStorage.setItem('role', 'OWNER'); // Set owner role immediately
                localStorage.setItem('business_name', response.name);

                // Redirect to dashboard to update sidebar and view
                setTimeout(() => window.location.href = '/dashboard', 1500);
            }
        } catch (err) {
            console.error('Error creating business:', err);
            setError(err.response?.data?.detail || 'Failed to create business.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Business Setup</h1>
                <p className="text-slate-400">Configure your business details to get started.</p>
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
                        <label className="block text-sm text-slate-400 mb-2">Business Name</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 text-slate-500" size={20} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Style n Scissor"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-group">
                            <label className="block text-sm text-slate-400 mb-2">Business Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-indigo-500"
                            >
                                <option value="Salon">Salon</option>
                                <option value="Hospital">Hospital</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Service Center">Service Center</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm text-slate-400 mb-2">Timezone</label>
                            <select
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-indigo-500"
                            >
                                <option value="UTC">UTC</option>
                                <option value="Asia/Kolkata">India (IST)</option>
                                <option value="America/New_York">New York (EST)</option>
                                {/* Add more timezones as needed */}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center py-3"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : 'Create Business'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BusinessSetup;
