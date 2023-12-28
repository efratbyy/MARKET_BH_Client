import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import RegistrationForm from "../register/RegistrationForm";
import ErrorPage from "../components/ErrorPage";
import Login from "../login/Login";
import HomePage from "../components/HomePage";
import ShoppingCartMobilePage from "../cart/ShoppingCartMobilePage";
import AboutPage from "../components/AboutPage";
import CheckoutPage from "../components/CheckoutPage";
import PurchaseHistory from "../components/PurchaseHistory";
import OrderConfirmation from "../components/OrderConfirmation";
import PurchaseHistoryDetails from "../components/PurchaseHistoryDetails";
import AddProductForm from "../product/AddProductForm";
import EditProductForm from "../product/EditProductForm";
import EditUserForm from "../users/EditUserForm";
import ForgotPassword from "../login/ForgotPassword";
import CreateNewPassword from "../login/CreateNewPassword";
import GeneralMessage from "../generic components/GeneralMessage";
import EditUsersCRM from "../users/EditUsersCRM";
import AddUser from "../users/CreateNewUser";
import TermsOfServicePage from "../components/TermsOfServicePage";
import PrivacyPolicyPage from "../components/PrivacyPolicyPage";
import AccessibilityStatementPage from "../components/AccessibilityStatementPage";
import InventoryManagement from "../Inventory/InventoryManagement";
import ContactInformation from "../components/ContactInformation";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<RegistrationForm />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path={ROUTES.SHOPPING_CART} element={<ShoppingCartMobilePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
      <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmation />} />
      <Route path={ROUTES.PURCHASE_HISTORY} element={<PurchaseHistory />} />
      <Route path={ROUTES.ADD_PRODUCT} element={<AddProductForm />} />
      <Route path={ROUTES.EDIT_PRODUCT} element={<EditProductForm />} />
      <Route path={`${ROUTES.EDIT_USER}`} element={<EditUserForm />} />
      <Route
        path={ROUTES.PURCHASE_HISTORY_DETAILS}
        element={<PurchaseHistoryDetails />}
      />
      <Route
        path={`${ROUTES.CREATE_NEW_PASSWORD}/:resetPasswordToken`}
        element={<CreateNewPassword />}
      />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.GENERAL_MESSAGE} element={<GeneralMessage />} />
      <Route path={ROUTES.USERS_CRM} element={<EditUsersCRM />} />
      <Route path={ROUTES.ADD_USER} element={<AddUser />} />
      <Route path={ROUTES.TERMS_OF_SERVICE} element={<TermsOfServicePage />} />
      <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
      <Route
        path={ROUTES.ACCESSIBILITY_STATEMENT}
        element={<AccessibilityStatementPage />}
      />
      <Route
        path={ROUTES.INVENTORY_MANAGEMENT}
        element={<InventoryManagement />}
      />
      <Route
        path={ROUTES.CONTACT_INFORMATION}
        element={<ContactInformation />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
