import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CardMedia, Grid, Typography } from "@mui/material";
import { useUser } from "../providers/UserProvider";
import SvgSugar from "./SvgSugar";
import SvgSodium from "./SvgSodium";
import SvgSaturatedFat from "./SvgSaturatedFat";
import SvgSupervisedProducts from "./SvgSupervisedProducts";
import GreenMark from "./GreenMark";

type Props = {
  isDialogOpen: boolean;
  product: ProductInterface;
  onClose: () => void;
  handleRemoveFromCart: (
    userId: string,
    barcode: string,
    amount: number
  ) => void;
  totalAmount: number;
  handleAddToCart: (userId: string, barcode: string, amount: number) => void;
};

const ProductDialog: FC<Props> = ({
  product,
  isDialogOpen,
  onClose,
  handleRemoveFromCart,
  totalAmount,
  handleAddToCart,
}) => {
  const { user } = useUser();
  const { title, barcode, brand, image, price, details, inventory } = product;

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontSize: "30px" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {brand}
        </DialogContentText>
        <DialogContentText
          sx={{ fontSize: "170%", color: "black" }}
          id="alert-dialog-description"
        >
          ₪{price.toFixed(2)}
        </DialogContentText>
        <CardMedia
          component="img"
          image={image.url}
          alt={image.alt}
          sx={{
            flex: 1,
            objectFit: "cover",
            marginTop: "auto",
            width: "100%",
          }}
        />
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "17px" }}
        >
          <span style={{ fontWeight: "bold", color: "black" }}>ברקוד</span>:{" "}
          {barcode}
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "17px" }}
        >
          <span style={{ fontWeight: "bold", color: "black" }}>רכיבים</span>:{" "}
          {details.ingredients}
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "17px" }}
        >
          <span style={{ fontWeight: "bold", color: "black" }}>תכולה</span>:{" "}
          {details.content}
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "17px" }}
        >
          <span style={{ fontWeight: "bold", color: "black" }}>ארץ ייצור</span>:{" "}
          {details.manufacturingCountry}
        </DialogContentText>
        <Grid sx={{ margin: "20px" }}>
          {details.isSodium === true && <SvgSodium />}
          {details.isSugar === true && <SvgSugar />}
          {details.isSaturatedFat === true && <SvgSaturatedFat />}
          {details.isSupervised === true && <SvgSupervisedProducts />}
          {details.isGreenMark === true && <GreenMark />}
        </Grid>
      </DialogContent>
      {user && inventory !== 0 && (
        <DialogActions>
          <RemoveIcon
            onClick={() => handleRemoveFromCart(user!._id, barcode, 1)}
            sx={{
              color: totalAmount > 0 ? "#800080" : "gray",
              marginRight: "10%",
              fontSize: "40px",
            }}
          />
          <Typography variant="h4" sx={{ color: "black" }}>
            {String(totalAmount)}
          </Typography>
          <AddIcon
            onClick={() => handleAddToCart(user!._id, barcode, 1)}
            sx={{ color: "#800080", marginLeft: "10%", fontSize: "40px" }}
          />
        </DialogActions>
      )}
      {inventory === 0 && (
        <Grid
          sx={{
            color: "red",
            paddingBottom: "15px",
            fontSize: "20px",
            paddingRight: "15px",
          }}
        >
          אזל המלאי!
        </Grid>
      )}
    </Dialog>
  );
};

export default ProductDialog;
