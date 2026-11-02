import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <>
    <h3 className='text-purple-500 font-black text-3xl text-center'> Trello Application </h3>
    <div className='flex justify-center items-center h-full'>
        <Link to={"register"} className='bg-blue-500 p-2 m-3 border border-blue-600 rounded-lg text-white w-1/4 text-center'> Register </Link>
        <Link to={"login"} className='bg-purple-500 p-2 m-3 border border-purple-600 rounded-lg text-white w-1/4 text-center'> Login </Link>
    </div></>
  )
}

export default GetStarted