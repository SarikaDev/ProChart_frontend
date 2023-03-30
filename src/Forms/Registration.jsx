import React, { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../asserts/bg-image.png";
import { UserContextProvider } from "../context/UserContext";

const Registration = () => {
  const [fields, setFields] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { userName, email, password } = fields;
  const navigate = useNavigate();

  const handleFields = useCallback(e => {
    setFields(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      await axios
        .post("/signup", { userName, email, password })
        .then(data => {
          if (data.status === 200) {
            alert("Registered Successfully");
            navigate("/login");
          }
        })
        .catch(error => alert(error.response.data.errors));
      setFields(prev => ({
        ...prev,
        userName: "",
        email: "",
        password: "",
      }));
    },
    [email, navigate, password, userName],
  );
  return (
    <div className='min-h-screen grid place-content-center  bg-gradient-to-r from-purple-500 to-pink-500'>
      <div className='container mx-auto '>
        <div className='flex flex-col lg:flex-row  w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
          <div
            className={`w-full lg:w-1/2  flex flex-col items-center justify-center p-12 bg-no-repeat`}
            style={{ backgroundImage: `url(${logo})` }}
          >
            <h2 className='text-black text-3xl font-semibold mb-3'>Welcome</h2>
            <p className='text-white'>
              lorem asddasd asddasdasd shadowasd sa userDetailsd sadf
              asddasdasdf f andfa
            </p>
          </div>
          <div className='w-full lg:w-1/2 py-16 px-12'>
            <h2 className='text-3xl mb-4 text-black  font-serif  font-bold text-center '>
              Registration Form
            </h2>
            <p className='mb-4 text-center text-pink-500'>
              create your own account. it's free and only take a minute
            </p>
            <form action='#'>
              <div className='grid grid-cols-1 gap-3'>
                <input
                  type='text'
                  name='userName'
                  onChange={handleFields}
                  placeholder='Enter User Name'
                  className='border border-gray-400 py-1 px-2'
                />
                <input
                  type='email'
                  name='email'
                  onChange={handleFields}
                  placeholder='Enter Email Address'
                  className='border border-gray-400 py-1 px-2'
                  required
                />
                <input
                  type='password'
                  name='password'
                  onChange={handleFields}
                  placeholder='Enter password'
                  className='border border-gray-400 py-1 px-2'
                  required
                />
                <div className='py-2 '>
                  <input
                    type='checkbox'
                    className='border border-gray-400 '
                    required
                  />
                  <span className='px-4 '>
                    I Accept the
                    <a href='/' className='text-purple-600 px-2'>
                      Terms of User
                    </a>
                    &
                    <a href='/' className='text-purple-600'>
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <div>
                  <button
                    className='w-full bg-purple-500 p-2  rounded-sm text-center'
                    onClick={handleSubmit}
                  >
                    Register now
                  </button>
                </div>
                <div className='my-1 text-center'>
                  <p>
                    Already have an Account
                    <span>
                      <a
                        href='/login'
                        className='text-purple-600 px-2 underline'
                      >
                        Login
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
