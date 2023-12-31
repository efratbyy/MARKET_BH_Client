import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import UserProvider from "./providers/UserProvider";
import CartProvider from "./providers/CartProvider";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SnackbarProvider>
          <UserProvider>
            <CartProvider>
              <Layout>
                <Router />
              </Layout>
            </CartProvider>
          </UserProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
