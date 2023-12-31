import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import BackgroundImageLayout from "../layout/BackgroundImageLayout";

const AccessibilityStatementPage = () => {
  return (
    <>
      <BackgroundImageLayout backgroundImage="/assets/images/accessibility_statement.png">
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
      </BackgroundImageLayout>
    </>
  );
};

export default AccessibilityStatementPage;
