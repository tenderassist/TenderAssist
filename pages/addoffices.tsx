import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const AddOfficePage: NextPage = () => {
  const [feedback, setfeedback] = useState('');
  const [offnumgiven, setoffnumgiven] = useState('');
  
  //Enter Button---------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      AddOffice();
    }
  };
  //---------------------------------------------------
  const handleInputoffnumgiven = (event: ChangeEvent<HTMLInputElement>) => {
    setoffnumgiven(event.target.value);
  };
  //---------------------------------------------------
  async function AddOffice() {
    setfeedback('Loading...');

 try{
   const editofficedata = {
      officenum: offnumgiven,
    };
   
    const record = await pb.collection('offices').create(editofficedata);

    setfeedback('Successfuly added Office ' + offnumgiven);
    } catch(error) {
      window.alert("ERROR: Unable to add office!");
      setfeedback('');
    }
    setoffnumgiven('');
  }

  return (
    <div>
      <div data-name='middle'>
        <h1>&quot;TenderAssist&quot;</h1>
      </div>
      <nav>
        <ul>
          <Link href={'admin_home'}>
            <li>
              <div data-name='a'>Home</div>
            </li>
          </Link>

          <Link href={'addboxes'}>
            <li>
              <div data-name='a'>Add Boxes/Specials</div>
            </li>
          </Link>

          <Link href={'deleteboxes'}>
            <li>
              <div data-name='a'>Delete Boxes/Specials</div>
            </li>
          </Link>

          <li>
            <div data-name='a' className='active'>Add Offices</div>
          </li>
          
          <Link href={'deleteoffices'}>
           <li>
            <div data-name='a'>Delete Offices</div>
          </li>
          </Link>

          <Link href={'updateoffices'}>
            <li>
              <div data-name='a'>Update Offices</div>
            </li>
          </Link>
          
          <Link href={'reset'}>
          <li>
            <div data-name='a'>Reset</div>
          </li>
          </Link>

          <Link href={'user_home'}>
            <li>
              <div data-name='a'>Switch to User Mode</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div data-name='middle'>
        <h2>Add Office</h2>
        <p>Please enter the office number you would like to add below</p>
        <br />
        <label>Office Number: </label>
        <input
          placeholder='E.g. 3'
          value={offnumgiven}
          onChange={handleInputoffnumgiven}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p data-name='feedback'>{feedback}</p>

        <button onClick={AddOffice}>
          Add Office
        </button>
      </div>
    </div>
  );
};

export default AddOfficePage;
