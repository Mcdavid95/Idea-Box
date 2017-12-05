import mongoose from 'mongoose';
import Comment from '../models/Comment';
import Idea from '../models/Idea';

mongoose.Promise = global.Promise;

export default {
  createComment(req, res) {
    Idea.findById(req.params.id).exec()
      .then((idea) => {
        if (idea) {
          const comment = new Comment({
            content: req.body.comment,
            author: {
              id: req.decoded.id,
              username: req.decoded.username
            },
            ideaId: req.params.id,
            status: req.body.status
          });
          comment.save().then((newCommennt) => {
            res.status(201).send({
              message: 'Comment posted successfully',
              newCommennt
            });
          })
            .catch(() => {
              res.status(500).send({
                message: 'Internal server error'
              });
            });
        } else {
          res.status(404).send({
            message: `Idea with id: ${req.params.id} does not exist`
          });
        }
      });
  },

  getComments(req, res) {
    Idea.findById(req.params.id).exec()
      .then((idea) => {
        if (idea) {
          Comment.find({
            ideaId: idea.id
          }).exec()
            .then((comments) => {
              if (comments) {
                res.status(202).send({
                  message: 'Comments successfully fetched',
                  comments
                });
              } else {
                res.status(200).send({
                  message: 'could not get comments'
                });
              }
            });
        } else {
          return res.status(404).send({
            message: 'Idea does not exist'
          });
        }
      });
  }
};

