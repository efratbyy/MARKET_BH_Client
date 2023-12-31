import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
} from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Joi from "joi";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useSnack } from "../providers/SnackbarProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  getUserByForgotPasswordKeyApi,
  updatePasswordApi,
} from "../apiService/userApiService";
import { UserInterface } from "../models/interfaces/interfaces.ts";
import BackgroundImageLayout from "../layout/BackgroundImageLayout";

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const [verifyPassword, setVerifyPassword] = useState("");
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const [userFromToken, setUserFromToken] = useState<UserInterface>();

  const navigate = useNavigate();
  const snack = useSnack();

  const { resetPasswordToken } = useParams();

  const getUserByResetToken = useCallback(async () => {
    try {
      const userFromDB = await getUserByForgotPasswordKeyApi(
        resetPasswordToken || ""
      );

      return Promise.resolve(userFromDB);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdatePassword = useCallback(async () => {
    try {
      const updatedUser = updatePasswordApi(resetPasswordToken || "", password);
      return Promise.resolve(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }, [password]);

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      // validate userEmail
      const validationResult = Joi.string()
        .ruleset.regex(
          /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
        )
        .rule({
          message:
            'user "password" must be at least 8 characters long and contain an uppercase letter, a lowercase letter, at least 4 numbers and one of the following characters !@#$%^&*-',
        })
        .required()
        .validate(value);

      setPassword(value);

      if (validationResult.error) {
        setPasswordError(validationResult.error.details[0].message);
      } else setPasswordError("");
    },
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleUpdatePassword().then((updatedUser) => {
        navigate(`${ROUTES.GENERAL_MESSAGE}`, {
          replace: true,
          state: {
            // Pass the props here (more props can be added)
            text: "הסיסמה עודכנה בהצלחה! יש לבצע כניסה...",
          },
        });
      });
    } catch (error) {
      snack("error", error);
    }
  };

  useEffect(() => {
    getUserByResetToken()
      .then((user) => {
        setUserFromToken(user);

        if (!user) navigate(ROUTES.ROOT);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    userFromToken && (
      <>
        <BackgroundImageLayout backgroundImage="/assets/images/register.png">
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative !important",
              zIndex: 1,
            }}
          >
            <Grid
              item
              sx={{ textAlign: "right", alignItems: "right !important" }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "black",
                  textAlign: "right",
                  alignItems: "right !important",
                }}
              >
                היי {userFromToken?.first + " " + userFromToken?.last},
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: "black" }}
              >
                אנא הזן סיסמה חדשה
              </Typography>
            </Grid>

            <form onSubmit={handleSubmit}>
              <Grid item>
                <TextField
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  name="password"
                  label="סיסמא"
                  color="success"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={handleChangePassword}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  sx={{
                    backgroundColor: "#999966",
                    width: "300px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 1)",
                      },
                    },
                  }}
                  InputProps={{
                    dir: "ltr",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  type={showVerifyPassword ? "text" : "password"}
                  variant="outlined"
                  name="verifyPassword"
                  label="וידוא סיסמה"
                  color="success"
                  fullWidth
                  margin="normal"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  sx={{
                    backgroundColor: "#999966",
                    width: "300px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 1)",
                      },
                    },
                  }}
                  InputProps={{
                    dir: "ltr",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowVerifyPassword(!showVerifyPassword);
                          }}
                          edge="end"
                        >
                          {showVerifyPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={
                      passwordError !== "" ||
                      password === "" ||
                      verifyPassword === "" ||
                      password !== verifyPassword
                    }
                    sx={{ margin: "10px" }}
                  >
                    עדכן סיסמה
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
              </Grid>
            </form>
          </Grid>
        </BackgroundImageLayout>
      </>
    )
  );
};

export default CreateNewPassword;
