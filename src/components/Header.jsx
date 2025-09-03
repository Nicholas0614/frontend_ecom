import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router";

const Header = (props) => {
  const { current } = props;

  return (
    <Box
      sx={{ py: 4, textAlign: "center", borderBottom: "1px solid #ddd", mb: 3 }}
    >
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          mb: 3,
        }}
      >
        <Box display="flex" gap={3} sx={{ justifyContent: "center", pt: 3 }}>
          <Button
            component={Link}
            to="/"
            variant={current === "Home" ? "contained" : "outlined"}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            variant={current === "cart" ? "contained" : "outlined"}
          >
            Cart
          </Button>
          <Button
            component={Link}
            to="/orders"
            variant={current === "order" ? "contained" : "outlined"}
          >
            Order
          </Button>
          <Button
            component={Link}
            to="/categories"
            variant={current === "categories" ? "contained" : "outlined"}
          >
            Categories
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant={current === "signup" ? "contained" : "outlined"}
          >
            SignUp
          </Button>
          <Button
            component={Link}
            to="/login"
            variant={current === "login" ? "contained" : "outlined"}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
