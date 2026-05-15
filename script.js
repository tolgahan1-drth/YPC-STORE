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

function getUsers() {
  return JSON.parse(localStorage.getItem("ypcUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("ypcUsers", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("ypcCurrentUser")) || null;
}

function registerUser() {
  const name = document.getElementById("registerName")?.value.trim();
  const email = document.getElementById("registerEmail")?.value.trim();
  const password = document.getElementById("registerPassword")?.value.trim();

  if (!name || !email || !password) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  const users = getUsers();
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    alert("Bu e-posta ile kayıtlı bir hesap var.");
    return;
  }

  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem("ypcCurrentUser", JSON.stringify(newUser));

  alert("Kayıt başarılı. Profil sayfasına yönlendiriliyorsunuz.");
  window.location.href = "profile.html";
}

function loginUser() {
  const email = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value.trim();

  if (!email || !password) {
    alert("Lütfen e-posta ve şifre girin.");
    return;
  }

  const users = getUsers();
  const user = users.find(
    savedUser => savedUser.email === email && savedUser.password === password
  );

  if (!user) {
    alert("E-posta veya şifre hatalı.");
    return;
  }

  localStorage.setItem("ypcCurrentUser", JSON.stringify(user));

  alert("Giriş başarılı.");
  window.location.href = "profile.html";
}

function logoutUser() {
  localStorage.removeItem("ypcCurrentUser");
  alert("Çıkış yapıldı.");
  window.location.href = "index.html";
}

function loadProfile() {
  const user = getCurrentUser();

  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginProfileBtn = document.getElementById("loginProfileBtn");
  const registerProfileBtn = document.getElementById("registerProfileBtn");

  if (!profileName || !profileEmail) return;

  if (user) {
    profileName.textContent = user.name;
    profileEmail.textContent = user.email;

    if (logoutBtn) logoutBtn.style.display = "block";
    if (loginProfileBtn) loginProfileBtn.style.display = "none";
    if (registerProfileBtn) registerProfileBtn.style.display = "none";
  } else {
    profileName.textContent = "Misafir Kullanıcı";
    profileEmail.textContent = "Henüz giriş yapılmadı.";

    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginProfileBtn) loginProfileBtn.style.display = "block";
    if (registerProfileBtn) registerProfileBtn.style.display = "block";
  }
}

loadProfile();