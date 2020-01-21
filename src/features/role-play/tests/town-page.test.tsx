import React from "react";
import { shallow, mount } from "enzyme";
import TownPage from "../components/town-page";
import { pagination, slide, professions } from "../../../../test/mockData";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import townReducer from "../../role-play/redux/reducer";
import { Provider as ReduxProvider } from "react-redux";
import { Container } from "@material-ui/core";
import ProfessionFilter from "../components/inhabitants-filter";
import InhabitantsList from "../components/inhabitants-list";

const rootReducer = combineReducers({
  townReducer
});

const store: any = createStore(rootReducer, applyMiddleware(thunk));

function render(args: any) {
  const defaultProps = {
    getInhabitantsList: jest.fn(),
    setSlide: jest.fn(),
    setPaginationSize: jest.fn(),
    getProfessionList: jest.fn(),
    pagination: pagination,
    slide: slide,
    professions: professions
  };

  const props = { ...defaultProps, ...args };

  return mount(
    <ReduxProvider store={store}>
      <TownPage {...props} />
    </ReduxProvider>
  );
}

it("should render without throwing an error", () => {
  const townPage = render({});
  const professionFilterProps = {
    profession: "All",
    professions: professions,
    handleChange: jest.fn()
  };

  const inhabitantsList = {
    pagination: pagination,
    slide: slide,
    next: jest.fn(),
    prev: jest.fn()
  };

  expect(
    townPage
      .children(<Container fixed></Container>)
      .find(<h3></h3>)
      .contains("Wellcome to Brastlewark town")
  ).toEqual(true);
});
