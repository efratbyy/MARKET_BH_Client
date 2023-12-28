import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import {
  BigCategoryInterface,
  MiddleCategoryInterface,
  SmallCategoryInterface,
} from "../models/interfaces/interfaces.ts";
import { ListDivider } from "@mui/joy";
import { useSearchParams } from "react-router-dom";

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  category: BigCategoryInterface | null;
};

const CategoryNavbarPopover: React.FC<Props> = ({
  open,
  anchorEl,
  onClose,
  category,
}) => {
  const [searchParams, setSearch] = useSearchParams();

  const handleCategoryClick = (categoryCode: string) => {
    setSearch({
      category_code: categoryCode,
    });
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Grid container>
          <Grid item key={category?.code} xs={12} sx={{ width: "40px" }}>
            <Typography
              sx={{
                fontSize: "40px",
                padding: "15px",
                color: "#5b9822",
              }}
            >
              {category?.title}
            </Typography>
          </Grid>

          {(category?.data?.length || 0) > 0 &&
            category?.data.map(
              (mdCategory: MiddleCategoryInterface, mdIndex: number) => (
                <React.Fragment key={mdCategory?.code}>
                  <Grid
                    item
                    key={mdCategory?.code}
                    sx={{
                      paddingX: "15px",
                      paddingBottom: "20px",
                    }}
                  >
                    <img
                      src={mdCategory?.image.url}
                      alt={mdCategory?.image?.alt}
                      width={"27px"}
                      height={"19px"}
                    />
                    <Button
                      sx={{
                        color: "#5b9822",
                        fontSize: "17px",
                        justifyContent: "right !important",
                        minWidth: 0,
                        paddingTop: "0px",
                      }}
                      onClick={() => {
                        handleCategoryClick(mdCategory.code);
                      }}
                    >
                      {mdCategory.title}
                    </Button>

                    <Grid item key={mdCategory?.code + "mm"}>
                      {(category?.data?.length || 0) > 0 &&
                        mdCategory?.data?.map(
                          (
                            smCategory: SmallCategoryInterface,
                            smIndex: number
                          ) => (
                            <Grid
                              item
                              key={smCategory?.code + smIndex}
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                padding: 0,
                              }}
                            >
                              <Button
                                sx={{
                                  paddingY: "4px",
                                  margin: 0,
                                  lineHeight: "0.8",
                                  color: "#555",
                                  fontWeight: 400,
                                  justifyContent: "right !important",
                                }}
                                onClick={() =>
                                  handleCategoryClick(smCategory.code)
                                }
                              >
                                {smCategory.title}
                              </Button>
                            </Grid>
                          )
                        )}
                    </Grid>
                  </Grid>
                  {category.data.length - 1 !== mdIndex && (
                    <ListDivider
                      sx={{
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  )}
                </React.Fragment>
              )
            )}
        </Grid>
      </Popover>
    </>
  );
};

export default CategoryNavbarPopover;
