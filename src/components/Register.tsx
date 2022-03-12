import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/authContext';

const Register = () => {
  const { validateCookie } = useAuth();
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [submitted, setSubmitted] = useState(0);

  const handleClick = async () => {
    const roles = [];
    if (admin) roles.push('admin');

    const res = await axios.post('http://localhost:3001/get-link', { email, roles });

    if (res.status === 201) {
      setSubmitted(201);
    } else {
      setSubmitted(res.status);
    }
  };

  useEffect(() => {
    validateCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl">Welcome Back</h1>
      {submitted === 201 ? (
        <span>Please check your email</span>
      ) : (
        <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" action="">
          <h2>Register or Login</h2>
          <label className="font-semibold text-xs">Email</label>
          <input
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label className="font-semibold text-xs">Admin</label>
          <input type="checkbox" onChange={e => setAdmin(e.target.checked)} checked={admin} />
          <button
            type="button"
            onClick={(): Promise<void> => handleClick()}
            className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          >
            Get Link
          </button>
          {submitted !== 0 ? <span>There was an error, please try again</span> : ''}
        </form>
      )}
    </div>
  );
};

export default Register;
