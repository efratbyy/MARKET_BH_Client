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
  Container,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Joi from "joi";
import registerSchema from "../models/joiValidation/registerJoiValidation";
import { UserInterface } from "../models/interfaces/interfaces.ts";
import {
  editUserApi,
  getUserByEmailApi,
  getUserByIdApi,
} from "../apiService/userApiService";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useSnack } from "../providers/SnackbarProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../providers/UserProvider";
import { getUserFromLocalStorage } from "../services/LocalStorageService";
import BackgroundImageLayout from "../layout/BackgroundImageLayout";

const EditUserForm = () => {
  const navigate = useNavigate();
  const snack = useSnack();
  const { user } = useUser();

  // Inject prop from navigate from other component
  const location = useLocation();
  const { state } = location;
  const { userEmail } = state || {};

  const [allFieldsValid, setAllFieldsValid] = useState<Boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [formData, setFormData] = useState<UserInterface>({
    first: "",
    last: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: 0,
    isAdmin: false,
  });

  const handleGetUser = useCallback(async () => {
    try {
      let userFromDB = undefined;
      if (!userEmail)
        userFromDB = await getUserByIdApi(getUserFromLocalStorage()?._id || "");
      else userFromDB = await getUserByEmailApi(userEmail);

      return Promise.resolve(userFromDB);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleChangeNewPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      // validate new password
      const validationResult = Joi.string()
        .pattern(
          /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
        )
        .rule({
          message:
            'user "password" must be at least 8 characters long and contain an uppercase letter, a lowercase letter, at least 4 numbers and one of the following characters !@#$%^&*-',
        })
        .validate(value);

      // Handle other fields
      setNewPassword(value);

      if (validationResult.error) {
        setNewPasswordError(validationResult.error.details[0].message);
      } else setNewPasswordError("");
    },
    []
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Handle other fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const validateForm = (formData: UserInterface) => {
    const validationResult = Joi.object(registerSchema).validate(formData, {
      allowUnknown: true,
    });
    const newErrors: { [key: string]: string } = {}; // Define the type for newErrors

    if (validationResult.error) {
      validationResult.error.details.forEach((error: any) => {
        newErrors[error.path[0]] = error.message; // If a specific field has error value it adds the error message to the newErrors object using the field name as the key and the error message as the value
      });
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This line prevents the default form submission behavior, which typically involves navigating to a new page or triggering a full page reload. By calling preventDefault(), the developer can take control over the form submission process and handle it programmatically.

    try {
      const updatedUser = await editUserApi(formData, newPassword);
      if (updatedUser) {
        snack("success", "המשתמש עודכן בהצלחה!");
        navigate(`${ROUTES.ROOT}`, { replace: true }); // { replace: true } - This means that if the user goes back in their browser, they won't revisit the form page
      } else snack("error", "חלה תקלה בעדכון המשתמש!");
    } catch (error) {
      snack("error", error);
    }
  };

  useEffect(() => {
    setAllFieldsValid(
      // update the state variable allFieldsValid based on the following conditions:

      (newPassword === "" || (newPassword !== "" && newPasswordError === "")) && // - Checks if the newPassword is an empty string or if it's not empty and there are no errors
        Object.keys(errors).length === 0
    );
  }, [formData, errors, newPassword]);

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  useEffect(() => {
    handleGetUser().then((data) => {
      if (data) {
        setFormData(data);
      }
    });
  }, []);

  if (!user) navigate(ROUTES.ROOT);

  return (
    user && (
      <>
        <BackgroundImageLayout backgroundImage="/assets/images/edit_user.png">
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "white" }}
            >
              עדכון פרטים אישיים
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="first"
                label="שם פרטי"
                color="success"
                fullWidth
                margin="normal"
                value={formData.first}
                onChange={handleChange}
                error={Boolean(errors.first)}
                helperText={errors.first}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="text"
                name="last"
                label="שם משפחה"
                color="success"
                fullWidth
                margin="normal"
                value={formData.last}
                onChange={handleChange}
                error={Boolean(errors.last)}
                helperText={errors.last}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="phone"
                name="phone"
                label="טלפון"
                color="success"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="email"
                name="email"
                label="מייל"
                color="success"
                fullWidth
                disabled
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              {!userEmail && (
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="סיסמא נוכחית"
                  color="success"
                  fullWidth
                  margin="normal"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                      },
                    },
                  }}
                  InputProps={{
                    dir: "ltr",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {!userEmail && (
                <TextField
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  label="סיסמא חדשה"
                  color="success"
                  fullWidth
                  margin="normal"
                  value={newPassword}
                  onChange={handleChangeNewPassword}
                  error={Boolean(newPasswordError)}
                  helperText={newPasswordError}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                      },
                    },
                  }}
                  InputProps={{
                    dir: "ltr",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleNewPasswordVisibility}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <TextField
                type="text"
                name="city"
                label="עיר"
                color="success"
                fullWidth
                margin="normal"
                value={formData.city}
                onChange={handleChange}
                error={Boolean(errors.city)}
                helperText={errors.city}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="street"
                name="street"
                label="רחוב"
                color="success"
                fullWidth
                margin="normal"
                value={formData.street}
                onChange={handleChange}
                error={Boolean(errors.street)}
                helperText={errors.street}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="houseNumber"
                name="houseNumber"
                label="מספר בית"
                color="success"
                fullWidth
                margin="normal"
                value={formData.houseNumber !== 0 ? formData.houseNumber : ""}
                onChange={handleChange}
                error={Boolean(errors.houseNumber)}
                helperText={errors.houseNumber}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              {userEmail && (
                <Grid item>
                  <FormControlLabel
                    name="isAdmin"
                    control={
                      <Checkbox
                        checked={formData.isAdmin}
                        color="primary"
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            isAdmin: !prevData.isAdmin,
                          }));
                        }}
                      />
                    }
                    label="מנהל"
                  />
                </Grid>
              )}
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={!allFieldsValid}
                sx={{ margin: "10px" }}
              >
                עדכון
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
            </form>
          </Container>
        </BackgroundImageLayout>
      </>
    )
  );
};

export default EditUserForm;
