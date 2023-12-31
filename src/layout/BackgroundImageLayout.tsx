import React from "react";
import { Grid } from "@mui/material";

type Props = {
  children: JSX.Element[] | JSX.Element;
  backgroundImage: string;
};

const BackgroundImageLayout: React.FC<Props> = ({
  children,
  backgroundImage,
}) => {
  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          minHeight: "100vh",
          opacity: 0.3,
        }}
      ></Grid>
      <Grid
        container
        sx={{
          "@media (max-width: 899px)": {
            marginTop: "100px !important",
            marginBottom: "27px !important",
            maxWidth: "100%",
          },
          padding: 3,
          margin: "auto",
          opacity: 0.9,
          zIndex: 1,
          overflowY: "auto",
        }}
      >
        <Grid xs={12}>{children}</Grid>
      </Grid>
    </>
  );
};

export default BackgroundImageLayout;
