const express = require('express');
const Account = require('../models/account');
const router = express.Router();

/**
 * 
 */
router.route('/').get((req, res) => {
    Account.where(req.query)
        .fetchAll({ withRelated: ['inventories'] })
        .then((accounts) => {
            res.status(200).json(accounts);
        });
});

// get all accounts
router.route('/').post((req, res) => {
    new Account({
        name: req.body.name,
        position: req.body.position,
        manager: req.body.manager,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        categories: JSON.stringify(req.body.categories),
    })
        .save()
        .then((newAccount) => {
            res.status(201).json({ newAccount });
        })
        .catch((err) => console.error(err));
});

// get account by id
router.route('/:id').get((req, res) => {
    Account.where(req.params)
        .fetch({ withRelated: ['inventories'] })
        .then((account) => {
            res.status(200).json(account);
        });
});

// put, update account
router.route('/:id').put((req, res) => {
    Account.where('id', req.params.id)
        .fetch()
        .then((account) => {
            account
                .save({
                    name: req.body.name ? req.body.name : account.name,
                    position: req.body.position ? req.body.position : account.position,
                    manager: req.body.manager ? req.body.manager : account.manager,
                    address: req.body.address ? req.body.address : account.address,
                    phone: req.body.phone ? req.body.phone : account.phone,
                    email: req.body.email ? req.body.email : account.email,
                    categories: JSON.stringify(req.body.categories)
                        ? JSON.stringify(req.body.categories)
                        : account.categories,
                })
                .then((updatedAccount) => {
                    res.status(200).json({ updatedAccount });
                });
        });
});


/**
 * delete account
 */
router.route('/:id').delete((req, res) => {
    Account.where('id', req.params.id)
        .destroy()
        .then((deletedAccount) => {
            res.status(200).json({ deletedAccount });
        });
});

module.exports = router;
