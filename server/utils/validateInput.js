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
  }
};
export default validateInput;
