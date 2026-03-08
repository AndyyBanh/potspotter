"use client";

import MapSection from '@/components/MapSection'
import Navbar from '@/components/Navbar'
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Page() {
    const [isReporting, setIsReporting] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar onReportClick={() => setIsReporting(true)} />
            <main className="ml-64 flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <div className="flex-1 overflow-hidden">
                    <MapSection isReporting={isReporting} setIsReporting={setIsReporting} />
                </div>
            </main>
        </div>
    )
}