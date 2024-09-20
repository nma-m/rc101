import React from 'react';
import Instrument from './Instrument';

const Pattern = ({ index, title, notes, instruments, patternLength, onRename, onUpdateNotes, onAddInstrument, onDeleteInstrument, onRenameInstrument, onToggleBeat, onDeletePattern, onTogglePatternLength }) => {
  return (
    <div className='pattern'>
      <div className='pattern-header'>
        {title &&
          <h2 className='pattern-name printable'>{title}</h2>
        }
        <input
          type='text'
          value={title}
          onChange={(e) => onRename(e.target.value)}
          placeholder={`Pattern ${index + 1}`}
          className='pattern-name-input no-print'
        />
        <button 
          onClick={onTogglePatternLength}
          className='toggle-length-button no-print'
        >
          {patternLength === 16 ? '16 beats' : '32 beats'}
        </button>
        <button 
          onClick={onDeletePattern}
          className='delete-pattern-button no-print'
        >
          Del
        </button>
      </div>
      {instruments.map((instrument, index) => (
        <Instrument
          key={index}
          name={instrument.name}
          beats={instrument.beats.slice(0, patternLength)}
          onToggle={(beatIndex) => onToggleBeat(index, beatIndex)}
          onRename={(newName) => onRenameInstrument(index, newName)}
          onDelete={() => onDeleteInstrument(index)}
        />
      ))}
      <button onClick={onAddInstrument} className='add-instrument no-print'>Add Instrument</button>
      <label htmlFor='pattern-notes-input' className='pattern-notes-label no-print'>
        Notes:
        <textarea
          value={notes}
          onChange={(e) => onUpdateNotes(e.target.value)}
          className='pattern-notes-input'
          id='pattern-notes-input'
          rows={3}
        />
      </label>
      {notes &&
        <p className='printable'>
          <div className='pattern-notes-label'>Notes:</div>
          <div className='pattern-notes-text'>{notes.trim()}</div>
        </p>
      }
    </div>
  );
};

export default Pattern;