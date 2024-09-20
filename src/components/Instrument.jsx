import React from 'react';

const Instrument = ({ name, beats, onToggle, onRename, onDelete, onMove }) => {
  return (
    <div className='instrument'>
      <div className='instrument-move-buttons no-print'>
        <button className='instrument-move-button' onClick={() => onMove('up')}>▲</button>
        <button className='instrument-move-button' onClick={() => onMove('down')}>▼</button>
      </div>
      <input
        type='text'
        value={name}
        placeholder='inst'
        onChange={(e) => onRename(e.target.value)}
        className='instrument-name-input'
        maxLength={6}
      />
      <div className='beats'>
        {beats.map((triggered, i) => (
          <div
            key={i}
            className={`beat ${triggered ? 'triggered' : ''} ${i % 8 < 4 ? 'white' : 'gray'}`}
            onClick={() => onToggle(i)}
          />
        ))}
      </div>
      <button onClick={onDelete} className='delete-instrument-button no-print'>Del</button>
    </div>
  );
};

export default Instrument;