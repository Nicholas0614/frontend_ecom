import Header from "../components/header";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { addProduct } from "../utils/api_products";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function ProductAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleFormSubmit = async (e) => {
    // 1. check for error
    if (!name || !description || !price || !category) {
      toast.error("Please fill up the fields");
    }
    // 2. trigger the API to create new product
    try {
      await addProduct(name, description, price, category);
      // 3. if successful , redirect user back to home page and show success message
      toast.success("New product has been added");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3" align="center" mb={3}>
          Add New Product
        </Typography>
        <Box
          sx={{
            justifyItems: "center",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Name"
              sx={{ width: "360px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Description"
              sx={{ width: "360px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              type="number"
              label="Price"
              sx={{ width: "360px" }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", px: 2, pb: 2 }}>
            <FormControl sx={{ minWidth: "360px" }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ backgroundColor: "white" }}
              >
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Genre"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value={"Consoles"}>Consoles</MenuItem>
                <MenuItem value={"Games"}>Games</MenuItem>
                <MenuItem value={"Accessories"}>Accessories</MenuItem>
                <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 2, justifyItems: "start" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "360px" }}
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
