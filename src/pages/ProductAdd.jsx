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

export default function ProductAdd() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleFormSubmit = async (e) => {
    // 1. check for error
    if (!name || !description || !price || !category) {
      toast.error("Please fill up the fields");
    }
    // 2. trigger the API to create new product
    try {
      await addProduct(name, description, price, category, image, token);
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
