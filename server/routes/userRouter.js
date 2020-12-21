const path = require("path");
const usersFolderPath = path.join(__dirname + "/usersData/");
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const mkdirp = require('mkdirp');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');


const sqlConnection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Vancouver2020"

});

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
        const queryString = `SELECT * FROM Friends WHERE userId = ${mysql.escape(req.params.userId)}`;
        sqlConnection.query(`USE 'capstone-project-prisma'`);
        sqlConnection.query(queryString, (error, result) => {
            if (error) throw error;
            console.log("Result: " + result);
            res.status(200).json(result);

        });
    }
    catch (error) {
        //console.error("Auth ERROR ==> ", error);
        res.status(404).send(error);
        return;
    }




    //console.log(req.params.keyword);
    await prisma.user.findUnique({
        where: {
                userId: parseInt(req.params.friendId)
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
 * GET all friends by userId
 */
router.route('/friends/all/:userId/:token').get(async (req, res) => {
    // console.log(req.params.token, req.params.userId);
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
    await prisma.user.findMany({
        where: {
            NOT: [{
                userId: parseInt(req.params.userId)
            }
            ]
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
    const result = verifyToken(req.params.token);
    console.log(result)
    if (!result) {
        res.status(401);
        return;
    }


    console.log("Add friend route ", req.params);
    await prisma.friends.create({
        data: {
            friend: {
                connect: { userId: Number(req.params.friendId) }
            },
            owner: {
                connect: {
                    userId: Number(req.params.userId)
                }
            }
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
    //console.info("GET authorize user ", req.params);
    await prisma.user.findFirst({
        where: {
            username: `${req.params.username}`
        }
    })
        .then((user) => {
            console.info("user ", user);
            if (user) {
                const token = createToken(user.username);
                user.password = "";
                res.status(200).json({ user: user, token: token });
            }
            else {
                res.status(404).json({ username: req.params.username , message: "Username or password invalid."});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500)({ error: token });
        });
});


/**
 * GET logout
 */
router.route('/logout/:userId/:token').get(async (req, res) => {
    //console.log(req.params.token, req.params.userId);
    try {
        if (req.params.token && req.params.userId) {
            console.log(req.params.userId);
            res.status(200).json({tokken: req.params.token, userId: req.params.userId});
        }
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
router.route('/images/:imagename/:userId').get((req, res) => {
    res.sendFile(`${usersFolderPath}${req.params.userId}-ProfileData/gallery/${req.params.imagename}`, (error) => {
        console.error(error);
    });
});

/**
 * 
 * 
 */
router.route('/images/all/:userId').get((req, res) => {
    res.sendFile(`${__dirname}/usersData/${req.params.userId}-ProfileData/gallery`, (error) => {
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
            province_state: req.body.address.province_state,
            country: req.body.address.country,
            userFolderPath: "",
            avatar: "",
            displayName: `${req.body.firstName} ${req.body.lastName}`,
            displayBirthday: null,
            about: req.body.about,
            gender: req.body.gender,
        }
    })
    .then(async (user) => {
        if (req.body.avatarFileName) {
            const imageData = req.body.avatarBlob.replace(/^data:image\/png;base64,/, "");
            const userfolderPath_ = `${usersFolderPath}${user.userId}-ProfileData/`;
            const avatarFileName_ = `${user.userId}-avatar-[${new Date().getMilliseconds()}]`.replace(/\s/g, "");
            
            mkdirp(userfolderPath_);

            updateField("userFolderPath", userfolderPath_, user.userId);
            updateField("avatar", avatarFileName_, user.userId);

            fs.writeFile(`${userfolderPath_}${avatarFileName_}`, imageData, 'base64', (msg) => {
                //console.error(msg);
                res.status(201).json({ user, token: createToken(user.username) });
                console.info(user);
            });
        }
        else {
            res.status(201).json({ user, token: createToken(user.username) });
            console.info(user);
        }
    })
    .catch((error) => {
        //console.error(error);
        res.status(200).json({error: error});
    });
});



/**
* PUT, update user
*/
router.route('/:token').put(async (req, res) => {
    //console.log(req.body);
    await prisma.user.update({
        data: {
            username: req.body.username,
            firstName: req.body.first,
            lastName: req.body.last,
            dob: new Date(req.body.dob),
            phone: req.body.phone,
            email: req.body.email,
            street: req.body.street,
            city: req.body.address.city,
            province_state: req.body.address.province_state,
            country: req.body.address.country,
            userFolderPath: "",
            displayName: req.body.firstName,
            displayBirthday: null,
            about: req.body.about,
            gender: req.body.gender,
        },
        where: { userId: Number(req.body.userId) }
    })
        .then((user) => {
            console.log(user.email)
            res.status(201).json({ user });
        })
        .catch((err) => {
            //console.error(err);
            res.status(404);
        });
});


/**
 * DELETE user
 */
router.route('/:userId').delete(async (req, res) => {
    //console.log(req.params);
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
    return jwt.sign({ username: user_ }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};


const verifyToken = (token_) => {
    console.log("verifyToken");
    try {
        console.log("verifyToken");
        const result = jwt.verify(token_, process.env.TOKEN_SECRET);
        console.log(result);
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
        province_state: body_.province_state,
        country: body_.country,
        userFolderPath: body_.userFolderPath ?? "",
        displayName: body_.displayName ? body_.displayName : `${body_.firstName} ${body_.lastName}`,
        displayBirthday: null,
        about: body_.about,
        gender: body_.gender,
        avatar: body_.thumbnail ?? ""
    };

};


// expressListRoutes({ prefix: '/api/v1' }, 'API:', router );



module.exports = router;