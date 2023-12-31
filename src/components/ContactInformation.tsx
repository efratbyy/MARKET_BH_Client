import React from "react";
import { Button, Grid, Link } from "@mui/material";
import BackgroundImageLayout from "../layout/BackgroundImageLayout";

const ContactInformation = () => {
  return (
    <>
      <BackgroundImageLayout backgroundImage="/assets/images/contactusbackgroundImage.png">
        <Grid
          item
          xs={12}
          sx={{ color: "black", textAlign: "center", fontSize: "50px" }}
        >
          צור קשר
        </Grid>
        <Grid sx={{ textAlign: "center" }}>
          <Grid
            item
            sx={{
              marginRight: "20%",
              marginLeft: "20%",
              fontSize: "25px",
              padding: "10px",
            }}
          >
            שעות פתיחה:
          </Grid>
          <Grid
            item
            sx={{ marginRight: "20%", marginLeft: "20%", fontSize: "20px" }}
          >
            א-ה: 6:30-20:00
          </Grid>
          <Grid
            item
            sx={{ marginRight: "20%", marginLeft: "20%", fontSize: "20px" }}
          >
            ו: 6:00-15:00
          </Grid>
          <Grid sx={{ padding: "10px" }}>
            <Link href="tel:+97226437197" style={{ textDecoration: "none" }}>
              <Grid
                item
                sx={{
                  color: "black",
                  fontSize: "25px",
                }}
              >
                טלפון: 02-6437197
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ padding: "10px" }}>
            <Link href="tel:+97226427215" style={{ textDecoration: "none" }}>
              <Grid
                item
                sx={{
                  color: "black",
                  fontSize: "25px",
                }}
              >
                פקס: 02-6437197
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ padding: "10px" }}>
            <Link
              href="mailto:example@example.com"
              style={{ textDecoration: "none" }}
            >
              <Grid item sx={{ color: "black", fontSize: "25px" }}>
                דואר אלקטרוני: market_bh@gmail.com
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ padding: "10px" }}>
            <Button
              onClick={() => {
                window.open("https://wa.me/123456789", "_blank");
              }}
              sx={{ color: "black", fontSize: "25px" }}
            >
              לחץ כאן ליצירת קשר דרך ה- WhatsApp
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ padding: "10px" }}>
            <Button
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/place/%D7%94%D7%97%D7%9C%D7%95%D7%A5+72,+%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D%E2%80%AD/@31.7746472,35.1892611,17z/data=!3m1!4b1!4m6!3m5!1s0x1502d7b76d2060ef:0x8713ce96140001be!8m2!3d31.7746472!4d35.1892611!16s%2Fg%2F11f5k23c89?entry=ttu",
                  "_blank"
                );
              }}
              sx={{ color: "black", fontSize: "25px" }}
            >
              כתובתינו: החלוץ 72, ירושלים
            </Button>
          </Grid>
        </Grid>
      </BackgroundImageLayout>
    </>
  );
};

export default ContactInformation;
