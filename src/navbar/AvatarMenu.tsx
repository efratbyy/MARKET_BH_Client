import React from "react";
import { Grid, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../services/LocalStorageService";

const AvatarMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { user, setUser, setToken } = useUser();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    removeUser(); // remove from localStorage
    setUser(null);
    setToken(null);
    handleCloseUserMenu();
    navigate(ROUTES.ROOT);
  };

  return (
    <>
      {user && (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar>{user.first.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {[
              <MenuItem
                key="edit_user"
                onClick={() => navigate(`${ROUTES.EDIT_USER}`)}
              >
                <Typography textAlign="center">האזור האישי</Typography>
              </MenuItem>,

              <MenuItem
                key="purchase_history"
                onClick={() => navigate(`${ROUTES.PURCHASE_HISTORY}`)}
              >
                <Typography textAlign="center">הסטוריית הזמנות</Typography>
              </MenuItem>,

              user && user.isAdmin && (
                <MenuItem
                  key="add_product"
                  onClick={() => navigate(`${ROUTES.ADD_PRODUCT}`)}
                >
                  <Typography textAlign="center">הוספת מוצר חדש</Typography>
                </MenuItem>
              ),

              user && user.isAdmin && (
                <MenuItem
                  key="user_crm"
                  onClick={() => navigate(`${ROUTES.USERS_CRM}`)}
                >
                  <Typography textAlign="center">עריכת משתמשים</Typography>
                </MenuItem>
              ),

              user && user.isAdmin && (
                <MenuItem
                  key="inventory_management"
                  onClick={() => navigate(`${ROUTES.INVENTORY_MANAGEMENT}`)}
                >
                  <Typography textAlign="center">ניהול מלאי</Typography>
                </MenuItem>
              ),

              <MenuItem key="disconnect" onClick={handleLogout}>
                <Typography textAlign="center">התנתקות</Typography>
              </MenuItem>,
            ]}
          </Menu>
        </>
      )}
    </>
  );
};

export default AvatarMenu;
