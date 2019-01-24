const yargs = require('yargs')
const notes = require('./notes.js')

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: "Body of note",
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('delete', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv
let command = argv._[0]

if(command == 'add') {
    let note = notes.store(argv.title, argv.body)
    if(note) {
        notes.logNote(note)
    } else {
        console.log("Note title taken")
    }
} else if (command == 'list') {
    let allNotes = notes.index()
    console.log(`Printing ${allNotes.length} note(s).`)
    allNotes.forEach((note) => notes.logNote(note))
} else if(command == 'read') {
    let note = notes.show(argv.title)
    if(note) {
        notes.logNote(note)
    }  else {
        console.log("Note not found")
    }
} else if (command == 'delete') {
    let noteRemoved = notes.destroy(argv.title)
    let message = noteRemoved ? "Note removed" : "Note not found"
    console.log(message)
} else {
    console.log("Command not recognized")
}