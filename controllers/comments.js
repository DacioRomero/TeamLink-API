// controllers/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// NEW Player
router.get('/players/:playerId/comments/new', (req, res) => {
    res.render('comments-new', { playerId: req.params.playerId });
});

// EDIT Comment
router.get('/players/:playerId/comments/:id/edit', (req, res) => {
    Comment.findById(req.params.id).lean()
    .then(comment => {
        res.render('comments-edit', { comment: comment });
    })
    .catch(console.error);
});

// INDEX Comment
router.get('/players/:playerId/comments', (req, res) => {
    const playerId = req.params.playerId;

    Comment.find({ playerId: playerId }).lean()
    .then(comments => {
        res.render('comments-index', { playerId: playerId, comments: comments });
    })
    .catch(console.error);
});

// CREATE Comment
router.post('/players/:playerId/comments', (req, res) => {
    Comment.create(req.body)
    .then(comment => {
        res.redirect(`/players/${req.params.playerId}/comments/${comment._id}`);
    })
    .catch(console.error);
});

// SHOW Comment
router.get('/players/:playerId/comments/:id', (req, res) => {
    Comment.findById(req.params.id).lean()
    .then(comment => {
        res.render('comments-show', { comment: comment });
    })
    .catch(console.error);
});

// UPDATE Comment
router.put('/players/:playerId/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body).lean()
    .then(comment => {
        res.redirect(`/players/${comment.playerId}/comments/${comment._id}`);
    })
    .catch(console.error);
});

// DESTROY Comment
router.delete('/players/:playerId/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id).lean()
    .then(comment => {
        res.redirect(`/players/${comment.playerId}/comments`);
    })
    .catch(console.error);
});

module.exports = router;
