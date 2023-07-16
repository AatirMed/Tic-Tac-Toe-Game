import React from 'react';
import './library/App.css';
import { Link, Route, Routes } from 'react-router-dom';

import Generatoguid from './library/Generatoguid';
import ConvertionToOracle from './library/ConvertionToOracle';
import ConvertionGuid from './library/convertionGuid';

function App() {

  return (
    <div className="App">
      <nav>
        <Link to='/' style={{ marginRight: '20px' }} >Generator guid</Link>
        <Link to='/convertion' style={{ marginRight: '20px' }} >Convertion Text</Link>
        <Link to='/ConvertionGuid' >Convertion Guid</Link>
      </nav>
      <br />
      <Routes>
        <Route path='/' element={<Generatoguid />} />
        <Route path='*' element={<Generatoguid />} />
        <Route path='/convertion' element={<ConvertionToOracle />} />
        <Route path='/ConvertionGuid' element={<ConvertionGuid />} />
      </Routes>
    </div>
  );
}

export default App;
