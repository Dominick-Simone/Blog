const { Post, User, Comment } = require('../models');
const router = require('express').Router();

router.get("/", async (req, res) => {
    try {
    const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ["username"],
            },
        ]
    });

    const posts = postData.map((post) =>
        post.get({ plain: true })
    );

    res.render("homepage", { postData: posts, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/dashboard');
          } else {
            res.render('login');
          }
    } catch (err) {
        res.status(500).json(err);

    }
});

router.get("/signup", (req, res) => {
    try{
        if (req.session.loggedIn) {
            res.redirect("/");
          } else {
            res.render("signup");
          }
    } catch (err) {
        res.status(500).json(err);
    } 
});

router.get("/dashboard", async (req, res) => {
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'text',
                'createdAt'
            ],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                }
            ]
        });
        const posts = postData.map((post) =>
        post.get({ plain: true })
    );
        if (req.session.loggedIn) {
            res.render("dashboard", {postData: posts, loggedIn: req.session.loggedIn})
          } else {
            res.redirect("/login");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
