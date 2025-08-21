import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <Box
      sx={{ py: 4, textAlign: "center", borderBottom: "1px solid #ddd", mb: 3 }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Welcome to My Store
      </Typography>
    </Box>
  );
};

export default Header;
