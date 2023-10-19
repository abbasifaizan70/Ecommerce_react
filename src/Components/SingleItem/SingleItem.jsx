import React from "react";
import {
  makeStyles,
  Card,
  CardMedia,
  Grid,
  Typography,
  CardActionArea,
  CardContent,
  Chip,
  Fade,
  Box,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
    },
  },
  media: {
    height: 140,
    padding: 5,
    objectFit: "contain",
    transition: "transform 0.5s",
    [theme.breakpoints.up("sm")]: {
      height: 200,
    },
  },
  stockChip: {
    marginTop: theme.spacing(1),
  },
  stockOutChip: {
    marginTop: theme.spacing(1),
    borderColor: "red",
    color: "red",
  },
}));

const SingleItem = ({ item }) => {
  const classes = useStyles();
  const { id, name, images, price, stock } = item;
  const navigate = useNavigate();

  return (
    <Grid item xs={10} sm={6} lg={4}>
      <Card className={classes.root}>
        <CardActionArea onClick={() => navigate(`/products/${id}`)}>
          <Fade in={true} timeout={500}>
            <CardMedia
              className={classes.media}
              src={images[0].image_url}
              name={name}
              component="img"
              loading="lazy"
            />
          </Fade>
          <CardContent>
            <Typography gutterBottom variant="body1" component="h4">
              {name.substring(0, 20)}...
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ${price}
            </Typography>
            {stock > 0 ? (
              <Chip
                label={`In Stock: ${stock}`}
                variant="outlined"
                color="primary"
                className={classes.stockChip}
              />
            ) : (
              <Chip
                label={`Out of Stock`}
                variant="outlined"
                color="danger"
                className={classes.stockOutChip}
              />
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default SingleItem;
