import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const AddBoxesPage: NextPage = () => { 
    const [feedback, setfeedback] = useState('');
    const [boxorspec, setboxorspec] = useState('');
    const [bnsnum, setbnsnum] = useState('');
  
  //Enter Button--------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      AddBoxesnSpec();
    }
  };
  //Get Input Values-----------------------------------
    const handleInputboxorspec = (event: ChangeEvent<HTMLSelectElement>) => {
    setboxorspec(event.target.value);
  };
  
  const handleInputbnsnum = (event: ChangeEvent<HTMLInputElement>) => {
    setbnsnum(event.target.value);
  };
  
  //---------------------------------------------------  
  async function AddBoxesnSpec() {
    console.log(boxorspec);
    console.log(bnsnum);
    setfeedback('Loading...');
  
    if (boxorspec == 'addbox') {
      const data = {
        boxnum: bnsnum,
      };

      try {
        const record = await pb.collection('boxes').create(data);
        setfeedback('Successfuly added Box ' + bnsnum);
        
      } catch (error) {
        window.alert("ERROR: Unable to add box!");
        setfeedback('');
  }
    }

    if (boxorspec == 'addspecial') {
      const data = {
        specialnum: bnsnum,
      };
      
      try{
      const record = await pb.collection('specials').create(data);
      setfeedback('Successfuly added Special ' + bnsnum);
      
    } catch (error) {
      window.alert("ERROR: Unable to add Special!");
      setfeedback('');
    }
    }
    setboxorspec('');
    setbnsnum('');
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

          <li>
            <div data-name='a' className='active'>Add Boxes/Specials</div>
          </li>

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
        <h2>Add Box/Special</h2>
        <p>
          Please enter the details of the box/special you would like to add
          below
        </p>
        <br />
        <label>Type: </label>
        <select value={boxorspec} onChange={handleInputboxorspec}>
          <option value=''>Select type</option>
          <option value='addbox'>Box</option>
          <option value='addspecial'>Special</option>
        </select>
        <br />

        <label>Box/Special Number: </label>
        <input
          placeholder='E.g. 21'
          value={bnsnum}
          onChange={handleInputbnsnum}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p data-name='feedback'>{feedback}</p>

        <button onClick={AddBoxesnSpec}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddBoxesPage;
