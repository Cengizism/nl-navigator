import { useState, useEffect, useRef, useCallback } from "react";
import {
  Source,
  Layer,
  useMap,
  FillLayer,
  PointLike,
} from "react-map-gl/maplibre";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import nlCitiesTownsData from "./geodata/nl-cities-towns.json";
import { MapGeoJSONFeature, QueryRenderedFeaturesOptions } from "maplibre-gl";

type Features = FeatureCollection<Geometry, GeoJsonProperties>;

const genericFill = {
  type: "fill",
  paint: {
    "fill-color": "orange",
    "fill-outline-color": "white",
  },
  source: "",
};

const cityTownLayerProps = {
  ...genericFill,
  id: "cities-towns-layer",
  paint: {
    ...genericFill.paint,
    "fill-opacity": 0.025,
  },
} as FillLayer;

const activeCityTownLayerProps = {
  ...genericFill,
  id: "active-city-layer",
  paint: {
    ...genericFill.paint,
    "fill-opacity": 0.5,
  },
} as FillLayer;

const Cities = () => {
  const { current: map } = useMap();

  const [citiesTownsData] = useState<Features>(nlCitiesTownsData as Features);
  const [activeCity, setActiveCity] = useState<MapGeoJSONFeature | null>(null);

  const [hoveredCity, setHoveredCity] = useState<MapGeoJSONFeature | null>(
    null
  );
  const [mouseLocation, setMouseLocation] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const lastFeatureIdRef = useRef(null);

  const onMouseMove = useCallback(
    (event: {
      point:
        | PointLike
        | [PointLike, PointLike]
        | QueryRenderedFeaturesOptions
        | undefined;
    }) => {
      const { point } = event;
      const features = map?.queryRenderedFeatures(point, {
        layers: ["cities-towns-layer"],
      });

      if (!features || !features.length) {
        setActiveCity(null);
        setHoveredCity(null);
        lastFeatureIdRef.current = null;
        return;
      }

      const feature = features && features[0];

      setMouseLocation(point as { x: number; y: number });
      setHoveredCity(feature);

      if (feature.properties.id !== lastFeatureIdRef.current) {
        lastFeatureIdRef.current = feature.properties.id;
        setActiveCity(feature);
      }
    },
    []
  );

  useEffect(() => {
    map?.on("mousemove", onMouseMove);

    return () => {
      map?.off("mousemove", onMouseMove);
    };
  }, [map, onMouseMove]);

  return (
    <>
      <Source id="cities-towns-source" type="geojson" data={citiesTownsData}>
        <Layer {...cityTownLayerProps} />
      </Source>

      {activeCity && (
        <Source id="active-city-source" type="geojson" data={activeCity}>
          <Layer {...activeCityTownLayerProps} />
        </Source>
      )}

      {hoveredCity && mouseLocation && (
        <div
          className="tooltip"
          style={{
            left: mouseLocation.x,
            top: mouseLocation.y,
          }}
        >
          <div>{hoveredCity.properties.statnaam}</div>
        </div>
      )}
    </>
  );
};

export default Cities;
