import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const DeleteBoxesPage: NextPage = () => {
  const [feedback, setfeedback] = useState('');
  const [feedbackBoxes, setfeedbackBoxes] = useState('');
  const [feedbackSpecials, setfeedbackSpecials] = useState('');
  const [typechosen, settypechosen] = useState('');
  const [delnumberbox, setdelnumberbox] = useState('');
  
  //Enter Button---------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      DeleteBoxSpec();
    }
  };
  //---------------------------------------------------
  const handleInputtypechosen = (event: ChangeEvent<HTMLSelectElement>) => {
    settypechosen(event.target.value);
  };
  
  const handleInputdelnumberbox = (event: ChangeEvent<HTMLInputElement>) => {
    setdelnumberbox(event.target.value);
  };
  //---------------------------------------------------
  async function DisplayBoxes(){
    setfeedbackBoxes('Loading...')
    
    try{
    const boxRecords = await pb.collection('boxes').getFullList({
    sort: 'boxnum',
  });

    const boxString = boxRecords.map((entry) => entry.boxnum).join(', ');
    setfeedbackBoxes(boxString);
    
    }catch(error){
      window.alert('ERROR: Unable to fetch boxes!');
      setfeedbackBoxes('')
    }
  }
  //---------------------------------------------------
  async function DisplaySpecials(){
    setfeedbackSpecials('Loading...')
    
    try{
    const specialRecords = await pb.collection('specials').getFullList({
    sort: 'specialnum',
  });

    const specialString = specialRecords.map((entry) => entry.specialnum).join(', ');
    setfeedbackSpecials(specialString);
    
    }catch(error){
      window.alert('ERROR: Unable to fetch specials!');
      setfeedbackSpecials('')
    }
  }
  //---------------------------------------------------
  async function DeleteBoxSpec() {

    let confirm = window.confirm('The box/special will be permanently deleted');
    if (confirm) {
      setfeedback('Loading...')
      if (typechosen == 'deletebox') {
         const delparambox = 'boxnum= ' + delnumberbox;
         console.log(delparambox);
        
        try{
        const boxrecord = await pb
          .collection('boxes')
          .getFirstListItem(delparambox);

        const idfordelbox = boxrecord.id;
        await pb.collection('boxes').delete(idfordelbox);
        
        setfeedback('Successfully deleted box ' + delnumberbox);
        }catch (error) {
          window.alert("ERROR: Box not found!");
          setfeedback('');
        }
      }

      if (typechosen == 'deletespecial') {
        const delparamspec = 'specialnum= ' + delnumberbox;
        console.log(delparamspec);
        
        try{
        const specrecord = await pb
          .collection('specials')
          .getFirstListItem(delparamspec);

        const idfordelspec = specrecord.id;
        await pb.collection('specials').delete(idfordelspec);
        
        setfeedback('Successfully deleted special ' + delnumberbox);
        }catch(error){
          window.alert("ERROR: Special not found!");
          setfeedback('');
        }
      }
    settypechosen('');
    setdelnumberbox('');
    setfeedbackBoxes('');
    setfeedbackSpecials('');
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

          <li>
            <div data-name='a' className='active'>Delete Boxes/Specials</div>
          </li>

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
        <h2>Delete Boxes/Specials</h2>
        <p>
          Please select the box/special you&apos;d like to delete below.
        </p>
        <button onClick={DisplayBoxes}>
          Display Boxes
        </button>
        <p>{feedbackBoxes}</p>
        
        <button onClick={DisplaySpecials}>
          Display Specials
        </button>
        <p>{feedbackSpecials}</p>

        <br />
        <label>Delete Type: </label>
        <select value={typechosen} onChange={handleInputtypechosen}>
          <option value=''>Select Type</option>
          <option value='deletebox'>Box</option>
          <option value='deletespecial'>Special</option>
        </select>
        <br />

        <label>Delete Box/Special Number: </label>
        <input
          placeholder='E.g. 21'
          value={delnumberbox}
          onChange={handleInputdelnumberbox}
          onKeyDown={handleKeyPress}
        />
        <br />
        <p data-name='feedback'>{feedback}</p>

        <button onClick={DeleteBoxSpec}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBoxesPage;
