// backend/models/userModel.js
const users = {}; // In-memory storage (replace with DB in production)

module.exports = {
  getUser: (id) => users[id],
  createUser: (id) => users[id] = { id, score: 0, history: [] },
  updateUser: (id, data) => users[id] = { ...users[id], ...data },
};
