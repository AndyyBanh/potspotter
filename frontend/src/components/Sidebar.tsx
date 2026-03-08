"use client";

import Link from "next/link";

export default function Sidebar({ onReportClick }: { onReportClick: () => void }) {
    const stats = {
        total: 214,
        low: 89,
        medium: 94,
        high: 31,
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm flex flex-col pt-6 px-4 gap-4">
            <p className="text-xl font-bold mb-4">Pot Spotter</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>
            <Link href="/dashboard" className="text-sm font-medium hover:text-orange-400 transition-colors">
                Dashboard
            </Link>

            {/* Stats Card */}
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Toronto Stats</p>
                <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-gray-400">Total Potholes</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Severity</p>
                    <div className="flex justify-between text-sm">
                        <span className="text-green-500 font-medium">Low</span>
                        <span>{stats.low}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-yellow-500 font-medium">Medium</span>
                        <span>{stats.medium}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-red-500 font-medium">High</span>
                        <span>{stats.high}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto mb-6">
                <button
                    onClick={onReportClick}
                    className="w-full px-4 py-3 rounded-2xl bg-orange-400 hover:bg-orange-500 text-white font-semibold text-sm"
                >
                     Report Pothole
                </button>
            </div>
        </aside>
    );
}