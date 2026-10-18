const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
// Render fournit automatiquement la variable d'environnement PORT
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Données factices des produits
const products = [
  { id: 1, name: "Casque Sans Fil Premium", price: 89.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
  { id: 2, name: "Montre Connectée Sport", price: 129.50, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
  { id: 3, name: "Clavier Mécanique RGB", price: 65.00, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300" }
];

// Endpoint API : Récupérer les produits
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Endpoint API : Valider la commande
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

// Redirection par défaut vers le frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
