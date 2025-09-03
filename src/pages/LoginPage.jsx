import {
  Box,
  Typography,
  Button,
  InputLabel,
  TextField,
  Container,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Login } from "../utils/api_users";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["dlwlrma"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    try {
      // 1. check for error
      if (!email || !password) {
        toast.error("Please fill up all the fields");
      } else {
        const userData = await Login(email, password);
        // set cookies
        setCookie("dlwlrma", userData, {
          maxAge: 60 * 60 * 8,
        });
        toast.success("You have successfully logged in!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {" "}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          mb: 3,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Login to your account
        </Typography>
        <Box display="flex" gap={3} sx={{ justifyContent: "center", pt: 3 }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              backgroundColor: "#d9ecffff",
              color: "rgba(21, 93, 237, 1)",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            variant="contained"
            sx={{
              backgroundColor: "#d9ecffff",
              color: "rgba(21, 93, 237, 1)",
            }}
          >
            Cart
          </Button>
          <Button
            component={Link}
            to="/orders"
            variant="contained"
            sx={{
              backgroundColor: "#d9ecffff",
              color: "rgba(21, 93, 237, 1)",
            }}
          >
            Order
          </Button>
          <Button
            component={Link}
            to="/categories"
            variant="contained"
            sx={{
              backgroundColor: "#d9ecffff",
              color: "rgba(21, 93, 237, 1)",
            }}
          >
            Categories
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              backgroundColor: "#d9ecffff",
              color: "rgba(21, 93, 237, 1)",
            }}
          >
            SignUp
          </Button>
          <Button variant="contained">Login</Button>
        </Box>
      </Box>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: "20px", mt: "20px", mb: "30px" }}>
          <InputLabel>Email</InputLabel>
          <Box sx={{ mt: "5px" }}>
            <TextField
              fullWidth
              type="email"
              placeholder="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </Box>
          <InputLabel sx={{ mt: "20px" }}>Password</InputLabel>
          <Box sx={{ mt: "5px" }}>
            <TextField
              fullWidth
              type="password"
              placeholder="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Box>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            sx={{ width: "512px", mt: "20px" }}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </>
  );
}
