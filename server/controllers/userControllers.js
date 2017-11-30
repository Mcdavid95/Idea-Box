import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
      email: req.body.email.toLowerCase()
    }).exec();

    promise.then((email) => {
      if (email) {
        res.status(409).send({
          error: 'user with that email already exist'
        });
      } else {
        User.findOne({
          username: req.body.username.toLowerCase()
        }).exec()
          .then((username) => {
            if (username) {
              res.status(409).send({
                error: 'user with that username already exist'
              });
            } else {
              const user = new User({
                fullname: req.body.fullname.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password,
                email: req.body.email.toLowerCase()
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
                  message: `Welcome to Idea-Box!! ${req.body.username}`,
                  user: newUser,
                  token
                });
              })
                .catch((error) => {
                  res.status(500).send(error.message);
                });
            }
          });
      }
    });
  },

  signin(req, res) {
    const promise = User.findOne({
      username: req.body.username.toLowerCase()
    }).exec();
    promise.then((user) => {
      if (!user) {
        res.status(404).send({
          error: 'Username is incorrect'
        });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send({
          error: 'Incorrect password'
        });
      }
      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.username,
            email: user.email
          },
          'process.env.SECRET',
          { expiresIn: 24 * 60 * 60 }
        );
        res.status(201).send({
          token,
          message: `Welcome back ${req.body.username}`
        });
      }
    })
      .catch((error) => {
        res.status(500).send({
          error: error.message
        });
      });
  }
};
