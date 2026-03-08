"use client";

import MapSection from '@/components/MapSection'
import Navbar from '@/components/Navbar'
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isReporting, setIsReporting] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Navbar onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} onReportClick={() => setIsReporting(true)} />
                <main className="flex-1 overflow-hidden">
                    <MapSection isReporting={isReporting} setIsReporting={setIsReporting} />
                </main>
            </div>
        </div>
    )
}
