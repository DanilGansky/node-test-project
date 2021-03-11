const isAdminMiddleware = async (req, resp, next) => {
  if (!req.user.isAdmin) {
    resp.status(403).json({ error: PermissionDenied });
    return;
  }
  next();
};

const PermissionDenied = {
  name: "PermissionDenied",
  message: "permission denied",
};

module.exports = isAdminMiddleware;
