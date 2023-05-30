import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const ResetPage: NextPage = () => {
  const [feedbackOffice, setfeedbackOffice] = useState('');
  const [feedbackBoxes, setfeedbackBoxes] = useState('');
  const [feedbackSpecials, setfeedbackSpecials] = useState('');
  
  //Enter Button---------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      AddOffice();
    }
  };
  //Reset Offices---------------------------------------------------
  async function ResetOffices() {
    setfeedbackOffice('Loading...');

 try{
     await pb.admins.authWithPassword('sethvanschalkwyk7@gmail.com', '0538613953');
     const officerecords = await pb.collection('offices').getFullList();
     
     for (const record of officerecords) {
      const updatedOffices = {
        offbox1: '',
        offbox2: '',
        offbox3: '',
        offbox4: '',
        offbox5: '',
        offspec1: '',
        offspec2: '',
        offspec3: '',
        offboxspecchecked: '',
      };
      await pb.collection('offices').update(record.id, updatedOffices);
    }

    setfeedbackOffice('Office data successfully reset!');
    } catch(error) {
      window.alert("ERROR: Unable to reset the office data!");
      setfeedbackOffice('');
    }
  }
  //Reset Boxes---------------------------------------------------
  async function ResetBoxes() {
    setfeedbackBoxes('Loading...');

 try{
    await pb.admins.authWithPassword('sethvanschalkwyk7@gmail.com', '0538613953');
    const boxesrecords = await pb.collection('boxes').getFullList();
    
    for (const record of boxesrecords) {
      const updatedBoxes = {
        boxlastoffice: '',
        boxlastoutdisplay: '',
        boxlastindisplay: '',
        boxlastcheckout: '',
        boxlastcheckin: '',
        boxtemplastcheckout: '',
        boxtemplastcheckin: '',
      };
      await pb.collection('boxes').update(record.id, updatedBoxes);
    }

    setfeedbackBoxes('Box data successfully reset!');
    } catch(error) {
      window.alert("ERROR: Unable to reset the box data!");
      setfeedbackBoxes('');
    }
  }
  //Reset Specials---------------------------------------------------
  async function ResetSpecials() {
    setfeedbackSpecials('Loading...');

 try{
    await pb.admins.authWithPassword('sethvanschalkwyk7@gmail.com', '0538613953');
    const specialsrecords = await pb.collection('specials').getFullList();
    
    for (const record of specialsrecords) {
      const updatedSpecial = {
        speciallastoffice: '',
        speciallastoutdisplay: '',
        speciallastindisplay: '',
        speciallastcheckout: '',
        speciallastcheckin: '',
        specialtemplastcheckout: '',
        specialtemplastcheckin: '',
      };
      await pb.collection('specials').update(record.id, updatedSpecial);
    }

    setfeedbackSpecials('Special data successfully reset!');
    } catch(error) {
      window.alert("ERROR: Unable to reset the special data!");
      setfeedbackSpecials('');
    }
  }
  //---------------------------------------------------

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
          
          <li>
            <div data-name='a' className='active'>Reset</div>
          </li>

          <Link href={'user_home'}>
            <li>
              <div data-name='a'>Switch to User Mode</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div data-name='middle'>
        <h2>Reset</h2>
        <p>Please click each button and patiently wait for the data to be rest. This may take a minute.</p>
        <br />

        <button onClick={ResetOffices}>
          Reset Office Data
        </button>
        <p data-name='feedback'>{feedbackOffice}</p>
        
        <button onClick={ResetBoxes}>
          Reset Box Data
        </button>
        <p data-name='feedback'>{feedbackBoxes}</p>
        
        <button onClick={ResetSpecials}>
          Reset Special Data
        </button>
        <p data-name='feedback'>{feedbackSpecials}</p>
      </div>
    </div>
  );
};

export default ResetPage;
