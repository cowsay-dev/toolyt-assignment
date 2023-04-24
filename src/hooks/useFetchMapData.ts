import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MapDataInterface } from "../interfaces";

export const useFetchMapData = () => {
  const fetchData = async () => {
    const response = await axios.get(
      "https://disease.sh/v3/covid-19/countries"
    );
    const data = await response.data;
    const mapData: MapDataInterface[] = data.map((val: any) => {
      return {
        location: [val?.countryInfo.lat, val?.countryInfo.long],
        country: val?.country,
        deaths: val?.deaths,
        recovered: val?.recovered,
        active: val?.active,
      };
    });
    return mapData;
  };

  const { data } = useQuery(["mapData"], fetchData);
  return { data };
};
