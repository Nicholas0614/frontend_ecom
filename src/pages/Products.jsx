import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getProducts } from "../utils/api_products";
import {
  Box,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import Header from "../components/header";
import { deleteProduct } from "../utils/api_products";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { AddToCart } from "../utils/cart";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]);

  const handleProductDelete = async (id) => {
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
        //delete product at the backend
        await deleteProduct(id);
        // delete product from the state
        // setProducts(products.filter((p) => p._id !== id));
        const updatedProducts = await getProducts(category, page);
        setProducts(updatedProducts);
        toast.success("product has been deleted");
      }
    });
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
          Welcome to My Store
        </Typography>
        <Box display="flex" gap={3} sx={{ justifyContent: "center", pt: 3 }}>
          <Button variant="contained">Home</Button>
          <Button
            component={Link}
            to="/cart"
            variant="contained"
            sx={{ backgroundColor: "#d9ecffff", color: "rgba(21, 93, 237, 1)" }}
          >
            Cart
          </Button>
        </Box>
      </Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
          }}
        >
          <h2>Products</h2>
          <Button
            component={Link}
            to="/products/new"
            variant="contained"
            sx={{
              backgroundColor: "#25e35eff",
              fontWeight: "bold",
              borderRadius: 2,
              mb: 2,
            }}
          >
            Add New
          </Button>
        </Box>
        <Box sx={{ display: "flex", px: 2, pb: 2 }}>
          <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ backgroundColor: "white" }}
            >
              Filter By Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Genre"
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="all">ALL</MenuItem>
              <MenuItem value={"Consoles"}>Consoles</MenuItem>
              <MenuItem value={"Games"}>Games</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                <Card
                  sx={{
                    alignContent: "center",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom>{product.name}</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pb: 2,
                      }}
                    >
                      <Chip
                        label={`$${product.price}`}
                        sx={{
                          backgroundColor: "#E6F4EA",
                          color: "green",
                          fontWeight: "bold",
                        }}
                      />
                      <Chip
                        label={product.category.toUpperCase()}
                        sx={{
                          backgroundColor: "#FFE0B2",
                          color: "#E65100",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#1E88E5",
                        fontWeight: "bold",
                        borderRadius: 2,
                        mb: 2,
                      }}
                      onClick={() => {
                        AddToCart(product);
                        toast.success(`${product.name} added to cart`);
                      }}
                    >
                      Add To Cart
                    </Button>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#321ee5ff", borderRadius: 5 }}
                        component={Link}
                        to={`/products/${product._id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#e51e25ff", borderRadius: 5 }}
                        onClick={() => {
                          handleProductDelete(product._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {products.length === 0 ? (
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              No more product found.
            </Typography>
          ) : null}
          <Box
            sx={{
              pt: 2,
              pb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previos
            </Button>
            <span>Page: {page}</span>
            <Button
              variant="contained"
              disabled={products.length === 0}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
