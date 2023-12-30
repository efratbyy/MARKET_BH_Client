import React, { useCallback, useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts.js";
import {
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductDialog from "./ProductDialog";
import { useUser } from "../providers/UserProvider";
import { useCartProvider } from "../providers/CartProvider";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";

type Props = {
  product: ProductInterface;
  setBarcodeAndOpenDialog: (barcode: string) => void;
};

const ProductCard: React.FC<Props> = ({ product, setBarcodeAndOpenDialog }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isDialogOpen, setDialog] = useState(false);

  const { title, barcode, brand, image, price, details, inventory } = product;
  const { user } = useUser();
  const { cart, updateCartProvider } = useCartProvider();

  const navigate = useNavigate();

  const openDialog = () => {
    setDialog(true);
  };

  const getAmountInCart = (barcode: String) => {
    const findProductInCart = cart?.find(
      (product) => product.barcode === barcode
    );
    return findProductInCart?.amount || 0;
  };

  const handleAddToCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      updateCartProvider(userId, barcode, amount);
      setTotalAmount(totalAmount + 1);
    },
    [totalAmount]
  );

  const handleRemoveFromCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      if (totalAmount > 0) {
        updateCartProvider(userId, barcode, -1 * amount);
        setTotalAmount(Number(totalAmount) - amount);
      }
    },
    [totalAmount]
  );

  useEffect(() => {
    setTotalAmount(getAmountInCart(barcode));
  }, [cart]);

  return (
    <>
      <Card
        sx={{
          display: "flax",
          flexDirection: "column",
          minHeight: "100%",
          position: "relative",
        }}
        square
      >
        <CardActionArea
          sx={{ padding: "0%", height: "150px" }}
          onClick={() => {
            openDialog();
          }}
        >
          <CardMedia
            component="img"
            image={image.url}
            alt={image.alt}
            sx={{
              mx: "auto",
              display: "flex",
              flex: 1,
              objectFit: "fill",
              width: "40%",
              marginTop: 2,
            }}
          />
        </CardActionArea>
        <CardContent
          sx={{
            marginBottom: "50px",
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: "auto", paddingRight: "10%" }}
          >
            {brand}
            {details && details.weightTopDisplay !== 0
              ? " | " +
                details.weightTopDisplay +
                " " +
                details.weightUnitTopDisplay
              : ""}
          </Typography>

          <Typography
            sx={{
              marginTop: "auto",
              paddingRight: "10%",
              color: "textSecondary",
              height: "50px",
              marginBottom: "20px",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              marginTop: "auto",
              paddingRight: "10%",
              color: "textSecondary",
            }}
          >
            ₪{price.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              marginTop: "auto",
              paddingRight: "10%",
              fontWeight: "lighter",
              marginBottom: "15px",
            }}
          >
            {details && details.weight
              ? "₪" +
                (price / (details?.weight / details.divideBy)).toFixed(2) +
                " ל " +
                details?.divideBy +
                " " +
                details.weightUnit
              : ""}
          </Typography>
          {user && user.isAdmin && (
            <Grid
              container
              justifyContent="space-between"
              sx={{
                marginTop: "auto",
              }}
            >
              <Button
                sx={{ color: "rgba(0, 0, 0, 0.87)", padding: 0, margin: 0 }}
                onClick={() => {
                  navigate(ROUTES.EDIT_PRODUCT + `?barcode=${barcode}`);
                }}
              >
                <EditTwoToneIcon />
              </Button>

              <Button
                sx={{ color: "rgba(0, 0, 0, 0.87)", padding: 0, margin: 0 }}
                onClick={() => {
                  setBarcodeAndOpenDialog(barcode);
                }}
              >
                <DeleteTwoToneIcon />
              </Button>
            </Grid>
          )}
        </CardContent>

        {user && (
          <Grid
            container
            sx={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              pb: "3%",
              position: "absolute",
              bottom: 0,
              boxShadow: "none !important",
            }}
          >
            {inventory !== 0 && (
              <ButtonGroup
                orientation="horizontal"
                variant="contained"
                sx={{
                  width: "90%",
                  boxShadow: "none !important",
                }}
              >
                <Button
                  onClick={() => handleAddToCart(user?._id, barcode, 1)}
                  sx={{
                    borderTopRightRadius: "10px !important",
                    borderBottomRightRadius: "10px !important",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    borderRadius: "0px",
                    width: "40%",
                    backgroundColor: "#5b9822",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                    "&:active": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  <AddIcon />
                </Button>

                <Button sx={{ width: "40%" }} disabled>
                  <Typography variant="body1">{String(totalAmount)}</Typography>
                </Button>

                <Button
                  onClick={() => handleRemoveFromCart(user?._id, barcode, 1)}
                  sx={{
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    borderTopLeftRadius: "10px !important",
                    borderBottomLeftRadius: "10px !important",
                    borderRadius: "0px",
                    width: "40%",
                    backgroundColor: "#5b9822",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                    "&:active": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  <RemoveIcon />
                </Button>
              </ButtonGroup>
            )}
            {inventory === 0 && (
              <Grid
                sx={{ color: "red", paddingBottom: "7px", fontSize: "20px" }}
              >
                אזל המלאי!
              </Grid>
            )}
          </Grid>
        )}

        <ProductDialog
          isDialogOpen={isDialogOpen}
          product={product}
          onClose={() => setDialog(false)}
          handleRemoveFromCart={handleRemoveFromCart}
          totalAmount={totalAmount}
          handleAddToCart={handleAddToCart}
        />
      </Card>
    </>
  );
};

export default ProductCard;
