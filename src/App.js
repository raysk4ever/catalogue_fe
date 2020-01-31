import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="nav-container">
        <p>Nav</p>
      </div>
      <div clasName="body-container">
        <div>
          <div className="side-bar-container">
            <p>Side bar</p>           
          </div>
          <div className="body-content-container">
            <p>Body</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
