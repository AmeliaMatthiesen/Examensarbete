import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const payload = { id: userId };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export default generateToken;
