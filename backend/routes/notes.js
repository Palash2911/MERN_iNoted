const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
// so that empty notes are discarded
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Fetch All The Notes - Using Get and not Post
router.get('/fetchnotes', fetchuser, async (req, res)=>{
    try{
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
    }catch (error) {
        console.error(error.message);  
        res.status(500).send("Internal Error Occurred");
    }
})

// ROUTE 2 : Add a New Notes - Using Post
router.post('/addnotes', fetchuser,[
        body('title', 'Enter a Valid Email ').isLength({ min: 3 }),
        body('description', 'Description should be minimum 9 characters').isLength({ min: 9 }),
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body;

        // Error - Validations - If Errors find and return them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        // saved notes
        const savenote = await notes.save()
        res.json(savenote)

    } catch (error) {
        console.error(error.message);  
        res.status(500).send("Internal Error Occurred");
    }
})


// ROUTE 3 : Update Notes - Using Put
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 4 : Delete Notes - Using Delete
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deleteion only if user is valid
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("UnAuthorised !!");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note Deleted !!"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router