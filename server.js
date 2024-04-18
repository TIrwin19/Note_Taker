// Import express and the api_routes.js 
const express = require('express')
const app = express()
const api_routes = require('./routes/api_routes')
const PORT = 3333 // Assign the port number to a constant

app.use(express.static('./public'))

// Sets the rout to the notes.html 
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
}) // Once the user clicks the 'Get Started' button on the index.html they are redirected to the notes.html

//Allows json data to be passed between the server and the index.js
app.use(express.json()) 

// Sets a /api route to all routes in the api_routes.js file
app.use('/api', api_routes) 

// Sets a fall back route that will redirect the user back to the index.html if any invalid routes are entered
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// Listeber that sets a port number of 3333 for the server 
app.listen(PORT, () => {
    console.log('Server running on port http://localhost:3333')
})