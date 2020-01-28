import { InhabitantModel } from "./inhabitant.model";

export function ResponseData(data: Array<InhabitantModel>) {
  let newData: Array<InhabitantModel> = Object.assign([], data);

  let filters = {
    getData() {
      return newData;
    },
    filterByProfession(profession: string) {
      if (profession != "All")
        newData = newData.filter(d => d.professions.indexOf(profession) > -1);
      return this;
    },
    filterByAge(age: string) {
      switch (age) {
        case "left": {
          newData = newData.filter(d => d.age < 200);
          return this;
        }
        case "right": {
          newData = newData.filter(d => d.age > 200);
          return this;
        }
      }
      return this;
    }
  };

  return filters;
}
