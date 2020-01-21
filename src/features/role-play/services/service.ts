import { InhabitantModel } from "../models/inhabitant.model";

export function getInhabitantsList(town: string = "Brastlewark") {
  console.log("hey")
  return fetch(
    "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json"
  )
    .then(response => response.json())
    .then(data => data[town].map((m: InhabitantModel) => m))
    .then(data => {
      setCache(town, data);
      return data;
    });
}

export const setCache = (
  town = "Brastlewark",
  inhabitants: InhabitantModel
) => {
  localStorage.setItem(town, JSON.stringify(inhabitants));
};

export const getCache: any = (town: string = "Brastlewark") => {
  let values = localStorage.getItem(town);
  if (values) return new Array<InhabitantModel>().concat(JSON.parse(values));
  else return [];
};
