const Comment = require('../models/comment');

module.exports = app => {
    // NEW Player
    app.get('/players/:playerId/comments/new', (req, res) => {
        res.render('comments-new', { playerId: req.params.playerId });
    });

    // EDIT Comment
    app.get('/players/:playerId/comments/:id/edit', (req, res) => {
        Comment.findById(req.params.id)
        .then(comment => {
            res.render('comments-edit', { comment: comment });
        })
        .catch(console.error);
    });

    // INDEX Comment
    // API
    app.get('/api/players/:playerId/comments', (req, res) => {
        Comment.find({ playerId: req.params.playerId })
        .then(comments => {
            res.status(200).send(comments);
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });;
    });

    // Regular
    app.get('/players/:playerId/comments', (req, res) => {
        let playerId = req.params.playerId
        Comment.find({ playerId: playerId })
        .then(comments => {
            res.render('comments-index', { playerId: playerId, comments: comments });
        })
        .catch(console.error);
    });


    // CREATE Comment
    // API
    app.post('/api/players/:playerId/comments', (req, res) => {
        Comment.create(req.body)
        .then(comment => {
            res.status(200).send(comment);
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });;
    });

    // Regular
    app.post('/players/:playerId/comments', (req, res) => {
        Comment.create(req.body)
        .then(comment => {
            res.redirect(`/players/${req.params.playerId}/comments/${comment._id}`);
        })
        .catch(console.error);
    });


    // SHOW Comment
    // API
    app.get('/api/players/:playerId/comments/:id', (req, res) => {
        Comment.findById(req.params.id)
        .then(comment => {
            res.status(200).send(comment);
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });;
    });

    // Regular
    app.get('/players/:playerId/comments/:id', (req, res) => {
        Comment.findById(req.params.id)
        .then(comment => {
            res.render('comments-show', { comment: comment });
        })
        .catch(console.error);
    });


    // UPDATE Comment
    // API
    app.put('/api/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndUpdate(req.params.id, req.body)
        .then(comment => {
            if(req.body.render) {
                res.render('partials/comment-card', { layout: false, comment: comment });
            }
            else {
                res.status(200).send(comment);
            }
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });
    });

    // Regular
    app.put('/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect(`/players/${req.params.playerId}/comments/${req.params.id}`);
        })
        .catch(console.error);
    });


    // DESTROY Comment
    // API
    app.delete('/api/players/:playerId/comments/:id', (req, res) => {
        let id = req.params.id
        Comment.findByIdAndRemove(id)
        .then(comment => {
            res.status(200).send(comment);
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });
    });

    // Regular
    app.delete('/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect(`/players/${req.params.playerId}/comments`);
        })
        .catch(console.error);
    });
}
