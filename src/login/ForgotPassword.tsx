import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import Joi from "joi";
import { createResetPasswordKeyApi } from "../apiService/userApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import Navbar from "../navbar/Navbar";
import { useSnack } from "../providers/SnackbarProvider";
import Footer from "../footer/Footer";
import { emailResetPasswordApi } from "../apiService/emailApiService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const snack = useSnack();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userEmailError, setUserEmailError] = useState<string>("");

  const handleChangeEmail = useCallback(
    (newEmail: ChangeEvent<HTMLInputElement>) => {
      const { value } = newEmail.target;

      // validate userEmail
      const validationResult = Joi.string()
        .pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .message('user "mail" must be a valid mail')
        .required()
        .validate(value);

      setUserEmail(value);

      if (validationResult.error) {
        setUserEmailError(validationResult.error.details[0].message);
      } else setUserEmailError("");
    },
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await createResetPasswordKeyApi(userEmail);
      //check if forgotPasswordKeyCreatedTime exists in updatedUser. If it does, it creates a Date object using that value; otherwise, it creates a Date object with the current date and time
      const expireDate = updatedUser.forgotPasswordKeyCreatedTime
        ? new Date(updatedUser.forgotPasswordKeyCreatedTime)
        : new Date();

      expireDate?.setHours(expireDate?.getHours() + 1); //setting the expiration date by adding one hour to the current date and time
      await emailResetPasswordApi(
        updatedUser.first,
        updatedUser.email,
        expireDate // Check if expireDate exists. otherwise, it passes an empty string
          ? new Intl.DateTimeFormat(
              //determines the format of the expiration date
              "en-GB",
              {
                timeZone: "Asia/Jerusalem",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false, // Use 24-hour format
              }
            ).format(expireDate)
          : "",
        updatedUser.forgotPasswordKey ? updatedUser.forgotPasswordKey : "" //check if forgotPasswordKey exists in updatedUser. If it does, it He puts the value of updatedUser.forgotPasswordKey into it; otherwise, it passes an empty string
      );

      navigate(`${ROUTES.GENERAL_MESSAGE}`, {
        replace: true,
        state: {
          // Pass the props here (more props can be added)
          text: "מייל נשלח בהצלחה!",
        },
      }); // { replace: true } - This means that if the user goes back in their browser, they won't revisit the form page
    } catch (error) {
      snack("error", error);
    }
  };

  return (
    <>
      <Navbar showSearchBar={false} />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative !important",
          backgroundColor: "#fff",
          zIndex: 1,
          padding: "16px !important",
          overflowY: "scroll",
          height: "100vh",
          backgroundAttachment: "fixed",
          backgroundImage: "url(/assets/images/register.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid item>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "black" }}
          >
            איפוס סיסמה
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid item>
            <TextField
              type="email"
              name="email"
              label="מייל"
              color="success"
              margin="normal"
              value={userEmail}
              onChange={handleChangeEmail}
              error={Boolean(userEmailError)}
              helperText={userEmailError}
              sx={{
                justifyItems: "center",
                justifyContent: "center",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={userEmailError !== "" || userEmail === ""}
              sx={{ margin: "10px" }}
            >
              שלח מייל
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ margin: "10px" }}
              onClick={() => {
                navigate(ROUTES.ROOT);
              }}
            >
              ביטול
            </Button>
          </Grid>
        </form>
      </Grid>
      <Footer />
    </>
  );
};

export default ForgotPassword;
