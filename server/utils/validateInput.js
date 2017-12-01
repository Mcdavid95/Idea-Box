const validateInput = {
  /**
   * @method signupInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signupInput(req, res, next) {
    if (typeof (req.body.username) === 'undefined') {
      return res.status(401).json({
        message: 'Username field must not be empty'
      });
    } else if (typeof (req.body.password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    } else if (typeof (req.body.email) === 'undefined') {
      return res.status(401).send({
        message: 'Email field must not be empty'
      });
    } else if (typeof (req.body.fullname) === 'undefined') {
      return res.status(401).send({
        message: 'Full name field must not be empty'
      });
    }
    return next();
  },

  /**
   * @method signInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signInInput(req, res, next) {
    if (typeof (req.body.username) === 'undefined') {
      return res.status(401).json({
        message: 'Username field must not be empty'
      });
    } else if (typeof (req.body.password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    }
    return next();
  },

  /**
   * @method ideaInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  ideaInput(req, res, next) {
    if (typeof (req.body.title) === 'undefined') {
      return res.status(401).json({
        message: 'Title field must not be empty'
      });
    } else if (typeof (req.body.description) === 'undefined') {
      return res.status(401).send({
        message: 'Description field must not be empty'
      });
    }
    return next();
  }
};
export default validateInput;
