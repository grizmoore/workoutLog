var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User= sequelize.import('./models/user')

// build user model
   
User.sync();
//  User.sync({force:true});
app.use(bodyParser.json());

app.post('/api/user', function(req, res) {
    // when we post to the api user, it will want a user in the object body
    var username = req.body.user.username;
    var pass = req.body.user.password; //TODOL hash this password -HASH=not human readable
    //Need to create a user object and use sequelize to put that user into

    // match the model we create above
    //Sequelize-take the user model and go out to the db and create this 
    User.create({
        username: username,
        passwordhash: ""
    }).then(
        //Sequelize is going to retrun the object it created from the db.
        function createSucess(user){
            // successful get this
            res.json({
                user: user,
                message: 'create'
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    )
})
// grab the middleware/headers form headers.js
app.use(require('./middleware/headers'))
// test the api and see if we can send a get request
app.use('/api/test', function(req,res){
    res.send('Hello World')
});

// open server on port 3000
app.listen(3000, function(){
    console.log("app is open on 3000!")
})