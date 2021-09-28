const User = require('./users');
const Post = require('./posts');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = { User, Post };