# Backend Legion Store

## Configuration
Le projet utilise Firebase Firestore côté client. Remplacer les valeurs de `src/firebase.js` par celles d'un projet Firebase gratuit, puis activer Firestore. Le formulaire transmet une demande de commande, sans paiement en ligne.

## Collections

### `products`
- `name` : nom du modèle
- `slug` : identifiant public
- `price` : prix numérique contrôlé côté serveur ou par une Cloud Function en production
- `stock` : quantité disponible
- `specs` : tableau de spécifications
- `images` : tableau d'URL de visuels validés
- `tag` : catégorie courte
- `createdAt`, `updatedAt` : timestamps

### `orders`
- `customer.name`, `customer.email`, `customer.phone`
- `items[]` : `productId`, `name`, `quantity`, `unitPrice`
- `total` : sous-total calculé côté serveur en production
- `status` : `nouvelle`, `en cours`, `confirmée` ou `annulée`
- `createdAt`, `updatedAt`

### `messages`
- `name`, `email`, `phone`, `message`, `createdAt`, `status`

## Relations
`orders.items[].productId` référence `products/{productId}`. Les demandes conservent aussi le nom et le prix au moment de l'envoi pour l'historique. Il n'y a pas de compte client dans le MVP.

## Opérations prévues
- Catalogue : lecture publique de `products`, filtrage et tri côté client.
- Demande : création de `orders` depuis le formulaire.
- Contact : création de `messages` si un formulaire de contact séparé est ajouté.
- Administration après MVP : CRUD des produits et lecture / mise à jour du statut des commandes, derrière authentification Firebase Admin.

Les règles de `firestore.rules` doivent être collées manuellement dans la console Firebase. En production, déplacer le calcul du prix et la validation de stock côté serveur ou Cloud Functions.