import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type Props = {
  orderNumber: string;
};

const PurchaseHistoryDetailsBreadCrumb: React.FC<Props> = ({ orderNumber }) => {
  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      <Link underline="hover" key="1" color="inherit" href="/">
        מרקט בית הכרם
      </Link>
    </Typography>,

    <Link underline="hover" key="1" color="inherit" href="/purchase_history">
      היסטוריית הזמנות
    </Link>,

    <Link underline="hover" key="2" color="inherit" href="/">
      הזמנה מספר {orderNumber}
    </Link>,
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

export default PurchaseHistoryDetailsBreadCrumb;
