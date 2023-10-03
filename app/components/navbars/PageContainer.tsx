import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

import styles from "../../page.module.css";
type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Stack direction="column" spacing={0} className={styles.main}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:"transparent"}}>
          <Toolbar>
            <Typography variant="h6" color={"secondary"} component="div" sx={{ flexGrow: 1 }}>
            PAKPRO Certification
            </Typography>
            <Button color="secondary" LinkComponent={"a"} href="/qr">Generate Qr codes</Button>
            <Button color="secondary"  LinkComponent={"a"} href="/qr/qrcodes">Display Qr codes</Button>
            <Button color="secondary">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </Stack>
  );
};
