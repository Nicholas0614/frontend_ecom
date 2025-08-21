import Header from "../components/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { updateProduct, getProduct } from "../utils/api_products";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  // load the product data from the backend API , and assign it the state
  useEffect(() => {
    getProduct(id).then((productData) => {
      //update the state with the productData
      if (productData) {
        setName(productData ? productData.name : "");
        setDescription(productData ? productData.description : "");
        setPrice(productData ? productData.price : 0);
        setCategory(productData ? productData.category : "");
      } else {
        setError("Product not found");
      }
    });
  }, [id]);

  const handleFormSubmit = async (e) => {
    // 1. check for error
    if (!name || !price || !category) {
      toast.error("Please fill up the required fields");
    }

    try {
      // 2. trigger the API to update product
      await updateProduct(id, name, description, price, category);

      // 3. if successful, redirect user back to home page and show success message
      toast.success("Product has been updated");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h3" align="center" mb={2} color="error">
            {error}
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go back to home
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      {" "}
      <Header />
      <Container>
        <Typography variant="h3" align="center" mb={3}>
          Edit Product
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
