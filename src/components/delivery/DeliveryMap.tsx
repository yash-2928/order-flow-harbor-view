import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface DeliveryLocation {
  id: string;
  customer: string;
  address: string;
  lat: number;
  lng: number;
  status: string;
}

interface DeliveryMapProps {
  locations: DeliveryLocation[];
}

const statusColors: Record<string, string> = {
  delivered: "#16a34a",
  "on-route": "#2563eb",
  preparing: "#ca8a04",
  scheduled: "#64748b",
  "order-placed": "#8b5cf6",
};

const createIcon = (color: string) =>
  new L.DivIcon({
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.3)"></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

const DeliveryMap = ({ locations }: DeliveryMapProps) => {
  const center: [number, number] = locations.length
    ? [locations[0].lat, locations[0].lng]
    : [37.7749, -122.4194];

  return (
    <div className="rounded-lg overflow-hidden border border-border" style={{ height: 380 }}>
      <MapContainer center={center} zoom={11} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={createIcon(statusColors[loc.status] || "#64748b")}>
            <Popup>
              <strong>{loc.customer}</strong>
              <br />
              <span className="text-xs">{loc.address}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DeliveryMap;
