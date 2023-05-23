import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const AdminHome: NextPage = () => {
  return (
    <div>
      <div data-name='middle'>
        <h1>&quot;TenderAssist&quot;</h1>
      </div>
      <nav>
        <ul>
          <li>
            <div data-name='a' className='active'>Home</div>
          </li>

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

          <Link href={'updateoffices'}>
            <li>
              <div data-name='a'>Update Offices</div>
            </li>
          </Link>

          <Link href={'user_home'}>
            <li>
              <div data-name='a'>Switch to &quot;User Mode&quot;</div>
            </li>
          </Link>
        </ul>
      </nav>

      <h2>Welcome to &quot;TenderHelper&quot; Admin Mode</h2>
      <h3>What is &quot;TenderHelper&quot;?</h3>
      <p>&quot;TenderAssist&quot; is a web-based application used to assist you with the vast amounts of admin presented during tenders. As you can see, there are a bunch of different options in the navigation bar. Here&apos;s what each of those options do.</p>
      
      <h3>Add Boxes/Specials</h3>
      <p>The Add Boxes/Specials page allows you to add the different box and special numbers to the database so that they can be used when capturing offices returning or viewing them.</p>

      <h3>Delete Boxes/Specials</h3>
      <p>The Delete Boxes/Specials page allows you to delete boxes and specials from the database that are no longer in use, to ensure that more accurate data will be captured by the temp workers.</p>

      <h3>Add Offices</h3>
      <p>This page allows you to add office numbers to the database so that they can be used when recording where the boxes/specials go to or return from.</p>
      
      <h3>Update Offices</h3>
      <p>The Upade Offices page allows you to update the company name occupying the respective office in order to ensure better feedback when searching offices.</p>
    </div>
  );
};

export default AdminHome;
