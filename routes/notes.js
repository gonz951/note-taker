const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helper/fsUtils');

notes.get('/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, '../db/db.json'))
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// for a specific note
notes.get('/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;

    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteId);
            return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID');
        });
});

notes.delete('/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id !== noteId);
            writeToFile('./db/db.json', result);
            res.json(`Note ${noteId} has been deleted`);
        });
});

notes.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        //console.log(req.params.note_id)
        readAndAppend(newNote, './db/db.json');
        res.json('Note added.');
    } else {
        res.error('Error in adding note.');
    }
});


module.exports = notes;