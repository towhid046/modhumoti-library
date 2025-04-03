import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import locationIcon from "../../../assets/images/location.png"
interface MapLeafletProps {
    className: string;
}

const MapLeaflet = ({ className }: MapLeafletProps) => {

    const customIcon = new Icon({
        iconUrl: locationIcon,
        iconSize: [47, 60],
    });

    return (
        <>
            <MapContainer
                className={`${className} rounded-lg z-20`}
                center={[22.9647, 89.8148]}
                zoom={16}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[22.9647, 89.8148]} icon={customIcon}>
                    <Popup>Modhumoti Library, Gobra</Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapLeaflet;