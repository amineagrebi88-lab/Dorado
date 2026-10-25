const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Base de données factice
const products = [
  { id: 1, name: "Casque Sans Fil Premium", price: 89.99, description: "Son haute fidélité avec réduction de bruit active et 30h d'autonomie.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 2, name: "Montre Connectée Sport", price: 129.50, description: "Suivi cardiaque, GPS intégré et étanchéité jusqu'à 50 mètres.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 3, name: "Clavier Mécanique RGB", price: 65.00, description: "Switchs tactiles silencieux avec rétroéclairage personnalisable.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" }
];

// 1. Tous les produits
app.get('/api/products', (req, res) => {
  res.json(products);
});

// 2. Un seul produit par son ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Produit non trouvé" });
  res.json(product);
});

// 3. Valider la commande
app.post('/api/checkout', (req, res) => {
  const { cart } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: "Le panier est vide." });
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.json({
    success: true,
    message: `Commande validée avec succès ! Total : ${total.toFixed(2)} €`,
    orderId: Math.floor(100000 + Math.random() * 900000)
  });
});

app.listen(PORT, () => {
  console.log(`Serveur prêt sur http://localhost:${PORT}`);
});
// Endpoint pour recevoir les commandes des clients
app.post('/api/orders', (req, res) => {
  const { customer, items, total } = req.body;
  
  console.log('--- NOUVELLE COMMANDE REÇUE ---');
  console.log(`Nom: ${customer.name}`);
  console.log(`Téléphone: ${customer.phone}`);
  console.log(`Adresse: ${customer.address}`);
  console.log(`Articles:`, items.map(i => i.name.ar).join(', '));
  console.log(`Total: ${total} TND`);
  console.log('-------------------------------');

  res.json({ success: true, message: 'Commande reçue avec succès' });
});
