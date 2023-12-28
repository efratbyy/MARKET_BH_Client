import React from "react";
import Footer from "../footer/Footer";
import { Grid } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useLocation } from "react-router-dom";

const GeneralMessage = () => {
  const location = useLocation();
  const { state } = location;

  // Access the passed props from the state object
  const { text } = state || {};

  return (
    <>
      <Navbar showSearchBar={false} showDataFilter={false} />
      <Grid
        container
        sx={{
          backgroundImage: 'url("assets/images/orderConfirmation.png")',
          backgroundSize: "cover",
          minHeight: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          alignContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "40px",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sx={{ marginBottom: "20px", marginRight: "80px" }}>
          {text}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default GeneralMessage;
