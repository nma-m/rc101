import React, { useState } from 'react';
import Pattern from './Pattern';

const Chart = () => {
  const initChart = [
    {
      title: 'Pattern 1',
      notes: '',
      patternLength: 16,
      instruments: [
        { name: 'kick', beats: new Array(32).fill(false) },
        { name: 'snare', beats: new Array(32).fill(false) },
        { name: 'ch', beats: new Array(32).fill(false) },
        { name: 'oh', beats: new Array(32).fill(false) },
      ],
    },
  ];
  const [chartName, setChartName] = useState('');
  const [patterns, setPatterns] = useState(initChart);

  const addPattern = () => {
    const lastPattern = patterns[patterns.length - 1];
    const newPattern = {
      title: `Pattern ${patterns.length + 1}`,
      notes: '',
      patternLength: 16,
      instruments: lastPattern.instruments.map((instrument) => ({
        ...instrument,
        beats: new Array(32).fill(false),
      })),
    };
    setPatterns([...patterns, newPattern]);
  };

  const deletePattern = (index) => {
    if (patterns.length > 1) {
      const userConfirmed = window.confirm('Are you sure you want to delete this pattern?');
      if (userConfirmed) {
        const newPatterns = patterns.filter((_, i) => i !== index);
        setPatterns(newPatterns);
      }
    }
  };
  
  const renamePattern = (index, newTitle) => {
    const newPatterns = [...patterns];
    newPatterns[index].title = newTitle;
    setPatterns(newPatterns);
  };

  const updateNotes = (index, newNotes) => {
    const newPatterns = [...patterns];
    newPatterns[index].notes = newNotes;
    setPatterns(newPatterns);
  };

  const addInstrument = (patternIndex) => {
    const newPatterns = [...patterns];
    newPatterns[patternIndex].instruments.push({
      name: '',
      beats: new Array(32).fill(false),
    });
    setPatterns(newPatterns);
  };

  const deleteInstrument = (patternIndex, instrumentIndex) => {
    const newPatterns = [...patterns];
    newPatterns[patternIndex].instruments.splice(instrumentIndex, 1);
    setPatterns(newPatterns);
  };

  const renameInstrument = (patternIndex, instrumentIndex, newName) => {
    const newPatterns = [...patterns];
    newPatterns[patternIndex].instruments[instrumentIndex].name = newName;
    setPatterns(newPatterns);
  };

  const toggleBeat = (patternIndex, instrumentIndex, beatIndex) => {
    const newPatterns = [...patterns];
    newPatterns[patternIndex].instruments[instrumentIndex].beats[beatIndex] = 
      !newPatterns[patternIndex].instruments[instrumentIndex].beats[beatIndex];
    setPatterns(newPatterns);
  };

  const handlePrint = () => {
    window.print();
  };

  const clearChart = () => {
    const userConfirmed = window.confirm('Are you sure you want to start over?');
  
    if (userConfirmed) {
      setChartName('Chart Name');
      setPatterns(initChart);
    }
  };

  const togglePatternLength = (index) => {
    const newPatterns = [...patterns];
    newPatterns[index].patternLength = newPatterns[index].patternLength === 16 ? 32 : 16;
    setPatterns(newPatterns);
  };

  return (
    <div className='chart'>
      <div className='chart-header'>
        <h2 className='chart-name printable'>{chartName}</h2>
        <input
          type='text'
          value={chartName}
          onChange={(e) => setChartName(e.target.value)}
          placeholder='Chart Name'
          className='chart-name-input no-print'
        />
        <button onClick={handlePrint} className='print-button no-print'>Download</button>
        <button onClick={clearChart} className='clear-chart-button no-print'>Init</button>
      </div>
      {patterns.map((pattern, index) => (
        <Pattern
          key={index}
          title={pattern.title}
          notes={pattern.notes}
          instruments={pattern.instruments}
          patternLength={pattern.patternLength}
          onRename={(newTitle) => renamePattern(index, newTitle)}
          onUpdateNotes={(newNotes) => updateNotes(index, newNotes)}
          onAddInstrument={() => addInstrument(index)}
          onDeleteInstrument={(instrumentIndex) => deleteInstrument(index, instrumentIndex)}
          onRenameInstrument={(instrumentIndex, newName) => renameInstrument(index, instrumentIndex, newName)}
          onToggleBeat={(instrumentIndex, beatIndex) => toggleBeat(index, instrumentIndex, beatIndex)}
          onDeletePattern={() => deletePattern(index)}
          onTogglePatternLength={() => togglePatternLength(index)}
        />
      ))}
      <button onClick={addPattern} className='add-pattern no-print'>Add Pattern</button>
    </div>
  );
};

export default Chart;