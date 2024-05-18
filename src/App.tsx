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
        longitude: 0,
        latitude: 0,
        zoom: 1,
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
