import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const CheckoutPageBreadCrumb = () => {
  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      <Link underline="hover" key="1" color="inherit" href="/">
        מרקט בית הכרם
      </Link>
    </Typography>,

    <Link underline="hover" key="2" color="inherit" href="/shopping_cart">
      קופה
    </Link>,
    <Typography key="4">תשלום</Typography>,
  ];

  return (
    <Stack spacing={2} sx={{ padding: "10px" }}>
      <Breadcrumbs
        separator={<ArrowBackIosNewIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default CheckoutPageBreadCrumb;
