import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: ''
  });

  const { fullname, email, password, phone } = user;


  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/user', user);
      alert('User registered successfully');
      window.location.href = '/login';
      // Optionally redirect or reset the form here
    } catch (error) {
      alert('Error registering user');
    }
  };


  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form id="registrationForm" onSubmit={onSubmit} className="w-full max-w-lg space-y-4">


            <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="fullname" name="fullname"
                 onChange={(e) => onInputChange(e)}
                 value={fullname}
                 className="mt-1 block w-full border border-gray-300 rounded-md p-2" required/>

            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" 
                onChange={(e) => onInputChange(e)}
                value={email}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2" required/>

            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" 
                onChange={(e) => onInputChange(e)}
                value={password}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2" required/>

            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" id="phone" name="phone" 
                onChange={(e) => onInputChange(e)}
                value={phone}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2" required/>

            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Register</button>

        </form>
    </div>
  )
}

export default Register
