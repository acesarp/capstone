const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * GET all comments by eventId
 */
router.route('/:eventId').get(async (req, res) => {
    await prisma.comment.findMany({
        where: {
            eventEventId: parseInt(req.params.eventId)
        }
    })
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(404);
        });
});

// POST comment
router.route('/').post(async (req, res) => {
    await prisma.comment.create({
        data: {
            title: req.body.tile,
            author: req.body.author,
            text: req.body.text
        }
    })
    .then(comment => {
        res.status(201).json({ comment });
    })
    .catch(err => console.error(err));
});


// GET comment by commentId
router.route('/:commentId').get(async(req, res) => {
    await prisma.comment.findUnique({
        where: {
            commentId: parseInt(req.params.commentId)
        }
    })
        .then((event) => {
            res.status(200).json(event);
        });
});

// PUT, update comment
router.route('/').put(async (req, res) => {
    await prisma.comment.update({
        data: {
            title: req.body.title,
            author: req.body.author,
            text: req.body.text,
            updatedAt: new Date()
        },
        where: {
            commentId: req.body.commentId
        }
    })
    .then(comment => res.status(200).json({ comment }))
    .catch(error => console.error(error));
});


/**
 * delete event
 */
router.route('/:commentId').delete(async (req, res) => {
    await prisma.comment.delete({
        where: {
            commentId: parseInt(req.params.commentId)
        }
    })
    .then(response => res.status(200).json({ response }))
    .catch(error => console.error(error));
});

module.exports = router;
