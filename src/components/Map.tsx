import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import svgMarkerIcon from "../../ip-address-tracker-master/images/icon-location.svg";

interface MapProps {
  latitude: number;
  longitude: number;
}

const customIcon = new L.Icon({
  iconUrl: svgMarkerIcon, // Ruta del archivo SVG
  iconSize: [40, 40], // Tamaño del icono [ancho, alto]
  iconAnchor: [20, 40], // Punto de anclaje del icono [mitad del ancho, altura total]
  popupAnchor: [0, -40], // Punto de anclaje para el popup [x, y]
});

const Map = ({ latitude, longitude }: MapProps) => {
  // Subcomponente para centrar el mapa dinámicamente
  const MapUpdater = () => {
    const map = useMap();
    map.setView([latitude, longitude], map.getZoom());
    return null; // No renderiza nada en el DOM
  };
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{
        height: "72vh",
        width: "full",
        margin: "0 auto",
        zIndex: 1,
      }}
    >
      <MapUpdater />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>You are here.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
