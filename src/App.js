import React from 'react';

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import RegisterUser from './components/RegisterUser';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<RegisterUser />} />
        </Routes>
        
       
      </BrowserRouter>




    </>
  );
}

export default App;
