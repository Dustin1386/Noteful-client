import React from 'react'
import { Link } from 'react-router-dom'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

export default class Note extends React.Component {
  static contextType = NoteContext;

  handleDeleteNote = e => {
    e.preventDefault();
    const noteID = this.props.id;
    const url = 'http://localhost:8000/api/notes/' + noteID;
    fetch(url, { method: 'DELETE', })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {throw error})
        }
        return 
    })
    .then(() => {
      this.context.deleteNote(noteID);
      this.props.deleteNote(this.props.name);
    })
    .catch(error => console.error(error));
  }

  render() {
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>
      <button
        className='Note__delete'
        type='button'
        onClick={this.handleDeleteNote}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}}

Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  deleteNote: PropTypes.func
}
