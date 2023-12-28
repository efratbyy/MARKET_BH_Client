import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import { BigCategoryInterface } from "../models/interfaces/interfaces.ts";
import { getCategoriesApi } from "../apiService/categoriesApi";
import CategoryNavbarPopover from "./CategoryNavbarPopover";

const CategoryNavbar: React.FC = () => {
  const [categories, setCategories] = useState<BigCategoryInterface[]>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentCategory, setCurrentCategory] =
    useState<BigCategoryInterface | null>(null);

  const handleGetCategories = useCallback(async () => {
    try {
      //setLoading(true);
      const categories = await getCategoriesApi();
      //requestStatus(false, null, cart);
      return Promise.resolve(categories);
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  useEffect(() => {
    handleGetCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setCurrentCategory(null);
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    category: BigCategoryInterface
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentCategory(category);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      component="nav"
      aria-label="My site"
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        display: { xs: "none", md: "block" },
      }}
    >
      <List role="menubar" orientation="horizontal">
        {categories?.map((category: BigCategoryInterface, index: number) => (
          <React.Fragment key={category?.code}>
            <ListItem
              sx={{
                width: `${99 / categories.length}%`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 0,
                padding: 0,
                paddingTop: "5px",
                gap: 0,
                bottom: 0,
                justifyContent: "center",
                justifyItems: "center",
                marginTop: "15px",
                marginBottom: "10px",
              }}
              role="none"
              onClick={(e) => handlePopoverOpen(e, category)}
            >
              <img
                src={category?.image?.url}
                alt={category?.image?.alt}
                width={"32px"}
                height={"24px"}
              />
              <ListItem
                key={category?.code}
                role="menuitem"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  padding: 0,
                  textAlign: "center",
                  display: { xs: "none", lg: "block" },
                }}
              >
                {category.title}
              </ListItem>
            </ListItem>

            {index !== categories.length - 1 && (
              <ListDivider sx={{ padding: 0, margin: 0 }} />
            )}

            {/* Popover for each category */}
            <CategoryNavbarPopover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              category={currentCategory}
            />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CategoryNavbar;
