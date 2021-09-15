const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
    try {
        const comments = Comment.findAll()
        res.json(comments)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post("/", withAuth, (req, res) => {
    try {
        if (req.session) {
            const comments = Comment.create({
                text: req.body.text,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            res.json(comments)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;