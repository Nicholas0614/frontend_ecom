import { useEffect, useState } from "react";
import { getCart, deleteItemFromCart, updateCart } from "../utils/cart";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  let Total = 0;
  for (let i = 0; i < cart.length; i++) {
    Total += cart[i].quantity * cart[i].price;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItemFromCart(id);
        setCart(getCart());
      }
    });
  };

  if (cart.length === 0) {
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
            <Button variant="contained">Cart</Button>
            <Button
              component={Link}
              to="/orders"
              variant="contained"
              sx={{
                backgroundColor: "#d9ecffff",
                color: "rgba(21, 93, 237, 1)",
              }}
            >
              Orders
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
          </Box>
        </Box>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="cart table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>No Product Add Yet !!</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="right"
                    sx={{ fontWeight: "bold" }}
                  ></TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    ${Total}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="end" mt={2}>
            <Button disabled={cart.length === 0} variant="contained">
              Checkout
            </Button>
          </Box>
        </Container>
      </>
    );
  }

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
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Home
          </Button>
          <Button variant="contained">Cart</Button>
          <Button
            component={Link}
            to="/orders"
            variant="contained"
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Orders
          </Button>
          <Button
            component={Link}
            to="/categories"
            variant="contained"
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Categories
          </Button>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="cart table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">${product.price}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">
                    ${product.price * product.quantity}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(product._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  ${Total}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="end" mt={2}>
          <Button
            disabled={cart.length === 0}
            variant="contained"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
}
