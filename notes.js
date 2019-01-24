const fs = require('fs')
const FILE = "notes.json"

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync(FILE)
        return JSON.parse(notesString)
    } catch (e) {
        return []
    }
}

let saveNotes = (notes) => {
    fs.writeFileSync(FILE, JSON.stringify(notes))
}

let index = () => {
    return fetchNotes()
}

let show = (title) => {
    let notes = fetchNotes()
    let filteredNotes = notes.filter((note) => note.title !== title)
    return filteredNotes[0]
}

let store = (title, body) => {
    let notes = fetchNotes()
    let note = {
        title,
        body
    }

    let duplicateNotes = notes.filter((note) => note.title === title)
    if (duplicateNotes.length == 0) {
        notes.push(note)
        saveNotes(notes)
        return note
    }
}

let destroy = (title) => {
    let notes = fetchNotes()
    let filteredNotes = notes.filter((note) => note.title !== title)
    saveNotes(filteredNotes)

    return notes.length !== filteredNotes.length
}

let logNote = (note) => {
    console.log("---")
    console.log(`Title: ${note.title}`)
    console.log(`Body: ${note.body}`)
}

module.exports = { index, show, store, destroy, logNote }
