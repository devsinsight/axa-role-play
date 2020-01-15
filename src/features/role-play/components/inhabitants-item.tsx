import { InhabitantModel } from "../models/inhabitant.model";

import {
  Card,
  CardHeader,
  Avatar,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  makeStyles
} from "@material-ui/core";
import React from "react";
import Friends from "./inhabitants-friends";
import Professions from "./inhabitants-professions";
import { Favorite, Share } from "@material-ui/icons";
import { blue, red, yellow } from "@material-ui/core/colors";

const InhabitantItem = ({ item }: { item: InhabitantModel }) => {
  const classes = useStyles();
  const avatars = [classes.avatar1, classes.avatar2, classes.avatar3];

  let avatar = avatars[Math.floor(Math.random() * avatars.length)];
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={avatar}>
            {item.name && item.name.substr(0, 1)}
          </Avatar>
        }
        title={item.name}
        subheader={"Age: " + item.age}
      />
      <CardActionArea>
        <CardMedia
          component="img"
          alt={item.name}
          height="400"
          image={item.thumbnail}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ height: "80px" }}
          >
            {item.friends.length ? (
              <Friends friends={item.friends} />
            ) : item.professions.length ? (
              <Professions professions={item.professions} />
            ) : (
              "hey!"
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  avatar1: {
    backgroundColor: blue[500]
  },
  avatar2: {
    backgroundColor: red[500]
  },
  avatar3: {
    backgroundColor: yellow[500]
  },
  container: {
    width: "95%"
  }
});

export default InhabitantItem;
