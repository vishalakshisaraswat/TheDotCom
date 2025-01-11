const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // It's better to use an environment variable for the secret
    const user = await User.findOne({ userId: decoded.userId }); // Assuming the token payload has userId

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach user data to request for further use
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token or unauthorized' });
  }
};

module.exports = auth;
