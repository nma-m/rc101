import React from 'react';
import Instrument from './Instrument';

const Pattern = ({ index, title, notes, instruments, patternLength, onRename, onUpdateNotes, onAddInstrument, onDeleteInstrument, onRenameInstrument, onToggleBeat, onDeletePattern, onTogglePatternLength, onMovePattern, onMoveInstrument }) => {
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
        <button className='pattern-move-button no-print' onClick={() => onMovePattern(index, 'up')}>▲</button>
        <button className='pattern-move-button no-print' onClick={() => onMovePattern(index, 'down')}>▼</button>
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
      {instruments.map((instrument, instrumentIndex) => (
        <Instrument
          key={instrumentIndex}
          name={instrument.name}
          beats={instrument.beats.slice(0, patternLength)}
          onToggle={(beatIndex) => onToggleBeat(instrumentIndex, beatIndex)}
          onRename={(newName) => onRenameInstrument(instrumentIndex, newName)}
          onDelete={() => onDeleteInstrument(instrumentIndex)}
          onMove={(direction) => onMoveInstrument(instrumentIndex, direction)}
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