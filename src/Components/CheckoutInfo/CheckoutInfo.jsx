import React from "react";
import classNames from "classnames";
import {
  makeStyles,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
} from "@material-ui/core";

// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkout } from "../../Redux/cartSlice";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: 215,
    minWidth: 320,
    maxWidth: 444,
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[2],
  },
  iconContainer: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(5),
    width: theme.spacing(5),
    borderRadius: "50%",
    color: "#fff",
  },
  link: {
    color: theme.palette.primary.light,
    transition: "all 0.1s ease-in-out",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
    marginLeft: theme.spacing(1),
    textDecoration: "none",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerMargin: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  marginTopTwo: {
    marginTop: theme.spacing(2),
  },
  marginTopThree: {
    marginTop: theme.spacing(3),
  },
  text: {
    color: theme.palette.grey[600],
    letterSpacing: 2.5,
  },
  letterSpace: {
    letterSpacing: 2,
  },
  stripeCardElement: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    fontSize: "16px",
    color: "#424770",
    "::placeholder": {
      color: "#aab7c4",
    },
  },

  stripeCardElementInvalid: {
    borderColor: "#ff3860",
  },
}));

const CheckoutInfo = () => {
  const classes = useStyles();
  const { total, pending } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const response = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (response.error) {
      console.error(response.error.message);
    } else {
      dispatch(checkout({ token: response.paymentMethod.id }));
    }
  };

  return (
    <>
      <Grid
        className={classNames(classes.letterSpace, classes.formContainer)}
        item
        container
        direction="column"
        xs={12}
        md={6}
      >
        <Typography component="h1" variant="h4">
          Checkout
        </Typography>

        <Box
          component="form"
          className={classes.marginTopTwo}
          onSubmit={handleSubmit}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
              classes: {
                base: classes.stripeCardElement,
                invalid: classes.stripeCardElementInvalid,
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.marginTopThree}
            disabled={pending}
          >
            <Typography variant="body1" className={classes.letterSpace}>
              Pay {total}
            </Typography>
          </Button>
        </Box>
      </Grid>
    </>
  );
};
export default CheckoutInfo;
