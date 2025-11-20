// --------------------- PANIER ------------------------

let cart = [];

// Mise à jour de la barre panier
function updateCartBar() {
    const bar = document.getElementById("cart-bar");
    if (cart.length > 0) {
        bar.style.display = "block";
        bar.textContent = `🛍️ Voir mon panier (${getTotalItems()} articles)`;
    } else {
        bar.style.display = "none";
    }
}

// Nombre total d’articles
function getTotalItems() {
    return cart.reduce((s, i) => s + i.quantity, 0);
}

// Ajouter un produit
function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartBar();
}

// --------------------- MODAL ------------------------

function openCart() {
    document.getElementById("cart-modal-overlay").style.display = "block";
    document.getElementById("cart-modal").style.display = "block";
    renderCart();
}

function closeCart() {
    document.getElementById("cart-modal-overlay").style.display = "none";
    document.getElementById("cart-modal").style.display = "none";
}

document.getElementById("cart-close-btn").onclick = closeCart;

// --------------------- AFFICHAGE PANIER ------------------------

function renderCart() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item">
                <span class="cart-name">${item.name}</span>
                <div class="cart-controls">
                    <button class="cart-btn" onclick="decrease(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-btn" onclick="increase(${index})">+</button>
                </div>
            </div>
        `;
    });

    document.getElementById("cart-total-price").textContent =
        `${getTotalPrice()} Fcfa`;
}

// Augmenter quantité
function increase(index) {
    cart[index].quantity++;
    renderCart();
    updateCartBar();
}

// Diminuer quantité
function decrease(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    renderCart();
    updateCartBar();
}

// Prix total
function getTotalPrice() {
    return cart.reduce((s, i) => s + i.price * i.quantity, 0);
}

// --------------------- ENVOI WHATSAPP ------------------------

document.getElementById("cart-whatsapp-btn").onclick = function () {

    if (cart.length === 0) return;

    let msg = "Bonjour, je souhaite commander :\n\n";

    cart.forEach(i => {
        msg += `• ${i.quantity} × ${i.name} — ${i.price * i.quantity} Fcfa\n`;
    });

    msg += `\nTotal : ${getTotalPrice()} Fcfa`;

    const phone = "2250716699999"; // ton numéro
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

    window.location.href = url;
};
