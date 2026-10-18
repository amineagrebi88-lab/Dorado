let cart = [];

// Charger la liste des produits depuis le backend
async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    
    const container = document.getElementById('products-list');
    container.innerHTML = products.map(p => `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p><strong>${p.price.toFixed(2)} €</strong></p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Ajouter au panier</button>
      </div>
    `).join('');
  } catch (err) {
    console.error("Erreur lors du chargement des produits :", err);
  }
}

function addToCart(id, name, price) {
  cart.push({ id, name, price });
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.length;
  
  const list = document.getElementById('cart-items');
  list.innerHTML = cart.map(item => `<li>${item.name} - ${item.price.toFixed(2)} €</li>`).join('');
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-total').textContent = `${total.toFixed(2)} €`;
  
  document.getElementById('checkout-btn').disabled = cart.length === 0;
}

// Envoyer la commande au backend
document.getElementById('checkout-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart })
    });
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('order-result').innerHTML = `<p style="color: green; font-weight: bold;">${data.message}</p>`;
      cart = [];
      updateCartUI();
    }
  } catch (err) {
    console.error("Erreur lors de la commande :", err);
  }
});

loadProducts();
