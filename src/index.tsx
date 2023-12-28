import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // root.render(<App />);
// root.render(
//   <GoogleOAuthProvider clientId="238799202757-utcf1kgstkd14ibbqr67dq4kbd97le4p.apps.googleusercontent.com">
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </GoogleOAuthProvider>
//   // document.getElementById("root")
// );

reportWebVitals();
