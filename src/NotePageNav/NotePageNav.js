import React from 'react'
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static contextType = NoteContext;

  render() {
    const { folders, notes } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
}}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  },
  match: {
    params: {}
  }
}

NotePageNav.propTypes = {
  history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({
      params: PropTypes.object.isRequired
  })
}
