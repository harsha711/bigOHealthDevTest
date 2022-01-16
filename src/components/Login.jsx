import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Login() {
  const [loginState, setloginState] = useState(false);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile }),
      };
      const response = await fetch(
        "https://bigohealthdevtest.herokuapp.com/login",
        requestOptions
      );
      const fetchedData = await response.json();
      if (!fetchedData.auth) {
        if (fetchedData.message.errors[0].msg.length !== 0) {
          setMessage(fetchedData.message.errors[0].msg);
        } else {
          setMessage(fetchedData.message);
        }
      } else {
        setUser(fetchedData);
        navigate("/view");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xs" sx={{ my: 10 }}>
        <Paper variant="elevation" elevation={2} sx={{ p: 5 }}>
          <Typography variant="h5" align="center">
            Loading... Please wait
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs" sx={{ my: 10 }}>
      <Paper variant="elevation" elevation={2} sx={{ p: 5 }}>
        <Grid
          container
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          spacing={2}
        >
          <Grid item sx={{ my: 1 }}>
            <Typography variant="h6">Welcome to BigOHealth</Typography>
          </Grid>
          <Grid item>
            <TextField
              type="text"
              variant="standard"
              label="Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              required
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={async () => {
                await handleLogin();
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            {message.length !== 0 ? (
              <Typography variant="subtitle2" color="red">
                {message}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
