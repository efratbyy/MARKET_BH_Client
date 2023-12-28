import React, { useCallback, useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";
import { useSearchParams } from "react-router-dom";
import DesktopListProductCard from "./DesktopListProductCard";
import { deleteProductApi } from "../apiService/productApiService";
import { useSnack } from "../providers/SnackbarProvider";
import MobileListProductCard from "./MobileListProductCard";
import GeneralDialog from "../generic components/GeneralDialog";

type Props = { productListShow: boolean };

const Products: React.FC<Props> = ({ productListShow = false }) => {
  const [products, setProducts] = useState<ProductInterface[] | undefined>([]);
  const [query, setQuery] = useState<string>("");
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState<string>("");
  const [brands, setBrands] = useState<string>("");
  const [stickers, setStickers] = useState<string>("");
  const [categoryCode, setCategoryCode] = useState<string>("");
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [barcodeToDelete, setBarcodeToDelete] = useState<string>("");

  const { handleGetProducts } = useProducts();
  const snack = useSnack();

  const setBarcodeAndOpenDialog = (barcode: string) => {
    setBarcodeToDelete(barcode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = useCallback(async () => {
    try {
      const deletedProduct = await deleteProductApi(barcodeToDelete);
      if (deletedProduct) {
        snack("success", "המוצר נמחק בהצלחה!");
        setDeleteTrigger((prev) => !prev);
      } else snack("error", "לא ניתן למחוק את המוצר, נסה שוב מאוחר יותר!");
    } catch (error) {
      console.log(error);
    }
  }, [barcodeToDelete]);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query != null) {
      setQuery(query);
    } else {
      setQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort != null) {
      setSort(sort);
    } else {
      setSort("");
    }
  }, [searchParams]);

  useEffect(() => {
    const brand = searchParams.get("brand");
    if (brand != null) {
      setBrands(brand);
    } else {
      setBrands("");
    }
  }, [searchParams]);

  useEffect(() => {
    const sticker = searchParams.get("sticker");
    if (sticker != null) {
      setStickers(sticker);
    } else {
      setStickers("");
    }
  }, [searchParams]);

  useEffect(() => {
    const categoryCodeParam = searchParams.get("category_code");
    if (categoryCodeParam != null) {
      setCategoryCode(categoryCodeParam);
    } else {
      setCategoryCode("");
    }
  }, [searchParams]);

  useEffect(() => {
    handleGetProducts()
      .then((products) => {
        // Filter by q
        let filteredProducts = products?.filter(
          (product) =>
            product.title.includes(query) || product.barcode.includes(query)
        );

        // Filter by brand
        if (brands !== "") {
          // If brands searchParams is empty, no need to filter
          const brandsArray = brands.split(", ");
          filteredProducts = filteredProducts?.filter((product) =>
            brandsArray.includes(product.brand)
          );
        }

        // Filter by sticker
        if (stickers !== "") {
          const stickersArray = stickers.split(", ");

          let sugarProducts: ProductInterface[] | undefined = [];
          let saturatedFatProducts: ProductInterface[] | undefined = [];
          let sodiumProducts: ProductInterface[] | undefined = [];
          let greenMarkProducts: ProductInterface[] | undefined = [];
          let supervisedProducts: ProductInterface[] | undefined = [];

          // Convert search param text to the product's field true/false
          if (stickersArray.includes("סוכר"))
            sugarProducts = filteredProducts?.filter(
              (x) => x.details.isSugar === true
            );

          if (stickersArray.includes("שומן רווי"))
            saturatedFatProducts = filteredProducts?.filter(
              (x) => x.details.isSaturatedFat === true
            );

          if (stickersArray.includes("נתרן"))
            sodiumProducts = filteredProducts?.filter(
              (x) => x.details.isSodium === true
            );

          if (stickersArray.includes("הסימון הירוק"))
            greenMarkProducts = filteredProducts?.filter(
              (x) => x.details.isGreenMark === true
            );

          if (stickersArray.includes("מוצר בפיקוח"))
            supervisedProducts = filteredProducts?.filter(
              (x) => x.details.isSupervised === true
            );

          // Create array thant contains all the products with chosen stickers
          // it may contains duplicate products
          const mergedArray = ([] as ProductInterface[]).concat(
            sugarProducts || [],
            saturatedFatProducts || [],
            sodiumProducts || [],
            greenMarkProducts || [],
            supervisedProducts || []
          );

          // Set is type that cannot contains duplicates
          filteredProducts = Array.from(new Set(mergedArray));
        }

        // Filter by category
        if (categoryCode !== "") {
          // If category searchParams is empty, no need to filter
          filteredProducts = filteredProducts?.filter((product) =>
            product.categoryCode.some((code) => code.startsWith(categoryCode))
          );
        }

        // sort the products by default
        const sortedFilteredProducts =
          sort === "" || sort === "Asc"
            ? filteredProducts?.sort((a, b) => a.price - b.price)
            : filteredProducts?.sort((a, b) => b.price - a.price);
        setProducts(sortedFilteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    handleGetProducts,
    handleDeleteProduct,
    setDeleteTrigger,
    deleteTrigger,
    barcodeToDelete,
    setBarcodeToDelete,
    query,
    sort,
    brands,
    stickers,
    categoryCode,
  ]);

  return (
    <>
      {!productListShow && (
        <Grid
          container
          item
          sx={{
            "--Grid-borderWidth": "0.5px",
            borderTop: "var(--Grid-borderWidth) 0px solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "rgba(211, 211, 211, 0.05)",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "rgba(211, 211, 211, 0.05)",
            },
          }}
        >
          <Typography title="Products Page" />
          {products?.map((product: ProductInterface) => (
            <Grid item key={product.barcode} xs={6} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                setBarcodeAndOpenDialog={setBarcodeAndOpenDialog}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {productListShow && (
        <Grid
          container
          item
          sx={{
            "--Grid-borderWidth": "0.5px",
            borderTop: "var(--Grid-borderWidth) 0px solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "rgba(211, 211, 211, 0.05)",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "rgba(211, 211, 211, 0.05)",
            },
          }}
        >
          <Typography title="Products Page" />
          {products?.map((product: ProductInterface) => (
            <React.Fragment key={product.barcode}>
              <Grid
                container
                item
                xs={12}
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                <DesktopListProductCard
                  product={product}
                  setBarcodeAndOpenDialog={setBarcodeAndOpenDialog}
                />
                <Grid
                  item
                  xs={11.9}
                  sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
                >
                  {/* Horizontal Divider */}
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ display: { md: "none" } }}>
                <MobileListProductCard
                  product={product}
                  setBarcodeAndOpenDialog={setBarcodeAndOpenDialog}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
      <GeneralDialog
        title="מחיקת מוצר!"
        text=" האם הינך בטוח/ה כי בצונך למחוק מוצר זה? מוצר שימחק מהמערכת ימחק לצמיתות!"
        showCancelButton={true}
        open={open}
        handleClose={handleClose}
        handleConfirm={() => {
          handleDeleteProduct();
          handleClose();
        }}
      />
    </>
  );
};

export default Products;
