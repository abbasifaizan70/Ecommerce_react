import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    "&:hover $img": {
      transform: "scale(1.1)",
    },
  },
  img: {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    transition: "transform 0.3s ease-in-out",
  },
}));

const ImageSlider = ({ images }) => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Grid item xs={12}>
      <Slider {...settings}>
        {images.map((imgObj, index) => (
          <div key={index} className={classes.imgContainer}>
            <img
              src={imgObj.image_url}
              alt={`Image ${index}`}
              className={classes.img}
            />
          </div>
        ))}
      </Slider>
    </Grid>
  );
};

export default ImageSlider;
