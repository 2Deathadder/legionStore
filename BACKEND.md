# Backend Firestore - Legion Store

Configuration : remplacer les valeurs de `src/firebase.js` par celles d’un projet Firebase gratuit, activer Firestore et Authentication par e-mail/mot de passe.

## Collections

- `products`: `name`, `category`, `price`, `stock`, `available`, `description`, `images[]`, `specs{}`, `createdAt`, `updatedAt`.
- `orders`: `name`, `email`, `phone`, `address`, `notes`, `items[]` contenant `id`, `name`, `price`, `quantity`, `image`, `total`, `status` (`new`, `in_progress`, `processed`, `cancelled`), `createdAt`, `updatedAt`.
- `messages`: `name`, `email`, `message`, `status`, `createdAt`.

## Relations

Les éléments de `orders.items` référencent un produit par son identifiant `products.id`. Le panier reste local au navigateur jusqu’à la validation. La création d’une commande utilise une transaction Firestore qui vérifie et décrémente le stock.

## Opérations CRUD

- Catalogue : lecture publique de `products`.
- Administration : création, lecture, modification et suppression de `products`.
- Commande : création publique validée par transaction, lecture et modification des statuts réservées à l’administration.
- Contact : création publique de `messages`; consultation réservée à l’administration, à ajouter si nécessaire dans l’interface.

Les règles présentes dans `firestore.rules` doivent être collées manuellement dans la console Firebase. L’administration doit utiliser un compte Firebase dont le custom claim `admin` vaut `true`. Le paiement, les comptes clients, l’expédition et les e-mails automatisés restent hors MVP.
