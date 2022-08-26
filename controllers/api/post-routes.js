const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['post_id', 'title', 'post_content', 'creation_date'],
            order: [['creation_date', 'DESC']],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['comment_id', 'comment_text', 'post_id', 'user_id', 'cration_date'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        res.status(200).json(dbPostData.reverse());
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
    try {
        const dbPostData = await Post.findByPk({
            where: {
                post_id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
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
        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        })
        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, (req, res) => {
    try {
        const dbPostData = await Post.update({
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: { id: req.params.id }
        })
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with provided id' });
            return;
        }
        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, (req, res) => {
    try {
        const dbPostData = await Post.destroy({
            where: { post_id: req.params.id }
        })
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with provided id' });
            return;
        }
        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;