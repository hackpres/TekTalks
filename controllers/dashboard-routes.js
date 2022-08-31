const router = require('express').Router();
const res = require('express/lib/response');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['post_id', 'title', 'post_content', 'createdAt'],
            include: [{
                model: Comment,
                attributes: ['comment_id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
                include: { model: User, attributes: ['username'] }
            },
            {
                model: User,
                attributes: ['username']
            }
            ]
        })
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, (req, res) => {
    try {
        const dbPostData = Post.findOne({
            where: { post_id: req.params.id },
            attributes: ['id', 'title', 'content', 'createdAt'],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with provided id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;