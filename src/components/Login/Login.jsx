import React, { useContext, useState } from 'react';
import "./Login.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';

const Login = () => {
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/';
    console.log(from);

    const handleLogin = (event) => {

        event.preventDefault();
        setSuccess('');
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                setSuccess('Yeah! You Successfully login.');
                navigate(from, { replace: true });
            })
            .catch(e => {
                console.log(e.message);
            });

    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className='form-control'>
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" placeholder="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="">Password</label>
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="password" required />
                    <button onClick={() => setShowPassword(!showPassword)}>
                        <small>
                            {
                                showPassword
                                    ? <span>Hide Password</span>
                                    : <span>Show Password</span>
                            }
                        </small>
                    </button>
                </div>
                <div className='form-control'>
                    <input className='btn-submit' type="submit" value="Login" />
                </div>
                <p className="account-or-not"><small>New to ema-jhon ? <Link to="/signup">Create new account.</Link></small></p>

                <p className='text-success'>
                    <small>{success}</small>
                </p>
            </form>
        </div>
    );
};

export default Login;