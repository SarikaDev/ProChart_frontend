import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../asserts/bg-image.png";
const Registration = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const { email, password } = fields;
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
        .post("/signin", { email, password })
        .then(data => {
          if (data.status === 200) {
            sessionStorage.setItem("token", JSON.stringify(data.data.token));
            sessionStorage.setItem("userInfo", JSON.stringify(data.data.user));
            navigate("/home");
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
    [email, navigate, password],
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
          <div className='w-full lg:w-1/2 py-14 px-8'>
            <h2 className='text-3xl mb-4 py-5 text-black  font-serif  font-bold text-center '>
              Login Form
            </h2>

            <form action='#'>
              <div className='grid grid-cols-1 gap-3'>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter Email Address'
                  className='border border-gray-400 py-1 px-2'
                  onChange={handleFields}
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Enter password'
                  className='border border-gray-400 py-1 px-2'
                  onChange={handleFields}
                  required
                />

                <div>
                  <button
                    className='w-full bg-purple-500 p-2  rounded-sm text-center'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
                <div className='py-1 lg:text-left text-center'>
                  <p>
                    Doesn't have an Account
                    <span>
                      <a href='/' className='text-purple-600 px-2 underline'>
                        Register
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
