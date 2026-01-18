import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, Store, Users, LogOut } from 'lucide-react';
import './DashboardLayout.css';

const SidebarItem = ({ to, icon: Icon, label, active }) => (
    <Link to={to} className={`sidebar-item ${active ? 'active' : ''}`}>
        <Icon size={20} />
        <span>{label}</span>
    </Link>
);

const DashboardLayout = () => {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar glass-panel">
                <div className="sidebar-header">
                    <Link to="/" className="text-gradient font-bold text-xl">CrowdManager</Link>
                </div>

                <nav className="sidebar-nav">
                    <SidebarItem
                        to="/dashboard"
                        icon={LayoutDashboard}
                        label="Live Queue"
                        active={location.pathname === '/dashboard'}
                    />

                    {['OWNER', 'MANAGER', 'COUNTER'].includes((localStorage.getItem('role') || '').toUpperCase()) &&
                        ['OWNER'].includes((localStorage.getItem('role') || '').toUpperCase()) && (
                            <SidebarItem
                                to="/dashboard/business"
                                icon={Building2}
                                label="Business Setup"
                                active={location.pathname === '/dashboard/business'}
                            />
                        )}

                    {['OWNER', 'MANAGER'].includes((localStorage.getItem('role') || '').toUpperCase()) && (
                        <SidebarItem
                            to="/dashboard/counters"
                            icon={Store}
                            label="Counters"
                            active={location.pathname === '/dashboard/counters'}
                        />
                    )}

                    {['OWNER', 'MANAGER'].includes((localStorage.getItem('role') || '').toUpperCase()) && (
                        <SidebarItem
                            to="/dashboard/staff"
                            icon={Users}
                            label="Staff"
                            active={location.pathname === '/dashboard/staff'}
                        />
                    )}
                </nav>

                <div className="sidebar-footer">
                    <div className="px-4 py-2 text-xs text-slate-500 uppercase tracking-wider text-center border-b border-slate-700 mb-2">
                        {localStorage.getItem('role') || 'STAFF'}
                    </div>
                    <button onClick={handleLogout} className="sidebar-item logout-btn">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="dashboard-content">
                <div className="content-wrapper glass-panel">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
