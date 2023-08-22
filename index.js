const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


  app.get("/",(request, response) => {
  response.send('<h1> Hello World </h1>')
})


app.get("/api/notes",(request, response) => {
    response.json(notes)
  })
  

  app.get("/api/notes/:id",(request, response) => {
    const myId = Number(request.params.id)
    const myNOte = notes.find(note => note.id === myId)

    if(myNOte){
    response.json(myNOte)
}   else {
    response.status(404).send(`There is no notes at ${myId}`)
}
  })

  app.delete("/api/notes/:id",(request, response) => {
    const myId = Number(request.params.id)
     notes = notes.filter(note => note.id !== myId)

    response.status(204).send(`The note at id ${myId} has been delete`)
})


app.post("/api/notes",(request, response) => {
    const myNewPost = request.body
    myNewPost.id = notes.length + 1
    notes.push(myNewPost)
    response.status(201).json(myNewPost)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)