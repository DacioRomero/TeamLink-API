const Comment = require('../models/comment');

module.exports = app => {
    // NEW Player
    app.get('/players/:playerId/comments/new', (req, res) => {
        res.render('comments-new', { playerId: req.params.playerId });
    });

    // EDIT Comment
    app.get('/players/:playerId/comments/:id/edit', (req, res) => {
        Comment.findById(req.params.id).lean()
        .then(comment => {
            res.render('comments-edit', { comment: comment });
        })
        .catch(console.error);
    });

    // INDEX Comment
    // Browser
    app.get('/players/:playerId/comments', (req, res) => {
        const playerId = req.params.playerId

        Comment.find({ playerId: playerId }).lean()
        .then(comments => {
            res.render('comments-index', { playerId: playerId, comments: comments });
        })
        .catch(console.error);
    });

    // API
    app.get('/api/players/:playerId/comments', (req, res) => {
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
    // Browser
    app.post('/players/:playerId/comments', (req, res) => {
        Comment.create(req.body)
        .then(comment => {
            res.redirect(`/players/${req.params.playerId}/comments/${comment._id}`);
        })
        .catch(console.error);
    });

    // API
    app.post('/api/players/:playerId/comments', (req, res) => {
        Comment.create(req.body)
        .then(comment => {
            res.status(200).send(comment);
        })
        .catch(error => {
            console.error(error);
            res.status(400).send(error);
        });;
    });


    // SHOW Comment
    // Browser
    app.get('/players/:playerId/comments/:id', (req, res) => {
        Comment.findById(req.params.id).lean()
        .then(comment => {
            res.render('comments-show', { comment: comment });
        })
        .catch(console.error);
    });

    // API
    app.get('/api/players/:playerId/comments/:id', (req, res) => {
        Comment.findById(req.params.id).lean()
        .then(comment => {
            res.status(200).send(comment);
        })
        .catch(error => {
            console.error(error);
            res.status(400).send(error);
        });;
    });


    // UPDATE Comment
    // Browser
    app.put('/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndUpdate(req.params.id, req.body).lean()
        .then(comment => {
            res.redirect(`/players/${comment.playerId}/comments/${comment._id}`);
        })
        .catch(console.error);
    });

    // API
    app.put('/api/players/:playerId/comments/:id', (req, res) => {
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
    // Browser
    app.delete('/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndRemove(req.params.id).lean()
        .then(comment => {
            res.redirect(`/players/${comment.playerId}/comments`);
        })
        .catch(console.error);
    });

    // API
    app.delete('/api/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndRemove(req.params.id).lean()
        .then(comment => {
            res.status(200).send(comment);
        })
        .catch(error => {
            console.error(error);
            res.status(400).send(error);
        });
    });
}
