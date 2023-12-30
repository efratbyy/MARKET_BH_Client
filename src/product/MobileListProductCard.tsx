import React, { useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import { Box, ButtonGroup, Divider, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useUser } from "../providers/UserProvider";
import { useCartProvider } from "../providers/CartProvider";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";
import SvgSodium from "./SvgSodium";
import SvgSugar from "./SvgSugar";
import SvgSaturatedFat from "./SvgSaturatedFat";
import SvgSupervisedProducts from "./SvgSupervisedProducts";
import GreenMark from "./GreenMark";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

type Props = {
  product: ProductInterface;
  setBarcodeAndOpenDialog: (barcode: string) => void;
};

const MobileListProductCard: React.FC<Props> = ({
  product,
  setBarcodeAndOpenDialog,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { title, barcode, brand, image, price, details, inventory } = product;
  const { user } = useUser();
  const { cart, updateCartProvider } = useCartProvider();

  const navigate = useNavigate();

  const getAmountInCart = (barcode: String) => {
    const findProductInCart = cart?.find(
      (product) => product.barcode === barcode
    );
    return findProductInCart?.amount || 0;
  };

  useEffect(() => {
    setTotalAmount(getAmountInCart(barcode));
  }, [cart]);

  return (
    <>
      <Divider variant="middle" />

      <Box>
        <div key={barcode}>
          <Grid container sx={{ fontSize: "90%" }}>
            <Divider orientation="vertical" flexItem />

            {/* Left inner Card */}
            {/* Product Image */}
            <Grid
              container
              item
              xs={2.5}
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px",
              }}
            >
              <img
                src={image.url}
                alt={title}
                style={{
                  maxWidth: "100%",
                  width: "200px",
                  height: "80px",
                }}
              />
            </Grid>

            <Grid sx={{ padding: "15px" }} item xs={4.45}>
              <Grid container item xs={12} justifyContent={"space-between"}>
                {/* Product Name */}
                <Grid item sx={{ fontSize: "17px" }} xs={12}>
                  {title}
                </Grid>
              </Grid>
              {/* Product Amount */}
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: "auto" }}
                >
                  {details && details.weightTopDisplay !== 0
                    ? details.weightTopDisplay +
                      " " +
                      details.weightUnitTopDisplay
                    : ""}
                </Typography>
              </Grid>
              {/* Product Barcode, Ingredients, Content, ManufacturingCountry */}
              <Grid item xs={12}>
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>ברקוד:</span> {barcode}
                </Typography>
              </Grid>
            </Grid>

            {/* Product Stickers */}
            <Grid item xs={1.5} sx={{ textAlign: "center" }}>
              {/* Product Brand */}
              <Grid
                item
                xs={12}
                sx={{
                  fontSize: "17px",
                  textAlign: "center",
                  paddingLeft: "10%",
                  paddingBottom: "5px",
                }}
              >
                {brand}
              </Grid>
              {details.isSodium === true && (
                <SvgSodium width="35" height="35" />
              )}
              {details.isSugar === true && <SvgSugar width="35" height="35" />}
              {details.isSaturatedFat === true && (
                <SvgSaturatedFat width="35" height="35" />
              )}
              {details.isSupervised === true && (
                <SvgSupervisedProducts width="35" height="35" />
              )}
              {details.isGreenMark === true && (
                <GreenMark width="35" height="35" />
              )}
            </Grid>

            {/* Left inner Card */}
            {/* Price, Price per... and Add/Remove from Cart */}
            <Grid
              container
              item
              xs={3.5}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {/* Product Price */}
              <Grid
                item
                xs={12}
                sx={{
                  paddingRight: "10%",
                  fontSize: "17px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                ₪{price.toFixed(2)}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    marginTop: "auto",
                    fontWeight: "lighter",
                    textAlign: "center",
                  }}
                >
                  {details && details.weight
                    ? "₪" +
                      (price / (details?.weight / details.divideBy)).toFixed(
                        2
                      ) +
                      " ל " +
                      details?.weightUnit
                    : ""}
                </Typography>
              </Grid>

              {user && user.isAdmin && (
                <Grid
                  container
                  justifyContent="space-between"
                  sx={{
                    marginTop: "auto",
                  }}
                >
                  <Grid item xs={6}>
                    <Button
                      sx={{
                        color: "rgba(0, 0, 0, 0.87)",
                        padding: 0,
                        margin: 0,
                      }}
                      onClick={() => {
                        navigate(ROUTES.EDIT_PRODUCT + `?barcode=${barcode}`);
                      }}
                    >
                      <ModeEditTwoToneIcon />
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      sx={{
                        color: "rgba(0, 0, 0, 0.87)",
                        padding: 0,
                        margin: 0,
                      }}
                      onClick={() => {
                        setBarcodeAndOpenDialog(barcode);
                      }}
                    >
                      <DeleteTwoToneIcon />
                    </Button>
                  </Grid>
                </Grid>
              )}

              {user && (
                <Grid item xs={12} padding={"10px"} textAlign={"center"}>
                  {/* Add and Remove from cart */}
                  {inventory !== 0 && (
                    <ButtonGroup
                      orientation="horizontal"
                      variant="contained"
                      fullWidth
                      sx={{
                        boxShadow: 0,
                      }}
                    >
                      <Button
                        onClick={() =>
                          updateCartProvider(user!._id, barcode, 1)
                        }
                        sx={{
                          borderTopRightRadius: "10px !important",
                          borderBottomRightRadius: "10px !important",
                          borderTopLeftRadius: "0px",
                          borderBottomLeftRadius: "0px",
                          backgroundColor: "#5b9822",
                          minWidth: "0px !important",
                          height: "30px",
                          "&:hover": {
                            backgroundColor: "#333",
                          },
                          "&:active": {
                            backgroundColor: "#333",
                          },
                        }}
                      >
                        <AddIcon sx={{ fontSize: "large" }} />
                      </Button>

                      <Button
                        disabled
                        sx={{
                          minWidth: "0px !important",
                          height: "30px",
                          borderRadius: "0px",
                        }}
                      >
                        <Typography variant="body1">
                          {String(totalAmount)}
                        </Typography>
                      </Button>

                      <Button
                        onClick={() =>
                          updateCartProvider(user!._id, barcode, -1)
                        }
                        sx={{
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                          borderTopLeftRadius: "10px !important",
                          borderBottomLeftRadius: "10px !important",
                          backgroundColor: "#5b9822",
                          minWidth: "0px !important",
                          height: "30px",
                          "&:hover": {
                            backgroundColor: "#333",
                          },
                          "&:active": {
                            backgroundColor: "#333",
                          },
                        }}
                      >
                        <RemoveIcon sx={{ fontSize: "large" }} />
                      </Button>
                    </ButtonGroup>
                  )}
                  {inventory === 0 && (
                    <Grid
                      sx={{
                        color: "red",
                        paddingBottom: "7px",
                        fontSize: "20px",
                      }}
                    >
                      אזל המלאי!
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
            <Divider orientation="vertical" flexItem />
          </Grid>

          <Divider variant="middle" />
        </div>
      </Box>
    </>
  );
};

export default MobileListProductCard;
