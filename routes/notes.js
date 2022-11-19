const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new notes
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to save a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      id: uuid(),
      title, 
      text
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding notes');
  } 
});

// Delete Route for deleting a note
notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  const id = req.params.id

  if (id) {
    readAndDelete(id, './db/db.json');
    res.json(`Note deleteed successfully 🚀`);
  } else {
    res.error('Error in deleting note');
  }
});

module.exports = notes;
