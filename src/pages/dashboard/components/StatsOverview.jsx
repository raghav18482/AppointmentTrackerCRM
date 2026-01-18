import React from 'react';
import { Users, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, colorClass, borderClass }) => (
    <div className={`glass-panel p-8 border-l-4 shadow-lg ${borderClass}`}>
        <div className="stat-card-inner">
            <div className="flex-1 pr-6">
                <p className="stat-label">{label}</p>
                <p className="stat-value">{value}</p>
            </div>
            <div className={`p-5 rounded-2xl ${colorClass}`}>
                <Icon size={32} />
            </div>
        </div>
    </div>
);

const StatsOverview = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="stats-grid">
            <StatCard
                label="Total Waiting"
                value={stats.total_waiting}
                icon={Users}
                colorClass="bg-indigo-500/20 text-indigo-400"
                borderClass="border-indigo-500"
            />
            <StatCard
                label="Emergency"
                value={stats.emergency_waiting}
                icon={AlertCircle}
                colorClass="bg-red-500/20 text-red-500"
                borderClass="border-red-500"
            />
            <StatCard
                label="Served Today"
                value={stats.total_served_today}
                icon={CheckCircle}
                colorClass="bg-emerald-500/20 text-emerald-500"
                borderClass="border-emerald-500"
            />
            <StatCard
                label="Missed"
                value={stats.total_missed_today}
                icon={XCircle}
                colorClass="bg-orange-500/20 text-orange-500"
                borderClass="border-orange-500"
            />
        </div>
    );
};

export default StatsOverview;
