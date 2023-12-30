import React, { useCallback, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getPurchaseHistoryApi } from "../apiService/userApiService";
import { useUser } from "../providers/UserProvider";
import { PurchaseHistoryInterface } from "../models/interfaces/interfaces.ts";
import "./PurchaseHistory.css";
import { Grid, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

const PurchaseHistory = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [purchaseHistory, setPurchaseHistory] = useState<
    PurchaseHistoryInterface[] | undefined
  >();
  const [rows, setRows] = useState<any[]>([]);

  const handlePurchaseHistory = useCallback(async (userId: string) => {
    try {
      if (userId) {
        const purchaseHistory = await getPurchaseHistoryApi(userId);

        return Promise.resolve(purchaseHistory);
      }
      return undefined;
    } catch (error) {}
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "",
      headerAlign: "center",
      width: 20,
      align: "center",
    },
    {
      field: "col4",
      headerName: "מספר הזמנה",
      headerClassName: "custom-header",
    },
    {
      field: "col3",
      headerName: "תאריך הזמנה",
      headerClassName: "custom-header",
    },
    {
      field: "col2",
      headerName: "מספר פריטים",
      headerClassName: "custom-header",
    },
    {
      field: "col1",
      headerName: "סכום ההזמנה",
      headerClassName: "custom-header",
    },
  ];

  useEffect(() => {
    if (user) {
      handlePurchaseHistory(user?._id)
        .then((data) => {
          setPurchaseHistory(data);

          let initRows: any[] = [];
          let inc = 1;
          data?.forEach((purchase) => {
            let totalCost = 0;
            let totalItems = 0;
            purchase.order.forEach((cartProduct) => {
              totalCost += cartProduct.price * cartProduct.amount;
              totalItems += cartProduct.amount;
            });

            initRows.push({
              id: inc++,
              col4: purchase.orderNumber,
              col3: new Date(purchase.orderDate).toLocaleDateString("en-IL", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                timeZone: "Asia/Jerusalem",
              }),
              col2: totalItems,
              col1: totalCost.toFixed(2),
            });
          });

          setRows(initRows);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <Grid
        sx={{
          backgroundImage:
            'url( "https://cdn.pixabay.com/photo/2015/06/15/20/21/register-810546_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          zIndex: -1,
          minHeight: "100vh",
          opacity: 0.7,
        }}
      ></Grid>
      <Navbar showSearchBar={false} showDataFilter={false} />
      <Typography
        variant="h1"
        sx={{
          fontSize: "50px",
          fontWeight: "bold",
          marginBottom: 2,
          color: "primary.main",
          textAlign: "center",
          paddingTop: "35%",
        }}
      >
        הסטוריית הזמנות
      </Typography>
      <Grid
        container
        item
        xs={10}
        lg={6}
        sx={{ marginRight: "auto", marginLeft: "auto" }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={(params) => {
            navigate(
              `${ROUTES.PURCHASE_HISTORY_DETAILS}?order_number=${params.row["col4"]}`
            );
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            height: "85vh",
            boxShadow: 2,
            border: 5,
            borderColor: "grey",
            "& .MuiDataGrid-cell:hover": {
              color: "white",
            },
            marginBottom: "30px",
            "& .MuiTablePagination-root": {
              fontSize: "16px",
              color: "white",
            },
            marginRight: "auto",
            marginLeft: "auto",
          }}
          pagination
          pageSizeOptions={[5, 10, 25]}
        />
      </Grid>
      <Footer />
    </>
  );
};

export default PurchaseHistory;
