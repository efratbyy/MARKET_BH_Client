import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const AccessibilityStatementPage = () => {
  return (
    <>
      <Grid
        sx={{
          backgroundImage: 'url("/assets/images/accessibility_statement.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          zIndex: -1,
          minHeight: "100vh",
          opacity: 0.7,
        }}
      ></Grid>
      <Navbar />

      <Grid
        sx={{
          maxWidth: "800px",
          margin: "auto",
          padding: 3,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Typography sx={{ margin: "30px", textAlign: "center" }} variant="h2">
          הצהרת נגישות
        </Typography>

        <Typography sx={{ paddingX: "20px" }} variant="h5">
          מינימרקט גבעת בית הכרם מתחייבת לספק שירותים כוללים, מכובדים, נגישים,
          ומקצועיים לכל לקוחותיה. תוך כדי התאם לחוק שוויון זכויות לאנשים עם
          מוגבלויות (תשנ"ח-1998) והתקנות הנובעות ממנו, אנו משקיעים מאמצים רבים
          ומשאבים להבטיח שאדם עם מוגבלות יוכל לקבל את השירותים באופן עצמאי
          ושווה. מינימרקט גבעת בית הכרם עושה וישמש תמיד לשיפור.
        </Typography>

        <Typography sx={{ padding: "20px" }} variant="h5">
          לפרטים ושאלות נוספות בנושא נגישות, ניתן ליצור קשר עם:
          <br />
          שי בן יוסף
          <br />
          טלפון: 02-6437197
          <br />
          דוא"ל: shaiby34@gmail.com
        </Typography>
      </Grid>
      <Footer />
    </>
  );
};

export default AccessibilityStatementPage;
