"use client";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";

const MapView = dynamic(() => import("@/components/MapView").then(mod => mod.MapView), {
    ssr: false
});

export default function MapSection({ isReporting, setIsReporting }: { isReporting: boolean, setIsReporting: Dispatch<SetStateAction<boolean>> }) {
    return (
        <MapView isReporting={isReporting} setIsReporting={setIsReporting} />
    )
}