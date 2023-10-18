"use client"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import React from "react";

const pages = ["Products", "Pricing", "About Us", "Contact Us"];
export default function LandingNav() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleClickNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Typography
            variant="h6"
            color={"secondary"}
            component="div"
            textAlign={"center"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            Company QR
          </Typography>
          <Box
            sx={{
              flexGrow: 3,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
              sx={{ marginRight: "4px" }}
              onClick={() => router.push("/signin")}
            >
              Sign in
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
