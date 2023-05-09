import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ListResult } from 'pocketbase';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const DeleteBoxesPage: NextPage = () => {
  //Enter Button
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Call your function here
      DeleteBoxSpec();
    }
  };
  //---------------------------------------------------

  async function DeleteBoxSpec() {
    const typechosen = typedelete.value;

    let confirm = window.confirm('The box/special will be permanently deleted');
    if (confirm) {
      if (typechosen == 'deletebox') {
        const delnumberbox = 'boxnum= ' + boxspecdelnum.value;
        
        try{
        const boxrecord = await pb
          .collection('boxes')
          .getFirstListItem(delnumberbox);

        const idfordelbox = boxrecord.id;
        pb.collection('boxes').delete(idfordelbox);
        document.getElementById('deleteboxreturn').innerHTML =
          'Successfully deleted box ' + boxspecdelnum.value;
        }catch (error) {
          window.alert("ERROR: Box not found!");
        }
      }

      if (typechosen == 'deletespecial') {
        const delnumberspec = 'specialnum= ' + boxspecdelnum.value;
        
        try{
        const specrecord = await pb
          .collection('specials')
          .getFirstListItem(delnumberspec);

        const idfordelspec = specrecord.id;
        pb.collection('specials').delete(idfordelspec);
        document.getElementById('deleteboxreturn').innerHTML =
          'Successfully deleted special ' + boxspecdelnum.value;
        }catch(error){
          window.alert("ERROR: Special not found!");
        }
      }
      document.getElementById('boxspecdelnum').value = '';
    }
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

          <li>
            <div name='a' class='active'>Delete Boxes/Specials</div>
          </li>

          <Link href={'addoffices'}>
            <li>
              <div name='a'>Add Offices</div>
            </li>
          </Link>

          <Link href={'updateoffices'}>
            <li>
              <div name='a'>Update Offices</div>
            </li>
          </Link>

          <Link href={'user_home'}>
            <li>
              <div name='a'>Switch to User Mode</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div name='middle'>
        <h2>Delete Boxes/Specials</h2>
        <p>
          Please select the box/special you&apos;d like to delete below.
        </p>
        <br />
        <label>Type: </label>
        <select id='typedelete'>
          <option value='Default'>Select Type</option>
          <option value='deletebox'>Box</option>
          <option value='deletespecial'>Special</option>
        </select>
        <br />

        <label>Box/Special Number: </label>
        <input
          id='boxspecdelnum'
          placeholder='E.g. 21'
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <br />
        <p name='feedback' id='deleteboxreturn'></p>

        <button id='btnDeleteBox' onClick={DeleteBoxSpec}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteBoxesPage;
