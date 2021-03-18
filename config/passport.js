const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');

// configuring Passport!
// this gets called at the initial login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    console.log(profile, ' THIS IS THE PROFILE')
    User.findOne({'googleId': profile.id}, function(err, user){
      if(err) return cb(err);

      if(user) {
        return cb(null, user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          googleId: profile.id
        });

        newUser.save(function(err) {
          if(err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
    // or we want to create a usre // and provide them back to passport
  }
));

// this puts the user's id in the session cookie
passport.serializeUser(function(userDocument, done) {
  // userDocument.id is the mongo id that we're storing in our session
  done(null, userDocument.id);
});

// where you decrypt the cookie
passport.deserializeUser(function(id, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user
  User.findById(id, function(err, user) {
    done(err, user);
  });

});



