// Write some Code here

import { NavLink } from 'react-router-dom';
import { userRegistration } from "./redux-store/UserThunk";
import { useDispatch, useSelector } from 'react-redux';
import userSlice from './redux-store/UserSlice';
import { useEffect } from 'react';

export default function Register() {
    const dispatch = useDispatch();
    const userSliceState = useSelector(store => store.userSliceState);
    const handleRegisterClick = () => {
        const dataToSend = {
            username: userSliceState.username,
            password: userSliceState.password,
            confirmPassword: userSliceState.confirmPassword
        };
        dispatch(userRegistration(dataToSend));
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
            Confirm Password : <input type="text" value={userSliceState.confirmPassword} onChange={e => dispatch(userSlice.actions.confirmPasswordChange({ confirmPassword: e.target.value }))} />
            <br />
            {userSliceState.isLoading ? <label>Please wait...</label> :
                <button onClick={handleRegisterClick}>Register</button>}
            <br />
            {userSliceState.error && <div style={{ color: "red" }}>{userSliceState.error}</div>}
            <br />
            Existing User? <NavLink to="/login">Login...</NavLink>
        </div>
    );
}