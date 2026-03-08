"use client"
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, Dispatch, SetStateAction } from "react";
import L from "leaflet";

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapClickHandler({ onMapClick, active }: { onMapClick: (lat: number, lng: number) => void, active: boolean }) {
    useMapEvents({
        click(e) {
            if (active) {
                onMapClick(e.latlng.lat, e.latlng.lng);
            }
        }
    });
    return null;
}

export function MapView({ isReporting, setIsReporting }: { isReporting: boolean, setIsReporting: Dispatch<SetStateAction<boolean>> }) {
    const center: [number, number] = [43.6548, -79.3883];
    const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [photo, setPhoto] = useState<File | null>(null);

    const handleMapClick = (lat: number, lng: number) => {
        setMarkerPos([lat, lng]);
        setIsReporting(false);
        setShowForm(true);
    };

    const handleSubmit = () => {
        console.log({ markerPos, photo });
        setShowForm(false);
        setMarkerPos(null);
        setPhoto(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setMarkerPos(null);
        setIsReporting(false);
    };

    return (
        <div className="relative h-full w-full">
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
                <MapClickHandler onMapClick={handleMapClick} active={isReporting} />
                {markerPos && <Marker position={markerPos} icon={markerIcon} />}
            </MapContainer>

            {isReporting && !showForm && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded-xl shadow-lg px-4 py-2 text-sm text-gray-500">
                    Click on the map to mark the pothole location
                </div>
            )}

            {showForm && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl shadow-2xl p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">Report a Pothole</h2>

                    <p className="font-medium mb-2">Upload Photo (optional)</p>
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) setPhoto(file);
                        }}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-sm text-gray-400 cursor-pointer hover:border-orange-400 hover:text-orange-400 transition-colors mb-4"
                        onClick={() => document.getElementById('photoInput')?.click()}
                    >
                        {photo ? (
                            <p className="text-gray-700 font-medium">{photo.name}</p>
                        ) : (
                            <p>Drag & drop a photo here or <span className="underline">click to browse</span></p>
                        )}
                        <input
                            id="photoInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 rounded-xl bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}