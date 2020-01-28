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
import { Container } from "@material-ui/core";
import { PaginationModel } from "../models/pagination.model";
import { SlideModel } from "../models/slide.model";
import InhabitantsList from "./inhabitants-list";
import ProfessionFilter from "./inhabitants-profession-filter";
import AgeFilter from "./inhabitants-age-filter";

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
          pagination.filter.profession,
          pagination.filter.age
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
        pagination.filter.profession,
        pagination.filter.age
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
        pagination.filter.profession,
        pagination.filter.age
      );
      setSlide(true, "right");
    }, 300);
  };
  const [profession, setProfession] = React.useState("All");
  const [alignment, setAlignment] = React.useState("center");

  const handleProfessionChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProfession(event.target.value as string);

    getInhabitantsList(
      1,
      getPageSize(),
      event.target.value as string,
      pagination.filter.age
    );
  };

  const handleAgeChange = (newAlignment: string) => {
    setAlignment(newAlignment);

    getInhabitantsList(
      1,
      getPageSize(),
      pagination.filter.profession,
      newAlignment
    );
  };

  return (
    <Container fixed>
      <h3>Wellcome to Brastlewark town</h3>
      <h5 style={{ marginTop: "-15px" }}>
        Page {pagination.page} of {pagination.totalPages}
      </h5>
      <div className="filters">
        <ProfessionFilter
          profession={profession}
          professions={professions}
          handleChange={handleProfessionChange}
        />
        <AgeFilter alignment={alignment} handleChange={handleAgeChange} />
      </div>
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
