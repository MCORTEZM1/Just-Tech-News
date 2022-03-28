const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});


// why belongsToMany and not hasMany? 
// consider:
// users have votes that belong to many posts
// posts have votes that belong to many users 
// these allow queries such as: 
    // 'see a total of how many votes a user creates'
    // 'see all of the posts a user has voted on' || 
    // 'which users voted on a single post'
    // 'which posts a single user voted on'
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});


// establish a direct relationship between 'post and vote' and 'user and vote'
// these allow queries such as:
    // 'perform aggregated SQL functions between models'
    // 'see a total count of votes for a single post'
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id',
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});



// Comment relationships 
// Note that we don't have to specify Comment as a through table like we did for Vote. 
// This is because we don't need to access Post through Comment; 
// we just want to see the user's comment and which post it was for. 
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});
 


module.exports = { 
    User,
    Post,
    Vote,
    Comment
};