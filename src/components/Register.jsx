import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../services/user.service';

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const submitted = (e) => {
        e.preventDefault();

        if(user.password != user.confirmPassword) {
            alert("Passwords are not matching");
            return;
        }

        createUser(user.email, user.password, user.name);
        navigate("/login");
    }

  return (
    <div className='m-3 w-full '>
        <form className='m-auto w-150 block border border-gray-200 shadow-xl p-10'>
            <h3 className='font-bold text-2xl text-purple-500 text-center'> Registration Form:  </h3>
            <label htmlFor="fname"> Enter your full name: </label>
            <input type="text" id='fname' className='border p-2 m-3 rounded-lg w-full'
            value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}
            placeholder='John Doe'
            required/>
            <br /> <br />

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

             <label htmlFor="cpassword"> confirm password: </label>
            <input type="password" id='cpassword' className='border p-2 m-3 rounded-lg w-full' 
            value={user.confirmPassword} onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
            placeholder='John@123'
            required pattern='/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/'/>
            <br /> <br />

            <button className='border p-2 m-3 bg-green-500 hover:bg-green-600 text-white rounded-lg w-full border-green-600'
            onClick={submitted}
            > Submit </button>
            <Link className='text-blue-400 text-center m-auto block' to={"/login"}> Already registered? login here </Link>
        </form>
    </div>
  )
}

export default Register