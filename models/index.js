const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

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



module.exports = { 
    User,
    Post,
    Vote
};