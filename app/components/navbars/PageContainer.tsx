import { Box, Stack } from "@mui/material";
import React from "react";

import styles from "../../page.module.css";
import { HomeNav } from "./homeNav";
import LandingNav from "./landingNav";
import Footer from "../footer";
import { QueryClient, QueryClientProvider } from "react-query";
type PageContainerProps = {
  children: React.ReactNode;
  login?: boolean;
  footerShow?: boolean;
};

export const PageContainer = ({
  children,
  login,
  footerShow,
}: PageContainerProps) => {
  return (
      <Stack
        direction="column"
        spacing={0}
        padding={0}
        className={styles.main}
        bgcolor={"#fafafa"}
      >
        {login ? <HomeNav /> : <LandingNav />}
        {children}

        <Box sx={{ flexGrow: 1 }} bgcolor={"transparent"} paddingX={6} mt={2}>
          {footerShow ? null : <Footer />}
        </Box>
      </Stack>
  );
};
