const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * GET all events by userId
 */
router.route('/:userId/:index').get(async (req, res) => {
    await prisma.event.findMany({
        where: {
            ownerId: parseInt(req.params.userId),
        },
        take: parseInt(req.params.index)
    })
        .then((events) => {
            //console.info(events);
            res.status(200).json(events);
        })
        .catch(error => {
            //console.error(error);
            res.status(404);
        });
});

// GET event by id
router.route('/:eventId').get(async (req, res) => {
    await prisma.event.findUnique({
        where: {
            eventId: parseInt(req.params.eventId)
        }
    })
        .then((event) => {
            res.status(200).json(event);
        })
        .catch(error => {
            console.error(error);
            res.status(404);
        });
});

/**
 * 
 * POST event
 */
router.route('/').post(async (req, res) => {

    await prisma.event.create({
        data: {
            owner: req.body.________,
            name: req.body.name,
            address: req.body.address,
            description: req.body.description
        }
        })
        .then((newevent) => res.status(201).json({ newevent }))
        .catch((err) => {
            console.error(err);
            res.status(404);
        });
});


/**
 * put, update event
 */
router.route('/').put(async (req, res) => {
    await prisma.event.update({
        data: {
            name: req.body.name,
            address: req.body.address,
            description: req.body.description
        },
        where: { eventId: req.body.eventId }
    })
        .then((updatedEvent) => res.status(201).json({ updatedEvent }))
        .catch((err) => {
            console.error(err);
            res.status(404);
        });
});


/**
 * PUTR, add participant to event
 */
router.route('/addPaticipants/:eventId').post(async (req, res) => {
    await prisma.event.update({
        data: {
            participants: req.body._______
        },
        where: { eventId: parseInt(req.params.eventId) }
    })
        .then((updatedEvent) => res.status(201).json({ updatedEvent }))
        .catch((err) => {
            console.error(err);
            res.status(404);
        });
});



// delete event
router.route('/:eventId').delete(async (req, res) => {
    await prisma.event.delete({
        where: { eventId: req.params.eventId }
            .then((deletedevent) => res.status(200).json({ deletedevent }))
            .catch(error => {
                console.error(error);
                res.status(404);
            })
    });
});

module.exports = router;