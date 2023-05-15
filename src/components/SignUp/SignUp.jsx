import React, { useContext, useState } from 'react';
import "./SignUp.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';


const SignUp = () => {
   const [error, setError] = useState('');
   const { createUser } = useContext(AuthContext);


   const handleSignUp = (e) => {
      e.preventDefault();

      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      const confirm = form.confirm.value;

      setError("");
      if (password !== confirm) {
         setError("your password didn't match.");
      }
      else if (password.length < 6) {
         setError("password must be 6 character or above.");
      }


      createUser(email, password)
         .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
         })
         .catch(error => {
            console.log(error);
            setError(error.message);
         });

   };

   return (
      <div className="form-container">
         <h2 className='form-title'>Sign Up</h2>
         <form onSubmit={handleSignUp}>
            <div className='form-control'>
               <label htmlFor="email">Email</label>
               <input type="email" name="email" placeholder="email" required />
            </div>
            <div className='form-control'>
               <label htmlFor="password">Password</label>
               <input type="password" name="password" placeholder="password" required />
            </div>
            <div className='form-control'>
               <label htmlFor="confirm">Confirm Password</label>
               <input type="password" name="confirm" placeholder="confirm password" required />
            </div>
            <div className='form-control'>
               <input className='btn-submit' type="submit" value="Sign Up" />
            </div>
            <p className='account-or-not'><small>Already have an account ? <Link to="/login">Login</Link></small></p>
            <p className='text-error'>{error}</p>
         </form>
      </div>
   );
};

export default SignUp;