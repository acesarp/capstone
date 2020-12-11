const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//app.use(passport.initialize());
//app.use(passport.session());

const PORT = process.env.PORT || 5000;

const userRoute = require('./routes/userRouter');
const loginSignupRoute = require('./routes/loginSignupRouter');
const eventRoute = require('./routes/eventRouter');
const reactionRoute = require('./routes/reactionRouter');
const activityRoute = require('./routes/activityRouter');
const commentRoute = require('./routes/commentRouter');

app.use('/login', loginSignupRoute);
app.use('/users', userRoute);
app.use('/comments', commentRoute);
app.use('/events', eventRoute);
app.use('/reactions', reactionRoute);
app.use('/activities', activityRoute);

// const expressSession = require('express-session')({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false
// });

const dataSeeder = require('./seedData/populateDb');
//dataSeeder.populateUserTable();
//dataSeeder.populateEventTable();
//dataSeeder.populateCommentTable();
//dataSeeder.populateReactionTable();
//dataSeeder.populateActivityTable();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
