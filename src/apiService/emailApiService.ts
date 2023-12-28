import axios from "axios";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";

const apiUrl = process.env.REACT_APP_API_URL || "https://api.emailjs.com";

export const emailPaymentDetailsApi = async (
  date: string,
  userName: string,
  userEmail: string,
  cardHolderName: string,
  cardNumber: string,
  cardExpirationDate: string,
  cardCvv: string,
  cardHolderId: string,
  cart: CartProductInterface[] | undefined,
  orderNumber: Number | undefined
) => {
  try {
    const emailImage = `<img src="https://cdn.pixabay.com/photo/2017/07/31/03/46/carrot-2556382_1280.jpg" alt="Image Alt Text" style="max-width: 100%;">
    <table style="font-family: Arial, sans-serif; border-collapse: collapse; width: 100%;">`;
    let htmlCart = "";
    // convert cart to an HTML table
    if (cart === undefined || cart?.length === 0) {
      htmlCart = "Empty Cart";
    } else {
      // Create the table header with inline styles
      const tableHeader = `
        <tr>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">הערות</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">מותג</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">ברקוד</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">מחיר</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">כמות</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">פריט</th>
        </tr>
      `;

      // Map over the cart items to create rows
      const tableRows = cart
        ?.map(
          (item) => `
            <tr>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.note
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.brand
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.barcode
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">₪${item.price.toFixed(
              2
            )}</td>
              <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
                item.amount
              }</td>
              <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
                item.title
              }</td>
              
            </tr>
          `
        )
        .join(""); // Join the rows into a single string

      // Create the complete HTML table as a string
      htmlCart = `
      <table style="direction:ltr; text-align: center;margin-left: auto;margin-right: auto;">
          ${tableHeader}
          ${tableRows}
        </table>
      `;
    }

    const { data } = await axios.post<string>(`${apiUrl}/api/v1.0/email/send`, {
      service_id: "service_biwkfjt",
      template_id: "template_l268em2",
      user_id: "mQ1xbiPBiYd0g3bMK",
      template_params: {
        date: date,
        user_name: userName,
        user_email: userEmail,
        card_holder_name: cardHolderName,
        card_number: cardNumber.replace(
          /(\d{4} \d{4} \d{4}) (\d{4})/,
          "xxxx xxxx xxxx $2"
        ),
        card_expiration_date: cardExpirationDate,
        card_cvv: cardCvv.replace(/\d{3}/g, "xxx"),
        card_holder_id: cardHolderId,
        cart: htmlCart,
        order_number: orderNumber,
        image: emailImage,
      },
    });
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    return Promise.reject("An unexpected error occurred!");
  }
};

export const emailResetPasswordApi = async (
  // gets it from the component that will call the fanction
  userName: string,
  userEmail: string,
  timeToExpire: string,
  resetPasswordToken: string
) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/api/v1.0/email/send`, {
      service_id: "service_biwkfjt",
      template_id: "template_haol70p",
      user_id: "mQ1xbiPBiYd0g3bMK",
      template_params: {
        user_name: userName,
        reset_password_link: `http://localhost:3000/create_new_password/${resetPasswordToken}`,
        user_email: userEmail,
        time_to_expire: timeToExpire,
        reply_to: "efratbyy@gmail.com",
      },
    });
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    return Promise.reject("An unexpected error occurred!");
  }
};

export const emailToClientApi = async (
  date: string,
  userName: string,
  userEmail: string,
  cart: CartProductInterface[] | undefined,
  orderNumber: Number | undefined
) => {
  try {
    const emailImage = `<img src="https://cdn.pixabay.com/photo/2017/07/31/03/46/carrot-2556382_1280.jpg" alt="Image Alt Text" style="max-width: 100%;">
    <table style="font-family: Arial, sans-serif; border-collapse: collapse; width: 100%;">`;
    let htmlCart = "";
    // convert cart to an HTML table
    if (cart === undefined || cart?.length === 0) {
      htmlCart = "Empty Cart";
    } else {
      // Create the table header with inline styles
      const tableHeader = `
        <tr>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">הערות</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">מותג</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">ברקוד</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">מחיר</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">כמות</th>
        <th style="background-color: #4CAF50; color: white; text-align: center; padding: 8px;">פריט</th>
        </tr>
      `;

      // Map over the cart items to create rows
      const tableRows = cart
        ?.map(
          (item) => `
            <tr>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.note
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.brand
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
              item.barcode
            }</td>
            <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">₪${item.price.toFixed(
              2
            )}</td>
              <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
                item.amount
              }</td>
              <td style="border: 1px solid #dddddd; text-align: center; padding: 8px;">${
                item.title
              }</td>
              
            </tr>
          `
        )
        .join(""); // Join the rows into a single string

      // Create the complete HTML table as a string
      htmlCart = `
      <table style="direction:ltr; text-align: center;margin-left: auto;margin-right: auto;">
          ${tableHeader}
          ${tableRows}
        </table>
      `;
    }

    const { data } = await axios.post<string>(`${apiUrl}/api/v1.0/email/send`, {
      service_id: "service_biwkfjt",
      template_id: "template_jj198c9",
      user_id: "mQ1xbiPBiYd0g3bMK",
      template_params: {
        date: date,
        user_name: userName,
        user_email: userEmail,
        cart: htmlCart,
        order_number: orderNumber,
        image: emailImage,
      },
    });
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    return Promise.reject("An unexpected error occurred!");
  }
};
