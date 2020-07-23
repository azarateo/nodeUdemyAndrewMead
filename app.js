const yargs = require('yargs');
const notes = require('./notes.js')

yargs.version('1.1.1')

yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note title',
            required: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note of the title to be removed',
            required: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler(argv) {
        notes.readingNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all nodes',
    handler(argv) {
        notes.listNotes()
    }
})

yargs.parse()
