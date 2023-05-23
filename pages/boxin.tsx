import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const BoxInPage: NextPage = () => {
  const [feedback, setfeedback] = useState('');
  const [tempIDData, settempIDData] = useState('');
  const [boxinoffidval, setboxinoffidval] = useState('');
  const [boxin1val, setboxin1val] = useState('');
  const [boxin2val, setboxin2val] = useState('');
  const [boxin3val, setboxin3val] = useState('');
  const [specialin1val, setspecialin1val] =useState('');
  const [specialin2val, setspecialin2val] =useState('');
  
  //Enter Button--------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      BoxCheckIn();
    }
  };
  //---------------------------------------------------
  const handleInputtempIDData = (event: ChangeEvent<HTMLInputElement>) => {
    settempIDData(event.target.value);
  };
  
  const handleInputboxinoffidval = (event: ChangeEvent<HTMLInputElement>) => {
    setboxinoffidval(event.target.value);
  };
  
  const handleInputboxin1val = (event: ChangeEvent<HTMLInputElement>) => {
    setboxin1val(event.target.value);
  };
  
  const handleInputboxin2val = (event: ChangeEvent<HTMLInputElement>) => {
    setboxin2val(event.target.value);
  };
  
  const handleInputboxin3val = (event: ChangeEvent<HTMLInputElement>) => {
    setboxin3val(event.target.value);
  };
  
  const handleInputspecialin1val = (event: ChangeEvent<HTMLInputElement>) => {
    setspecialin1val(event.target.value);
  };
  
  const handleInputspecialin2val = (event: ChangeEvent<HTMLInputElement>) => {
    setspecialin2val(event.target.value);
  };
  //---------------------------------------------------
  async function BoxCheckIn() {
    setfeedback('Loading');
    
    const nidate = new Date();
    const datein = nidate.getTime();
    const indisplay =
      nidate.getHours() + ':' + nidate.getMinutes() + ':' + nidate.getSeconds();
    const offin = 'officenum= ' + boxinoffidval;

try{
    var offrecord = await pb.collection('offices').getFirstListItem(offin);
    const offrecordid = offrecord.id;
    const officeIDData = boxinoffidval;
    var offb1in = offrecord.offbox1;
    var offb2in = offrecord.offbox2;
    var offb3in = offrecord.offbox3;
    var offb4in = offrecord.offbox4;
    var offb5in = offrecord.offbox5;
    var offs1in = offrecord.offspec1;
    var offs2in = offrecord.offspec2;
    var offs3in = offrecord.offspec3;

//Office Boxes-----------------------------------------------------------------------
    offrecord = await pb.collection('offices').getFirstListItem(offin);
    offb1in = offrecord.offbox1;
    offb2in = offrecord.offbox2;
    offb3in = offrecord.offbox3;
    offb4in = offrecord.offbox4;
    offb5in = offrecord.offbox5;
    
    if (boxin1val == offb1in) {
     await pb.collection('offices').update(offrecordid, {
        offbox1: '',
      });
    } else if (boxin1val == offb2in) {
     await pb.collection('offices').update(offrecordid, {
        offbox2: '',
      });
    } else if (boxin1val == offb3in) {
     await pb.collection('offices').update(offrecordid, {
        offbox3: '',
      });
    } else if (boxin1val == offb4in) {
     await pb.collection('offices').update(offrecordid, {
        offbox4: '',
      });
    } else if (boxin1val == offb5in) {
     await pb.collection('offices').update(offrecordid, {
        offbox5: '',
      });
    }
    offrecord = await pb.collection('offices').getFirstListItem(offin);
    offb1in = offrecord.offbox1;
    offb2in = offrecord.offbox2;
    offb3in = offrecord.offbox3;
    offb4in = offrecord.offbox4;
    offb5in = offrecord.offbox5;

    if (boxin2val == offb1in) {
     await pb.collection('offices').update(offrecordid, {
        offbox1: '',
      });
    } else if (boxin2val == offb2in) {
     await pb.collection('offices').update(offrecordid, {
        offbox2: '',
      });
    } else if (boxin2val == offb3in) {
     await pb.collection('offices').update(offrecordid, {
        offbox3: '',
      });
    } else if (boxin2val == offb4in) {
     await pb.collection('offices').update(offrecordid, {
        offbox4: '',
      });
    } else if (boxin2val == offb5in) {
     await pb.collection('offices').update(offrecordid, {
        offbox5: '',
      });
    }
    offrecord = await pb.collection('offices').getFirstListItem(offin);
    offb1in = offrecord.offbox1;
    offb2in = offrecord.offbox2;
    offb3in = offrecord.offbox3;
    offb4in = offrecord.offbox4;
    offb5in = offrecord.offbox5;

    if (boxin3val == offb1in) {
     await pb.collection('offices').update(offrecordid, {
        offbox1: '',
      });
    } else if (boxin3val == offb2in) {
     await pb.collection('offices').update(offrecordid, {
        offbox2: '',
      });
    } else if (boxin3val == offb3in) {
     await pb.collection('offices').update(offrecordid, {
        offbox3: '',
      });
    } else if (boxin3val == offb4in) {
    await pb.collection('offices').update(offrecordid, {
        offbox4: '',
      });
    } else if (boxin3val == offb5in) {
     await pb.collection('offices').update(offrecordid, {
        offbox5: '',
      });
    }
    //Office Specials-----------------------------------------------------------------------
    offrecord = await pb.collection('offices').getFirstListItem(offin);
    var offs1in = offrecord.offspec1;
    var offs2in = offrecord.offspec2;
    var offs3in = offrecord.offspec3;
    if (specialin1val == offs1in) {
     await pb.collection('offices').update(offrecordid, {
        offspec1: '',
      });
    } else if (specialin1val == offs2in) {
     await pb.collection('offices').update(offrecordid, {
        offspec2: '',
      });
    } else if (specialin1val == offs3in) {
     await pb.collection('offices').update(offrecordid, {
        offspec3: '',
      });
    }
    offrecord = await pb.collection('offices').getFirstListItem(offin);
    var offs1in = offrecord.offspec1;
    var offs2in = offrecord.offspec2;
    var offs3in = offrecord.offspec3;

    if (specialin2val == offs1in) {
     await pb.collection('offices').update(offrecordid, {
        offspec1: '',
      });
    } else if (specialin2val == offs2in) {
     await pb.collection('offices').update(offrecordid, {
        offspec2: '',
      });
    } else if (specialin2val == offs3in) {
     await pb.collection('offices').update(offrecordid, {
        offspec3: '',
      });
    }

    // BOXES ----------------------------------------------------------------
    if (boxin1val != '') {
      const box1 = 'boxnum= ' + boxin1val;
      const box1record = await pb.collection('boxes').getFirstListItem(box1);
      const boxID1Data = box1record.id;

     await pb.collection('boxes').update(boxID1Data, {
        boxlastcheckin: datein,
        boxlastindisplay: indisplay,
        boxlastoffice: officeIDData,
        boxtemplastcheckin: tempIDData,
      });
    }

    //-----------------------------------------------------------------------
    if (boxin2val != '') {
      const box2 = 'boxnum= ' + boxin2val;
      const box2record = await pb.collection('boxes').getFirstListItem(box2);
      const boxID2Data = box2record.id;

     await pb.collection('boxes').update(boxID2Data, {
        boxlastcheckin: datein,
        boxlastindisplay: indisplay,
        boxlastoffice: officeIDData,
        boxtemplastcheckin: tempIDData,
      });
    }

    //-----------------------------------------------------------------------
    if (boxin3val != '') {
      const box3 = 'boxnum= ' + boxin3val;
      const box3record = await pb.collection('boxes').getFirstListItem(box3);
      const boxID3Data = box3record.id;

     await pb.collection('boxes').update(boxID3Data, {
        boxlastcheckin: datein,
        boxlastindisplay: indisplay,
        boxlastoffice: officeIDData,
        boxtemplastcheckin: tempIDData,
      });
    }

    // SPECIALS -----------------------------------------------------------------------
    if (specialin1val != '') {
      const spec1 = 'specialnum= ' + specialin1val;
      const spec1record = await pb
        .collection('specials')
        .getFirstListItem(spec1);
      const specID1Data = spec1record.id;

     await pb.collection('specials').update(specID1Data, {
        speciallastcheckin: datein,
        speciallastindisplay: indisplay,
        speciallastoffice: officeIDData,
        specialtemplastcheckin: tempIDData,
      });
    }

    //-----------------------------------------------------------------------
    if (specialin2val != '') {
      const spec2 = 'specialnum= ' + specialin2val;
      const spec2record = await pb
        .collection('specials')
        .getFirstListItem(spec2);
      const specID2Data = spec2record.id;

     await pb.collection('specials').update(specID2Data, {
        speciallastcheckin: datein,
        speciallastindisplay: indisplay,
        speciallastoffice: officeIDData,
        specialtemplastcheckin: tempIDData,
      });
    }
    //----------------------------------------------------------
    setfeedback(
      'Office: ' +
      boxinoffidval +
      '; Checked in Boxes: (' +
      boxin1val +
      ') (' +
      boxin2val +
      ') (' +
      boxin3val +
      '); ' +
      'Specials: (' +
      specialin1val +
      ') (' +
      specialin2val +
      ')');
      
      setboxinoffidval('');
      setboxin1val('');
      setboxin2val('');
      setboxin3val('');
      setspecialin1val('');
      setspecialin2val('');
    
} catch(error){
  setfeedback('');
  window.alert("ERROR: Unable to caputure! Please ensure the correct information was entered.");
}

    //----------------------------------------------------------
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

          <li>
            <div data-name='a' className='active'>Boxes In</div>
          </li>

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

          <Link href={'checkoutstanding'}>
            <li>
              <div data-name='a'>Check Outstanding</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div data-name='middle'>
        <h2>Boxes/Specials Coming In</h2>
        <p>Please fill in the information below</p>
        <br />
        <label>Temp Booking In: </label>
        <input 
        type='text' 
        placeholder='E.g. Mathew' 
        value={tempIDData}
        onChange={handleInputtempIDData}
        onKeyDown={handleKeyPress}
        />
        <br />
        <label>Office Number: </label>
        <input
          placeholder='E.g. 2'
          value={boxinoffidval}
        onChange={handleInputboxinoffidval}
        onKeyDown={handleKeyPress}
          required
        />
        <br />

        <p>BOXES:</p>
        <label>Box 1: </label>
        <input
          value={boxin1val}
          onChange={handleInputboxin1val}
          onKeyDown={handleKeyPress}
        />
        <br />

        <label>Box 2: </label>
        <input
          value={boxin2val}
          onChange={handleInputboxin2val}
          onKeyDown={handleKeyPress}
        />
        <br />

        <label>Box 3: </label>
        <input
          value={boxin3val}
          onChange={handleInputboxin3val}
          onKeyDown={handleKeyPress}
        />
        <br />
        <br />

        <p>SPECIALS:</p>
        <label>Special 1: </label>
        <input
          value={specialin1val}
          onChange={handleInputspecialin1val}
          onKeyDown={handleKeyPress}
        />
        <br />

        <label>Special 2: </label>
        <input
          value={specialin2val}
          onChange={handleInputspecialin2val}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p data-name='feedback'>{feedback}</p>

        <button onClick={BoxCheckIn}>
          Check In
        </button>
      </div>
    </div>
  );
};

export default BoxInPage;
