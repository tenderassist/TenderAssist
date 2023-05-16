import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { ListResult } from 'pocketbase';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const SummaryOfficePage: NextPage = () => {
  //Enter Button
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Call your function here
      SummaryOffices();
    }
  };
  //---------------------------------------------------

  async function SummaryOffices() {
    try{
    const officenum = 'officenum= ' + offidsummary.value;

    const officerecord = await pb
      .collection('offices')
      .getFirstListItem(officenum);

    const officeBoxData = officerecord.offboxspecchecked;
    const officeCompany = officerecord.officecompany;

    document.getElementById('officereturnsummary').innerHTML =
      'Office Number: ' +
      offidsummary.value +
      '; Company: ' +
      officeCompany +
      '; Checkout History: ' +
      officeBoxData;

    document.getElementById('offidsummary').value = '';
    } catch(error){
      window.alert("ERROR: Could not find the Office! Please ensure the correct office number is entered.")
    }
  }

  return (
    <div>
      <div name='middle'>
        <h1>&quot;TenderAssist&quot;</h1>
      </div>
      <nav >
        <ul>
          <Link href={'user_home'}>
            <li>
              <div name='a'>Home</div>
            </li>
          </Link>

          <Link href={'boxout'}>
            <li>
              <div name='a'>Boxes Out</div>
            </li>
          </Link>

          <Link href={'boxin'}>
            <li>
              <div name='a'>Boxes In</div>
            </li>
          </Link>

          <Link href={'searchbox'}>
            <li>
              <div name='a'>Search Boxes/Specials</div>
            </li>
          </Link>

          <Link href={'searchoffice'}>
            <li>
              <div name='a'>Office Search</div>
            </li>
          </Link>

          <li>
            <div name='a' class='active'>Office Summary</div>
          </li>

          <Link href={'checkoutstanding'}>
            <li>
              <div name='a'>Check Outstanding</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div name='middle'>
        <h2>Office Summary</h2>
        <p>Please enter the number of the office you are searching for</p>
        <br />
        <label>Office Number: </label>
        <input
          type='text'
          id='offidsummary'
          name='offidsummary'
          placeholder='E.g. 1'
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p name='feedback' id='officereturnsummary'></p>

        <br />

        <button id='btnOfficeSummary' onClick={SummaryOffices}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SummaryOfficePage;
