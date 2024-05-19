import { useRef } from "react";
import Map, {
  MapRef,
  FullscreenControl,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
} from "react-map-gl/maplibre";
import Cities from "./Cities";

import "maplibre-gl/dist/maplibre-gl.css";

const mapStyle = `https://api.maptiler.com/maps/nl-cartiqo-dark/style.json?key=${
  import.meta.env.VITE_APP_MAPTILER_API_KEY
}`;

function App() {
  const mapRef = useRef<MapRef | null>(null);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 5.2913,
        latitude: 52.1326,
        zoom: 7.2,
      }}
      mapStyle={mapStyle}
    >
      <FullscreenControl />
      <NavigationControl />
      <GeolocateControl />
      <ScaleControl />
      <Cities />
    </Map>
  );
}

export default App;
