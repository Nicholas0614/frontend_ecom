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

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleFormSubmit = async (e) => {
    // if (!name || !email || !password || !password2) {
    //   toast.error("Please fill up the fields");
    // }
    // try {
    //   await Signup(name, email, password);
    //   toast.success("Sign up successfully");
    // } catch (e) {
    //   toast.error(e.message);
    // }

    const data = await Signup(name, email, password);
    console.log(data);
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
          <InputLabel>Password</InputLabel>
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
          <InputLabel>Confirm Password</InputLabel>
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
