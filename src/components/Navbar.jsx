import React from "react";
import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../App";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          BigOHealth
          <Link
            title="Github"
            component="a"
            target="_blank"
            href="https://github.com/harsha711/audioPlayer-react"
            color="inherit"
          >
            <IconButton color="inherit" sx={{ mx: 2 }}>
              <GitHub />
            </IconButton>
          </Link>
        </Typography>
        {user.auth && (
          <Typography variant="subtitle2" color="inherit" sx={{ mx: 2 }}>
            Welcome, {user.name}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
