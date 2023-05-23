import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useState, ChangeEvent } from 'react';
const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://tenderassist.pockethost.io');
pb.autoCancellation(false);

const BoxOutPage: NextPage = () => {
  const [feedback, setfeedback] = useState('');
  const [tempIDData, settempIDData] = useState('');
  const [boxoutoffidval, setboxoutoffidval] = useState('');
  const [boxout1val, setboxout1val] = useState('');
  const [boxout2val, setboxout2val] = useState('');
  const [boxout3val, setboxout3val] = useState('');
  const [specialout1val, setspecialout1val] = useState('');
  const [specialout2val, setspecialout2val] = useState('');
  
  //Enter Button---------------------------------------
  const [value, setValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      BoxCheckOut();
    }
  };
  //---------------------------------------------------
  const handleInputtempIDData = (event: ChangeEvent<HTMLInputElement>) => {
    settempIDData(event.target.value);
  };
  
  const handleInputboxoutoffidval = (event: ChangeEvent<HTMLInputElement>) => {
    setboxoutoffidval(event.target.value);
  };
  
  const handleInputboxout1val = (event: ChangeEvent<HTMLInputElement>) => {
    setboxout1val(event.target.value);
  };
  
  const handleInputboxout2val = (event: ChangeEvent<HTMLInputElement>) => {
    setboxout2val(event.target.value);
  };
  
  const handleInputboxout3val = (event: ChangeEvent<HTMLInputElement>) => {
    setboxout3val(event.target.value);
  };
  
  const handleInputspecialout1val = (event: ChangeEvent<HTMLInputElement>) => {
    setspecialout1val(event.target.value);
  };
  
  const handleInputspecialout2val = (event: ChangeEvent<HTMLInputElement>) => {
    setspecialout2val(event.target.value);
  };
  //---------------------------------------------------
  async function BoxCheckOut() {
    setfeedback('Loading...');

    const nodate = new Date();
    const dateout = nodate.getTime();
    const outdisplay =
      nodate.getHours() + ':' + nodate.getMinutes() + ':' + nodate.getSeconds();
    const offout = 'officenum= ' + boxoutoffidval;

 try{
    var offrecord = await pb.collection('offices').getFirstListItem(offout);
    const officerecordid = offrecord.id;
    const officeIDData = boxoutoffidval;
    const offboxspecdata = offrecord.offboxspecchecked;
    var offb1 = offrecord.offbox1;
    var offb2 = offrecord.offbox2;
    var offb3 = offrecord.offbox3;
    var offb4 = offrecord.offbox4;
    var offb5 = offrecord.offbox5;
    var offs1 = offrecord.offspec1;
    var offs2 = offrecord.offspec2;
    var offs3 = offrecord.offspec3;

    //Office boxes------------------------------------------
    if (offb1 == '') {
     await pb.collection('offices').update(officerecordid, {
        offbox1: boxout1val,
      });
    } else if (offb2 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox2: boxout1val,
      });
    } else if (offb3 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox3: boxout1val,
      });
    } else if (offb4 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox4: boxout1val,
      });
    } else if (offb5 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox5: boxout1val,
      });
    }
    offrecord = await pb.collection('offices').getFirstListItem(offout);
    offb1 = offrecord.offbox1;
    offb2 = offrecord.offbox2;
    offb3 = offrecord.offbox3;
    offb4 = offrecord.offbox4;
    offb5 = offrecord.offbox5;

    if (offb1 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox1: boxout2val,
      });
    } else if (offb2 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox2: boxout2val,
      });
    } else if (offb3 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox3: boxout2val,
      });
    } else if (offb4 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox4: boxout2val,
      });
    } else if (offb5 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox5: boxout2val,
      });
    }
    offrecord = await pb.collection('offices').getFirstListItem(offout);
    offb1 = offrecord.offbox1;
    offb2 = offrecord.offbox2;
    offb3 = offrecord.offbox3;
    offb4 = offrecord.offbox4;
    offb5 = offrecord.offbox5;

    if (offb1 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox1: boxout3val,
      });
    } else if (offb2 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox2: boxout3val,
      });
    } else if (offb3 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox3: boxout3val,
      });
    } else if (offb4 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox4: boxout3val,
      });
    } else if (offb5 == '') {
      await pb.collection('offices').update(officerecordid, {
        offbox5: boxout3val,
      });
    }

    //Office specials------------------------------------------
    if (offs1 == '') {
      await pb.collection('offices').update(officerecordid, {
        offspec1: specialout1val,
      });
    } else if (offs2 == '') {
      await pb.collection('offices').update(officerecordid, {
        offspec2: specialout1val,
      });
    } else if (offs3 == '') {
     await pb.collection('offices').update(officerecordid, {
        offspec3: specialout1val,
      });
    }
    offrecord = await pb.collection('offices').getFirstListItem(offout);
    offs1 = offrecord.offspec1;
    offs2 = offrecord.offspec2;
    offs3 = offrecord.offspec3;

    if (offs1 == '') {
     await pb.collection('offices').update(officerecordid, {
        offspec1: specialout2val,
      });
    } else if (offs2 == '') {
     await pb.collection('offices').update(officerecordid, {
        offspec2: specialout2val,
      });
    } else if (offs3 == '') {
     await pb.collection('offices').update(officerecordid, {
        offspec3: specialout2val,
      });
    }
    offrecord = await pb.collection('offices').getFirstListItem(offout);
    offs1 = offrecord.offspec1;
    offs2 = offrecord.offspec2;
    offs3 = offrecord.offspec3;

    // BOXES ----------------------------------------------------------
    if (boxout1val != '') {
      const box1 = 'boxnum= ' + boxout1val;
      const box1record = await pb.collection('boxes').getFirstListItem(box1);
      const boxID1Data = box1record.id;

      await pb.collection('boxes').update(boxID1Data, {
        boxlastcheckout: dateout,
        boxlastoutdisplay: outdisplay,
        boxlastoffice: officeIDData,
        boxtemplastcheckout: tempIDData,
      });
    }
    //----------------------------------------------------------
    if (boxout2val != '') {
      const box2 = 'boxnum= ' + boxout2val;
      const box2record = await pb.collection('boxes').getFirstListItem(box2);
      const boxID2Data = box2record.id;

      await pb.collection('boxes').update(boxID2Data, {
        boxlastcheckout: dateout,
        boxlastoutdisplay: outdisplay,
        boxlastoffice: officeIDData,
        boxtemplastcheckout: tempIDData,
      });
    }
    //----------------------------------------------------------
    if (boxout3val != '') {
      const box3 = 'boxnum= ' + boxout3val;
      const box3record = await pb.collection('boxes').getFirstListItem(box3);
      const boxID3Data = box3record.id;

     await pb.collection('boxes').update(boxID3Data, {
        boxlastcheckout: dateout,
        boxlastoutdisplay: outdisplay,
        boxlastoffice: officeIDData,
        boxtemplastcheckout: tempIDData,
      });
    }

    // SPECIALS ----------------------------------------------------------
    if (specialout1val != '') {
      const spec1 = 'specialnum= ' + specialout1val;
      const spec1record = await pb
        .collection('specials')
        .getFirstListItem(spec1);
      const specID1Data = spec1record.id;

     await pb.collection('specials').update(specID1Data, {
        speciallastcheckout: dateout,
        speciallastoutdisplay: outdisplay,
        speciallastoffice: officeIDData,
        specialtemplastcheckout: tempIDData,
      });
    }
    //----------------------------------------------------------
    if (specialout2val != '') {
      const spec2 = 'specialnum= ' + specialout2val;
      const spec2record = await pb
        .collection('specials')
        .getFirstListItem(spec2);
      const specID2Data = spec2record.id;

     await pb.collection('specials').update(specID2Data, {
        speciallastcheckout: dateout,
        speciallastoutdisplay: outdisplay,
        speciallastoffice: officeIDData,
        specialtemplastcheckout: tempIDData,
      });
    }
    //----------------------------------------------------------

    const offboxes =
      offboxspecdata +
      '[(' +
      boxout1val +
      ') (' +
      boxout2val +
      ') (' +
      boxout3val +
      ') (' +
      specialout1val +
      ') (' +
      specialout2val +
      ') Time: ' +
      outdisplay +
      ' ];          ';

    const updateOffOUT = await pb.collection('offices').update(officerecordid, {
      offboxspecchecked: offboxes,
    });
    //----------------------------------------------------------
        setfeedback(
      'Office: ' +
      boxoutoffidval +
      '; Checked out Boxes: (' +
      boxout1val +
      ') (' +
      boxout2val +
      ') (' +
      boxout3val +
      '); ' +
      'Specials: (' +
      specialout1val +
      ') (' +
      specialout2val +
      ')');
    
    setboxoutoffidval('');
    setboxout1val('');
    setboxout2val('');
    setboxout3val('');
    setspecialout1val('');
    setspecialout2val('');

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

          <li>
            <div data-name='a' className='active'>Boxes Out</div>
          </li>

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

          <Link href={'checkoutstanding'}>
            <li>
              <div data-name='a'>Check Outstanding</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div data-name='middle'>
        <h2>Boxes/Specials Going Out</h2>
        <p>Please fill in the information below</p>
        <br />
        <label>Temp Booking Out: </label>
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
          placeholder='E.g. 1'
          value={boxoutoffidval}
          onChange={handleInputboxoutoffidval}
          onKeyDown={handleKeyPress}
          required
        />
        <br />

        <p>BOXES: </p>
        <label>Box 1: </label>
        <input
          value={boxout1val}
          onChange={handleInputboxout1val}
          onKeyDown={handleKeyPress}
        />
        <br />

        <label>Box 2: </label>
        <input
          value={boxout2val}
          onChange={handleInputboxout2val}
          onKeyDown={handleKeyPress}
        />
        <br />

        <label>Box 3: </label>
        <input
          value={boxout3val}
          onChange={handleInputboxout3val}
          onKeyDown={handleKeyPress}
        />
        <br />
        <br />

        <p>SPECIALS:</p>
        <label>Special 1: </label>
        <input
          value={specialout1val}
          onChange={handleInputspecialout1val}
          onKeyDown={handleKeyPress}
        />
        <br />

        <label>Special 2: </label>
        <input
          value={specialout2val}
          onChange={handleInputspecialout2val}
          onKeyDown={handleKeyPress}
        />
        <br />

        <p data-name='feedback'>{feedback}</p>

        <button onClick={BoxCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
};

export default BoxOutPage;
