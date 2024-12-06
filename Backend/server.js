const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 27017;
const SECRET_KEY = 'votre_secret_pour_token';


app.use(cors());
app.use(bodyParser.json());


const users = [
    { username: 'test', password: bcrypt.hashSync('password', 10) }
];


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Serveur Node.js démarré sur http://localhost:${PORT}`);
});
