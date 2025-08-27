import { useState, useEffect } from "react";
import { getCart, updateCart } from "../utils/cart";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { toast } from "sonner";
import validator from "email-validator";
import { createOrder } from "../utils/api_orders";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function CheckoutPage() {
  const [cart, setCart] = useState(getCart());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity * cart[i].price;
    }
    return total;
  };

  const handleCheckout = async () => {
    // 1. make sure the name and email fields is not empty
    if (!name || !email) {
      toast.error("Pls field out everything");
    } else if (!validator.validate(email)) {
      toast.error("Pls use a valid email address");
    } else {
      try {
        setLoading(true);
        const totalPrice = getTotal();
        const response = await createOrder(name, email, cart, totalPrice);
        const billplz_url = response.billplz_url;
        window.location.href = billplz_url;
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        // close the loading backdrop
        setLoading(false);
      }
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
          Cart
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
            variant="contained"
            sx={{
              backgroundColor: "#d9ecffff",
              color: "rgba(21, 93, 237, 1)",
            }}
          >
            Cart
          </Button>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5" mb={2}>
              Contact Information
            </Typography>
            <Box mb={2}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </Box>
            <Box mb={2}>
              <Button fullWidth variant="contained" onClick={handleCheckout}>
                Pay ${getTotal()}
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5" mb={2}>
              Your Order Summary
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="cart table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.name}</TableCell>

                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        ${product.price * product.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}></TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      ${getTotal()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
