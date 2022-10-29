const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route1: Get all the notes using Get "api/notes/fetchallnote". login required
router.get('/fetchallnote', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id })
        res.json(note)
    } catch (error) {
        console.log(error.messaage)
        res.status(500).send("Internal server error");
    }
})

//Route2: Add a new notes using Post "api/notes/addnote". login required
router.post('/addnote', fetchuser, [
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


//Route3: Update a existing notes using PUT "api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'enter a title atleast 5 character').isLength({ min: 5 }),
    body('description', 'enter a description atleast 10 character').isLength({ min: 10 }),
], async (req, res) => {
    const { title, description, tag } = req.body;

    try {

        // if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        // Create a new note object
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found!")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json({ note })
    } catch (error) {
        console.log(error.messaage)
        res.status(500).send("Internal server error");
    }

})


//Route4: Delete a existing notes using DELETE "api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // Find the note to be deleted and delete it 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found!")
        }

        //Allowed deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!")
        }

        note = await Note.findByIdAndDelete(req.params.id)

        res.json({ status: 200, msg: "success note has been deleted!" })
    } catch (error) {
        console.log(error.messaage)
        res.status(500).send("Internal server error");
    }

})

module.exports = router