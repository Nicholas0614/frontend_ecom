// cart.js

// Get all items in the cart
export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save the cart to localStorage
export function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
export function AddToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    existing.quantity += 1; // increase quantity
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart(cart);
}

// Delete item from cart
export function deleteItemFromCart(id) {
  const cart = getCart().filter((item) => item._id !== id);
  updateCart(cart);
}
