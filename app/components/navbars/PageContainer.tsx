import { Stack } from "@mui/material";
import React from "react";

import styles from "../../page.module.css";
import { HomeNav } from "./homeNav";
import LandingNav from "./landingNav";
type PageContainerProps = {
  children: React.ReactNode;
  login?: boolean;
};

export const PageContainer = ({ children, login }: PageContainerProps) => {
  return (
    <Stack direction="column" spacing={0} padding={4} className={styles.main}>
      {login ? <HomeNav /> : <LandingNav />}
      {children}
    </Stack>
  );
};
