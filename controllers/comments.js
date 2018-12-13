// controllers/comments
const express = require('express');
const asyncHandler = require('express-async-handler');

const verify = require('../utils/verify-authentication');
const Comment = require('../models/comment');

module.exports = (parentModel) => {
  const router = express.Router({ mergeParams: true });

  router.get('/', asyncHandler(async (req, res) => {
    const comments = await Comment.find({ parent: req.params.parentId }).lean();

    res.status(200).json(comments);
  }));

  router.get('/:id', asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id).lean();

    res.status(200).json(comment);
  }));

  router.post('/', verify, asyncHandler(async (req, res) => {
    const comment = new Comment(req.body);

    comment.set({
      poster: req.user._id,
      parent: req.params.parentId,
      parentModel,
    });

    await comment.save();

    res.status(200).json(comment);
  }));

  router.put('/:id', verify, asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);

    if (comment.poster.toString() !== req.user._id) return res.status(403).send(`${comment._id} is not owned by current user`);

    comment.set(req.body);

    await comment.save();

    return res.status(200).json(comment);
  }));

  router.delete('/:id', verify, asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);

    if (comment.poster.toString() !== req.user._id) return res.status(403).send(`${comment._id} is not owned by current user`);

    await comment.remove();

    return res.status(200).json(comment);
  }));

  return router;
};
