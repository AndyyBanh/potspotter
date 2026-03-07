"use client"
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function MapView() {
    const center: [number, number] = [43.6548, -79.3883]; // Toronto (lat, long)

    return (
        <div className="h-screen w-full">

            <MapContainer
                center={center}
                zoom={12}
                className="h-full w-full"
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </MapContainer>
        </div>
    )
}