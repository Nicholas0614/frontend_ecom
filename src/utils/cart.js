// cart.js
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Get all items in the cart
export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save the cart to localStorage
export function updateCart(productId, updatedProduct) {
  let cart = getCart();
  cart = cart.map((item) =>
    item._id === productId ? { ...item, ...updatedProduct } : item
  );
  saveCart(cart);
  return cart;
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

  saveCart(cart);
  return cart;
}

// Delete item from cart
export function deleteItemFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item._id !== productId);
  saveCart(cart);
  return cart;
}
