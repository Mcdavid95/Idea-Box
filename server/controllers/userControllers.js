import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

mongoose.Promise = global.Promise;

export default {
  /**
   * signup a new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  signup(req, res) {
    const promise = User.findOne({
      email: req.body.email
    }).exec();

    promise.then((email) => {
      if (email) {
        res.status(409).send({
          error: 'user with that email already exist'
        });
      } else {
        User.findOne({
          username: req.body.username
        }).exec()
          .then((username) => {
            if (username) {
              res.status(409).send({
                error: 'user with that username already exist'
              });
            } else {
              const user = new User({
                fullname: req.body.fullname,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
              });
              user.save().then((newUser) => {
                const token = jwt.sign(
                  {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                  },
                  process.env.SECRET,
                  { expiresIn: 24 * 60 * 60 }
                );
                res.status(201).send({
                  message: `Welcome to Idea-Box!! ${newUser.username}`,
                  user: newUser,
                  token
                });
              })
                .catch((err) => {
                  res.status(500).send(err.message);
                });
            }
          });
      }
    });
  },
};
