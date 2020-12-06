const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const userRoute = require('./routes/userRouter');
const accountRoute = require('./routes/accountRouter');
const friendRoute = require('./routes/friendRouter');
const eventRoute = require('./routes/eventRouter');
const profileRoute = require('./routes/profileRouter');
const activityRoute = require('./routes/activityRouter');

// const { knex } = require('./bookshelf'); // remove now that we are using bookshelf

app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // this breaks things? can't post nested object!

app.get('/', (req, res) => {
    res.send('<h1>InStock API</h1>');
});

app.use('/user', userRoute);
app.use('/account', accountRoute);
app.use('/friend', friendRoute);
app.use('/event', eventRoute);
app.use('/profile', profileRoute);
app.use('/activity', activityRoute);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
