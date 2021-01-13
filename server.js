require('dotenv').config({ path: '.env' });

//essentials
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

//models
const userModel = require('./client/src/models/userModel');

//pusher
const Pusher = require('pusher');
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// API calls
app.post('/api/user', (req, res) => {
  userModel.getUserFromID(req.body)
  .then(response => {
    if (response.length != 0) {
      return res.json({user: response[0]});
    }
  })
})
//LOCAL AUTHENTICATION
app.post('/auth/login', (req, res) => {
  userModel.getUser(req.body)
  .then(response => {
    if (response.length != 0) {
      return res.json({ user: response[0].user_id, path : `/user/?id=${response[0].user_id}` });
    } else {
      return res.json({authSuccessful: false});
    }
  })
  .catch(error => {
    return res.json({authSuccessful : false})
  });
});

app.post('/auth/logout', (req, res) => {
  return res.json({path: '/'});
});

app.post('/auth/signup', (req, res) => {
  userModel.createUser(req.body)
  .then(response => {
    if (response === 'username') {
      return res.json({signUpSucceeded : false, signUpFailedMsg : 'Username is taken.'});
    } else if (response === 'email') {
      return res.json({signUpSucceeded : false, signUpFailedMsg : 'There is already an account under the given email.'})
    } else {
      //SIGN UP SUCCEEDED
      return res.json({path : '/login'});
    }
  })
  .catch(error => {
    return res.json({signUpSucceeded : false, signUpFailedMsg : 'Sign up failed'})
  })
})
//PUSHER UPDATE CALL
app.post('/update-editor', (req, res) => {
  pusher.trigger('editor', 'code-update', {
  ...req.body,
  });
  res.status(200).send('OK');
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));