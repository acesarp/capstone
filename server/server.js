const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const path = require("path");
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRoute = require('./routes/userRouter');
const loginSignupRoute = require('./routes/loginSignupRouter');
const eventRoute = require('./routes/eventRouter');
const reactionRoute = require('./routes/reactionRouter');
const activityRoute = require('./routes/activityRouter');
const commentRoute = require('./routes/commentRouter');

app.use('/images', express.static(__dirname + 'routes'));
app.use('/login', loginSignupRoute);
app.use('/users', userRoute);
app.use('/comments', commentRoute);
app.use('/events', eventRoute);
app.use('/reactions', reactionRoute);
app.use('/activities', activityRoute);


// const dataSeeder = require('./seedData/populateDb');
// dataSeeder.populateUserTable();
// dataSeeder.populateEventTable();
// dataSeeder.populateCommentTable();
// dataSeeder.populateReactionTable();
// dataSeeder.populateActivityTable();
var route, routes = [];
app._router.stack.forEach(function (middleware) {
    if (middleware.route) { // routes registered directly on the app
        routes.push(middleware.route);
        console.table(middleware.handle.stack);
    } else if (middleware.name === 'router') { // router middleware 
        middleware.handle.stack.forEach(function (handler) {
            route = handler.route;
            //console.log(handler);
            route && routes.push(route);
        });
    }
});

routes.forEach(function (temp) {
    var methods = "";
    for (var method in temp.methods) {
        methods += method + ", ";
    }
    console.log(temp.path + ": " + methods + "\n"); 
});

app.listen(PORT, () => {


    console.log(`Server listening on http://localhost:${PORT}`);
});
