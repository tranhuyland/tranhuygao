export function generateOrderId() {
  return "ORD-" + Date.now().toString(36).toUpperCase();
}

export function formatOrderDate() {
  return new Date().toISOString();
}
