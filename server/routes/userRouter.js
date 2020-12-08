const express = require('express');
const user = require('../models/user');
const router = express.Router();

/**
 * GET all users
 */
// router.route('/').get((req, res) => {

//     user.where(req.params)
//         .column("username", "userId", "firstName", "lastName", "dob", "phone", "email", "street", "city", "province-state", "country", "displayName", "displayBirth", "about", "gender")
//         .select()
//         .then((user) => {
//             res.status(200).send(user);
//         });
// });

// GET user by id
router.route('/:userId').get((req, res) => {
console.log()
    new user().query(function (qb) {
        qb.where("userId", req.params.userId);
        qb.select("username", "userId", "firstName", "lastName", "dob", "phone", "email", "street", "city", "province-state", "country", "displayName", "displayBirthDay", "about", "gender");
    })
    .fetch()
    .then((user) => {
        res.status(200).json(user);
    })
    .catch(error => {
        console.error(error);
        res.status(404);
    });
});

/**
 * 
 * POST user
 0*/ 
router.route('/').post((req, res) => {
    new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        manager: req.body.manager,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        categories: JSON.stringify(req.body.categories),
    })
        .save()
        .then((newUser) => {
            res.status(201).json({ newUser });
        })
        .catch((err) => console.error(err));
});

// put, update user
router.route('/:id').put((req, res) => {
    User.where('id', req.params.id)
        .fetch()
        .then((user) => {
            user
                .save({
                    name: req.body.name ? req.body.name : user.name,
                    position: req.body.position ? req.body.position : user.position,
                    manager: req.body.manager ? req.body.manager : user.manager,
                    address: req.body.address ? req.body.address : user.address,
                    phone: req.body.phone ? req.body.phone : user.phone,
                    email: req.body.email ? req.body.email : user.email,
                    categories: JSON.stringify(req.body.categories)
                        ? JSON.stringify(req.body.categories)
                        : user.categories,
                })
                .then(updatedUser => {
                    res.status(200).json({ updatedUser });
                })
                .catch((err) => console.error(err));
        });
});


// delete user
router.route('/:id').delete((req, res) => {
    User.where('id', req.params.id)
        .destroy()
        .then((deletedUser) => {
            res.status(200).json({ deletedUser });
        });
});

module.exports = router;