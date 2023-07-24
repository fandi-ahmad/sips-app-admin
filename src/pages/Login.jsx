import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// component
import { InputIcon } from '../components/BaseInput'
import { BasicButton } from '../components/BaseButton'

// api
import { LoginUser } from '../api/userApi'
import { AlertError, AlertSuccess } from '../components/SweetAlert';

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username': setUsername(value);
        break;
      case 'password': setPassword(value);
        break;
      default:
        break;
    }
  };

  const loginUser = async () => {
    try {
      if (username === '' || password === '') {
        AlertError('Input cannot be empty')
      } else {
        const response = await LoginUser({
          username: username,
          password: password
        })
        if (response.status == 'failed') {
          AlertError(response.message)
        } else {
         AlertSuccess(response.message)
         localStorage.setItem('user', response.accessToken);
         navigate('/')
        }
      }
    } catch (error) {
      AlertError(error.message)
    }
  }

  const checkUserToken = () => {
    const userToken = localStorage.getItem('user')
    if (userToken) {
      navigate('/')
    }
  }

  useEffect(() => {
    checkUserToken()
  }, [])


  return (
    <>
      <section className="section main-section w-screen h-screen bg-gray-300 text-black login-page">
        <div className="card w-1/3">
          <header className="card-header">
            <p className="card-header-title flex justify-center">
              <span>
                <span className="icon"><i className="mdi mdi-lock"></i></span>
                Login
              </span>
            </p>
          </header>
          <div className="card-content">
            <div className="field spaced">
              <InputIcon name='username' onChange={handleInput} classLabel='font-bold' placeholder='username' icon={<i className="mdi mdi-account"></i>} />
              <p className="help">Please enter your username</p>
            </div>

            <div className="field spaced">
              <InputIcon name='password' onChange={handleInput} classLabel='font-bold' placeholder='password' type='password' icon={<i className="mdi mdi-asterisk"></i>} />
              <p className="help">Please enter your password</p>
            </div>

            <hr/>

            <div className="flex justify-center">
              <BasicButton onClick={loginUser} title='Login' />
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Login;