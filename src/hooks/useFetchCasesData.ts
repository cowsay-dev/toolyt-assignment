import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IData {
  dates: string[];
  values: number[];
}

interface IAllCases {
  cases: IData;
  deaths: IData;
  recovered: IData;
}
export const useFetchCasesData = () => {
  const fetchData = async () => {
    const response = await axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    const data = await response.data;
    const allCasesData: IAllCases = {
      cases: { dates: [], values: [] },
      deaths: { dates: [], values: [] },
      recovered: { dates: [], values: [] },
    };
    for (let key in data) {
      const dummy: IData = { dates: [], values: [] };
      for (let x in data[key]) {
        let val: number = data[key][x];
        dummy.dates.push(x);
        dummy.values.push(val);
      }
      if (key === "cases") {
        allCasesData.cases = dummy;
      } else if (key === "deaths") {
        allCasesData.deaths = dummy;
      } else {
        allCasesData.recovered = dummy;
      }
    }
    return allCasesData;
  };
  const { data } = useQuery(["allCases"], fetchData);
  return { data };
};
