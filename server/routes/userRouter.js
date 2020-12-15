const path = require("path");
const usersFolderPath = path.join(__dirname + "/usersData/");
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const mkdirp = require('mkdirp');
const jwt = require('jsonwebtoken');
const { response } = require("express");

/**
 * GET friend by userId (friendId)
 */
router.route('/friends/friend/:userId/:token/:friendId').get(async (req, res) => {
    let auth;
    try {
        auth = jwt.verify(req.params.token, process.env.TOKEN_SECRET);
        if (!auth) {
            res.status(401);
            return;
        }
    }
    catch (error) {
        //console.error("Auth ERROR =====> ", error);
        res.status(401).send(error);
        return;
    }
    //console.log(req.params.keyword);
    await prisma.user.findUnique({
        where: {
                userId: parseInt(req.params.friendId)

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
            picture_med: true,
            picture_large: true,
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
 * GET add friend by userId (friendId)
 */
router.route('/friends/friend/add/:userId/:token/:friendId').get(async (req, res) => {

    if (!verifyToken(req.params.token)) {
        res.status(401);
        return;
    }
    //console.log(req.params.keyword);
    await prisma.user.update({
        where: {
            userId: parseInt(req.params.userId)

        },
        data: {friends: userToAdd} // <=============== to finish
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
 * GET friends
 */
router.route('/friends/:userId/:token/:keyword').get(async (req, res) => {
    let auth;
    try {
        auth = jwt.verify(req.params.token, process.env.TOKEN_SECRET);
        if (!auth) {
            res.status(401);
            return;
        }
    }
    catch (error) {
        //console.error("Auth ERROR =====> ", error);
        res.status(401).send(error);
        return;
    }
    //console.log(req.params.keyword);
    await prisma.user.findMany({
        where: {
            OR: [
                { firstName: { contains: `${req.params.keyword}` } },
                { lastName: { contains: `${req.params.keyword}` } },
                { about: { contains: `${req.params.keyword}` } }
            ]

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
            picture_med: true,
            picture_large: true,
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


/**
 *
 * GET authorize user
 */ 
router.route('/authorize/:username/:password').get(async (req, res) => {
    console.info("GET authorize user ", req.params);
    await prisma.user.findFirst({
        where: {
            username: `${req.params.username}`
        },
        select: {
            username: true,
            userId: true,
            password: true,
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
            avatar: true,
            picture_med: true,
            picture_large: true,
            about: true,
            gender: true
        }
    })
        .then((user) => {
            console.info(user);
            if (req.params.password === user.password) {
                const token = createToken(user.username);
                user.password = "";
                res.status(200).json({ user: user, token: token });
            }
            else {
                res.status(404);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500);
        });
});


/**
 * GET logout
 */
router.route('/logout/:userId/:token').get(async (req, res) => {
    try {
        if (req.params.token && req.params.userId)
            res.status(200);
    }
    catch (error) {
        console.error("Auth ERROR =====> ", error);
        res.status(500);
    }
});


/**
 * 
 * 
 */
router.route('/pictures/:picturename/:userId').get((req, res) => {
    res.sendFile(`${ usersFolderPath }${ req.params.userId }-ProfileData/${req.params.picturename}`, (error) => {
        console.error(error);
    });
});

/**
 * 
 * POST user
 */
router.route('/').post(async (req, res) => { 
    //console.log();
    await prisma.user.create({
        data: {
            username: req.body.userName,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            phone: req.body.phone,
            email: req.body.email,
            street: req.body.address.street,
            city: req.body.address.city,
            province_state: req.body.address.provinceState,
            country: req.body.address.country,
            userFolderPath: "",
            avatar: "",
            displayName: `${req.body.firstName} ${req.body.lastName}`,
            displayBirthday: null,
            about: req.body.about,
            gender: req.body.gender,
        }
    })
    .then(async (newUser) => {
        if (req.body.avatarFileName) {
            const imageData = req.body.avatarBlob.replace(/^data:image\/png;base64,/, "");
            const userfolderPath_ = `${usersFolderPath}${newUser.userId}-ProfileData/`;
            const avatarFileName_ = `${newUser.userId}-avatar-[${new Date().getMilliseconds()}]`.replace(/\s/g, "");
            
            mkdirp(userfolderPath_);

            updateField("userFolderPath", userfolderPath_, newUser.userId);
            updateField("avatar", avatarFileName_, newUser.userId);

            fs.writeFile(`${userfolderPath_}${avatarFileName_}`, imageData, 'base64', (msg) => {
                console.error(msg);
                console.info(newUser);
                res.status(201).json({ newUser, token: createToken(newUser.username) });
                console.info(newUser);
            });
        }
        else {
            res.status(201).json({ newUser, token: createToken(newUser.username) });
            console.info(newUser);
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });
});



/**
* PUT, update user
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
            province_state: req.body.provinceState,
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


/**
 * DELETE user
 */
router.route('/:userId').delete(async (req, res) => {
    console.log(req.params);
    try {
        await prisma.user.delete({
            where: { userId: parseInt(req.params.userId) }
        })
        .then((deletedUser) => res.status(200).json({ deletedUser }))
        .catch(error => {
            console.error("DELETE error ===> ", error);
            res.status(404);
        });
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});







/**
 * 
 *  ================================= HELPER METHODS ===================================== 
 */


/**
 * 
 * @param {String} user_
 */
const createToken = (user_) => {
    //console.info("process.env.TOKEN_SECRET ==> ", process.env.TOKEN_SECRET);
    return jwt.sign({ username: user_ }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};


const verifyToken = (token_) => {
    try {
        const result = jwt.verify(token_, process.env.TOKEN_SECRET);
        if (result) {
            return true;
            
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}


/**
 * 
 * @param {string} field
 * @param {string} value
 * @param {Number} userId 
 */
const updateField = async (field, value, userId) => {
    await prisma.user.update({
        data: { [field]: value, },
        where: { userId: userId }
    })
        .then(rst => console.log(rst))
        .catch((error) => console.error(error));
};

/**
 * 
 * @param {Object} body_ 
 */
const setPrismaData = (body_) => {
    //console.log(body_);
    return {
        userId: body_.userId ?? "",
        username: body_.username,
        password: body_.password,
        firstName: body_.first,
        lastName: body_.last,
        dob: body_.dob.date,
        phone: body_.phone,
        email: body_.email,
        street: body_.street,
        city: body_.city,
        province_state: body_.state,
        country: body_.country,
        userFolderPath: body_.userFolderPath ?? "",
        displayName: body_.displayName ? body_.displayName : `${body_.firstName} ${body_.lastName}`,
        displayBirthday: null,
        about: body_.about,
        gender: body_.gender,
        avatar: body_.thumbnail ?? ""
    };

};

module.exports = router;


module.exports = router;