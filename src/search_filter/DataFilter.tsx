import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSearchParams } from "react-router-dom";
import { Checkbox, Divider, FormControlLabel, Grid } from "@mui/material";
import useProducts from "../product/useProducts";
import { Button } from "@mui/base";
import SvgSodium from "../product/SvgSodium";

const DataFilter = () => {
  const [openSort, setOpenSort] = useState(true);
  const [openBrands, setOpenBrands] = useState(true);
  const [openMarkingSticker, setOpenMarkingSticker] = useState(true);
  const [searchParams, setSearch] = useSearchParams(new URLSearchParams());
  const [brands, setBrands] = useState<string[] | undefined>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[] | undefined>(
    searchParams.get("brand")?.split(", ")
  ); // Array to hold selected brand IDs

  const [stickers, setStickers] = useState<string[] | undefined>([
    "שומן רווי",
    "סוכר",
    "נתרן",
    "מוצר בפיקוח",
    "הסימון הירוק",
  ]);
  const [selectedStickers, setSelectedStickers] = useState<string[]>(
    searchParams.get("sticker")?.split(", ") || []
  );

  const { handleGetProducts } = useProducts();

  const handleSortAsc = () => {
    searchParams.set("sort", "Asc");
    setSearch(searchParams);
  };

  const handleSortDesc = () => {
    searchParams.set("sort", "Desc");
    setSearch(searchParams);
  };

  const toggleBrand = (brand: string) => {
    if (selectedBrands?.includes(brand)) {
      // remove from selected brands array
      setSelectedBrands(selectedBrands?.filter((x) => x !== brand));
    } else {
      // add to selected brands array
      setSelectedBrands([...(selectedBrands ?? []), brand]);
    }
  };

  const toggleSticker = (sticker: string) => {
    if (selectedStickers?.includes(sticker)) {
      // remove from selected brands array
      setSelectedStickers(selectedStickers?.filter((x) => x !== sticker));
    } else {
      // add to selected brands array
      setSelectedStickers([...(selectedStickers ?? []), sticker]);
    }
  };

  useEffect(() => {
    handleGetProducts()
      .then((products) => {
        let bransFromProducts = products?.map((obj) => obj.brand);
        bransFromProducts = Array.from(new Set(bransFromProducts));
        setBrands(bransFromProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleGetProducts]);

  useEffect(() => {
    const joinedString = selectedBrands?.join(", ");
    searchParams.set("brand", joinedString || "");
    setSearch(searchParams);
  }, [selectedBrands]);

  useEffect(() => {
    if (!searchParams.get("brand") || searchParams.get("brand") === "") {
      setSelectedBrands([]);
    }

    if (!searchParams.get("sticker") || searchParams.get("sticker") === "") {
      setSelectedStickers([]);
    }
  }, [searchParams, setSearch]);

  useEffect(() => {
    const joinedString = selectedStickers?.join(", ");

    searchParams.set("sticker", joinedString || "");
    setSearch(searchParams);
  }, [selectedStickers]);

  return (
    <>
      {/* Sort products */}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          direction: "rtl",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            מיון מוצרים
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => setOpenSort(!openSort)}>
          <ListItemText
            primary="מיון מוצרים"
            sx={{ textAlign: "start", color: "orange" }}
          />
          {openSort ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSort} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={handleSortDesc} sx={{ pl: 4 }}>
              <ListItemIcon sx={{ minWidth: "0px" }}>₪</ListItemIcon>
              <ListItemText
                sx={{ textAlign: "start", pr: "8px" }}
                primary=" מהגבוה לנמוך"
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Collapse in={openSort} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={handleSortAsc} sx={{ pl: 4 }}>
              <ListItemIcon sx={{ minWidth: "0px" }}>₪</ListItemIcon>
              <ListItemText
                sx={{ textAlign: "start", pr: "8px" }}
                primary="מהנמוך לגבוה"
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <Divider />

      {/* Filter products brand */}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Grid container>
              <Grid item xs={6} md={7}>
                סינון מוצרים
              </Grid>
              <Grid item xs={6} md={5}>
                <Button
                  style={{
                    backgroundColor: "orange",
                    color: "black",
                    width: "95%",
                    height: "34px",
                    padding: "0",
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
                  אפס
                </Button>
              </Grid>
            </Grid>
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => setOpenBrands(!openBrands)}>
          <ListItemText
            primary="מותג"
            sx={{ textAlign: "start", color: "orange" }}
          />
          {openBrands ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openBrands} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {brands?.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands?.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                }
                label={brand}
                sx={{ pl: 4, minWidth: "100% !important" }}
              />
            ))}
          </List>
        </Collapse>
      </List>

      <Divider />

      {/* Filter products marking sticker */}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={() => setOpenMarkingSticker(!openMarkingSticker)}
        >
          <ListItemText
            primary="מדבקות סימון"
            sx={{ textAlign: "start", color: "orange" }}
          />
          {openMarkingSticker ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMarkingSticker} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {stickers?.map((sticker) => (
              <FormControlLabel
                key={sticker}
                control={
                  <Checkbox
                    checked={selectedStickers?.includes(sticker)}
                    onChange={() => toggleSticker(sticker)}
                  />
                }
                label={sticker}
                sx={{ pl: 4, minWidth: "100% !important" }}
              />
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default DataFilter;
