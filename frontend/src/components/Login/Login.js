import axios from 'axios';
import React from 'react'

const Login = () => {

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const onSubmit = async (e)=>{
        e.preventDefault();
        const loginDetails = {email,password};
        try {
            const responce = await axios.post('http://localhost:8080/login', loginDetails);
            if(responce.data.id){
                localStorage.setItem('userId',responce.data.id);//save user
                alert('Login successful');
                window.location.href='/profile';
              }else{
                alert('Invalid credentials');
            }
            
        } catch (error) {
            alert('Error logging in');
            window.location.reload();
        }
    }
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        id="registrationForm"
        onSubmit={onSubmit}
        className="w-full max-w-lg space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login
