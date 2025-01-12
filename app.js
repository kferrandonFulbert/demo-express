const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Middleware pour limiter les requêtes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Trop de requêtes, réessayez plus tard.',
});
app.use(limiter);

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Liste des navigateurs
const navigateurs = ['Firefox', 'Brave', 'Chrome', 'Safari', 'Edge', 'Opera'];

// Menu HTML
const menuHTML = `
<nav>
    <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/navigateurs">Navigateurs</a></li>
        <li><a href="/apropos">À propos</a></li>
    </ul>
</nav>
`;



app.get('/navigateurs', (req, res) => {
    res.json(navigateurs);
});

app.post('/choix', (req, res) => {
    const navigateurChoisi = req.body.navigateur;
    res.send(`
        ${menuHTML}
        <h1>Merci pour votre choix !</h1>
        <p>Vous avez choisi : <strong>${navigateurChoisi}</strong></p>
        <a href="/">Revenir à l'accueil</a>
    `);
});

app.get('/apropos', (req, res) => {
    res.send(`
        ${menuHTML}
        <h1>À propos</h1>
        <p>Ce site est conçu pour démontrer les fonctionnalités d'Express.js, y compris le routage, la gestion des formulaires et les middlewares.</p>
    `);
});

// Routes
app.get('/', (req, res) => {
    const formHTML = `
        ${menuHTML}
        <h1>Choisissez votre navigateur préféré</h1>
        <form action="/choix" method="POST">
            <label for="navigateur">Navigateur :</label>
            <select name="navigateur" id="navigateur">
                ${navigateurs.map(nav => `<option value="${nav}">${nav}</option>`).join('')}
            </select>
            <button type="submit">Valider</button>
        </form>
    `;
    res.send(formHTML);
});

// Serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Application en cours d'exécution sur http://localhost:${PORT}`);
});
