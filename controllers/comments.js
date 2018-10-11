const Comment = require('../models/comment');

module.exports = app => {
    // NEW Player
    app.get('/players/:playerId/comments/new', (req, res) => {
        res.render('comments-new', { playerId: req.params.playerId });
    });

    // SHOW Comment
    app.get('/players/:playerId/comments/:id', (req, res) => {
        Comment.findById(req.params.id)
        .then(comment => {
            res.render('comments-show', { comment: comment });
        })
        .catch(console.error);
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
    app.get('/players/:playerId/comments', (req, res) => {
        let playerId = req.params.playerId
        Comment.find({ playerId: playerId })
        .then(comments => {
            res.render('comments-index', { playerId: playerId, comments: comments });
        })
        .catch(console.error);
    });

    // CREATE Comment
    app.post('/api/players/:playerId/comments', (req, res) => {
        console.log(req.body)
        Comment.create(req.body)
        .then(comment => {
            res.status(200).send(comment);
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });;
    });

    app.post('/players/:playerId/comments', (req, res) => {
        Comment.create(req.body)
        .then(() => {
            res.redirect('.');
        })
        .catch(console.error);
    });

    // DESTROY Comment
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

    app.delete('/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect('.');
        })
        .catch(console.error);
    });

    // UPDATE Comment
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

    app.put('/players/:playerId/comments/:id', (req, res) => {
        Comment.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect('.');
        })
        .catch(console.error);
    });
}
