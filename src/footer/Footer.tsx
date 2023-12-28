import React from "react";
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";
import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Grid sx={{ display: { md: "none" } }}>
        <MobileFooter />
      </Grid>
      <Grid sx={{ display: { xs: "none", md: "block" } }}>
        <DesktopFooter />
      </Grid>
    </>
  );
};

export default Footer;
