const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    try {
        const dbCommentData = Comment.findAll({});
        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
    try {
        const dbCommentData = Comment.findByPk({
            where: { comment_id: req.params.id }
        })
        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, (req, res) => {
Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    }).then(dbCommentData => {
        res.status(200).json(dbCommentData); 
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', withAuth, (req, res) => {
    try {
        const dbCommentData = Comment.update({
            comment_text: req.body.comment_text
        },
        {
            where: { comment_id: req.params.id }
        })
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with provided id' });
            return;
        }
        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, (req, res) => {
    try {
        const dbCommentData = Comment.destroy({
            where: { comment_id: req.params.id }
        })
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with provided id' });
            return;
        }
        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;