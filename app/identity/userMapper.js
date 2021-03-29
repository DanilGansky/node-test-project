const toUserResponse = (user) => {
  return {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
    registeredAt: user.registeredAt,
  };
};

module.exports = {
  toUserResponse,
};
