import { InhabitantModel } from "../models/inhabitant.model";
import * as type from "./action-types";
import * as service from "../services/service";
import { Dispatch } from "redux";
import { PaginationModel } from "../models/pagination.model";
import { SlideModel } from "../models/slide.model";
import { FilterModel } from "../models/filter.model";

export function getInhabitantsListSuccess(pagination: PaginationModel) {
  return { type: type.GET_INHABITANTS_LIST, pagination };
}

export function setSlideSuccess(slide: SlideModel) {
  return { type: type.SET_CHECKED, slide };
}

export function setPaginationSizeSuccess(pagination: PaginationModel) {
  return { type: type.SET_PAGINATION_SIZE, pagination };
}

export function getProfessionListSuccess(professions: Array<string>) {
  return { type: type.GET_PROFESSION_LIST, professions };
}

export function setPaginationSize(pagination: PaginationModel) {
  return function(dispatch: Dispatch) {
    return dispatch(setPaginationSizeSuccess(pagination));
  };
}

export function setSlide(
  checked: boolean,
  direction: "left" | "right" | "up" | "down"
) {
  return function(dispatch: Dispatch) {
    return dispatch(setSlideSuccess(new SlideModel(checked, direction)));
  };
}

export function getInhabitantsList(
  page: number,
  size: number,
  profession: string = "All"
) {
  return function(dispatch: Dispatch) {
    let cachedData = service.getCache();
    if (cachedData.length) {
      return dispatch(
        getInhabitantsListSuccess(
          paginate(
            filterByProfession(cachedData, profession),
            page,
            size,
            new FilterModel(profession)
          )
        )
      );
    } else {
      return service
        .getInhabitantsList()
        .then((serviceData: Array<InhabitantModel>) => {
          return dispatch(
            getInhabitantsListSuccess(
              paginate(
                filterByProfession(serviceData, profession),
                page,
                size,
                new FilterModel(profession)
              )
            )
          );
        });
    }
  };
}

export function getProfessionList() {
  return function(dispatch: Dispatch) {
    let cachedData: Array<InhabitantModel> = service.getCache();
    if (cachedData.length) {
      return dispatch(getProfessionListSuccess(getProfessions(cachedData)));
    } else {
      return service
        .getInhabitantsList()
        .then((serviceData: Array<InhabitantModel>) => {
          return dispatch(
            getProfessionListSuccess(getProfessions(serviceData))
          );
        });
    }
  };
}

const paginate = (
  data: Array<any>,
  page: number,
  size: number,
  filter: FilterModel
) => {
  return new PaginationModel(
    page,
    size,
    data.length,
    data.slice((page - 1) * size, page * size),
    filter
  );
};

const getProfessions = (data: Array<InhabitantModel>): Array<string> => {
  let professions = new Set();
  professions.add("All");
  data.forEach(d => {
    d.professions.forEach((p: string) => {
      professions.add(p);
    });
  });
  return [...professions] as Array<string>;
};

const filterByProfession = (
  data: Array<InhabitantModel>,
  profession: string
) => {
  if (profession == "All") return data;
  return data.filter(d => d.professions.indexOf(profession) > -1);
};
