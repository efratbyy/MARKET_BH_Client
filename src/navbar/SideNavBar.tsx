import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../services/LocalStorageService";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useUser } from "../providers/UserProvider";
import Person2TwoToneIcon from "@mui/icons-material/Person2TwoTone";
import DataFilter from "../search_filter/DataFilter";
import { getUserByIdApi } from "../apiService/userApiService";

type Props = {
  showDataFilter?: boolean;
};

const SideNavBar: React.FC<Props> = ({ showDataFilter = true }) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const { user, setToken, setUser } = useUser();

  const toggleLeftDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setLeftDrawerOpen(open);
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

  const handleGetUserEmail = React.useCallback(async () => {
    try {
      const userFromDB = await getUserByIdApi(user?._id || "");
      setUserEmail(userFromDB.email);
    } catch (error) {
      console.log(error);
    }
  }, [userEmail]);

  useEffect(() => {
    handleGetUserEmail();
  }, []);

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleLeftDrawer(true)}
      onKeyDown={toggleLeftDrawer(true)}
    >
      {/* Inbox Link */}
      <List>
        <ListItem
          disablePadding
          onClick={() => navigate(`${ROUTES.EDIT_USER}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <Person2TwoToneIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "olivedrab" }}
              primary={user?.first + " " + user?.last + " " + userEmail}
            />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem
          disablePadding
          onClick={() => navigate(`${ROUTES.ACCESSIBILITY_STATEMENT}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <AccessibilityNewIcon />
            </ListItemIcon>
            <ListItemText primary={"הצהרת נגישות"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem
          disablePadding
          onClick={() => navigate(`${ROUTES.PRIVACY_POLICY}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <AccessibilityNewIcon />
            </ListItemIcon>
            <ListItemText primary={"מדיניות פרטיות"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem
          disablePadding
          onClick={() => navigate(`${ROUTES.TERMS_OF_SERVICE}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <AccessibilityNewIcon />
            </ListItemIcon>
            <ListItemText primary={"תנאי השימוש"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding onClick={() => navigate(`${ROUTES.ABOUT}`)}>
          <ListItemButton>
            <ListItemIcon>
              <AccessibilityNewIcon />
            </ListItemIcon>
            <ListItemText primary={"אודותינו"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem
          disablePadding
          onClick={() => navigate(`${ROUTES.CONTACT_INFORMATION}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <PhoneInTalkIcon />
            </ListItemIcon>
            <ListItemText primary={"צור קשר"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding onClick={() => handleLogout()}>
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"התנתקות"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {showDataFilter && <DataFilter />}
    </Box>
  );

  return (
    <div>
      <MenuIcon onClick={() => setLeftDrawerOpen(true)}></MenuIcon>
      <Drawer
        anchor="right"
        open={leftDrawerOpen}
        onClose={toggleLeftDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default SideNavBar;
