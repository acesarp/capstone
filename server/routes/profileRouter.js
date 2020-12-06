const express = require('express');
const Profile = require('../models/profile');
const router = express.Router();

/**
 * 
 */
router.route('/').get((req, res) => {
    Profile.where(req.query)
        .fetchAll({ withRelated: ['inventories'] })
        .then((profiles) => {
            res.status(200).json(profiles);
        });
});

// get all profiles
router.route('/').post((req, res) => {
    new Profile({
        name: req.body.name,
        position: req.body.position,
        manager: req.body.manager,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        categories: JSON.stringify(req.body.categories),
    })
        .save()
        .then((newprofile) => {
            res.status(201).json({ newprofile });
        })
        .catch((err) => console.error(err));
});

// get profile by id
router.route('/:id').get((req, res) => {
    Profile.where(req.params)
        .fetch({ withRelated: ['inventories'] })
        .then((profile) => {
            res.status(200).json(profile);
        });
});

// put, update profile
router.route('/:id').put((req, res) => {
    Profile.where('id', req.params.id)
        .fetch()
        .then((profile) => {
            profile
                .save({
                    name: req.body.name ? req.body.name : profile.name,
                    position: req.body.position ? req.body.position : profile.position,
                    manager: req.body.manager ? req.body.manager : profile.manager,
                    address: req.body.address ? req.body.address : profile.address,
                    phone: req.body.phone ? req.body.phone : profile.phone,
                    email: req.body.email ? req.body.email : profile.email,
                    categories: JSON.stringify(req.body.categories) ? JSON.stringify(req.body.categories) : profile.categories,
                })
                .then((updatedProfile) => {
                    res.status(200).json({ updatedProfile });
                });
        });
});


/**
 * delete profile
 */
router.route('/:id').delete((req, res) => {
    Profile.where('id', req.params.id)
        .destroy()
        .then((deletedprofile) => {
            res.status(200).json({ deletedprofile });
        });
});

module.exports = router;
