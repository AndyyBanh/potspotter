"use client";
// wrapper to lazy load MapView 
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView").then(mod => mod.MapView),
{
    ssr: false
}
);

export default function MapSection() {
    return (
        <MapView />
    )
}