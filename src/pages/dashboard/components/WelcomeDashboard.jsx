import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, LayoutDashboard, Users, Store } from 'lucide-react';

const WelcomeDashboard = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                    Welcome to Crowd Manager!
                </h1>
                <p className="text-xl text-slate-400">
                    You're just a few steps away from managing your queues efficiently.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="glass-panel p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Building2 size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                            <Building2 size={24} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">1. Setup Business</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Create your business profile, set your location and timezone.
                        </p>
                        <Link to="/dashboard/business" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">
                            Go to Setup <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                <div className="glass-panel p-6 relative overflow-hidden group hover:border-pink-500/50 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                            <Users size={24} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">2. Add Staff</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Invite team members to manage your queue and counters.
                        </p>
                        <Link to="/dashboard/staff" className="text-sm font-medium text-pink-400 hover:text-pink-300 inline-flex items-center gap-1">
                            Manage Staff <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                <div className="glass-panel p-6 relative overflow-hidden group hover:border-purple-500/50 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Store size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                            <Store size={24} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">3. Add Counters</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Create service points and assign counters to your staff.
                        </p>
                        <Link to="/dashboard/counters" className="text-sm font-medium text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">
                            Setup Counters <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Link
                    to="/dashboard/business"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-1"
                >
                    Get Started Now
                    <ArrowRight size={20} />
                </Link>
                <p className="mt-4 text-slate-500 text-sm">
                    Start by setting up your business profile
                </p>
            </div>
        </div>
    );
};

export default WelcomeDashboard;
