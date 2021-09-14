const router = require("express").Router()
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
        const userData = User.create(req.body)
        req.session.save(() => {
            req.session.loggedIn = true
            req.session.id = userData.id
            res.redirect('/dashboard')
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post("/login", async (req,res) => {
    try {
        console.log(req.body)
        const userData = await User.findOne({
            where: {username: req.body.username}
        })
        if (!userData) {
            res.json("Login Failed")
        } else {
            console.log(req.body.password)
            console.log(userData.password)
            const samePassword = userData.checkPassword(req.body.password)
            if (!samePassword) {
                res.json("Login Failed")
            } else {
                req.session.save(() => {
                    req.session.loggedIn = true
                    req.session.id = userData.id
                    res.redirect('/dashboard')
                })
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
module.exports = router;