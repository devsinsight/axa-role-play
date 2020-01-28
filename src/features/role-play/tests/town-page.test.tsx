import React from "react";
import renderer from "react-test-renderer";
import { pagination, slide, professions } from "../../../../test/mockData";
import ProfessionFilter from "../components/inhabitants-profession-filter";
import InhabitantsList from "../components/inhabitants-list";
import Friends from "../components/inhabitants-friends";
import Professions from "../components/inhabitants-professions";

it("should render ProfessionFilter component", () => {
  const professionFilter = renderer.create(
    <ProfessionFilter
      profession={"All"}
      professions={professions}
      handleChange={jest.fn()}
    />
  );

  expect(professionFilter).toMatchSnapshot();
});

it("should render InhabitantsList component when transition 'in' is false", () => {
  const inhabitantsList = renderer.create(
    <InhabitantsList
      pagination={pagination}
      slide={slide}
      next={jest.fn()}
      prev={jest.fn()}
    />
  );

  expect(inhabitantsList).toMatchSnapshot();
});

it("should render gnomes friends", () => {
  const inhabitantsList = renderer.create(<Friends friends={["cat", "dog"]} />);

  expect(inhabitantsList).toMatchSnapshot();
});

it("should render gnomes profressions", () => {
  const inhabitantsList = renderer.create(
    <Professions professions={professions} />
  );

  expect(inhabitantsList).toMatchSnapshot();
});
