import axios from "axios";

const API_URL = "http://localhost:1122/";

export async function getProducts(category) {
  const response = await axios.get(
    API_URL + "products" + (category === "all" ? "" : "?category=" + category)
  );
  return response.data;
}
