const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: ({ req }) => {
    // allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // verify token and get user data out of it
    if (token) {
      try {
        const { user } = jwt.verify(token, secret);
        req.user = user; // Assuming the user data is directly available in the token payload
      } catch (err) {
        console.log('Invalid token');
      }
    }

    return req;
  },
  signToken: ({ username, email, _id }) => {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
