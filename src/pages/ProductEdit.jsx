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
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";
import { getCategories } from "../utils/api_categories";
import { useCookies } from "react-cookie";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // load the product data from the backend API , and assign it the state

  useEffect(() => {
    getProduct(id).then((productData) => {
      //update the state with the productData
      if (productData) {
        setName(productData ? productData.name : "");
        setDescription(productData ? productData.description : "");
        setPrice(productData ? productData.price : 0);
        setCategory(productData ? productData.category : "");
        setImage(productData ? productData.image : null);
      } else {
        setError("Product not found");
      }
    });
  }, [id]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleFormSubmit = async (e) => {
    // 1. check for error
    if (!name || !price || !category) {
      toast.error("Please fill up the required fields");
    }

    try {
      // 2. trigger the API to update product
      await updateProduct(id, name, description, price, category, image, token);

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
                {categories.map((cate) => (
                  <MenuItem key={cate._id} value={cate.label}>
                    {cate.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            mb={2}
            sx={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            {image ? (
              <>
                <img src={API_URL + image} width="100px" />
                <Button
                  color="info"
                  variant="contained"
                  size="small"
                  onClick={() => setImage(null)}
                >
                  Remove
                </Button>
              </>
            ) : (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload image
                <VisuallyHiddenInput
                  type="file"
                  onChange={async (event) => {
                    const data = await uploadImage(event.target.files[0]);
                    setImage(data.image_url);
                    // {image_url: "uploads/image.jpg"}
                  }}
                  accept="image/*"
                />
              </Button>
            )}
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
