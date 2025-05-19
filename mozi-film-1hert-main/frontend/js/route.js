const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// MySQL kapcsolódás
const sequelize = new Sequelize('mozi_db', 'db_user', 'db_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const Movie = sequelize.define('Movie', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false }
});

const app = express();
app.use(express.json());

const checkAdmin = (req, res, next) => {
    if (req.headers['x-admin'] === 'true') {
        next();
    } else {
        res.status(403).json({ error: 'Nem admin' });
    }
};

app.post('/movies', checkAdmin, async (req, res) => {
    try {
        const movie = await Movie.create({
            title: req.body.title,
            description: req.body.description,
            year: req.body.year
        });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: 'Hiba a film létrehozásakor' });
    }
});

app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Hiba a filmek lekérdezésekor' });
    }
});

app.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Film nem található' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Hiba a film lekérdezésekor' });
    }
});

sequelize.authenticate()
    .then(() => sequelize.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log('Server elindult: http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Nem sikerült kapcsolódni a MySQL-hez:', err);
    });
