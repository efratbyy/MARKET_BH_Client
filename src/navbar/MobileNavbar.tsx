import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
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
  const [totalItemsInCart, setTotalItemsInCart] = React.useState<number>(0);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
      {/* Mobile NavBar */}
      <Grid
        container
        maxWidth="xl"
        sx={{
          backgroundColor: "#5b9822",
          display: { md: "none" },
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        {/* top container */}
        <Grid
          container
          item
          sx={{ display: { md: "none" } }}
          justifyContent="center"
          alignItems="center"
        >
          {/* Side NavBar */}
          {user && (
            <Grid item xs={1} sx={{ paddingRight: "10px" }}>
              <SideNavBar showDataFilter={showDataFilter} />
            </Grid>
          )}

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

          {/* Title */}
          <Grid item xs={9}>
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
                fontSize: "110%",
              }}
            >
              מרקט גבעת בית הכרם
            </Typography>
          </Grid>

          {/* Avatar */}
          {user && (
            <Grid
              xs={2}
              item
              display={"flex"}
              justifyContent={"end"}
              sx={{ flexGrow: 0, paddingLeft: "5px" }}
            >
              <AvatarMenu />
            </Grid>
          )}

          {/* login/register */}
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
        </Grid>

        {/* bottom container */}
        <Grid
          container
          item
          sx={{ display: { md: "none" }, mb: "15px", height: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          {/* Cart Icon */}
          {user && (
            <Grid
              item
              xs={showSearchBar ? 2 : 12}
              sx={{ paddingRight: "15px" }}
            >
              <IconButton
                onClick={() => navigate(ROUTES.SHOPPING_CART)}
                aria-label="cart"
              >
                <StyledBadge badgeContent={totalItemsInCart} color="default">
                  <ShoppingCartIcon sx={{ color: "#282828", fontSize: 40 }} />
                </StyledBadge>
              </IconButton>
            </Grid>
          )}

          {/* Search Bar */}
          <Grid
            item
            xs={showSearchBar ? 10 : 0}
            sx={{ paddingLeft: "10px", paddingRight: "10px" }}
          >
            {showSearchBar && <SearchBar />}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default MobileNavbar;
