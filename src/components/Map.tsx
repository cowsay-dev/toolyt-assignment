import { LatLngExpression } from "leaflet";
import React from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { useFetchMapData } from "../hooks/useFetchMapData";
import { MapDataInterface } from "../interfaces";

const Map = () => {
  const defaultPosition: LatLngExpression = [48.864716, 2.349];
  const { data } = useFetchMapData();
  return (
    <div className="flex h-1/2 mt-3">
      <MapContainer center={defaultPosition} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((val: MapDataInterface) => {
          return (
            <CircleMarker
              center={val.location}
              pathOptions={{ color: "red" }}
              radius={10}
              key={`location-${val.country}`}
            >
              <Tooltip>
                <p className="text-center font-bold text-base">{val.country}</p>

                <p className="text-xs font-bold">
                  <span className="text-violet-700">Active:</span> {val.active}
                </p>
                <p className="text-xs font-bold">
                  <span className="text-green-700">Recovered:</span>{" "}
                  {val.recovered}
                </p>
                <p className="text-xs font-bold">
                  <span className="text-red-500">Deaths:</span> {val.deaths}
                </p>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
