import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCartProvider } from "../providers/CartProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUser } from "../providers/UserProvider";
import DesktopCartNavbar from "../navbar/DesktopCartNavbar";
import ShoppingCartBreadCrumb from "./ShoppingCartBreadCrumb";
import { getOutOfStockProductsApi } from "../apiService/cartApiService";
import GeneralDialog from "../generic components/GeneralDialog";

const ShoppingCartMobilePage = () => {
  const { cart, updateCartProvider, updateCartNoteProvider } =
    useCartProvider();
  const navigate = useNavigate();
  const { user } = useUser();

  const [totalItemsInCart, setTotalItemsInCart] = React.useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [outOfStockProducts, setOutOfStockProducts] = useState<
    ProductInterface[]
  >([]);
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetOutOfStockProducts = useCallback(async () => {
    try {
      const outOfStockProductsRes = await getOutOfStockProductsApi(
        user?._id || ""
      );

      if (outOfStockProductsRes.length > 0) {
        setOutOfStockProducts(outOfStockProductsRes);
      } else {
        setOutOfStockProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    barcode: string
  ): void => {
    if (user)
      updateCartNoteProvider(user?._id, barcode, event.target.value.toString());
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query != null) {
      setQuery(query);
    } else {
      setQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (cart) {
      setTotalItemsInCart(
        cart.reduce((number, item) => number + item.amount, 0)
      );
      handleGetOutOfStockProducts();
    }
  }, [cart]);

  const dialogTable = (
    <Table sx={{ textAlign: "right" }}>
      <TableHead>
        <TableRow>
          <TableCell align="right">שם המוצר</TableCell>
          <TableCell align="right">כמות שיש להסיר</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {outOfStockProducts?.map((product: ProductInterface, index) => (
          <TableRow key={product.barcode}>
            <TableCell align="right">{product.title}</TableCell>
            <TableCell align="right">
              {(cart?.find(
                (cartProduct) => cartProduct.barcode === product.barcode
              )?.amount || 0) - product.inventory}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Navbar showSearchBar={false} showDataFilter={false} />
      <Grid
        container
        sx={{
          backgroundImage: 'url("./assets/images/vegetables.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
          position: "relative",
        }}
      >
        <Grid item xs={12}>
          <Paper
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "white", paddingRight: "40px" }}
            >
              סל קניות | {totalItemsInCart} פריטים
            </Typography>
          </Paper>
        </Grid>
        <Grid item sx={{ position: "absolute", bottom: "0" }}>
          <DesktopCartNavbar backgroundColor={"none"} />
        </Grid>
      </Grid>
      <ShoppingCartBreadCrumb />
      {/* <ShoppingCart /> */}
      <Box sx={{ height: "60%" }}>
        {cart
          ?.filter((item) => item.title.includes(query))
          .map((item: CartProductInterface, index) => (
            <div key={item.barcode}>
              <Grid
                container
                sx={{ marginBottom: "3%", marginTop: "3%", fontSize: "90%" }}
              >
                <Grid
                  item
                  xs={2}
                  md={2}
                  container
                  alignContent="center"
                  alignItems="center"
                  justifyContent="center"
                  padding={"3%"}
                >
                  <ButtonGroup
                    orientation="vertical"
                    variant="contained"
                    sx={{
                      width: "100%",
                      boxShadow: 0,
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "#5b9822",
                        minWidth: "0px !important",
                        width: "50px",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                        "&:active": {
                          backgroundColor: "#333",
                        },
                      }}
                      onClick={() =>
                        updateCartProvider(user!._id, item.barcode, 1)
                      }
                    >
                      <AddIcon />
                    </Button>

                    <Button
                      sx={{
                        minWidth: "0px !important",
                        width: "50px",
                      }}
                      disabled
                    >
                      <Typography variant="body1">{item.amount}</Typography>
                    </Button>

                    <Button
                      sx={{
                        backgroundColor: "#5b9822",
                        minWidth: "0px !important",
                        width: "50px",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                        "&:active": {
                          backgroundColor: "#333",
                        },
                      }}
                      onClick={() =>
                        updateCartProvider(user!._id, item.barcode, -1)
                      }
                    >
                      <RemoveIcon />
                    </Button>
                  </ButtonGroup>
                </Grid>

                <Grid
                  item
                  xs={2}
                  md={2}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img
                      src={item.image.url}
                      alt={item.title}
                      style={{
                        maxWidth: "100%",
                        width: "85%",
                        height: "auto",
                      }}
                    />
                  </div>
                </Grid>

                <Grid item xs={4} md={4}>
                  <div style={{ marginTop: "10%" }}>{item.brand}</div>
                  <div style={{ marginTop: "10%" }}>{item.title}</div>
                  <div style={{ marginTop: "10%" }}>
                    <Input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleNoteChange(e, item.barcode)
                      } // Handle input changes
                      value={item.note}
                      placeholder="הוסף הערה:"
                      sx={{
                        border: "1px solid rgba(0,0,0,0.3)",
                        borderRadius: "2px",
                      }}
                    ></Input>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={2}
                  md={2}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ₪{item.price.toFixed(2)}
                </Grid>
                <Grid
                  item
                  xs={2}
                  md={2}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() =>
                      updateCartProvider(
                        user!._id,
                        item.barcode,
                        item.amount * -1
                      )
                    }
                  >
                    <DeleteIcon sx={{ color: "#ce0a0a" }} />
                  </Button>
                </Grid>
              </Grid>
              {index < cart.length - 1 && <Divider variant="middle" />}
            </div>
          ))}
      </Box>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            marginTop: "auto",
          }}
        >
          {cart && cart?.length !== 0 && (
            <Paper sx={{ marginTop: "40px" }}>
              <Button
                onClick={() => {
                  outOfStockProducts.length > 0
                    ? setOpen(true)
                    : navigate(ROUTES.CHECKOUT);
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#5b9822",
                  color: "white",
                  padding: "10px",
                  width: "100%",
                  marginBottom: "30px",
                  "&:hover": {
                    backgroundColor: "#654321",
                  },
                  "&:active": {
                    backgroundColor: "#654321",
                  },
                }}
              >
                <Typography>לתשלום ({totalItemsInCart})</Typography>
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>

      <GeneralDialog
        title={" ישנם בעגלה מוצרים שאזלו במלאי. אנא הסר את המוצרים הבאים:"}
        text={dialogTable}
        open={open}
        showCancelButton={false}
        handleConfirm={handleClose}
      />
      <Footer />
    </>
  );
};

export default ShoppingCartMobilePage;
