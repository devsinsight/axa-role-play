import { PaginationModel } from "../models/pagination.model";
import React from "react";
import { Slide, makeStyles } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import { InhabitantModel } from "../models/inhabitant.model";
import { SlideModel } from "../models/slide.model";
import InhabitantItem from "./inhabitants-item";

interface Props {
  pagination: PaginationModel;
  slide: SlideModel;
  next: Function;
  prev: Function;
}

const InhabitantsList = ({ pagination, slide, next, prev }: Props) => {
  const classes = useStyles();
  const ButtonGroup = () => {
    return (
      <div className="carousel-button-group">
        <button
          style={{
            marginLeft: "-3%",
            display: pagination.page == 1 ? "none" : "block"
          }}
          onClick={() => {
            prev();
          }}
          aria-label="Go to previous slide"
          className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
        ></button>
        <button
          onClick={() => {
            next();
          }}
          aria-label="Go to next slide"
          className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
        ></button>
      </div>
    );
  };

  return (
    <div>
      <Slide
        direction={slide.direction}
        in={slide.checked}
        mountOnEnter
        unmountOnExit
      >
        <Carousel
          responsive={responsive}
          slidesToSlide={3}
          containerClass={classes.container}
          arrows={false}
          customButtonGroup={<ButtonGroup />}
        >
          {pagination.listItems.map((info: InhabitantModel) => (
            <div key={info.id}>
              <InhabitantItem item={info} />
            </div>
          ))}
        </Carousel>
      </Slide>
    </div>
  );
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const useStyles = makeStyles({
  container: {
    width: "95%"
  }
});

export default InhabitantsList;
