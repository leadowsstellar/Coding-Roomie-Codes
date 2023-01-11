// Write some Code here

import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const userSliceState = useSelector(store => store.userSliceState);
  const navigate = useNavigate();

  useEffect(() => {
    if (userSliceState.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [userSliceState.isLoggedIn]);

  useEffect(() => {
    if (userSliceState.isRegistered) {
      navigate("/login");
    }
  }, [userSliceState.isRegistered]);

  return (<Outlet></Outlet>);
}

export default App;