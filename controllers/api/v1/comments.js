const express = require('express');
const router = express.Router();
const Comment = require('../../../models/comment')

// INDEX Comments
router.get('/players/:playerId/comments', (req, res) => {
    Comment.find({ playerId: req.params.playerId }).lean()
    .then(comments => {
        res.status(200).send(comments);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

// CREATE Comment
router.post('/players/:playerId/comments', (req, res) => {
    Comment.create(req.body)
    .then(comment => {
        res.status(200).send(comment);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

// SHOW Comment
router.get('/players/:playerId/comments/:id', (req, res) => {
    Comment.findById(req.params.id).lean()
    .then(comment => {
        res.status(200).send(comment);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

// UPDATE Comment
router.put('/players/:playerId/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(comment => {
        res.status(200).send(comment);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

// DESTROY Comment
router.delete('/players/:playerId/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id).lean()
    .then(comment => {
        res.status(200).send(comment);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

module.exports = router;
