import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";

interface Props {
  handleChange: Function;
  alignment: string;
}

const AgeFilter = ({ alignment, handleChange }: Props) => {
  return (
    <div className="filter">
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={(event: any, newAlignment: string) =>
          handleChange(newAlignment)
        }
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="left aligned">
          Under 200 Years
        </ToggleButton>
        <ToggleButton value="center" aria-label="center aligned">
          All Years
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          Over 200 Years
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default AgeFilter;
