const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("ypcCart")) || [];

function saveCart() {
  localStorage.setItem("ypcCart", JSON.stringify(cart));
}

function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartCount();
  alert(name + " sepete eklendi.");
}

function renderCartPage() {
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Sepetiniz şu anda boş.</p>";
    cartTotal.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>${item.price} TL</p>
      </div>
      <button onclick="removeFromCart(${index})">Kaldır</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCartPage();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartPage();
}

function completeOrder() {
  if (cart.length === 0) {
    alert("Sepetiniz boş.");
    return;
  }

  alert("Siparişiniz alındı. Bu demo ödeme sistemidir.");
  clearCart();
}

updateCartCount();
renderCartPage();