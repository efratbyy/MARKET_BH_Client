import React from "react";
import Paper from "@mui/material/Paper";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const Main: React.FC<Props> = ({ children }) => {
  return <Paper sx={{ minHeight: "90vh" }}>{children}</Paper>;
};

export default Main;
