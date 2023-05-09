import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ListResult } from 'pocketbase';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const UpdateOfficePage: NextPage = () => {
  //Enter Button
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Call your function here
      UpdateOffice();
    }
  };
  //---------------------------------------------------

  async function UpdateOffice() {
    const offnumgiven = offnumupdate.value;
    const offcompgiven = offcompupdate.value;
    const searchoffnum = 'officenum= ' + offnumupdate.value;
    
    try{
    const officerecord = await pb
      .collection('offices')
      .getFirstListItem(searchoffnum);
    const offid = officerecord.id;

    const updateofficedata = {
      officenum: offnumgiven,
      officecompany: offcompgiven,
    };
    
     pb.collection('offices').update(offid, updateofficedata);

    document.getElementById('updateofficereturn').innerHTML =
      'Successfuly added ' + offcompgiven + ' to office ' + offnumgiven;
    } catch (error) {
      window.alert("ERROR: Office not found! Please enter a valid office number.")
    }  
   
    document.getElementById('offnumupdate').value = '';
    document.getElementById('offcompupdate').value = '';
  }

  return (
    <div>
      <div name='middle'>
        <h1>&quot;TenderAssist&quot;</h1>
      </div>
      <nav>
        <ul>
          <Link href={'admin_home'}>
            <li>
              <div name='a'>Home</div>
            </li>
          </Link>

          <Link href={'addboxes'}>
            <li>
              <div name='a'>Add Boxes/Specials</div>
            </li>
          </Link>

          <Link href={'deleteboxes'}>
            <li>
              <div name='a'>Delete Boxes/Specials</div>
            </li>
          </Link>

          <Link href={'addoffices'}>
            <li>
              <div name='a'>Add Offices</div>
            </li>
          </Link>

          <li>
            <div name='a' class='active'>Update Offices</div>
          </li>

          <Link href={'user_home'}>
            <li>
              <div name='a'>Switch to User Mode</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div name='middle'>
        <h2>Update Office</h2>
        <p>Please enter the offices details below</p>
        <br />
        <label>Office Number: </label>
        <input id='offnumupdate' name='offnumupdate' placeholder='E.g. 3' />
        <br />

        <label>Name of the company occupying the office: </label>
        <input
          id='offcompupdate'
          name='offcompupdate'
          placeholder='Enter company name'
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p name='feedback' id='updateofficereturn'></p>

        <button id='btnUpdateOffice' onClick={UpdateOffice}>
          Update Office
        </button>
      </div>
    </div>
  );
};

export default UpdateOfficePage;
