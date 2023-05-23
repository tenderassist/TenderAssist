import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const CheckOutstandingPage: NextPage = () => {
  const [feedbackbox, setfeedbackbox] = useState('');
  const [feedbackspec, setfeedbackspec] = useState('');
  
  async function OutstandingBoxSpecial() {
    setfeedbackbox('Loading...');
    setfeedbackspec('Loading...');
    
    try{
    const date = new Date();
    const datecheck = date.getTime();
    const dateadded = datecheck + 2500000;
    
    const searchparamBox =
      'boxlastcheckout > boxlastcheckin && boxlastcheckin <= ' + dateadded;

    const boxresultList = await pb
      .collection('boxes')
      .getFirstListItem(searchparamBox);

    const outstandingBoxNumData = boxresultList.boxnum;
    const outstandingBoxOffData = boxresultList.boxlastoffice;

    setfeedbackbox(
      'Box: ' + outstandingBoxNumData + '; Office: ' + outstandingBoxOffData);
  
  //-----------------------------------------------------------------
    const searchparamSpec =
      'speciallastcheckout > speciallastcheckin && speciallastcheckout <= ' +
      dateadded;
    const specialresultList = await pb
      .collection('specials')
      .getFirstListItem(searchparamSpec);

    const outstandingSpecialNumData = specialresultList.specialnum;
    const outstandingSpecialOffData = specialresultList.speciallastoffice;

    setfeedbackspec(
      'Special: ' +
      outstandingSpecialNumData +
      '; Office: ' +
      outstandingSpecialOffData);
    } catch (error){
      window.alert("No outstanding boxes/specials found!");
      setfeedbackbox('');
      setfeedbackspec('');
    }
  }

  return (
    <div>
      <div data-name='middle'>
        <h1>&quot;TenderAssist&quot;</h1>
      </div>
      <nav>
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

          <Link href={'summary'}>
            <li>
              <div data-name='a'>Office Summary</div>
            </li>
          </Link>

          <li>
            <div data-name='a' className='active'>Check Outstanding</div>
          </li>
        </ul>
      </nav>

      <div data-name='middle'>
        <h2>Check Outstanding Boxes/Specials</h2>
        <p>
          Please click the button below to check if there are any boxes/specials
          that have not been returned yet
        </p>
        <br />
        <p>Outstanding box: E.g. &quot;(Box number) Office number&quot;: </p>
        <p data-name='feedback'>{feedbackbox}</p>
        <br />
        <p>Outstanding Special: E.g. &quot;(Special number) Office number&quot;: </p>
        <p data-name='feedback'>{feedbackspec}</p>

        <br />
        <button onClick={OutstandingBoxSpecial}>
          Search
        </button>
      </div>
    </div>
  );
};

export default CheckOutstandingPage;
