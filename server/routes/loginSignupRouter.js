const express = require('express');
const router = express.Router();

/**
 * GET signup
 */
router.route('/signup').post((req, res) => {
    try {
    const newUser = {
        userName: req.body.userName,
        password: req.body.passwor,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        bio: req.body.bio,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        avatar: req.body.avatar,
        address: req.body.address
    }

        res.status(201).json({ newUser });
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }

});

/**
 * 
 * POST login
 0*/
router.route('/login').post((req, res) => {
    try {
        const login = {
            username: req.body.username,
            password: req.body.password,

        };
        res.status(200);
    } catch (error) {
        console.error(error);
    }
});


// GET logout
router.route('/logout').get((req, res) => {
    res.status(200);
});

module.exports = router;