// NOTE: Modules
const express = require('express'),
      bodyParser = require('body-parser'),
      expressValidator = require('express-validator'),
      fs = require('fs'),
      mustacheExpress = require('mustache-express'),
      session = require('express-session'),
      easyRouter = require('./controllers/easymodeRouter.js');

// NOTE: Port
const port = process.env.PORT || 8000;

// NOTE: Express app
const app = express();
      app.engine('mustache', mustacheExpress());
      app.set('view engine', 'mustache');
      app.set('views', './views');
      app.use('/public', express.static('./public'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(expressValidator());
      app.use(session({
          secret: 'iscreamyouscreamgimmethatgimmethat ice cream',
          resave: false,
          saveUninitialized: false }));
      app.use('/hangman/easy', easyRouter);

// NOTE: Index
      app.get('/', (req, res) => res.redirect('/hangman/easy/'))

// NOTE: Listening to port
      app.listen(port, () => console.log('Red Velvet: Ice Cream Cake'));
