import { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import React from "react";
import {
  getInhabitantsList,
  setSlide,
  setPaginationSize,
  getProfessionList
} from "../redux/actions";
import "react-multi-carousel/lib/styles.css";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core";
import { PaginationModel } from "../models/pagination.model";
import { SlideModel } from "../models/slide.model";
import InhabitantsList from "./inhabitants-list";
import ProfessionFilter from "./inhabitants-filter";

interface TownProps {
  getInhabitantsList: Function;
  setSlide: Function;
  setPaginationSize: Function;
  getProfessionList: Function;
  pagination: PaginationModel;
  slide: SlideModel;
  professions: Array<string>;
}

const TownPage: FunctionComponent<TownProps> = ({
  getInhabitantsList,
  setSlide,
  getProfessionList,
  pagination,
  slide,
  professions
}) => {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    };
  };

  const getPageSize = () => {
    const windowSize = getSize();
    return windowSize.width < 750 ? 1 : 3;
  };

  useEffect(() => {
    //default load
    handleResize();

    function handleResize() {
      if (pagination.listItems.length == 0)
        getInhabitantsList(
          pagination.page,
          getPageSize(),
          pagination.filter.profession
        );

      if (!professions.length) getProfessionList();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setSlide(false, "right");
    setTimeout(() => {
      getInhabitantsList(
        pagination.next,
        pagination.size,
        pagination.filter.profession
      );
      setSlide(true, "left");
    }, 300);
  };

  const prev = () => {
    setSlide(false, "left");
    setTimeout(() => {
      getInhabitantsList(
        pagination.prev,
        pagination.size,
        pagination.filter.profession
      );
      setSlide(true, "right");
    }, 300);
  };
  const [profession, setProfession] = React.useState("All");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProfession(event.target.value as string);

    getInhabitantsList(1, getPageSize(), event.target.value as string);
  };

  return (
    <Container fixed>
      <h2>Wellcome to Brastlewark town</h2>
      <ProfessionFilter
        profession={profession}
        professions={professions}
        handleChange={handleChange}
      />
      <br />
      <InhabitantsList
        pagination={pagination}
        slide={slide}
        next={next}
        prev={prev}
      />
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    pagination: state.townReducer.pagination,
    slide: state.townReducer.slide,
    professions: state.townReducer.professions
  };
};

const mapDispatchToProps = {
  getInhabitantsList,
  getProfessionList,
  setSlide,
  setPaginationSize
};

export default connect(mapStateToProps, mapDispatchToProps)(TownPage);
