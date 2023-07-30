export function calculateAmount(cartItems) {
  let amount = 0;
  cartItems.map((item) => (amount += item.option.price * item.qty + (item.frame?.price||0)));
  return amount.toFixed(2);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("tn-TN", {
    style: "currency",
    currency: "TND",
  }).format(price.toFixed(2));
}
