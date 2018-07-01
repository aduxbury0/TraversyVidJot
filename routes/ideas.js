const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load auth helper
const { ensureAuthentication } = require('../helpers/auth');

//loading idea model
require('../models/Idea');
const Idea = mongoose.model('ideas');

//idea index page
router.get('/', ensureAuthentication, (req, res) => {
    Idea.find({ user: req.user.id })
        .sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

//Add idea form Route
router.get('/add', ensureAuthentication, (req, res) => {
    res.render('ideas/add');

});

//Edit idea form Route
router.get('/edit/:id', ensureAuthentication, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            if (idea.user != req.user.id) {
                req.flash('error_msg', 'Not authorised');
                res.redirect('/ideas');
            } else {
                res.render('ideas/edit', {
                    idea: idea
                });

            }
        })
});

//Add form Route
router.post('/', ensureAuthentication, (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add details' });
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        };
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg', 'SUCCESS: Item Added');
                res.redirect('/ideas')
            })
    }
});

//Edit form Route
router.put('/:id', ensureAuthentication, (req, res) => {
    Idea.findOne({
        _id: req.params.id

    })
        .then(idea => {
            //new values
            idea.title = req.body.title;
            idea.details = req.body.details;
            idea.save()
                .then(idea => {
                    req.flash('success_msg', 'SUCCESS: Item Edited');
                    res.redirect('/ideas');
                })
        });
});

//Delete idea Route
router.delete('/:id', ensureAuthentication, (req, res) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'SUCCESS: Item Deleted');
            res.redirect('/ideas');
        });
})

module.exports = router;