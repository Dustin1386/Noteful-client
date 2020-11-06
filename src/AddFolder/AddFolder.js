import React from 'react';
import './AddFolder.css';
import NoteContext from '../NoteContext';

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: {
                value: '',
                touched: false
            },
            error: null
        }
    }
    static contextType = NoteContext;

    handleSubmit = e => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        const folder = {'name': folderName}
        this.setState({ error: null })
        const url = 'https://radiant-forest-06016.herokuapp.com/api/folders';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {'content-type': 'application/json'},
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {throw error})
            }
            return response.json()
        })
        .then(data => {
            this.context.addFolder(data);
            this.props.history.push(`/folder/${data.id}`);
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/');
    };

    updateName(name) {
        this.setState({name: {value: name, touched: true}})
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
    }

    render() {
        const { error } = this.state
        return (
            <>
                <form onSubmit={this.handleSubmit} className='folderForm'>
                    <label htmlFor='folderName'>
                        Folder Name:
                    </label>
                    <p className='error' role='alert'>
                        {this.state.name.touched && this.validateName()}
                    </p>
                    <input
                        type='text'
                        name='folderName'
                        id='folderName'
                        placeholder='New Folder'
                        aria-required='true'
                        aria-describedby='error'
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <div className="folderButtons">
                    <button
                        type='submit'
                        className='folderButton__add'
                        disabled={
                            this.validateName()
                        }>
                        Add
                    </button>
                    <button
                        type='button'
                        className='folderButton__cancel'
                        onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                    </div>
                </form>
                <div className='AddBookmark__error' role='alert'>
                    {error && <p>{error.message}</p>}
                </div>
            </>
        )
    }
}