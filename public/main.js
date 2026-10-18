// Récupérer le panier depuis le stockage local
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Sauvegarder le panier
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

// Ajouter un produit au panier
function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  alert(`${product.name} a été ajouté au panier !`);
}

// Mettre à jour le nombre d'articles dans la barre de navigation
function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
