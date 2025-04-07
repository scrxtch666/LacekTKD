const app = require("express");
const router = app.Router();
const eventRouter = require("./Events/RouterEvents");
const beltRouter = require("./Belts/RouterBelts");
const fightersRouter = require("./Fighters/FightersRouter");
const newsRouter = require("./News/NewsRouter");




// Router
router.use("/events", eventRouter);
router.use("/belts", beltRouter);
router.use("/fighters", fightersRouter);
router.use("/news", newsRouter);

// Konec routeru

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Přístup zamítnut' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Neplatný token' });
        req.user = user;
        next();
    });
};

// Chráněná cesta (přístupná jen pro přihlášené uživatele)
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Toto je chráněná data', user: req.user });
});

module.exports = router;