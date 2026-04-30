const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Superadmin privileges required.' });
  }
};

export default adminAuth;
