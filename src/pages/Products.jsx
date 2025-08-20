import { useState, useEffect } from "react";
import { getProducts } from "../utils/api_products";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import Header from "../components/header";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);

  return (
    <>
      <Header />
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
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">ALL</MenuItem>
            <MenuItem value={"Consoles"}>Consoles</MenuItem>
            <MenuItem value={"Games"}>Games</MenuItem>
            <MenuItem value={"Accessories"}>Accessories</MenuItem>
            <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#e51e25ff", borderRadius: 5 }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
