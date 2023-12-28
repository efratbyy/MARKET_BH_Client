import React, { useEffect } from "react";
import { useCartProvider } from "../providers/CartProvider";
import { AppBar, Grid, Typography, Paper, Box } from "@mui/material";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";

type Props = {
  backgroundColor: string;
};
const DesktopCartNavbar: React.FC<Props> = ({ backgroundColor }) => {
  const { cart } = useCartProvider();
  const [totalItemsInCart, setTotalItemsInCart] = React.useState<number>(0);
  const [totalPriceInCart, setTotalPriceInCart] = React.useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart)
      setTotalItemsInCart(cart.reduce((acc, item) => acc + item.amount, 0));
  }, [cart]);

  useEffect(() => {
    if (cart)
      setTotalPriceInCart(cart.reduce((acc, item) => acc + item.price, 0));
  }, [cart]);

  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: backgroundColor,
          padding: "10px",
          color: "#fff",
        }}
      >
        <Grid
          item
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          xs={3}
        >
          <ShoppingCartTwoToneIcon fontSize="large" />
        </Grid>

        <Grid item container xs={4} lg={4} sx={{ display: "flex", gap: 2 }}>
          <Grid item sx={{ flexGrow: 1 }}>
            <Typography variant="body1">{totalItemsInCart} מוצרים</Typography>
          </Grid>
          <Grid container sx={{ flexDirection: "column", flexGrow: 1 }}>
            <Grid item>
              <Typography variant="body1">
                {totalPriceInCart.toFixed(2)} ₪
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={5}
          lg={5}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          {cart && cart.length !== 0 && (
            <Button
              onClick={() => {
                navigate(ROUTES.CHECKOUT);
              }}
              variant="contained"
              sx={{
                backgroundColor: "#5b9822",
                color: "white",
                "&:hover": {
                  backgroundColor: "#654321", // Change color on hover
                },
                "&:active": {
                  backgroundColor: "#654321", // Change color on press
                },
              }}
            >
              <Typography>לתשלום ({totalItemsInCart})</Typography>
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DesktopCartNavbar;
