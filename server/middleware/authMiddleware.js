import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Unauthorized: No token provided');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      const error = new Error('Unauthorized: User not found');
      error.statusCode = 401;
      return next(error);
    }

    req.user = user; // Detta används i t.ex. taskController
    next();
  } catch (err) {
    const error = new Error('Unauthorized: Invalid token');
    error.statusCode = 401;
    return next(error);
  }
};

export default authMiddleware;
