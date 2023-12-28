import React from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { Button, Grid, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import GavelIcon from "@mui/icons-material/Gavel";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PolicyIcon from "@mui/icons-material/Policy";

const DesktopFooter = () => {
  const navigate = useNavigate();
  // const [isClicked, setIsClicked] = useState(false);

  // const handleClick = () => {
  //   setIsClicked(!isClicked);
  // };

  return (
    <>
      <Grid
        container
        sx={{
          display: "relative",
          bottom: 0,
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          sx={{ backgroundColor: "darkkhaki", position: "relative" }}
        >
          <Grid container justifyContent="space-between">
            {/* <BottomNavigation> */}

            {/* First Colum */}
            <Grid
              xs={3}
              item
              sx={{
                paddingRight: "50px",
                display: "block",
                paddingBottom: "20px",
              }}
            >
              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Link
                  href="tel:+97226437197"
                  style={{ textDecoration: "none" }}
                >
                  <Grid
                    item
                    sx={{
                      color: "#555",
                    }}
                  >
                    טלפון: 02-6437197
                  </Grid>
                </Link>
              </Grid>

              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Link
                  href="tel:+97226427215"
                  style={{ textDecoration: "none" }}
                >
                  <Grid
                    item
                    sx={{
                      color: "#555",
                    }}
                  >
                    פקס: 02-6437197
                  </Grid>
                </Link>
              </Grid>

              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Link
                  href="mailto:example@example.com"
                  style={{ textDecoration: "none" }}
                >
                  <Grid item sx={{ color: "#555" }}>
                    דואר אלקטרוני: market_bh@gmail.com
                  </Grid>
                </Link>
              </Grid>
            </Grid>

            {/* Second Colum */}
            <Grid xs={3} item sx={{ paddingBottom: "20px" }}>
              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Button
                  onClick={() => {
                    window.open("https://wa.me/123456789", "_blank");
                  }}
                  sx={{ color: "#555" }}
                >
                  <WhatsAppIcon /> ליצירת קשר דרך ה- WhatsApp
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Button
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/p/%D7%9E%D7%A8%D7%A7%D7%98-%D7%92%D7%91%D7%A2%D7%AA-%D7%91%D7%99%D7%AA-%D7%94%D7%9B%D7%A8%D7%9D-100005717800641/?locale=he_IL",
                      "_blank"
                    );
                  }}
                  sx={{ color: "#555" }}
                >
                  <FacebookIcon /> בקרו אותנו בדף ה- Facebook שלנו
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Button
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/market_bet_hakerem/?hl=en",
                      "_blank"
                    );
                  }}
                  sx={{ color: "#555" }}
                >
                  <InstagramIcon /> בקרו אותנו בדף ה- Instagram שלנו
                </Button>
              </Grid>
            </Grid>

            {/* Third Colum */}
            <Grid xs={1.5} item sx={{ paddingBottom: "20px" }}>
              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Button
                  sx={{ color: "#555" }}
                  onClick={() => navigate(ROUTES.ABOUT)}
                >
                  <InfoTwoToneIcon /> אודותינו
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Button
                  sx={{ color: "#555" }}
                  onClick={() => navigate(ROUTES.ACCESSIBILITY_STATEMENT)}
                >
                  <AccessibilityNewIcon /> הצהרת נגישות
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Button
                  sx={{ color: "#555" }}
                  onClick={() => navigate(ROUTES.TERMS_OF_SERVICE)}
                >
                  {<GavelIcon />} תנאי השימוש
                </Button>
              </Grid>
            </Grid>

            {/* Forth Colum */}
            <Grid xs={2} item sx={{ paddingBottom: "20px" }}>
              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Button
                  sx={{ color: "#555" }}
                  onClick={() => navigate(ROUTES.PRIVACY_POLICY)}
                >
                  <PolicyIcon /> מדיניות פרטיות
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Button
                  onClick={() => {
                    window.open(
                      "https://www.google.com/maps/place/%D7%94%D7%97%D7%9C%D7%95%D7%A5+72,+%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D%E2%80%AD/@31.7746472,35.1892611,17z/data=!3m1!4b1!4m6!3m5!1s0x1502d7b76d2060ef:0x8713ce96140001be!8m2!3d31.7746472!4d35.1892611!16s%2Fg%2F11f5k23c89?entry=ttu",
                      "_blank"
                    );
                  }}
                  sx={{ color: "#555" }}
                >
                  <HomeWorkIcon /> כתובתינו: החלוץ 72, ירושלים
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              fontSize: "20px",
              textAlign: "center",
              bottom: 0,
              left: 0,
              position: "absolute",
              width: "100%",
            }}
          >
            @ 2023 אפרת בן יוסף | כל הזכויות שמורות
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default DesktopFooter;
