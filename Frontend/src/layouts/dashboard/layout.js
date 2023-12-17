import { useState } from "react";
import { styled } from "@mui/material/styles";
import { withAuthGuard } from "src/hocs/with-auth-guard";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "src/redux/provider";

export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const [openNav, setOpenNav] = useState(true);

  let SIDE_NAV_WIDTH = 280;

  if (!openNav) {
    SIDE_NAV_WIDTH = 0;
  }

  const LayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: SIDE_NAV_WIDTH,
    },
  }));

  const LayoutContainer = styled("div")({
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
  });

  return (
    <Providers>
      <TopNav onNavOpen={() => setOpenNav((prevState) => !prevState)} open={openNav} />
      {openNav && <SideNav onClose={() => setOpenNav(false)} open={openNav} />}
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
      <ToastContainer />
    </Providers>
  );
});
