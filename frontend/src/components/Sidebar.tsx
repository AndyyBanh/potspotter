"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosinstance";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

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
        <aside className={`w-64 shadow-sm flex flex-col py-6 px-4 gap-4 shrink-0 transition-all duration-300 ${isOpen ? "ml-0" : "-ml-64"}`}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>

            {/* Total Potholes */}
            <Card className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Potholes</p>
                <p className="text-3xl font-bold">{stats.total}</p>
            </Card>

            {/* High Severity */}
            <Card className="rounded-2xl p-4 bg-red-50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">High Severity</p>
                <p className="text-2xl font-bold text-red-600">{stats.high}</p>
            </Card>

            {/* Moderate Severity */}
            <Card className="rounded-2xl p-4 bg-yellow-50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Moderate Severity</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.medium}</p>
            </Card>

            {/* Low Severity */}
            <Card className="rounded-2xl p-4 bg-green-50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Low Severity</p>
                <p className="text-2xl font-bold text-green-600">{stats.low}</p>
            </Card>

            <div className="mt-auto mb-6">
                <Button
                    onClick={onReportClick}
                    className="w-full px-4 py-3 rounded-2xl bg-orange-400 hover:bg-orange-500 text-white font-semibold text-sm"
                >
                    Report Pothole
                </Button>
            </div>
        </aside>
    );
}
