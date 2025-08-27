import axios from "axios";

import { API_URL } from "./constants";

export async function getOrders() {
  const response = await axios.get(API_URL + "orders");
  return response.data;
}

export async function createOrder(
  customerName,
  customerEmail,
  products,
  totalPrice
) {
  const response = await axios.post(API_URL + "orders", {
    customerName: customerName,
    customerEmail: customerEmail,
    products: products,
    totalPrice: totalPrice,
  });
  return response.data;
}

export async function updateOrder(id, status) {
  const response = await axios.put(API_URL + "orders/" + id, {
    status: status,
  });
  return response.data;
}

export async function deleteOrder(id) {
  const response = await axios.delete(API_URL + "orders/" + id);
  return response.data;
}
