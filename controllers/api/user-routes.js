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
            const samePassword = bcrypt.compareSync(req.body.password, userData.password)
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
        console.log(err)
        console.log(err.message)
        res.status(500).json(err);
    }
})

module.exports = router;