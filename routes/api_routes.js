// Import express, uuid, and fs packages 
const router = require('express').Router()
const { v4: generateID } = require('uuid')
const fs = require('fs/promises')

// Function that handles reading the db.json file and returning the parsed data
async function getTaskData(){
  const taskdata = await fs.readFile('./db/db.json', 'utf8')

  return JSON.parse(taskdata)
}

// GET route sends the existing json data to the index.js getNotes fetch
router.get('/notes', async (req, res) => {
  const noteData = await getTaskData()
  res.json(noteData) // Send existing json data to index.js
})

// POST route recieves the new note object from the index.js saveNote fetch and writes it to the db.json file
router.post('/notes', async (req, res) => {
  const newNote = req.body //Recieve note
  newNote.id = generateID() // assign a random id property and value to the new note object
  const notesData = await getTaskData()
  notesData.push(newNote) //Add the new note to the existing json data
  await fs.writeFile('./db/db.json', JSON.stringify(notesData, null, 2)) // write the new json data to the db.json file
  res.json(newNote) // send the new note back to the index.js to be displayed on the webpage
})

// DELETE route handles deleting the selected task by its id
router.delete('/notes/:id', async (req, res) => {
  const notesData = await getTaskData()
  const id = req.params.id //pulls the id from the selected task object 
  const filteredNotes = notesData.filter(uObj => uObj.id !== id) // selects all other notes

  await fs.writeFile('./db/db.json', JSON.stringify(filteredNotes, null, 2)) //writes the notes that were not selected back to the db.json file

  res.json({ // sends the remaining db.json data back to the index.js
    message: 'Your note has been deleted.'
  })
})

module.exports = router