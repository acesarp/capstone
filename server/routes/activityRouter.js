const express = require('express');
const Activity = require('../models/activity');
const router = express.Router();

/**
 * 
 */
router.route('/').get((req, res) => {
    Activity.where(req.query)
        .fetchAll({ withRelated: ['inventories'] })
        .then((activitys) => {
            res.status(200).json(activitys);
        });
});

// get all activitys
router.route('/').post((req, res) => {
    new Activity({
        name: req.body.name,
        position: req.body.position,
        manager: req.body.manager,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        categories: JSON.stringify(req.body.categories),
    })
        .save()
        .then((newactivity) => {
            res.status(201).json({ newactivity });
        })
        .catch((err) => console.error(err));
});

// get activity by id
router.route('/:id').get((req, res) => {
    Activity.where(req.params)
        .fetch({ withRelated: ['inventories'] })
        .then((activity) => {
            res.status(200).json(activity);
        });
});

// put, update activity
router.route('/:id').put((req, res) => {
    Activity.where('id', req.params.id)
        .fetch()
        .then((activity) => {
            activity
                .save({
                    name: req.body.name ? req.body.name : activity.name,
                    position: req.body.position ? req.body.position : activity.position,
                    manager: req.body.manager ? req.body.manager : activity.manager,
                    address: req.body.address ? req.body.address : activity.address,
                    phone: req.body.phone ? req.body.phone : activity.phone,
                    email: req.body.email ? req.body.email : activity.email,
                    categories: JSON.stringify(req.body.categories)
                        ? JSON.stringify(req.body.categories)
                        : activity.categories,
                })
                .then((updatedactivity) => {
                    res.status(200).json({ updatedactivity });
                });
        });
});


/**
 * delete activity
 */
router.route('/:id').delete((req, res) => {
    Activity.where('id', req.params.id)
        .destroy()
        .then((deletedactivity) => {
            res.status(200).json({ deletedactivity });
        });
});

module.exports = router;
