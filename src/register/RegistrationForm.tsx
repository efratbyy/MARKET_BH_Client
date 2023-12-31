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
  InputAdornment,
  IconButton,
} from "@mui/material";
import Joi from "joi";
import ReCAPTCHA from "react-google-recaptcha";
import registerSchema from "../models/joiValidation/registerJoiValidation";
import { UserInterface } from "../models/interfaces/interfaces.ts";
import { registrationApi } from "../apiService/userApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useSnack } from "../providers/SnackbarProvider";
import {
  getUserFromLocalStorage,
  saveUserToken,
} from "../services/LocalStorageService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../providers/UserProvider";
import BackgroundImageLayout from "../layout/BackgroundImageLayout";

const RegistrationForm: React.FC = () => {
  const snack = useSnack();
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

  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null); // Store recaptcha value
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setUser } = useUser();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const allFieldsValid =
    Object.keys(errors).length === 0 &&
    recaptchaValue &&
    Object.values(formData)
      .map((value) => String(value).trim() !== "")
      .every(Boolean);

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const validateForm = (formData: UserInterface) => {
    const validationResult = Joi.object(registerSchema).validate(formData, {
      abortEarly: false, // indicates that all validation errors should be collected rather than stopping at the first error
    });

    const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
    if (validationResult.error) {
      validationResult.error.details.forEach((error: any) => {
        if (error.context.value) newErrors[error.path[0]] = error.message;
      });
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form data
    const validationResult = Joi.object(registerSchema).validate(formData, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
      validationResult.error.details.forEach((error: any) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return;
    }
    // Validate reCAPTCHA
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }
    // Clear any previous errors
    setErrors({});

    try {
      const token = await registrationApi(formData);

      saveUserToken(token); // Save token to local storage
      setToken(token); // update state of the token (UserProvider)
      const decryptedUser = getUserFromLocalStorage();
      setUser(decryptedUser); // update state of the user (UserProvider)

      snack("success", "משתמש חדש נוצר בהצלחה!");
      navigate(`${ROUTES.ROOT}`, { replace: true });
    } catch (error) {
      snack("error", error);
    }
  };

  return (
    <>
      <BackgroundImageLayout backgroundImage="/assets/images/register.png">
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "white" }}
          >
            הרשמה
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
                    borderColor: "rgba(0, 0, 0, 1)",
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
                    borderColor: "rgba(0, 0, 0, 1)",
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
                    borderColor: "rgba(0, 0, 0, 1)",
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
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              label="סיסמא"
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
                    borderColor: "rgba(0, 0, 0, 1)",
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
                    borderColor: "rgba(0, 0, 0, 1)",
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
                    borderColor: "rgba(0, 0, 0, 1)",
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
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />

            {/* Add the reCAPTCHA component */}
            <ReCAPTCHA
              sitekey="6LfT2HgnAAAAADAVSv1TUHbhkZvOz94uM-30XM-L"
              onChange={(value: any) => setRecaptchaValue(value)}
              style={{ margin: "10px" }}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!allFieldsValid}
              sx={{ margin: "10px" }}
            >
              הרשם
            </Button>
          </form>
        </Container>
      </BackgroundImageLayout>
    </>
  );
};

export default RegistrationForm;
