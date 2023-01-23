// Write some Code here

import { NavLink } from 'react-router-dom';
import { userRegistration } from "./redux-store/userThunk";
import { useDispatch, useSelector } from 'react-redux';
import userSlice from './redux-store/userSlice';
import ReCAPTCHA from 'react-google-recaptcha'

export default function Register() {
    const dispatch = useDispatch();
    const userSliceState = useSelector(store => store.userSliceState);
    const handleRegisterClick = () => {
        const dataToSend = {
            username: userSliceState.username,
            password: userSliceState.password,
            confirmPassword: userSliceState.confirmPassword,
            recaptchaToken: userSliceState.recaptchaToken
        };
        dispatch(userRegistration(dataToSend));
    };

    return (
        <div style={{ border: '1px solid black', padding: '10px' }}>
            Username : <input type="text" value={userSliceState.username} onChange={e => dispatch(userSlice.actions.usernameChange({ username: e.target.value }))} />
            <br />
            Password : <input type="text" value={userSliceState.password} onChange={e => dispatch(userSlice.actions.passwordChange({ password: e.target.value }))} />
            <br />
            Confirm Password : <input type="text" value={userSliceState.confirmPassword} onChange={e => dispatch(userSlice.actions.confirmPasswordChange({ confirmPassword: e.target.value }))} />
            <br />
            <ReCAPTCHA
                sitekey={userSliceState.sitekey}
                onChange={(value) => dispatch(userSlice.actions.recaptchaTokenChange({ recaptchaToken: value }))}
            />
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