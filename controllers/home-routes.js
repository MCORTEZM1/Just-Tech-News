const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        attributes: [
            'id', 
            'post_url', 
            'title', 
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'] 
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template 
        // The data that Sequelize returns here, `dbPostData` is actually a Sequelize object with a lot more information attached to it 
        // than you might have been expecting. To serialize the object down to only the properties you need, 
        // you can use Sequelize's get() method.
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render('homepage', { posts });
        // we havent needed to serialize data before when building APIs routes, because res.json() method automatically does. 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
})




module.exports = router;