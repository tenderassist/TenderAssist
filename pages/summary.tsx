import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const SummaryOfficePage: NextPage = () => {
  const [feedback, setfeedback] = useState('');
  const [offidsummary, setoffidsummary] = useState('');
  //Enter Button--------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      SummaryOffices();
    }
  };
  //---------------------------------------------------
  const handleInputoffidsummary = (event: ChangeEvent<HTMLInputElement>) => {
    setoffidsummary(event.target.value);
  };
  //---------------------------------------------------
  async function SummaryOffices() {
    setfeedback('Loading...')
    try{
    const officenum = 'officenum= ' + offidsummary;

    const officerecord = await pb
      .collection('offices')
      .getFirstListItem(officenum);

    const officeBoxData = officerecord.offboxspecchecked;
    const officeCompany = officerecord.officecompany;

    setfeedback(
      'Office Number: ' +
      offidsummary +
      '; Company: ' +
      officeCompany +
      '; Checkout History: ' +
      officeBoxData);

    } catch(error){
      window.alert("ERROR: Could not find the Office! Please ensure the correct office number is entered.")
      setfeedback('');
    }
    setoffidsummary('');
  }

  return (
    <div>
      <div data-name='middle'>
        <h1>&quot;TenderAssist&quot;</h1>
      </div>
      <nav >
        <ul>
          <Link href={'user_home'}>
            <li>
              <div data-name='a'>Home</div>
            </li>
          </Link>

          <Link href={'boxout'}>
            <li>
              <div data-name='a'>Boxes Out</div>
            </li>
          </Link>

          <Link href={'boxin'}>
            <li>
              <div data-name='a'>Boxes In</div>
            </li>
          </Link>

          <Link href={'searchbox'}>
            <li>
              <div data-name='a'>Search Boxes/Specials</div>
            </li>
          </Link>

          <Link href={'searchoffice'}>
            <li>
              <div data-name='a'>Office Search</div>
            </li>
          </Link>

          <li>
            <div data-name='a' className='active'>Office Summary</div>
          </li>

          <Link href={'checkoutstanding'}>
            <li>
              <div data-name='a'>Check Outstanding</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div data-name='middle'>
        <h2>Office Summary</h2>
        <p>Please enter the number of the office you are searching for</p>
        <br />
        <label>Office Number: </label>
        <input
          type='text'
          placeholder='E.g. 1'
          value={offidsummary}
          onChange={handleInputoffidsummary}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p data-name='feedback' >{feedback}</p>

        <br />

        <button onClick={SummaryOffices}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SummaryOfficePage;
