import React from 'react';

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addFolder: () => {},
    addnote: () => {},
})

export default NoteContext