import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5">
            Opops...The requested URL was not found on this server
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(ROUTES.ROOT)}
          >
            Click here to go back to home page...
          </Button>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center">
          <img
            width="100%"
            src="/assets/images/broken-robot.png"
            alt="broken-robot"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
