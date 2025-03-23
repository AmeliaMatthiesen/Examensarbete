const mockAuth = (req, res, next) => {
  req.user = { _id: '65f05c5fe65b3f4b13b0c2aa' };
  next();
};

export default mockAuth;
