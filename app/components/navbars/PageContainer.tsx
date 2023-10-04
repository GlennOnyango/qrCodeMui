import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";

import styles from "../../page.module.css";
import QrContext from "@/app/context/QrContext";
type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  const qrcontext = useContext(QrContext);
  const handleContext = () => {
    qrcontext.setCompanyArray([]);
  }
  return (
    <Stack direction="column" spacing={0} className={styles.main}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:"transparent"}}>
          <Toolbar>
            <Typography variant="h6" color={"secondary"} component="div" sx={{ flexGrow: 1 }}>
            PAKPRO Certification
            </Typography>
            <Button color="secondary" LinkComponent={"a"} onClick={handleContext} href="/qr">Generate Qr codes</Button>
            <Button color="secondary"  LinkComponent={"a"} onClick={handleContext} href="/qr/qrcodes">Display Qr codes</Button>
            <Button color="secondary">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </Stack>
  );
};
