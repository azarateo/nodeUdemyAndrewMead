const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    console.log('Adding note with title ' + title + ' and body' + body);
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        const newNote = {
            title: title,
            body: body
        }
        notes.push(newNote)
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added successfully'))
    }
    else {
        console.log(chalk.red.inverse('Title already taken!'))
    }

}

const saveNotes = (notes) => {
    notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try {
        const notes = JSON.parse(fs.readFileSync('./notes.json'))
        return notes
    } catch (error) {
        return []
    }
}

const removeNote = (title) => {
    console.log('Removing note with title ' + title)
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title != title)
    if (notesToKeep.length === notes.length) {
        console.log(chalk.red.inverse('Title not found!'))
    }
    else {
        console.log(chalk.green.inverse('Note with title ' + title + ' removed'))
    }
    saveNotes(notesToKeep)

}

const readNote = (title) => {
    const notes = loadNotes()
    note = notes.find((note)=>note.title === title)
    if(note) {
        console.log(chalk.bold.blue(note.title))
        console.log(chalk.blue(note.body))
    }else{
        console.log(chalk.red.inverse('Note not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Listing all notes'))
    notes.forEach((note)=>console.log(note.title))
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes
}