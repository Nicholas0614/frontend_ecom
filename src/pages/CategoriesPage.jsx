import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  InputLabel,
  TextField,
} from "@mui/material";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updatedCategory,
} from "../utils/api_categories";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function CategoriesPage() {
  const [label, setLabel] = useState("");
  const [categories, setCategories] = useState([]);

  // Load categories when page loads
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = async (id, currentLabel) => {
    const { value: newLabel } = await Swal.fire({
      title: "Edit Category",
      input: "text",
      inputLabel: "Category name",
      inputValue: currentLabel,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
    });

    if (newLabel) {
      try {
        await updatedCategory(id, newLabel); // ✅ update in backend
        toast.success("Category updated successfully!");
        fetchCategories(); // reload list
      } catch (err) {
        toast.error("Failed to update category");
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
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
        try {
          await deleteCategory(id); // ✅ delete from backend
          setCategories((prev) => prev.filter((cat) => cat._id !== id)); // ✅ update UI
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to delete category.", "error");
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!label) {
      toast.error("Please fill up the fields");
      return;
    }
    try {
      await addCategory(label); // send to backend
      toast.success("New category has been added");
      setLabel(""); // clear input
      fetchCategories(); // 🔑 re-fetch from backend
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          mb: 3,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Welcome to My Store
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
          <Button variant="contained">Categories</Button>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Add New Category */}
        <Paper elevation={3} sx={{ p: "20px", mt: "20px", mb: "30px" }}>
          <InputLabel>Add New Category</InputLabel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              mt: "5px",
            }}
          >
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </Box>
        </Paper>

        {/* Categories Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="categories table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.label}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(category._id, category.label)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ml: "10px" }}
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
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
