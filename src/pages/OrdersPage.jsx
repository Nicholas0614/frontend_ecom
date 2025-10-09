import { Container, Box, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router";
import Header from "../components/header";
import { useState, useEffect } from "react";
import { getOrders, deleteOrder, updateOrder } from "../utils/api_orders";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useCookies } from "react-cookie";

export default function OrdersPage() {
  // store orders data from API

  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;
  const [orders, setOrders] = useState([]);

  // call the API
  useEffect(() => {
    getOrders(token)
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleUpdate = async (id, newStatus) => {
    try {
      await updateOrder(id, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteOrder(id);
        const updatedOrders = await getOrders(token);
        setOrders(updatedOrders);
      }
    });
  };

  console.log(orders);

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
          Orders
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

          <Button variant="contained">Orders</Button>
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
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="cart table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box>{order.customerName}</Box>
                      <Box>({order.customerEmail})</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.products.map((item) => (
                      <Box key={item._id}>{item.name}</Box>
                    ))}
                  </TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    {order.status !== "pending" ? (
                      <Box sx={{ display: "flex", px: 2, pb: 2 }}>
                        <FormControl
                          disabled={order.status === "pending"}
                          sx={{ minWidth: 200 }}
                        >
                          <Select
                            labelId="status-label"
                            id="status"
                            value={order.status}
                            onChange={(e) =>
                              handleUpdate(order._id, e.target.value)
                            }
                          >
                            <MenuItem value="paid">Paid</MenuItem>
                            <MenuItem value="failed">Failed</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", px: 2, pb: 2 }}>
                        <FormControl
                          disabled={order.status === "pending"}
                          sx={{ minWidth: 200 }}
                        >
                          <Select
                            labelId="status-label"
                            id="status"
                            value={order.status}
                            onChange={(e) =>
                              handleUpdate(order._id, e.target.value)
                            }
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                            <MenuItem value="shipped">Shipped</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{order.paid_at}</TableCell>
                  <TableCell align="right">
                    {order.status === "pending" ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
