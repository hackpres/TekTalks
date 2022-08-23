const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
    cookie: {
        sameSite: true,
        secure: true
    }
}

app.use(session(sess));

const hbs = exphbs.create({});

    //set Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server connected: listening on localhost port: ${PORT}`));
})
