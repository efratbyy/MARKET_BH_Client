import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { Grid } from "@mui/material";
import { useCartProvider } from "../providers/CartProvider";
import {
  Link,
  Navigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import Navbar from "../navbar/Navbar";
import BackgroundImageLayout from "../layout/BackgroundImageLayout";

const OrderConfirmation: React.FC = () => {
  const { user } = useUser();
  const [searchParams] = useSearchParams();

  const orderNumber = searchParams.get("order_number");

  return (
    <>
      <BackgroundImageLayout backgroundImage="assets/images/orderConfirmation.png">
        <Grid item xs={12} sx={{ marginBottom: "20px", marginRight: "80px" }}>
          {user?.first + " " + user?.last} היקר/ה!
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "20px", marginRight: "80px" }}>
          הזמנתך התקבלה בהצלחה!
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "20px", marginRight: "80px" }}>
          הזמנה מספר: {orderNumber}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginBottom: "20px", marginRight: "80px", fontSize: "20px" }}
        >
          מייל עם פרטי ההזמנה נשלח לכתובת הדואר האלקטרוני שמוזן בחשבונך.
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginBottom: "20px", marginRight: "80px", fontSize: "20px" }}
        >
          <Link to={ROUTES.ROOT}>לחץ כאן לחזרה לדף הבית</Link>
        </Grid>
      </BackgroundImageLayout>
    </>
  );
};

export default OrderConfirmation;
