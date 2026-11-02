import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInUser } from '../services/user.service';

const Login = () => {
     const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const submitted = (e) => {
        e.preventDefault();

        signInUser(user.email, user.password);
        navigate("/dashboard");
    }
  return (
     <div className='m-3 w-full '>
        <form className='m-auto w-150 block border border-gray-200 shadow-xl p-10'>
            <h3 className='font-bold text-2xl text-purple-500 text-center'> Login Form:  </h3>
           

            <label htmlFor="email"> Enter your email: </label>
            <input type="email" id='email' className='border p-2 m-3 rounded-lg w-full' 
            value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder='John@gmail.com'
            required/>
            <br /> <br />

            <label htmlFor="password"> Enter password: </label>
            <input type="password" id='password' className='border p-2 m-3 rounded-lg w-full' 
            value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder='John@123'
            required pattern='/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/'/>
            <br /> <br />



            <button className='border p-2 m-3 bg-green-500 hover:bg-green-600 text-white rounded-lg w-full border-green-600'
            onClick={submitted}
            > Submit </button>
            <Link className='text-blue-400 text-center m-auto block' to={"/register"}> not registered? register here </Link>
        </form>
    </div>
  )
}

export default Login