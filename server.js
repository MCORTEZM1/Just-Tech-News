const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// use public folder with static express middleware - making public folder serve static assets. NEEDS TO BE ABOVE ROUTES TO SHOW!
app.use(express.static(path.join(__dirname, 'public')));

// engine must be set up after app initialization above!
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes 
app.use(routes);


// turn on connect to db and server
// The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. 
// If it doesn't find a table, it'll create it for you!

// {force: false} doesn't have to be included, but if it were set to true, 
// it would drop and re-create all of the database tables on startup. 

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening`))
});