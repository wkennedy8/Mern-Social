//Import DB Connection
require('./db/config');
const express = require('express'),
  passport = require('./middleware/authentication'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  app = express(),
  openRoutes = require('./routes/open'),
  userRoutes = require('./routes/secure/users'),
  postRoutes = require('./routes/secure/posts'),
  commentRoutes = require('./routes/secure/comments'),
  fileUpload = require('express-fileupload');

// Parse incoming JSON into objects
app.use(express.json());

//Unauthenticated Routes
app.use('/api/auth', openRoutes);

//Middleware to parse through incoming cookies in the requests.
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/images'
  })
);

//  Authenticated  Routes
app.use('/api/*', passport.authenticate('jwt', { session: false }));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:postId', commentRoutes);

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}
module.exports = app;
