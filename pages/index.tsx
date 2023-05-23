import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Index: NextPage = () => {
  return (
    <div data-name='middle'>
      <h1>&quot;TenderAssist&quot;</h1>

      <Link href={'login'}>
        <button>
          Login
        </button>
      </Link>
    </div>
  );
};

export default Index;
