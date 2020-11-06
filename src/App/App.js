import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NoteContext from '../NoteContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        const noteURL = 'https://radiant-forest-06016.herokuapp.com/api/notes';
        const folderURL = 'https://radiant-forest-06016.herokuapp.com//api/folders';
        Promise.all([fetch(noteURL), fetch(folderURL)])
        .then(([noteRes, folderRes]) => {
            if (!noteRes.ok) {
                return noteRes.json().then(error => Promise.reject(error))
            }
            if (!folderRes.ok) {
                return folderRes.json().then(error => Promise.reject(error))
            }
            return Promise.all([noteRes.json(), folderRes.json()])
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders})
        })
        .catch(error => console.error(error))
    };

    deleteNote = noteID  => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteID)
        })
    }

    addFolder = folderData => {
        this.setState({
            folders: [...this.state.folders, folderData]
        })
    }

    addNote = noteData => {
        this.setState({
            notes: [...this.state.notes, noteData]
        })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.deleteNote,
            addFolder: this.addFolder,
            addNote: this.addNote,
        }

        return (
            <NoteContext.Provider value={contextValue}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </NoteContext.Provider>
        );
    }
}

export default App;
