import Head from 'next/head';
import Link from 'next/link';
import Loader from '../components/Loader'
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <main>
      <h1>Hello there.</h1>
      <Loader show />
      <button onClick={() => toast.success('so toasty!')}>
        toasty?
      </button>
    </main>
  );
}