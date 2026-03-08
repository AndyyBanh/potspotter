"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosinstance";

interface PotHole {
    severity: number;
}

export default function Sidebar({ isOpen, onReportClick }: { isOpen: boolean; onReportClick: () => void }) {
    const [stats, setStats] = useState({ total: 0, low: 0, medium: 0, high: 0 });

    useEffect(() => {
        axiosInstance.get("/api/v1/pothole")
            .then((res) => {
                const data: PotHole[] = Array.isArray(res.data) ? res.data : [];
                setStats({
                    total: data.length,
                    low: data.filter(p => p.severity === 1).length,
                    medium: data.filter(p => p.severity === 2).length,
                    high: data.filter(p => p.severity === 3).length,
                });
            })
            .catch((err) => console.error("Failed to fetch stats", err));
    }, []);

    return (
        <aside className={`w-64 bg-white border-r shadow-sm flex flex-col py-6 px-4 gap-4 shrink-0 transition-all duration-300 ${isOpen ? "ml-0" : "-ml-64"}`}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>

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
