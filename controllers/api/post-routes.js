const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
  const postData = await Post.findAll({
      attributes: [
            'id',
            'title',
            'text'
      ],
      include: [
          {
              model: User,
              attributes: ["username"],
          },
      ]
      // include: [
      //     {
      //         model: Comment,
      //         attributes: ['id','text','post_id', 'user_id'],
      //         include: {
      //             model: User,
      //             attributes: ['username']
      //         }
      //     }
      // ]
  });

  const posts = postData.map((post) =>
      post.get({ plain: true })
  );

  res.render("homepage", { postData: posts, loggedIn: req.session.loggedIn});
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const newPost = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id,
  });
    console.log(newPost)
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.update({
//       title: req.body.title,
//       text: req.body.text
//     },
//     {
//       where: {id: req.params.id}
//     })
//     res.json(postData)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;