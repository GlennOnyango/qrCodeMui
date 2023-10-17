import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";

import QrContext from "@/app/context/QrContext";

export const HomeNav = () => {
  const qrcontext = useContext(QrContext);
  const handleContext = () => {
    qrcontext.setCompanyArray([]);
  };
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
        <Toolbar>
          <Typography
            variant="h6"
            color={"secondary"}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            PAKPRO Certification
          </Typography>
          <Button
            color="secondary"
            LinkComponent={"a"}
            onClick={handleContext}
            href="/qr"
          >
            Generate Qr codes
          </Button>
          <Button
            color="secondary"
            LinkComponent={"a"}
            onClick={handleContext}
            href="/qr/qrcodes"
          >
            Display Qr codes
          </Button>
          <Button
            color="secondary"
            LinkComponent={"a"}
            onClick={handleContext}
            href="/qr/qrcodes"
          >
            Uploaded excel sheets
          </Button>
          <Button color="secondary">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
