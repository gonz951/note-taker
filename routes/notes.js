const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../db/db.json'))
);

router.post('/notes', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parseNotes = JSON.parse(data);
                parseNotes.push(newNote);
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parseNotes)
                )
            }
        })
    }
});


module.exports = router;
