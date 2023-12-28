import * as React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

type Props = {
  showSearchBar?: boolean;
  showDataFilter?: boolean;
};

const Navbar: React.FC<Props> = ({
  showSearchBar = true,
  showDataFilter = true,
}) => {
  return (
    <>
      <DesktopNavbar showSearchBar={showSearchBar} />
      <MobileNavbar
        showDataFilter={showDataFilter}
        showSearchBar={showSearchBar}
      />
    </>
  );
};
export default Navbar;
