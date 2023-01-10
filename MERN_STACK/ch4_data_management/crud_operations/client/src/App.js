// Write some Code here

import logo from './logo.svg';
import './App.css';
import { NavLink, Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <NavLink to="/books"> Books </NavLink>
      <NavLink to="/products"> Products </NavLink>
      <Outlet> </Outlet>
    </div>
  );
}

export default App;