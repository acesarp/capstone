const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * GET all friends
 */
router.route('/friends/:userId').get(async (req, res) => {
    await prisma.user.findMany({
        where: {
            userId: parseInt(req.params.userId),
        },
        select: {
            username: true,
            userId: true,
            firstName: true,
            lastName: true,
            dob: true,
            phone: true,
            email: true,
            street: true,
            city: true,
            province_state: true,
            country: true,
            displayName: true,
            displayBirthday: true,
            about: true,
            gender: true
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

// GET user by id
router.route('/:userId').get(async (req, res) => {
    await prisma.user.findUnique({
        where: {
            userId: parseInt(req.params.userId),
        },
        select: {
            username: true,
            userId: true,
            firstName: true,
            lastName: true,
            dob: true,
            phone: true,
            email: true,
            street: true,
            city: true,
            province_state: true,
            country: true,
            displayName: true,
            displayBirthday: true,
            about: true,
            gender: true
        }
    })
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
 */
router.route('/').post(async (req, res) => {

    await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.first,
            lastName: req.body.last,
            dob: req.body.dob.date,
            phone: req.body.phone,
            email: req.body.email,
            street: req.body.street,
            city: req.body.city,
            province_state: req.body.state,
            country: req.body.country,
            userFolderPath: "",
            displayName: req.body.login.username,
            displayBirthday: null,
            about: req.body.about,
            gender: req.body.gender,
            avatar: req.body.picture.thumbnail
        }
    })
        .then((newUser) => res.status(201).json({ newUser }))
        .catch((err) => console.error(err));
});


/*
* put, update user
*/
router.route('/').put(async (req, res) => {
    await prisma.user.update({
        data: {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.first,
            lastName: req.body.last,
            dob: req.body.dob.date,
            phone: req.body.phone,
            email: req.body.email,
            street: req.body.street,
            city: req.body.city,
            province_state: req.body.state,
            country: req.body.country,
            userFolderPath: "",
            displayName: req.body.login.username,
            displayBirthday: null,
            about: req.body.about,
            gender: req.body.gender,
            avatar: req.body.picture.thumbnail
        },
        where: { userId: req.body.userId }
    })
        .then((updateUser) => res.status(201).json({ updateUser }))
        .catch((err) => {
            console.error(err);
            res.status(404);
        });
});



// delete user
router.route('/:userId').delete(async (req, res) => {
    await prisma.user.delete({
        where: { userId: req.params.userId }
            .then((deletedUser) => res.status(200).json({ deletedUser }))
            .catch(error => {
                console.error(error);
                res.status(404);
            })
    });
});

module.exports = router;