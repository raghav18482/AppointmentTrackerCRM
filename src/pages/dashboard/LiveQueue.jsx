import React, { useState, useEffect } from 'react';
import StatsOverview from './components/StatsOverview';
import CustomerCard from './components/CustomerCard';
import WelcomeDashboard from './components/WelcomeDashboard';
import { queueService } from '../../services/queueService';
import { RefreshCw, Play, SkipForward, AlertCircle } from 'lucide-react';
import './LiveQueue.css';

const LiveQueue = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeCounter, setActiveCounter] = useState('counter-1'); // TODO: dynamic counter selection
    const businessId = localStorage.getItem('business_id');

    const fetchData = async () => {
        if (!businessId) return;
        setLoading(true);
        try {
            const res = await queueService.getLiveDashboard(activeCounter);
            setData(res);
        } catch (err) {
            console.error("Error fetching queue data:", err);
            // Optional: Handle specific error cases
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (businessId) {
            fetchData();
            // Setup WebSocket here
        }
    }, [activeCounter, businessId]);

    if (!businessId) {
        return <WelcomeDashboard />;
    }

    // Separate queues
    const emergencyQueue = data?.queue_items?.filter(item => item.queue_type === 'emergency') || [];
    const normalQueue = data?.queue_items?.filter(item => item.queue_type === 'normal') || [];
    const stats = data?.stats || {
        total_waiting: 0,
        total_served_today: 0,
        total_missed_today: 0,
        active_counters: 0
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        Live Queue
                        <span className="text-sm font-normal bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                            Counter 1
                        </span>
                    </h1>
                    <p className="text-slate-400">Real-time updates</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchData} className="btn-outline p-3 rounded-full">
                        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Play size={18} fill="currentColor" /> Serve Next
                    </button>
                </div>
            </div>

            <StatsOverview stats={stats} />

            <div className="queue-content-grid">
                {/* Emergency Queue Column (Left) */}
                <div>
                    <div className="queue-header emergency">
                        <h3 className="queue-title text-red-400">
                            <AlertCircle size={24} /> Emergency Queue
                        </h3>
                        <span className="bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full">{emergencyQueue.length} Waiting</span>
                    </div>

                    <div className="queue-list">
                        {emergencyQueue.length === 0 ? (
                            <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/20">
                                <p className="text-lg">No emergency cases</p>
                                <p className="text-sm opacity-60 mt-1">Great job!</p>
                            </div>
                        ) : (
                            emergencyQueue.map((item, idx) => (
                                <CustomerCard key={item.id} item={item} isNext={idx === 0} />
                            ))
                        )}
                    </div>
                </div>

                {/* Normal Queue Column (Right) */}
                <div>
                    <div className="queue-header normal">
                        <h3 className="queue-title text-indigo-400">
                            <AlertCircle size={24} /> Normal Queue
                        </h3>
                        <span className="bg-indigo-500 text-white font-bold text-sm px-3 py-1 rounded-full">{normalQueue.length} Waiting</span>
                    </div>

                    <div className="queue-list">
                        {normalQueue.length === 0 ? (
                            <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/20">
                                <p className="text-lg">Queue is empty</p>
                                <p className="text-sm opacity-60 mt-1">Ready for customers</p>
                            </div>
                        ) : (
                            normalQueue.map((item, idx) => (
                                <CustomerCard key={item.id} item={item} isNext={idx === 0 && emergencyQueue.length === 0} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveQueue;
