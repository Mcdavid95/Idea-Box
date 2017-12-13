import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User';
import { resetPassword, sendSuccessfulReset } from '../utils/sendMail';

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
      email: req.body.email.trim().toLowerCase()
    }).exec();

    promise.then((email) => {
      if (email) {
        return res.status(409).send({
          error: 'user with that email already exist'
        });
      }
      User.findOne({
        username: req.body.username.trim().toLowerCase()
      }).exec()
        .then((username) => {
          if (username) {
            return res.status(409).send({
              error: 'user with that username already exist'
            });
          }
          const user = new User({
            fullname: req.body.fullname.trim().toLowerCase(),
            username: req.body.username.trim().toLowerCase(),
            password: req.body.password,
            email: req.body.email.trim().toLowerCase()
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
            return res.status(201).send({
              message: `Welcome to Idea-Box!! ${req.body.username}`,
              user: newUser,
              token
            });
          })
            .catch((error) => {
              res.status(500).send(error.message);
            });
        });
    });
  },

  /**
   * signina new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  signin(req, res) {
    const promise = User.findOne({
      username: req.body.username.trim().toLowerCase()
    }).exec();
    promise.then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'Username is incorrect'
        });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({
          error: 'Incorrect password'
        });
      }
      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email
          },
          process.env.SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(201).send({
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
  },

  /**
   * @method forgotPassword
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and reset password token
   * @description recieves user email and creates password token i the database
   */
  forgotPassoword(req, res) {
    const hash = crypto.randomBytes(20).toString('hex');
    const date = Date.now() + 3600000;
    if (!req.body.email) {
      return res.status(401).send({
        message: 'Please provide your email'
      });
    }
    const promise = User.findOne({
      email: req.body.email.trim().toLowerCase()
    }).exec();
    promise.then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'Account associated with this email not found'
        });
      }
      user.passwordToken = hash;
      user.expiryTime = date;
      user.save().then((updatedUser) => {
        resetPassword(updatedUser.passwordToken, updatedUser.email, req.headers.host);
        return res.status(202).send({
          message: 'A link has has been sent to your mail',
          passwordToken: updatedUser.passwordToken
        });
      })
        .catch((error) => {
          res.status(500).send({
            error: error.message
          });
        });
    });
  },

  /**
   * @method reset
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and reset password token
   * @description recieves new password details and updates user password in the database User table
   */
  reset(req, res) {
    const promise = User.findOne({
      passwordToken: req.params.token
    }).exec();
    promise.then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'failed token authentication'
        });
      } else if (
        req.body.newPassword &&
        req.body.confirmPassword &&
        req.body.newPassword === req.body.confirmPassword) {
        const currentTime = Date.now() + 1800000;
        if (currentTime > user.expiryTime) {
          user.passwordToken = null;
          user.expiryTime = null;
          return res.status(410).send({
            success: false,
            message: 'Expired link'
          });
        }
        user.password = req.body.newPassword;
        user.save().then((updatedUser) => {
          sendSuccessfulReset(updatedUser.email);
          return res.status(201).send({
            message: 'Password has been updated',
            updatedUser
          });
        })
          .catch((error) => {
            res.status(404).send({
              error: error.message
            });
          });
      } else {
        return res.status(400).send({
          success: false,
          error: 'Please confirm passwords'
        });
      }
    });
  },
  /**
 * @method updateUser
 * @param {*} req
 * @param {*} res
 * @returns {object} response- an object containing either successful response or error message
 * @description receives request with new user details and update the user
 */
  updateUser(req, res) {
    const userDetails = {
      $set: req.body
    };
    User.findOne({
      email: req.body.email.trim().toLowerCase()
    }).exec()
      .then((email) => {
        if (email) {
          return res.status(409).send({
            error: 'user with that email already exist'
          });
        }
        User.findOne({
          username: req.body.username.trim().toLowerCase()
        }).exec()
          .then((username) => {
            if (username) {
              return res.status(409).send({
                error: 'user with that username already exist'
              });
            }
            const promise = User.findByIdAndUpdate(req.decoded.id, userDetails).exec();
            promise.then((updatedDetails) => {
              res.status(202).send({
                message: 'Details successfully updated',
                updatedDetails
              });
            })
              .catch(error => res.status(400).send({
                error: error.message
              }));
          });
      });
  },

  getUserDetails(req, res) {
    const query = User.findById(req.decoded.id);
    query.select('fullname username email');
    query.exec().then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User  does not exist'
        });
      }
      return res.status(200).send({
        user
      });
    });
  }
};
