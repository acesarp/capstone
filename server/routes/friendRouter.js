const express = require('express');
const Friend = require('../models/friend');
const router = express.Router();

/**
 * 
 */
router.route('/').get((req, res) => {
    Friend.where(req.query)
        .fetchAll({ withRelated: ['inventories'] })
        .then((friends) => {
            res.status(200).json(friends);
        });
});


module.exports = router;
