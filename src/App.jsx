import React from 'react';
import Chart from './components/Chart';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1 className='app-name'>
        RC-101
        <span className='app-subtitle no-print'>by</span>
        <a href='https://mbenma.com' target='_blank' className='app-subtitle no-print'>Nma</a>
      </h1>
      <p className='rotate-device-text'>
        For the best experience, widen the browser window or put your device in landscape mode
      </p>
      <Chart />
    </div>
  );
}

export default App;