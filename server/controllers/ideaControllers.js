import mongoose from 'mongoose';
import Idea from '../models/Idea';

mongoose.Promise = global.Promise;


export default {
  /**
   * create a new idea
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  createIdea(req, res) {
    const idea = new Idea({
      title: req.body.title.trim().toLowerCase(),
      description: req.body.description,
      author: {
        id: req.decoded.id,
        username: req.decoded.username
      },
      categories: req.body.category
    });
    idea.save().then(newIdea => res.status(201).send({
      newIdea
    }))
      .catch(error => res.status(400).send({
        error: error.message
      }));
  }
};

