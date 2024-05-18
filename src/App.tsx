import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";

const mapStyle = `https://api.maptiler.com/maps/streets/style.json?key=${
  import.meta.env.VITE_APP_MAPTILER_API_KEY
}`;

function App() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
      }}
      mapStyle={mapStyle}
    />
  );
}

export default App;
