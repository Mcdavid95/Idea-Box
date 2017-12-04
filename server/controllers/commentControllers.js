import mongoose from 'mongoose';
import Comment from '../models/Comment';
import Idea from '../models/Idea';

mongoose.Promise = global.Promise;

export default {
  createComment(req, res) {
    Idea.findById(req.params.ideaId).exec()
      .then((idea) => {
        if (idea) {
          const comment = new Comment({
            content: req.body.description,
            author: {
              id: req.decoded.id,
              username: req.decoded.username
            },
            ideaId: req.para,
            status: req.body.status
          });
        }
      });
  }
};

