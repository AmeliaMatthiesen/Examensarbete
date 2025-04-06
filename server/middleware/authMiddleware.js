import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error ("Not authorized, no token");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoder = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoder;
    next();
  } catch (error) {
    const err = new Error("Not authorized, token failed");
    error.statusCode = 401;
    return next(err);
  }
};

export default authMiddleware;

