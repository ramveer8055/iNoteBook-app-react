const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route1: Get all the notes using Get "api/auth/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id })
        res.json(note)
    } catch (error) {
        console.log(error.messaage)
        res.status(500).send("Internal server error");
    }
})

//Route2: Add a new notes using Post "api/auth/addnotes". login required
router.post('/addnotes', fetchuser, [
    body('title', 'enter a title atleast 5 character').isLength({ min: 5 }),
    body('description', 'enter a description atleast 10 character').isLength({ min: 10 }),
], async (req, res) => {

    try {


        // if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;


        notes = new Note({
            user: req.user.id,
            title,
            description,
            tag
        })

        const saveNote = await notes.save();

        res.json(saveNote)
    } catch (error) {
        console.log(error.messaage)
        res.status(500).send("Internal server error");
    }
})

module.exports = router