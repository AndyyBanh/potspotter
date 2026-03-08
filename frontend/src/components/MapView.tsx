"use client"
import { MapContainer, TileLayer, useMapEvents, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import L from "leaflet";
import axiosInstance from "@/api/axiosinstance";

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface PotHole {
    id: number;
    latitude: number;
    longitude: number;
    imageUrl: string;
    severity: number;
    upvotes: number;
    downvotes: number;
}

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

function FlyToMarker({ position }: { position: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 16, { duration: 1 });
        }
    }, [position, map]);
    return null;
}

export function MapView({ isReporting, setIsReporting }: { isReporting: boolean, setIsReporting: Dispatch<SetStateAction<boolean>> }) {
    const center: [number, number] = [43.6548, -79.3883];
    const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [severity, setSeverity] = useState<number>(1);
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [potholes, setPotholes] = useState<PotHole[]>([]);
    const [selectedPothole, setSelectedPothole] = useState<PotHole | null>(null);
    const [flyTo, setFlyTo] = useState<[number, number] | null>(null);
    const [votedPotholes, setVotedPotholes] = useState<Record<number, "up" | "down">>({});

    useEffect(() => {
        fetchPotholes();
    }, []);

    const handleMapClick = (lat: number, lng: number) => {
        setMarkerPos([lat, lng]);
        setIsReporting(false);
        setShowForm(true);
    };

    const fetchPotholes = () => {
        axiosInstance.get("/api/v1/pothole")
            .then((res) => {
                const data = res.data;
                setPotholes(Array.isArray(data) ? data : []);
            })
            .catch((err) => console.error("Failed to fetch potholes", err));
    };

    const handleSubmit = async () => {
        if (!photo) {
            setFormError("Please upload a photo");
            return;
        }
        if (!markerPos) return;

        setSubmitting(true);
        setFormError("");

        const formData = new FormData();
        formData.append("file", photo);
        formData.append("latitude", markerPos[0].toString());
        formData.append("longitude", markerPos[1].toString());
        formData.append("severity", severity.toString());

        try {
            await axiosInstance.post("/api/v1/pothole", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setShowForm(false);
            setMarkerPos(null);
            setPhoto(null);
            setSeverity(1);
            fetchPotholes();
        } catch (err) {
            setFormError("Failed to submit report. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setMarkerPos(null);
        setIsReporting(false);
    };

    const handleVote = async (id: number, type: "up" | "down") => {
        if (votedPotholes[id]) return;
        try {
            const res = await axiosInstance.post(`/api/v1/pothole/${id}/${type === "up" ? "upvote" : "downvote"}`);
            const updated = res.data;
            setPotholes(prev => prev.map(p => p.id === id ? { ...p, upvotes: updated.upvotes, downvotes: updated.downvotes } : p));
            if (selectedPothole?.id === id) {
                setSelectedPothole(prev => prev ? { ...prev, upvotes: updated.upvotes, downvotes: updated.downvotes } : null);
            }
            setVotedPotholes(prev => ({ ...prev, [id]: type }));
        } catch (err) {
            console.error("Failed to vote", err);
        }
    };

    const handleMarkerClick = (pothole: PotHole) => {
        setSelectedPothole(pothole);
        setFlyTo([pothole.latitude, pothole.longitude]);
    };

    const getSeverityLabel = (severity: number) => {
        if (severity === 1) return { label: "Low", color: "text-green-500", bg: "bg-green-100" };
        if (severity === 2) return { label: "Medium", color: "text-yellow-500", bg: "bg-yellow-100" };
        return { label: "High", color: "text-red-500", bg: "bg-red-100" };
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
                <FlyToMarker position={flyTo} />

                {markerPos && <Marker position={markerPos} icon={markerIcon} />}

                {potholes.map((pothole) => (
                    <Marker
                        key={pothole.id}
                        position={[pothole.latitude, pothole.longitude]}
                        icon={markerIcon}
                        eventHandlers={{ click: () => handleMarkerClick(pothole) }}
                    />
                ))}
            </MapContainer>

            {/* Right slide-in panel */}
            <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl z-[1000] flex flex-col transition-transform duration-300 ease-in-out ${selectedPothole ? "translate-x-0" : "translate-x-full"}`}>
                {selectedPothole && (
                    <>
                        <div className="flex items-center justify-between px-5 py-4 border-b">
                            <h2 className="text-lg font-bold">Pothole</h2>
                            <button
                                onClick={() => setSelectedPothole(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 p-5 overflow-y-auto">
                            {selectedPothole.imageUrl && (
                                <img
                                    src={selectedPothole.imageUrl}
                                    alt="Pothole"
                                    className="rounded-xl w-full object-cover max-h-48"
                                />
                            )}

                            <div className="flex flex-col gap-3">
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-xs text-gray-400 mb-1">Location</p>
                                    <p className="text-sm font-medium">{selectedPothole.latitude.toFixed(5)}, {selectedPothole.longitude.toFixed(5)}</p>
                                </div>

                                <div className={`rounded-xl p-3 ${getSeverityLabel(selectedPothole.severity).bg}`}>
                                    <p className="text-xs text-gray-400 mb-1">Severity</p>
                                    <p className={`text-sm font-bold ${getSeverityLabel(selectedPothole.severity).color}`}>
                                        {getSeverityLabel(selectedPothole.severity).label}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleVote(selectedPothole.id, "up")}
                                        disabled={!!votedPotholes[selectedPothole.id]}
                                        className={`flex-1 rounded-xl p-3 text-center transition-colors ${votedPotholes[selectedPothole.id] === "up" ? "bg-green-100 border-2 border-green-400" : "bg-gray-50 hover:bg-green-50"} disabled:cursor-not-allowed`}
                                    >
                                        <p className="text-xs text-gray-400 mb-1">Upvote</p>
                                        <p className="text-lg font-bold">{selectedPothole.upvotes ?? 0}</p>
                                    </button>
                                    <button
                                        onClick={() => handleVote(selectedPothole.id, "down")}
                                        disabled={!!votedPotholes[selectedPothole.id]}
                                        className={`flex-1 rounded-xl p-3 text-center transition-colors ${votedPotholes[selectedPothole.id] === "down" ? "bg-red-100 border-2 border-red-400" : "bg-gray-50 hover:bg-red-50"} disabled:cursor-not-allowed`}
                                    >
                                        <p className="text-xs text-gray-400 mb-1">Downvote</p>
                                        <p className="text-lg font-bold">{selectedPothole.downvotes ?? 0}</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {isReporting && !showForm && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded-xl shadow-lg px-4 py-2 text-sm text-gray-500">
                    Click on the map to mark the pothole location
                </div>
            )}

            {showForm && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl shadow-2xl p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">Report a Pothole</h2>

                    <p className="font-medium mb-2">Upload Photo</p>
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

                    <p className="font-medium mb-2">Severity</p>
                    <select
                        value={severity}
                        onChange={(e) => setSeverity(Number(e.target.value))}
                        className="w-full p-3 border rounded-xl mb-4 text-sm"
                    >
                        <option value={1}>1 - Low</option>
                        <option value={2}>2 - Medium</option>
                        <option value={3}>3 - High</option>
                    </select>

                    {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}

                    <div className="flex justify-between">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-4 py-2 rounded-xl bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold disabled:opacity-50"
                        >
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}