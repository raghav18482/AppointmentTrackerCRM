import React from 'react';
import { Clock, Phone, AlertTriangle, Mail } from 'lucide-react';

const CustomerCard = ({ item, isNext }) => {
    const isEmergency = item.queue_type === 'emergency';

    // Mock slug generation (In real app, this comes from backend or is the queue item ID)
    const trackUrl = `${window.location.origin}/q/${item.id}`;
    const mailSubject = encodeURIComponent(`Your Queue Status - ${item.customer_name}`);
    const mailBody = encodeURIComponent(`Hello ${item.customer_name},\n\nYou can track your live position in the queue here:\n${trackUrl}\n\nPlease be ready when your turn comes.\n\nRegards,\nCrowdManager Team`);
    const mailtoLink = `mailto:${item.email || ''}?subject=${mailSubject}&body=${mailBody}`;

    return (
        <div className={`
      relative customer-card rounded-xl border transition-all flex items-center justify-between group
      ${isEmergency
                ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'}
      ${isNext ? 'ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10' : ''}
    `}>
            {/* Left: Position & Basic Info */}
            <div className="flex items-center gap-6 flex-1">
                <div className={`
          flex flex-col items-center justify-center w-14 h-14 rounded-lg font-bold
          ${isEmergency ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'}
        `}>
                    <span className="text-xs opacity-80">POS</span>
                    <span className="text-lg leading-none">{item.position}</span>
                </div>

                <div>
                    <h4 className="font-bold text-white text-lg leading-tight">{item.customer_name}</h4>
                    <div className="flex items-center text-slate-400 text-sm mt-1 gap-3">
                        <span className="flex items-center gap-1"><Phone size={12} /> {item.customer_phone}</span>
                        {item.queue_type === 'emergency' && (
                            <span className="text-red-400 text-xs font-semibold px-1.5 py-0.5 bg-red-500/10 rounded">EMERGENCY</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Center: Wait Stats */}
            <div className="hidden sm:flex items-center gap-6 px-4 border-l border-r border-slate-700/50 mx-4">
                <div className="text-center min-w-[60px]">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Wait</div>
                    <div className={`font-mono font-medium ${item.wait_time_minutes > 15 ? 'text-orange-400' : 'text-emerald-400'}`}>
                        {item.wait_time_minutes}m
                    </div>
                </div>
                {item.wait_time_minutes > 15 && (
                    <div className="text-orange-400" title="Long wait time">
                        <AlertTriangle size={18} />
                    </div>
                )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <a
                    href={mailtoLink}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    title="Share tracking link via Email"
                >
                    <Mail size={18} />
                </a>
            </div>
        </div>
    );
};

export default CustomerCard;
