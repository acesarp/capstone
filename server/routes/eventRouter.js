const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const sqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vancouver2020",
    database: "capstone-project-prisma"

});


/**
 * GET all events
 */
router.route('/all/:userId').get(async (req, res) => {
    console.log(req.params)
    await prisma.event.findMany({
        where: {
            ownerId: parseInt(req.params.userId)
        },
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

/**
 * GET events by userIdand index
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


/**
 * 
 * GET event by id
 */
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
    console.log(req.body);
    try {
        if (!jwt.verify(req.headers.token, process.env.TOKEN_SECRET)) {
            res.status(401);
            return;
        }

        await prisma.event.create({
            data: {
                owner: { connect: { userId: req.body.ownerId } },
                name: req.body.name,
                address: req.body.location,
                description: req.body.description
            }
        })
            .then((newevent) => {
                req.body.participants.forEach(async item => {
                    console.log(item);
                    await prisma.event.update({
                        data: {
                            participants: { connect: { userId: item } }
                        },
                        where: { eventId: parseInt(newevent.eventId) }
                    });
                    
                });
                res.status(201).json({ newevent });
            })
        .catch((err) => {
            console.error(err);
            res.status(404);
        });
    } 
    catch (error) {
        console.error(error);
    }
});


/**
 * 
 * put, update event
 */
router.route('/').put(async (req, res) => {
    await prisma.event.update({
        data: {
            owner: { connect: { userId: req.body.ownerId } },
            name: req.body.name,
            address: req.body.location,
            description: req.body.description,
            participants: req.body.participants
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
 * PUT, add participant to event
 */
router.route('/addParticipants/:eventId').post(async (req, res) => {
    let response;
    req.body.ids.forEach(async id => {
        await prisma.event.update({
            data: {
                participants: { connect: { userId: id } }
            },
            where: { eventId: parseInt(req.params.eventId) }
        })
            .then((updatedEvent) => response = updatedEvent);
        //.catch ((err) => {
        console.error("post");
        //});

        res.status(201).send(response);
    });
});



/** 
 *
 * DELETE event
 */
router.route('/:eventId').delete(async (req, res) => {
    await prisma.event.delete({
        where: {
            eventId: parseInt(req.params.eventId)
        }
    })
        .then((deletedEvent) => res.status(200).json({ deletedEvent }))
        .catch(error => {
            console.error(error);
            res.status(404);
        })
});

module.exports = router;