# Backend Legion Store

Le projet utilise Firebase Firestore via le SDK client. La configuration est à remplacer dans `src/firebase.js`.

## Collections

### products
- `name`: nom du modèle
- `description`: présentation courte
- `price`: prix en euros
- `stock`: quantité disponible
- `availability`: libellé de disponibilité
- `featured`: mise en avant booléenne
- `image`: URL du visuel
- `specs`: objet de caractéristiques techniques

### orders
- `name`, `email`, `phone`, `address`, `note`: coordonnées de commande
- `items`: snapshot des produits et quantités
- `subtotal`: montant calculé côté client, à recalculer côté serveur avant traitement réel
- `status`: `nouvelle`, puis états de traitement
- `createdAt`: horodatage Firestore

### messages
- `name`, `email`, `message`: contenu du formulaire de contact
- `createdAt`: horodatage Firestore

## Relations et opérations

Les commandes contiennent un snapshot des produits, afin de conserver le prix et le nom au moment de la demande. Il n'y a pas de compte client dans le MVP. Le panier reste dans `sessionStorage` et n'est pas une collection Firestore.

- Catalogue: lecture de `products`, filtrage côté client.
- Administration: création, modification et suppression de `products`.
- Commande: création d'un document `orders`, puis vidage du panier de session.
- Contact: création d'un document `messages`.

L'interface d'administration proposée est une première couche UI. L'authentification Firebase doit remplacer le bouton de démonstration avant mise en production, avec un contrôle de rôle administrateur.

Les règles ci-jointes doivent être collées manuellement dans Firebase Console > Firestore Database > Règles, car elles ne se déploient pas automatiquement depuis GitHub. Pour une sécurité complète, les prix et le stock doivent être validés dans une fonction serveur ou une Cloud Function avant acceptation d'une commande.
