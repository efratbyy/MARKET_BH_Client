import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { removeUser } from "../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import SearchBar from "../search_filter/SearchBar";
import { Grid } from "@mui/material";
import SideNavBar from "./SideNavBar";
import { useUser } from "../providers/UserProvider";
import Badge, { BadgeProps } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { useCartProvider } from "../providers/CartProvider";
import AvatarMenu from "./AvatarMenu";

type Props = {
  showSearchBar?: boolean;
  showDataFilter?: boolean;
};

const MobileNavbar: React.FC<Props> = ({
  showSearchBar = true,
  showDataFilter = true,
}) => {
  const navigate = useNavigate();
  const { cart } = useCartProvider();
  const { user, setUser, setToken } = useUser();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [totalItemsInCart, setTotalItemsInCart] = React.useState<number>(0);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  useEffect(() => {
    if (cart)
      setTotalItemsInCart(cart.reduce((acc, item) => acc + item.amount, 0));
  }, [cart]);

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#5b9822", display: { md: "none" } }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile NavBar */}
            <Grid
              container
              sx={{ display: { md: "none" }, mb: "15px" }}
              justifyContent="center"
              alignItems="center"
            >
              {/* Hamburger Menu */}
              {!user && (
                <Grid item xs={1} sx={{ flexGrow: 1 }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem
                      key="login"
                      onClick={() => navigate(`${ROUTES.LOGIN}`)}
                      sx={{
                        display: { xs: "flex", md: "none" },
                      }}
                    >
                      <Typography textAlign="center">התחבר</Typography>
                    </MenuItem>
                    ,
                    <MenuItem
                      key="register"
                      onClick={() => navigate(`${ROUTES.REGISTER}`)}
                      sx={{
                        display: { xs: "flex", md: "none" },
                      }}
                    >
                      <Typography textAlign="center">הרשמה</Typography>
                    </MenuItem>
                    ,
                  </Menu>
                </Grid>
              )}

              {/* Side NavBar */}
              {user && (
                <Grid item xs={1}>
                  <SideNavBar showDataFilter={showDataFilter} />
                </Grid>
              )}

              {/* Title */}
              <Grid item xs={showSearchBar ? 9 : 8}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  justifyContent="center"
                  sx={{
                    mr: 2,
                    display: { xs: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#282828",
                    textDecoration: "none",
                    fontSize: "140%",
                  }}
                >
                  מרקט גבעת בית הכרם
                </Typography>
              </Grid>

              {/* Cart Icon */}
              {user && !showSearchBar && (
                <Grid
                  item
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  alignItems={"center"}
                  xs={2}
                >
                  <IconButton
                    onClick={() => navigate(ROUTES.SHOPPING_CART)}
                    aria-label="cart"
                  >
                    <StyledBadge
                      badgeContent={totalItemsInCart}
                      color="default"
                    >
                      <ShoppingCartIcon
                        sx={{ color: "#282828", fontSize: 40 }}
                      />
                    </StyledBadge>
                  </IconButton>
                </Grid>
              )}
              {/* Avatar */}
              {user && (
                <Grid
                  item
                  display={"flex"}
                  justifyContent={"end"}
                  xs={showSearchBar ? 2 : 1}
                  sx={{ flexGrow: 0 }}
                >
                  <AvatarMenu />
                </Grid>
              )}

              {!user && (
                <Grid item xs={1}>
                  <Button
                    onClick={() => navigate(`${ROUTES.LOGIN}`)}
                    sx={{
                      my: 2,
                      color: "white",
                      display: {
                        xs: "none",
                        md: "block",
                        fontSize: "150%",
                        padding: 0,
                      },
                    }}
                  >
                    התחבר
                  </Button>
                  <Button
                    onClick={() => navigate(`${ROUTES.REGISTER}`)}
                    sx={{
                      my: 2,
                      color: "white",
                      display: { xs: "none", md: "block" },
                      fontSize: "150%",
                      padding: 0,
                      paddingRight: 3,
                    }}
                  >
                    הרשם
                  </Button>
                </Grid>
              )}

              {/* Cart Icon */}
              {user && showSearchBar && (
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => navigate(ROUTES.SHOPPING_CART)}
                    aria-label="cart"
                  >
                    <StyledBadge
                      badgeContent={totalItemsInCart}
                      color="default"
                    >
                      <ShoppingCartIcon
                        sx={{ color: "#282828", fontSize: 40 }}
                      />
                    </StyledBadge>
                  </IconButton>
                </Grid>
              )}

              {/* Search Bar */}
              <Grid item xs={10}>
                {showSearchBar && <SearchBar />}
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default MobileNavbar;
