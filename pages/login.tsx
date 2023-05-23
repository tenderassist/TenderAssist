import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';

const LoginPage: NextPage = () => {
  let router = useRouter();
  const [feedback, setfeedback] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  //Enter Button--------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      LogRedierct();
    }
  };
  //---------------------------------------------------
  const handleInputusername = (event: ChangeEvent<HTMLInputElement>) => {
    setusername(event.target.value);
  };
  
  const handleInputpassword = (event: ChangeEvent<HTMLInputElement>) => {
    setpassword(event.target.value);
  };
  //---------------------------------------------------
  function LogRedierct() {

    if (username == 'admin' && password == 'admin2023') {
      console.log('admin logged in');
      router.push('/admin_home');
    } else if (username == 'user' && password == 'user2023') {
      console.log('user logged in');
      router.push('user_home');
    } else {
      setfeedback('Incorrect Username or Password!!!');
    }
  }

  return (
    <div data-name='middle'>
      <h1>&quot;TenderAssist&quot;</h1>
      <br />
      <br />
      <label>Username:</label>
      <input 
      type='text' 
      placeholder='Enter username' 
      value={username}
      onChange={handleInputusername}
      onKeyDown={handleKeyPress}
      />
      <br />
      <br />
      <label>Password:</label>
      <input
        type='password'
        placeholder='Enter password'
        value ={password}
        onChange={handleInputpassword}
        onKeyDown={handleKeyPress}
      />
      <br />
      <p data-name='incorrectindexreturn'>{feedback}</p>

      <button onClick={LogRedierct}>
        Submit
      </button>
    </div>
  );
};

export default LoginPage;
