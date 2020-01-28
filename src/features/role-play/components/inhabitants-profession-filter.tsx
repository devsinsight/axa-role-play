import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import React from "react";

interface Props {
  profession: string;
  professions: Array<string>;
  handleChange: Function;
}

const ProfessionFilter = ({ profession, handleChange, professions }: Props) => {
  const classes = useStyles();
  return (
    <div className="filter">
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">
          Professions
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={profession}
          onChange={event => {
            handleChange(event);
          }}
        >
          {professions.map(p => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

export default ProfessionFilter;
