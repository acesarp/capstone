const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * GET all reactions by comment
 */
router.route('/comments/:commentId/:index').get(async (req, res) => {
    await prisma.reaction.findMany({
        where: {
            commentCommentId: parseInt(req.params.commentId),
        },
        take: parseInt(req.params.index)
        })
        .then((reactions) => {
            //console.info(reactions);
            res.status(200).json(reactions);
        })
        .catch(error => {
            //console.error(error);
            res.status(404);
        });
});

// GET reaction by id
router.route('/byid/:reactionId').get(async (req, res) => {
    await prisma.reaction.findUnique({
        where: {
            reactionId: parseInt(req.params.reactionId)
        },
        select: {
            reactionId: true,
            likeDislike: true,
            ownerId: true,
            commentCommentId: true
        }
    })
        .then((reaction) => {
            res.status(200).json(reaction);
        })
        .catch(error => {
            console.error(error);
            res.status(404);
        });
});

/**
 * 
 * POST reaction
 */
router.route('/').post(async (req, res) => {

    await prisma.reaction.create({
        data: {
            likeDislike: req.body.likeDislike,
            ownerId: partseInt(req.body.userId),
            commentCommentId: req.body.commentId
        }
    })
        .then((newreaction) => res.status(201).json({ newreaction }))
        .catch((err) => {
            console.error(err);
            res.status(404);
        });
});


/*
* put, update reaction
*/
router.route('/').put(async (req, res) => {
    await prisma.reaction.update({
        data: {
            likeDislike: req.body.likeDislike
        },
        where: { reactionId: req.body.reactionId }
    })
        .then((updatereaction) => res.status(201).json({ updatereaction }))
        .catch((err) => {
            console.error(err);
            res.status(404);
        });
});



// delete reaction
router.route('/:reactionId').delete(async (req, res) => {
    await prisma.reaction.delete({
        where: { reactionId: req.params.reactionId }
            .then((deletedreaction) => res.status(200).json({ deletedreaction }))
            .catch(error => {
                console.error(error);
                res.status(404);
            })
    });
});

module.exports = router;