import { LatLngExpression } from "leaflet";

export interface ContactInterface {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

export interface MapDataInterface {
  location: LatLngExpression;
  country: string;
  deaths: number;
  recovered: number;
  active: number;
}
