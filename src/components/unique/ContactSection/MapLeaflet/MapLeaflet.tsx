// Import dynamic from next/dynamic
import dynamic from 'next/dynamic';
import { Icon } from "leaflet";
import { Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Disable SSR for react-leaflet components by dynamically importing them
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });

import locationIcon from "../../../../assets/images/location.png";

interface HeightProps {
  height: string;
}

const MapLeaflet: React.FC<HeightProps> = ({ height }) => {
  const position: [number, number] = [23.745, 90.375]; // Type tuple

  const customIcon = new Icon({
    iconUrl: locationIcon.src, // Ensure the image is correctly resolved in Next.js
    iconSize: [47, 60], // Icon dimensions as tuple
  });

  return (
    <MapContainer
      className={`${height} rounded-lg z-20`}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height }} // Style for the container
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>Dhanmondi Road No-127, Block-C Dhaka, Bangladesh</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLeaflet;
