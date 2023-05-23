import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const SearchBoxPage: NextPage = () => {
  const [feedback, setfeedback] = useState('');
  const [typetosearch, settypetosearch] = useState('');
  const [boxnumsearch, setboxnumsearch] = useState('');
  
  //Enter Button--------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      SearchBox();
    }
  };
  //---------------------------------------------------
  const handleInputtypetosearch = (event: ChangeEvent<HTMLSelectElement>) => {
    settypetosearch(event.target.value);
  };
  
  const handleInputboxnumsearch = (event: ChangeEvent<HTMLInputElement>) => {
    setboxnumsearch(event.target.value);
  };

  //---------------------------------------------------
  async function SearchBox() {
    setfeedback('Loading...');
    //---------------------------------------------------------------------
    if (typetosearch == 'searchbox') {
      const boxsearchnum = 'boxnum= ' + boxnumsearch;
      
      try {
      const boxrecord = await pb
        .collection('boxes')
        .getFirstListItem(boxsearchnum);

      const boxOffData = boxrecord.boxlastoffice;
      const boxOutData = boxrecord.boxlastoutdisplay;
      const boxInData = boxrecord.boxlastindisplay;
      const boxTempInData = boxrecord.boxtemplastcheckin;
      const boxTempOutData = boxrecord.boxtemplastcheckout;

      setfeedback(
        'Box: ' +
        boxnumsearch +
        '; Last Office: ' +
        boxOffData +
        '; LAST CHECKED OUT: [' +
        boxOutData +
        ']; Checked out by: ' +
        boxTempOutData +
        '; LAST CHECKED IN: [' +
        boxInData +
        ']; Checked in by: ' +
        boxTempInData);
    } catch(error){
      window.alert("ERROR: Could not find the box! Please ensure the box number is entered correctly.");
      setfeedback('');
    }
    }
    //--------------------------------------------------------------------------
    if (typetosearch == 'searchspecial') {
      const specsearchnum = 'specialnum= ' + boxnumsearch;
      
      try{
      const specrecord = await pb
        .collection('specials')
        .getFirstListItem(specsearchnum);

      const specOffData = specrecord.speciallastoffice;
      const specOutData = specrecord.speciallastoutdisplay;
      const specInData = specrecord.speciallastindisplay;
      const specTempInData = specrecord.specialtemplastcheckin;
      const specTempOutData = specrecord.specialtemplastcheckout;

      setfeedback(
        'Special: ' +
        boxnumsearch +
        '; Last Office: ' +
        specOffData +
        '; LAST CHECKED OUT: [' +
        specOutData +
        ']; Checked out by: ' +
        specTempOutData +
        '; LAST CHECKED IN: [' +
        specInData +
        ']; Checked in by: ' +
        specTempInData);
      } catch(error){
        window.alert("ERROR: Could not find the Special! Please ensure the special number is entered correctly.");
        setfeedback('');
      }
    }
    //--------------------------------------------------------------------------
    settypetosearch('');
    setboxnumsearch('');
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

          <li>
            <div data-name='a' className='active'>Search Boxes/Specials</div>
          </li>

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

          <Link href={'checkoutstanding'}>
            <li>
              <div data-name='a'>Check Outstanding</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div data-name='middle'>
        <h2>Search Boxes/Specials</h2>
        <p>Please enter the required information below</p>
        <br />
        <label>Are you searching for a box or a special?: </label>
        <select value={typetosearch} onChange={handleInputtypetosearch}>
          <option value=''>Select Type</option>
          <option value='searchbox'>Box</option>
          <option value='searchspecial'>Special</option>
        </select>
        <br />
        <br />
        <label>Box/Special Number: </label>
        <input
          placeholder='E.g. 21'
          value={boxnumsearch}
          onChange={handleInputboxnumsearch}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p data-name='feedback'>{feedback}</p>

        <button onClick={SearchBox}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBoxPage;
