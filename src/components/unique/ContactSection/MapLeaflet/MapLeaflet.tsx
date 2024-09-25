import dynamic from 'next/dynamic';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css"; // Importing the Leaflet CSS

// Disable SSR for react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

import locationIcon from "../../../../assets/images/location.png";

interface HeightProps {
  height: string;
}

const MapLeaflet: React.FC<HeightProps> = ({ height }) => {
  if (typeof window === 'undefined') {
    return null; // Ensure it only renders on the client
  }

  const position: [number, number] = [23.745, 90.375]; // Tuple for position

  const customIcon = new Icon({
    iconUrl: locationIcon.src, // Ensure the image path works with Next.js
    iconSize: [47, 60], // Icon size as tuple
  });

  return (
    <MapContainer
      className={`${height} rounded-lg z-20`}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height }} // Inline height styling for the map
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
