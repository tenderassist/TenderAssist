import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { ListResult } from 'pocketbase';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const SearchBoxPage: NextPage = () => {
  //Enter Button
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Call your function here
      SearchBox();
    }
  };
  //---------------------------------------------------

  async function SearchBox() {
    const typetosearch = typesearch.value;
    //---------------------------------------------------------------------
    if (typetosearch == 'searchbox') {
      const boxsearchnum = 'boxnum= ' + boxnumsearch.value;
      const boxrecord = await pb
        .collection('boxes')
        .getFirstListItem(boxsearchnum);

      const boxOffData = boxrecord.boxlastoffice;
      const boxOutData = boxrecord.boxlastoutdisplay;
      const boxInData = boxrecord.boxlastindisplay;
      const boxTempInData = boxrecord.boxtemplastcheckin;
      const boxTempOutData = boxrecord.boxtemplastcheckout;

      document.getElementById('searchboxreturn').innerHTML =
        'Box: ' +
        boxnumsearch.value +
        '; Last Office: ' +
        boxOffData +
        '; LAST CHECKED OUT: [' +
        boxOutData +
        ']; Checked out by: ' +
        boxTempOutData +
        '; LAST CHECKED IN: [' +
        boxInData +
        ']; Checked in by: ' +
        boxTempInData;
    }
    //--------------------------------------------------------------------------
    if (typetosearch == 'searchspecial') {
      const specsearchnum = 'specialnum= ' + boxnumsearch.value;

      const specrecord = await pb
        .collection('specials')
        .getFirstListItem(specsearchnum);

      const specOffData = specrecord.speciallastoffice;
      const specOutData = specrecord.speciallastoutdisplay;
      const specInData = specrecord.speciallastindisplay;
      const specTempInData = specrecord.specialtemplastcheckin;
      const specTempOutData = specrecord.specialtemplastcheckout;

      document.getElementById('searchboxreturn').innerHTML =
        'Special: ' +
        boxnumsearch.value +
        '; Last Office: ' +
        specOffData +
        '; LAST CHECKED OUT: [' +
        specOutData +
        ']; Checked out by: ' +
        specTempOutData +
        '; LAST CHECKED IN: [' +
        specInData +
        ']; Checked in by: ' +
        specTempInData;
    }
    //--------------------------------------------------------------------------
    document.getElementById('boxnumsearch').value = '';
  }

  return (
    <div>
      <div name='middle'>
        <h1>&quot;TenderAssist&quot;</h1>
      </div>
      <nav>
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

          <li>
            <div name='a' class='active'>Search Boxes/Specials</div>
          </li>

          <Link href={'searchoffice'}>
            <li>
              <div name='a'>Office Search</div>
            </li>
          </Link>

          <Link href={'summary'}>
            <li>
              <div name='a'>Office Summary</div>
            </li>
          </Link>

          <Link href={'checkoutstanding'}>
            <li>
              <div name='a'>Check Outstanding</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div name='middle'>
        <h2>Search Boxes/Specials</h2>
        <p>Please enter the required information below</p>
        <br />
        <label>Are you searching for a box or a special?: </label>
        <select id='typesearch'>
          <option value='Default'>Select Type</option>
          <option value='searchbox'>Box</option>
          <option value='searchspecial'>Special</option>
        </select>
        <br />
        <br />
        <label>Box/Special Number: </label>
        <input
          id='boxnumsearch'
          name='boxnumsearch'
          placeholder='E.g. 21'
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p name='feedback' id='searchboxreturn'></p>

        <button id='btnBoxSearch' onClick={SearchBox}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBoxPage;
