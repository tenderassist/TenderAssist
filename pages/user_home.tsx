import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

const UserHome: NextPage = () => {
  return (
    <div>
      <div name='middle'>
        <h1>&quot;TenderAssist&quot;</h1>
      </div>
      <nav>
        <ul>
          <li>
            <div name='a' class='active'>Home</div>
          </li>

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

          <Link href={'searchbox'}>
            <li>
              <div name='a'>Search Boxes/Specials</div>
            </li>
          </Link>

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

          <Link href={'login'}>
            <li>
              <div name='a'>Switch to &quot;Admin Mode&quot;</div>
            </li>
          </Link>
        </ul>
      </nav>

      <h2>Welcome to &quot;TenderAssist&quot;</h2>
      <h3>What is &quot;TenderAssist&quot;?</h3>
      <p>&quot;TenderAssist&quot; is a web-based application used to assist you with the vast amounts of admin presented during tenders. As you can see, there are a bunch of different options in the navigation bar. Here&apos;s what each of those options do.</p>

      <h3>Boxes Out</h3>
      <p>The Boxes Out page helps temps to record exactly what boxes/specials are <b>going out</b> to an office, while also recording who checked the boxes/specials out and at what time it happened.</p>

      <h3>Boxes In</h3>
      <p>Similiar to the Boxes Out page, the Boxes In page helps temps to record what boxes/specials are <b>coming in</b> from an office, while also recording who checked them in and at what time it was returned.</p>
      
      <h3>Search Boxes/Specials</h3>
      <p>Whenever you&apos;re looking for a specific box or special, you can use the Search Boxes/Specials page to find out which office had the box/special last, what time it went out as well the time it was last returned.</p>
          
      <h3>Office Search</h3>
      <p>The Office Search page allows you to find out what company is occupying a specific office, as well as the boxes and specials currently in that office.</p>
      
      <h3>Check Outstanding</h3>
      <p>With just the click of a button, the Check Outstanding page will tell you which box or special has been in an office for longer than 45 minutes.</p>
    </div>
  );
};

export default UserHome;
