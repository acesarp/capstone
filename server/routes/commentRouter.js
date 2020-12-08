const express = require('express');
const Event = require('../models/event');
const router = express.Router();

/**
 * 
 */
router.route('/').get((req, res) => {
    Event.where(req.query)
        .fetchAll({ withRelated: ['inventories'] })
        .then((events) => {
            res.status(200).json(events);
        });
});

// get all events
router.route('/').post((req, res) => {
    new Event({
        name: req.body.name,
        position: req.body.position,
        manager: req.body.manager,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        categories: JSON.stringify(req.body.categories),
    })
        .save()
        .then((newevent) => {
            res.status(201).json({ newevent });
        })
        .catch((err) => console.error(err));
});

// get event by id
router.route('/:id').get((req, res) => {
    Event.where(req.params)
        .fetch({ withRelated: ['inventories'] })
        .then((event) => {
            res.status(200).json(event);
        });
});

// put, update event
router.route('/:id').put((req, res) => {
    Event.where('id', req.params.id)
        .fetch()
        .then((event) => {
            event
                .save({
                    name: req.body.name ? req.body.name : event.name,
                    position: req.body.position ? req.body.position : event.position,
                    manager: req.body.manager ? req.body.manager : event.manager,
                    address: req.body.address ? req.body.address : event.address,
                    phone: req.body.phone ? req.body.phone : event.phone,
                    email: req.body.email ? req.body.email : event.email,
                    categories: JSON.stringify(req.body.categories)
                        ? JSON.stringify(req.body.categories)
                        : event.categories,
                })
                .then((updatedWarehouse) => {
                    res.status(200).json({ updatedWarehouse });
                });
        });
});


/**
 * delete event
 */
router.route('/:id').delete((req, res) => {
    Event.where('id', req.params.id)
        .destroy()
        .then((deletedevent) => {
            res.status(200).json({ deletedevent });
        });
});

module.exports = router;
