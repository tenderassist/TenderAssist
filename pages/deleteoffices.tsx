import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const DeleteOfficePage: NextPage = () => {
  const [feedback, setfeedback] = useState('');
  const [feedbackOffices, setfeedbackOffices] = useState('');
  const [deloffnum, setdeloffnum] = useState('');
  
  //Enter Button---------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      DeleteOffice();
    }
  };
  //---------------------------------------------------
  const handleInputdeloffnum = (event: ChangeEvent<HTMLInputElement>) => {
    setdeloffnum(event.target.value);
  };
  //---------------------------------------------------
  async function DisplayOffices(){
    setfeedbackOffices('Loading...')
    
    try{
    const officeRecords = await pb.collection('offices').getFullList({
    sort: 'officenum',
  });

    const officeString = officeRecords.map((entry) => entry.officenum).join(', ');
    setfeedbackOffices(officeString);
    
    }catch(error){
      window.alert('ERROR: Unable to fetch offices!');
      setfeedbackOffices('')
    }
  }
  //------------------------------------------------
  async function DeleteOffice() {
    let confirm = window.confirm('The office will be permanently deleted');
    if (confirm) {
      setfeedback('Loading...')
      const delparamoff = 'officenum= ' + deloffnum;
        
        try{
        const offrecord = await pb
          .collection('offices')
          .getFirstListItem(delparamoff);

        const idfordel = offrecord.id;
        await pb.collection('offices').delete(idfordel);
        
        setfeedback('Successfully deleted office ' + deloffnum);
        }catch (error) {
          window.alert("ERROR: Office not found!");
          setfeedback('');
        }
    setdeloffnum('');
    setfeedbackOffices('');
    }
    
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
            <div data-name='a' className='active'>Delete Offices</div>
          </li>

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
        <h2>Delete Office</h2>
        <p>
          Please type the number of the office you&apos;d like to delete below.
        </p>
        <button onClick={DisplayOffices}>
          Display Offices
        </button>
        <p>{feedbackOffices}</p>
        
        <br />
        <label>Delete Office Number: </label>
        <input
          placeholder='E.g. 21'
          value={deloffnum}
          onChange={handleInputdeloffnum}
          onKeyDown={handleKeyPress}
        />
        <br />
        <p data-name='feedback'>{feedback}</p>

        <button onClick={DeleteOffice}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteOfficePage;
