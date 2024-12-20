import React from 'react'
import './App.css';
import PortafolioContainer from './PortfolioContainer/PortfolioContainer';
import Navbar from "./PortfolioContainer/Navbar"; 


function App() {
  return (
    <div className="App">
      <Navbar /> 
      <PortafolioContainer></PortafolioContainer>
    </div>
  );
}

export default App;
