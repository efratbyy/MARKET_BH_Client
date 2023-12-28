import React, { useState } from "react";
import { Box, Grid, Popper } from "@mui/material";
import InfoIconMUI from "@mui/icons-material/Info";

type Props = {
  text: string;
};

const InfoIcon: React.FC<Props> = ({ text }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    // <Grid
    //   sx={{
    //     position: "relative",
    //     display: "inline-block",
    //   }}
    // >
    //   <Grid
    //     sx={{
    //       display: "inline-block",
    //       cursor: "pointer",
    //       fontSize: "14px",
    //       color: "#007bff",
    //     }}
    //     onClick={() => setShowText(!showText)}
    //   >
    //     i
    //   </Grid>
    //   {showText && (
    //     <Grid
    //       sx={{
    //         position: "absolute",
    //         top: "100%",
    //         left: "50%",
    //         transform: "translateX(-50%)",
    //         backgroundColor: "#fff",
    //         padding: "8px",
    //         border: "1px solid #ccc",
    //         borderRadius: "4px",
    //         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    //         display: "none",
    //         fontSize: "12px",
    //         maxWidth: "200px",
    //       }}
    //     >
    //       {text}
    //     </Grid>
    //   )}
    // </Grid>
    <>
      <Grid onMouseEnter={handleClick} onMouseLeave={handleClick}>
        <InfoIconMUI />
      </Grid>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{
          zIndex: 800,
          '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: "50%",
            marginTop: "-0.9em",
            marginLeft: "-0.9em",
            "&::before": {
              borderWidth: "0.9em 0.9em 0 0.9em",
              borderColor: `transparent transparent transparent transparent`,
            },
          },
        }}
      >
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>{text}</Box>
      </Popper>
    </>
  );
};

export default InfoIcon;
