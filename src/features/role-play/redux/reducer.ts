import * as type from "./action-types";

const initialState = {
  pagination: {
    listItems: [],
    size: 3,
    page: 1,
    filter: {
      profession: "All"
    }
  },
  slide: {
    checked: true,
    direction: "right"
  },
  professions: []
};

export default function townReducer(state = initialState, action: any) {
  switch (action.type) {
    case type.GET_INHABITANTS_LIST: {
      return Object.assign({}, state, {
        pagination: action.pagination
      });
    }
    case type.GET_PROFESSION_LIST: {
      return Object.assign({}, state, {
        professions: action.professions
      });
    }
    case type.SET_CHECKED: {
      return Object.assign({}, state, {
        slide: action.slide
      });
    }
    case type.SET_PAGINATION_SIZE: {
      return Object.assign({}, state, {
        pagination: { ...action.pagination }
      });
    }
    default:
      return state;
  }
}
