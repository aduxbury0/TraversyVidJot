const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//loading user model
const User = mongoose.model('users');

module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
        
        //matching users
        User.findOne({
            email: email
        }).then(user => {
            if(!user){
                return done(null, false, {message: 'User account does not exist'});
            }
            
            //match passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
//                if(err) {throw err};
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect password'});
                }

            })

        })

    }));

    passport.serializeUser(function(user, done){ 
        done(null, user.id)
    });
    
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}