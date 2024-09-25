import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dynamically load react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });

import locationIcon from "../../../../assets/images/location.png";

interface HeightProps {
  height: string;
}

const MapLeaflet: React.FC<HeightProps> = ({ height }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure the component is mounted on the client side
  }, []);

  if (!isMounted) {
    return null; // Return null until the component is mounted
  }

  const position: [number, number] = [23.745, 90.375];

  const customIcon = new Icon({
    iconUrl: locationIcon.src,
    iconSize: [47, 60],
  });

  return (
    <MapContainer
      className={`${height} rounded-lg z-20`}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height }}
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
