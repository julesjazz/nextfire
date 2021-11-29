import Head from 'next/head';
import Link from 'next/link';
import Loader from '../components/Loader'

export default function Home() {
  return (
    <main>
      <h1>Hello there.</h1>
      <Loader show />
    </main>
  );
}