const Comment = require('../models/comment');

module.exports = app => {
    // NEW Player
    app.get('/players/:playerId/comments/new', (req, res) => {
       res.render('comments-new');
    });

    // SHOW Comment
    app.get('/players/:playerId/comments/:id', (req, res) => {
        Comment.findById(req.params.id)
        .then(comment => {
            res.render('comment-show', { comment: comment });
        })
        .catch(console.error);
    });

    // EDIT Comment
    app.get('/players/:playerId/comments/:id/edit', (req, res) => {
        res.render('comments-edit', { comment: comment });
    });

    // INDEX Comment
    app.get('/players/:playerId/comments', (req, res) => {
        Comment.find({ playerId: req.params.playerId })
        .then(comments => {
            res.render('comments-index', comments: { comments: comments });
        })
        .catch(console.error);
    });

    // CREATE Comment
    app.post('/players/:playerId/comments', (req, res) => {
        Comment.create(req.body)
        .then(res.status(201).send)
        .catch(res.status(400).send);
    });

    // DESTROY Comment
    app.delete('/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndRemove(req.params.id)
        .then(res.status(201).send)
        .catch(res.status(400).send)
    });
}
