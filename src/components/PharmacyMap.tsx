"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface PharmacyMapProps {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
}

export default function PharmacyMap({
  latitude,
  longitude,
  name,
  address,
}: Readonly<PharmacyMapProps>) {
  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="text-center">
              <strong className="text-green-700">{name}</strong>
              <br />
              <span className="text-sm text-gray-600">{address}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
