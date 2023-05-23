import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const UpdateOfficePage: NextPage = () => {
  const [feedback, setfeedback] = useState('');
  const [offnumgiven, setoffnumgiven] = useState('');
  const [offcompgiven, setoffcompgiven] = useState('');
  
  //Enter Button---------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      UpdateOffice();
    }
  };
  //---------------------------------------------------
  const handleInputoffnumgiven = (event: ChangeEvent<HTMLInputElement>) => {
    setoffnumgiven(event.target.value);
  };
  
  const handleInputoffcompgiven = (event: ChangeEvent<HTMLInputElement>) => {
    setoffcompgiven(event.target.value);
  };
  //---------------------------------------------------
  async function UpdateOffice() {
    setfeedback('Loading...');
    const searchoffnum = 'officenum= ' + offnumgiven;
    
    console.log(offnumgiven);
    console.log(offcompgiven);
    console.log(searchoffnum);
    
    try{
    const officerecord = await pb
      .collection('offices')
      .getFirstListItem(searchoffnum);
    const offid = officerecord.id;

    const updateofficedata = {
      officenum: offnumgiven,
      officecompany: offcompgiven,
    };
    
    await pb.collection('offices').update(offid, updateofficedata);

    setfeedback('Successfuly added ' + offcompgiven + ' to office ' + offnumgiven);
    } catch (error) {
      window.alert("ERROR: Office not found! Please enter a valid office number.");
      setfeedback('');
    }  
   
    setoffcompgiven('');
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

          <Link href={'addoffices'}>
            <li>
              <div data-name='a'>Add Offices</div>
            </li>
          </Link>

          <li>
            <div data-name='a' className='active'>Update Offices</div>
          </li>

          <Link href={'user_home'}>
            <li>
              <div data-name='a'>Switch to User Mode</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div data-name='middle'>
        <h2>Update Office</h2>
        <p>Please enter the offices details below</p>
        <br />
        <label>Office Number: </label>
        <input placeholder='E.g. 3' value={offnumgiven} onChange={handleInputoffnumgiven} onKeyDown={handleKeyPress}/>
        <br />

        <label>Name of the company occupying the office: </label>
        <input
          placeholder='Enter company name'
          value= {offcompgiven}
          onChange={handleInputoffcompgiven}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p data-name='feedback'>{feedback}</p>

        <button onClick={UpdateOffice}>
          Update Office
        </button>
      </div>
    </div>
  );
};

export default UpdateOfficePage;
