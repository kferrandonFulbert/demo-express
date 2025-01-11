# Application Web avec Express

Ce projet est une application web simple construite avec [Express.js](https://expressjs.com/) pour démontrer l'utilisation des middlewares, du routage et des interactions utilisateur de base. Elle inclut des fonctionnalités comme le blocage d'IP, la limitation de requêtes et la gestion de formulaires.

---

## Fonctionnalités

- **Helmet.js** : Ajoute des en-têtes de sécurité à l'application.
- **Limitation de requêtes** : Empêche les abus en limitant le nombre de requêtes par IP.
- **Blocage d'IP** : Bloque manuellement certaines adresses IP spécifiques.
- **Gestion de formulaires** : Permet aux utilisateurs de sélectionner et de soumettre leur navigateur préféré.
- **API JSON basique** : Fournit une liste de navigateurs populaires au format JSON.
- **Traçage des requêtes** : Enregistre toutes les requêtes entrantes avec des horodatages et des adresses IP.

---

## Points de terminaison (Endpoints)

### `/`
Affiche un formulaire permettant aux utilisateurs de sélectionner leur navigateur préféré dans une liste déroulante.

### `/navigateurs`
Retourne un tableau JSON des navigateurs populaires :
```json
["Firefox", "Brave", "Chrome", "Safari", "Edge", "Opera"]
```

### `/choix`
Traite la sélection du navigateur par l'utilisateur et affiche le navigateur choisi.

### `/apropos`
Fournit des informations sur le projet et sur l'utilisation d'Express.js.

---

## Installation

### Prérequis
- [Node.js](https://nodejs.org/) installé (version 16 ou ultérieure recommandée).

### Étapes

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/your-repo/express-web-app.git
   cd express-web-app
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Démarrez l'application :
   ```bash
   node app.js
   ```

4. Accédez à l'application à l'adresse [http://localhost:3000](http://localhost:3000).

---

## Utilisation

- Ouvrez la page d'accueil (`/`) pour choisir votre navigateur préféré.
- Accédez à `/navigateurs` pour voir une liste des navigateurs pris en charge au format JSON.
- Apprenez-en davantage sur l'application en visitant `/apropos`.

---

## Fonctionnalités de sécurité

- **Blocage d'IP** : Bloque certaines adresses IP spécifiques de l'accès à l'application.
- **Limitation de requêtes** : Limite chaque IP à 100 requêtes toutes les 15 minutes.
- **Intégration avec Helmet** : Ajoute des en-têtes de sécurité pour protéger contre les vulnérabilités courantes.

---

## Personnalisation

### Mettre à jour les IP bloquées
Pour ajouter ou supprimer des IP bloquées, modifiez le tableau `blockedIPs` dans `app.js` :
```javascript
const blockedIPs = ['192.168.1.1', '10.0.0.1'];
```

### Modifier les limites de requêtes
Ajustez la configuration dans le middleware `rateLimit` :
```javascript
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre de temps
    message: 'Trop de requêtes, réessayez plus tard.',
});
```

---

## Problèmes connus
- Pas d'intégration avec un WAF externe (par exemple, Cloudflare ou AWS WAF).
- Les IP bloquées sont codées en dur.
- Ce projet est à des fins de démonstration et peut nécessiter des ajustements pour un usage en production.

---

## Contribution
N'hésitez pas à forker le dépôt et à soumettre des pull requests pour des améliorations ou des corrections de bugs.

---

## Licence
Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.