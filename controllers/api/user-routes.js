const router = require("express").Router()
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    try {
        const users = User.findAll({
            attributes: { exclude: 'password' }
        })
        res.json(users)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post("/", async (req, res) => {
    try {
        const userData = User.create(req.body)
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id;
            res.redirect('/dashboard')
        })
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username }
        })
        if (!userData) {
            res.status(400).json("Login Failed")
            return;
        }
        console.log(req.body.password)
        console.log(userData.password)
        const validPassword = userData.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(400).json("Login Failed")
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true
            req.session.user_id = userData.id
            res.json(userData);
        })

    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/signup', (req, res) => {
    try {
        const userData = User.create({
            username: req.body.username,
            password: req.body.password
        })
        if (!userData) {
            res.status(400).json({ message: 'Sign Up Failed' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
        });
        res.json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;