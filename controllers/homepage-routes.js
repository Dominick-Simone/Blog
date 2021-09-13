const { Post, User, } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
    const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ["username"],
            },
        ],
    });

    const posts = postData.map((post) =>
        post.get({ plain: true })
    );

    res.render("homepage", { postData: posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
          } else {
            res.render('login');
          }
    } catch (err) {

    }
})

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
      } else {
        res.render("signup");
      }
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard")
})

module.exports = router;
