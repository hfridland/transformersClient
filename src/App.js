import React from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import MainPanel from './components/MainPanel'

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Transformers Test</NavbarBrand>
        </div>
      </Navbar>
      <MainPanel />
    </div>
  );
}

export default App;

