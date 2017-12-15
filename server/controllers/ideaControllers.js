import mongoose from 'mongoose';
import Idea from '../models/Idea';
import pagination from '../utils/pagination';

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
      categories: req.body.category,
      status: req.body.status
    });
    idea.save().then(newIdea => res.status(201).send({
      newIdea,
      message: 'Idea successfully created'
    }))
      .catch(error => res.status(400).send({
        error: error.message
      }));
  },

  /**
   * get all public ideas
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  getAllIdeas(req, res) {
    const promise = Idea.paginate({
      status: 'public'
    }, { limit: 12, page: req.query.currentPage });
    promise.then((ideas) => {
      res.status(201).send({
        ideas: ideas.docs,
        pages: ideas.pages,
        total: ideas.total,
        message: 'Ideas successfully fetched',
      });
    })
      .catch((error) => {
        res.status(400).send({
          error: error.message
        });
      });
  },

  /**
   * get all public ideas by categories
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  getByCategory(req, res) {
    const promise = Idea.paginate({
      status: 'public',
      categories: req.query.category
    }, { limit: 12, page: req.query.currentPage });
    promise.then((ideas) => {
      res.status(201).send({
        ideas: ideas.docs,
        pages: ideas.pages,
        total: ideas.total,
        message: 'Ideas successfully fetched',
      });
    })
      .catch((error) => {
        res.status(400).send({
          error: error.message
        });
      });
  },

  /**
   * get one idea
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  getOneIdea(req, res) {
    const promise = Idea.findById(req.query.id).exec();
    promise.then((idea) => {
      res.status(201).send({
        idea,
        message: 'Idea successfully fetched'
      });
    })
      .catch((error) => {
        res.status(400).send({
          error: error.message
        });
      });
  },

  /**
   * check editing privileges
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  editIdea(req, res) {
    const promise = Idea.findOne({
      _id: req.params.id,
      'author.id': req.decoded.id,
    }).exec();
    promise.then((idea) => {
      if (!idea) {
        return res.status(403).send({
          canEdit: false
        });
      }
      return res.status(201).send({
        idea,
        canEdit: true
      });
    })
      .catch((error) => {
        res.status(400).send({
          error: error.message
        });
      });
  },
  /**
   * update idea
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  updateIdea(req, res) {
    const setIdea = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        categories: req.body.category,
        modified: true,
        updatedAt: Date.now()
      },
      new: true
    };
    const promise = Idea.findByIdAndUpdate(req.query.id, setIdea).exec();
    promise.then((updatedIdea) => {
      if (updatedIdea) {
        return res.status(202).send({
          message: 'Idea successfully updated',
          updatedIdea
        });
      }
      return res.status(403).send({
        error: 'could not find idea with this id'
      });
    })
      .catch((error) => {
        res.status(400).send({
          error: error.message
        });
      });
  },

  /**
   * delete an idea
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  deleteIdea(req, res) {
    Idea.findById(req.query.id).exec()
      .then((idea) => {
        if (idea) {
          if (String(idea.author.id) === req.decoded.id) {
            const promise = Idea.remove({
              _id: req.query.id,
              'author.id': req.decoded.id
            }).exec();
            promise.then(() => res.status(202).send({
              message: 'Idea successfully deleted',
            }))
              .catch((error) => {
                res.status(400).send({
                  error: error.message
                });
              });
          } else {
            return res.status(403).send({
              message: 'you have no permission to delete this idea'
            });
          }
        } else {
          res.status(404).send({
            messsage: 'idea does not exist'
          });
        }
      });
  },

  /**
   * get all public ideas
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  getUserIdeas(req, res) {
    const promise = Idea.paginate({
      'author.id': req.decoded.id
    }, { limit: 12, page: req.query.currentPage });
    promise.then((ideas) => {
      res.status(201).send({
        ideas: ideas.docs,
        pages: ideas.pages,
        total: ideas.total
      });
    })
      .catch((error) => {
        res.status(400).send({
          error: error.message
        });
      });
  },

  searchIdeas(req, res) {
    if (!req.body.searchTerm) {
      res.status(401).send({
        message: 'please add search term'
      });
    }
    const offset = Number(req.query.offset);
    const limit = 10;
    let count;
    Idea.count({
      $text: { $search: req.body.searchTerm.trim() },
    }).exec()
      .then((iscount) => {
        count = iscount;
      }).catch(() => {
        res.status(500);
      });
    const promise = Idea.find({
      $text: { $search: req.body.searchTerm.trim() },
    })
      .skip(offset)
      .limit(limit).exec();
    promise.then(ideas => res.status(202).send({
      ideas,
      pageInfo: pagination(count, limit, offset),
    }))
      .catch(() => {
        res.status(500);
      });
  }
};

