// Write some Code here

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from "./redux-store/userThunk";
import userSlice from './redux-store/userSlice';
import { React, useEffect } from 'react';

export default function Login() {
    const dispatch = useDispatch();
    const userSliceState = useSelector(store => store.userSliceState);

    const handleLoginClick = () => {
        const dataToSend = {
            username: userSliceState.username,
            password: userSliceState.password
        };
        dispatch(userLogin(dataToSend));
    };

    useEffect(() => {
        dispatch(userSlice.actions.clearUserData());
    }, []);

    return (
        <div style={{ border: '1px solid black', padding: '10px' }}>
            Username : <input type="text" value={userSliceState.username} onChange={e => dispatch(userSlice.actions.usernameChange({ username: e.target.value }))} />
            <br />
            Password : <input type="text" value={userSliceState.password} onChange={e => dispatch(userSlice.actions.passwordChange({ password: e.target.value }))} />
            <br />
            {userSliceState.isLoading ? <label>Please wait...</label> :
                <button onClick={handleLoginClick}>Login</button>}
            <br />
            {userSliceState.error && <div style={{ color: "red" }}>{userSliceState.error}</div>}
            <br />
            New User? <NavLink to="/register">Register...</NavLink>
        </div>
    );
}