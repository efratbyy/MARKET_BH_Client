import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPurchaseHistoryDetailsApi } from "../apiService/userApiService";
import { useUser } from "../providers/UserProvider";
import { PurchaseHistoryInterface } from "../models/interfaces/interfaces.ts";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PurchaseHistoryDetailsBreadCrumb from "./PurchesHistoryDetailsBreadCrumb";
import BackgroundImageLayout from "../layout/BackgroundImageLayout";

const PurchaseHistoryDetails = () => {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(
    searchParams.get("order_number")
  );
  const [purchaseHistory, setPurchaseHistory] = useState<
    PurchaseHistoryInterface | undefined
  >();
  const [totalAmountInOrder, setTotalAmountInOrder] = React.useState<number>(0);

  const handlePurchaseHistoryDetails = useCallback(
    async (userId: string, orderNumber: string) => {
      try {
        if (userId) {
          const purchaseHistoryDetails = await getPurchaseHistoryDetailsApi(
            userId,
            orderNumber
          );

          return Promise.resolve(purchaseHistoryDetails);
        }
        return undefined;
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    if (user) {
      setOrderNumber(searchParams.get("order_number"));
      handlePurchaseHistoryDetails(user._id, orderNumber || "")
        .then((data) => {
          setPurchaseHistory(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    setTotalAmountInOrder((prevTotal) => {
      const order = purchaseHistory?.order;
      if (order) {
        return order.reduce(
          (acc, item) => acc + (item.price || 0) * item.amount,
          0
        );
      }

      return prevTotal;
    });
  }, [purchaseHistory?.order]);

  const headerCellStyle = {
    backgroundColor: "#5b9822",
    color: "black",
    textAlign: "center",
    padding: "8px",
    border: "1px solid black !important",
    orderRadius: "2px",
  };

  const cellStyle = {
    textAlign: "center",
    padding: "8px",
    border: "1px solid black !important",
    orderRadius: "2px",
  };

  return (
    <>
      <BackgroundImageLayout backgroundImage="assets/images/order-details.png">
        <PurchaseHistoryDetailsBreadCrumb orderNumber={orderNumber || ""} />
        <Grid
          item
          xs={12}
          sx={{
            fontSize: "30px",
            padding: "10px",
            color: "purple",
            textDecoration: "underline",
            textAlign: "center",
          }}
        >
          הזמנה מספר: {orderNumber}
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            fontSize: "25px",
            color: "blue",
            zIndex: 1,
            position: "relative",
            textAlign: "center",
          }}
        >
          סכום ההזמנה: ₪{totalAmountInOrder.toFixed(2)}
        </Grid>

        <Grid item lg={8} xs={12} sx={{ margin: "auto" }}>
          <TableContainer
            sx={{
              alignItems: "center",
              display: "flex",
              border: "1px solid black",
              borderRadius: "2px",
              overflow: "hidden",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Table>
              <TableHead sx={{ height: "60px" }}>
                <TableRow>
                  <TableCell align="center" sx={headerCellStyle}>
                    הערות
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      ...headerCellStyle,
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    מותג
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      ...headerCellStyle,
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    ברקוד
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    מחיר
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    כמות
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    תמונה
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    פריט
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseHistory?.order?.map((item, index) => (
                  <TableRow
                    key={item.barcode}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#c4df9b" : "#d7ebbf",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{ ...cellStyle, width: "70px" }}
                    >
                      {item.note}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        ...cellStyle,
                        width: "45px",
                        display: { xs: "none", md: "table-cell" },
                      }}
                    >
                      {item.brand}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        ...cellStyle,
                        width: "45px",
                        display: { xs: "none", md: "table-cell" },
                      }}
                    >
                      {item.barcode}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ ...cellStyle, width: "40px" }}
                    >
                      ₪{item.price.toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ ...cellStyle, width: "25px" }}
                    >
                      {item.amount}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        width: "40px",
                      }}
                    >
                      <img
                        style={{
                          width: "40px",
                        }}
                        src={item.image.url}
                        alt={item.image.alt}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ ...cellStyle, width: "40px" }}
                    >
                      {item.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </BackgroundImageLayout>
    </>
  );
};
export default PurchaseHistoryDetails;
