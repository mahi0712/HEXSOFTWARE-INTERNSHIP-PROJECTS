// ---- Menu Data (live menu items with images) ----
const menuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    desc: "Aromatic basmati rice with spiced chicken.",
    price: 450,
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400"
  },
  {
    id: 2,
    name: "Beef Burger",
    desc: "Juicy beef patty with cheese and fresh veggies.",
    price: 550,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"
  },
  {
  id: 3,
  name: "Margherita Pizza",
  desc: "Classic pizza with mozzarella and basil.",
  price: 900,
  img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
},
  {
    id: 4,
    name: "Pasta Alfredo",
    desc: "Creamy white sauce pasta with herbs.",
    price: 650,
    img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400"
  },
  {
    id: 5,
    name: "Caesar Salad",
    desc: "Crisp lettuce, croutons, parmesan, Caesar dressing.",
    price: 350,
    img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400"
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    desc: "Warm chocolate cake with a molten center.",
    price: 400,
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400"
  }
];

// ---- Cart State (frontend only, no backend) ----
let cart = [];

const menuGrid = document.getElementById("menuGrid");
const cartItemsDiv = document.getElementById("cartItems");
const cartTotalSpan = document.getElementById("cartTotal");
const emptyCartMsg = document.getElementById("emptyCartMsg");
const checkoutBtn = document.getElementById("checkoutBtn");

// ---- Render Menu ----
function renderMenu() {
  menuGrid.innerHTML = "";
  menuItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="menu-card-body">
        <h3>${item.name}</h3>
        <p class="desc">${item.desc}</p>
        <span class="price">Rs. ${item.price}</span>
        <button class="add-btn" data-id="${item.id}">Add to Cart</button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

// ---- Render Cart ----
function renderCart() {
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p id="emptyCartMsg">Your cart is empty. Add some delicious items!</p>`;
    cartTotalSpan.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach(cartItem => {
    const itemTotal = cartItem.price * cartItem.qty;
    total += itemTotal;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${cartItem.name} (Rs. ${cartItem.price})</span>
      <div class="qty-controls">
        <button class="decrease" data-id="${cartItem.id}">-</button>
        <span>${cartItem.qty}</span>
        <button class="increase" data-id="${cartItem.id}">+</button>
        <button class="remove-btn" data-id="${cartItem.id}">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(row);
  });

  cartTotalSpan.textContent = total;
}

// ---- Add to Cart ----
menuGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = parseInt(e.target.dataset.id);
    const item = menuItems.find(m => m.id === id);
    const existing = cart.find(c => c.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    renderCart();
  }
});

// ---- Update Quantity / Remove ----
cartItemsDiv.addEventListener("click", (e) => {
  const id = parseInt(e.target.dataset.id);
  if (!id) return;

  const item = cart.find(c => c.id === id);
  if (!item) return;

  if (e.target.classList.contains("increase")) {
    item.qty += 1;
  } else if (e.target.classList.contains("decrease")) {
    item.qty -= 1;
    if (item.qty <= 0) {
      cart = cart.filter(c => c.id !== id);
    }
  } else if (e.target.classList.contains("remove-btn")) {
    cart = cart.filter(c => c.id !== id);
  }

  renderCart();
});

// ---- Checkout (frontend only demo) ----
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before checkout.");
    return;
  }
  alert("Order placed successfully! (This is a frontend demo — no backend connected.)");
  cart = [];
  renderCart();
});

// ---- Init ----
renderMenu();
renderCart();