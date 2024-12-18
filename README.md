# APIF2I

APIF2I est une API RESTful qui permet de gérer une base de données JSON contenant une collection diversifiée de livres. Cette API offre des fonctionnalités complètes pour interagir avec la base de données, y compris des opérations CRUD (Create, Read, Update, Delete), des fonctions de tri avancées, et une sécurisation pour protéger les données sensibles.

## Fonctionnalités

### 1. Gestion des livres
- Ajouter un livre à la base de données.
- Récupérer les informations d’un livre ou de plusieurs livres.
- Mettre à jour les informations d’un livre.
- Supprimer un livre.

### 2. Tri et recherche
- Trier les livres par différents critères (titre, auteur, année de publication, genre, etc.).
- Rechercher des livres selon des mots-clés ou des filtres précis.

### 3. Sécurisation
- Authentification pour accéder à certaines routes sensibles.
- Validation des entrées pour garantir l’intégrité des données.
- Gestion des permissions pour séparer les accès en lecture et écriture.

## Exemple de structure de la base de données JSON
Le fichier JSON de la base de données est nommé `Bibliothèque.json` et contient des entrées comme l’exemple suivant :
```json
{
  "id": 1,
  "title": "The Lost World",
  "author": "Arthur Conan Doyle",
  "description": "A thrilling adventure to a prehistoric plateau.",
  "genre": "Adventure",
  "type": "Novel",
  "publication_date": "1912-01-01"
}
```

## Installation

1. **Clonez le dépôt**
   ```bash
   git clone https://github.com/votre-utilisateur/APIF2I.git
   cd APIF2I
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Configurez l’API**
   - Renommez le fichier `.env.example` en `.env`.
   - Remplissez les variables d’environnement nécessaires (exemple : port, clés de sécurité).

4. **Démarrez le serveur**
   ```bash
   npm start
   ```
   L’API sera disponible à l’adresse `http://localhost:3000` (par défaut).

## Utilisation

### Routes principales

#### 1. **CRUD**
- **GET /books** : Récupérer tous les livres.
- **GET /books/:id** : Récupérer un livre par ID.
- **POST /books** : Ajouter un nouveau livre.
- **PUT /books/:id** : Mettre à jour un livre existant.
- **DELETE /books/:id** : Supprimer un livre.

#### 2. **Tri et recherche**
- **GET /books?sort=title** : Trier les livres par titre.
- **GET /books?author=nom-auteur** : Filtrer les livres par auteur.

#### 3. **Sécurité**
- Les routes sensibles (exemple : POST, PUT, DELETE) nécessitent un token JWT valide.

### Exemple de requête
```bash
curl -X POST http://localhost:3000/books \
  -H "Authorization: Bearer <votre_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Le Petit Prince",
    "author": "Antoine de Saint-Exupéry",
    "year": 1943,
    "genre": "Fiction"
  }'
```

## Technologies
- **Node.js** : Runtime pour le backend.
- **Express.js** : Framework minimaliste pour créer l’API.
- **JSON** : Format pour stocker les données des livres.
- **JWT** : Authentification et gestion des sessions.

## Contribution
Les contributions sont les bienvenues ! Suivez ces étapes :

1. Forkez le dépôt.
2. Créez une branche pour votre fonctionnalité/bugfix.
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```
3. Faites vos modifications et committez-les.
   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```
4. Poussez la branche et ouvrez une Pull Request.
   ```bash
   git push origin feature/nouvelle-fonctionnalité
   ```

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Merci d’utiliser APIF2I ! Si vous avez des questions ou des suggestions, n’hésitez pas à ouvrir une issue.

