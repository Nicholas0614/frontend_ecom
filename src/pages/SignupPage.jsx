import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";
import { Signup } from "../utils/api_users";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import validator from "email-validator";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["dlwlrma"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleFormSubmit = async (e) => {
    try {
      // 1. check for error
      if (!name || !email || !password || !password2) {
        toast.error("Please fill up all the fields");
      } else if (!validator.validate(email)) {
        // 2. make sure the email is valid
        toast.error("Please use a valid email address");
      } else if (password !== password2) {
        // 2. check for password match
        toast.error("Password is not match");
      } else {
        const userData = await Signup(name, email, password);
        // set cookies
        setCookie("dlwlrma", userData, {
          maxAge: 60 * 60 * 8, // expire in 8 hours
        });
        toast.success("You have successfully signed up an account!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          mb: 3,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Create a new account
        </Typography>
        <Box display="flex" gap={3} sx={{ justifyContent: "center", pt: 3 }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            variant="contained"
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Cart
          </Button>
          <Button
            component={Link}
            to="/orders"
            variant="contained"
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Order
          </Button>
          <Button
            component={Link}
            to="/categories"
            variant="contained"
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Categories
          </Button>
          <Button variant="contained">SignUp</Button>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: "20px", mt: "20px", mb: "30px" }}>
          <InputLabel>Name</InputLabel>
          <Box sx={{ mt: "5px" }}>
            <TextField
              fullWidth
              placeholder="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </Box>
          <InputLabel sx={{ mt: "20px" }}>Email</InputLabel>
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
              placeholder="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Box>
          <InputLabel sx={{ mt: "20px" }}>Confirm Password</InputLabel>
          <Box sx={{ mt: "5px" }}>
            <TextField
              fullWidth
              type="password"
              placeholder="confirm password"
              variant="outlined"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></TextField>
          </Box>
          <Button
            variant="contained"
            sx={{ mt: "10px", width: "512px" }}
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>
        </Paper>
      </Container>
      ;
    </>
  );
}
