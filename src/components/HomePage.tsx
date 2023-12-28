import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Products from "../product/Products";
import ShoppingCart from "../cart/ShoppingCart";
import "./HomePage.css";
import { Button, Grid, Typography } from "@mui/material";
import Footer from "../footer/Footer";
import { useUser } from "../providers/UserProvider";
import CategoryNavbar from "../navbar/CategoryNavbar";
import DataFilter from "../search_filter/DataFilter";
import { useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { getTranslatedCategoryCodeApi } from "../apiService/categoriesApi";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AppsIcon from "@mui/icons-material/Apps";

const HomePage = () => {
  const [searchParams, setSearch] = useSearchParams();
  const [q, setQ] = useState("");
  const [category_code, setCategory_code] = useState("");
  const [translated_category_code, setTranslated_category_code] = useState("");
  const [productListShow, setProductListShow] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setQ(searchParams.get("q") || "");
    setCategory_code(searchParams.get("category_code") || "");
  }, [searchParams, q, category_code]);

  const handleGetTranslatedCategory = useCallback(async () => {
    try {
      //setLoading(true);
      if (category_code) {
        const translatedCategory = await getTranslatedCategoryCodeApi(
          category_code
        );
        //requestStatus(false, null, cart);
        setTranslated_category_code(translatedCategory);
      }
      return undefined;
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, [category_code, translated_category_code]);

  useEffect(() => {
    handleGetTranslatedCategory();
  }, [category_code, translated_category_code]);

  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <Grid
        container
        sx={{
          background: `url("/assets/images/vegetables.png")`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px", //
        }}
      ></Grid>
      <Grid container sx={{ marginBottom: "27px" }}>
        {/* Data Filter */}
        <Grid item sx={{ display: { xs: "none", md: "block" } }} md={2}>
          <DataFilter />
        </Grid>

        <Grid item xs={12} md={user ? 7 : 9.5}>
          <Grid
            item
            xs={12}
            display={"flex"}
            sx={{ justifyContent: "space-between", marginBottom: "5px" }}
          >
            <Grid container item xs={6}>
              {/* filter reset */}
              <Button
                style={{
                  backgroundColor: "orange",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "7px",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  setSearch("");
                }}
              >
                <CloseIcon fontSize="small" />
                אפס סינון
              </Button>

              {/* q filter reset */}
              {q !== "" && (
                <Button
                  style={{
                    backgroundColor: "orange",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "7px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    searchParams.set("q", "");
                    setSearch(searchParams);
                  }}
                >
                  <CloseIcon fontSize="small" />
                  {q}
                </Button>
              )}
              {/* categories filter reset */}
              {category_code !== "" && (
                <Button
                  style={{
                    backgroundColor: "orange",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "7px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    searchParams.set("category_code", "");
                    setSearch(searchParams);
                  }}
                >
                  <CloseIcon fontSize="small" />
                  {translated_category_code}
                </Button>
              )}
            </Grid>

            {/* products display options */}
            <Grid
              container
              item
              direction={"row-reverse"}
              xs={5}
              md={6}
              sx={{
                // display: { xs: "none", lg: "flex" },
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <Grid
                display={"flex"}
                sx={{
                  border: "1px solid #e0e4e7",
                  borderRadius: "5px",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              >
                <Button
                  style={{
                    backgroundColor:
                      productListShow === true ? "transparent" : "#0b6bb6",

                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "7px",
                    marginRight: "7px",
                    marginBottom: "7px",
                    minHeight: "30px",
                    minWidth: "40px",
                  }}
                  onClick={() => setProductListShow(false)}
                >
                  <AppsIcon />
                </Button>

                <Button
                  style={{
                    backgroundColor:
                      productListShow === true ? "#0b6bb6" : "transparent",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "7px",
                    marginLeft: "7px",
                    marginBottom: "7px",
                    minHeight: "30px",
                    minWidth: "40px",
                  }}
                  onClick={() => setProductListShow(true)}
                >
                  <FormatListBulletedIcon fontSize="small" />
                </Button>
              </Grid>
              <Typography
                sx={{
                  margin: "10px",
                }}
              >
                {" "}
                תצוגה:
              </Typography>
            </Grid>
          </Grid>
          <Products productListShow={productListShow} />
        </Grid>
        {user && (
          <Grid item sx={{ display: { xs: "none", md: "inline-flex" } }} md={3}>
            {user && <ShoppingCart />}
          </Grid>
        )}
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
