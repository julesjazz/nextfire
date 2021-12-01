// import Head from 'next/head';
// import Link from 'next/link';
import Loader from '../components/Loader';
// import toast from 'react-hot-toast';
import PostFeed from '../components/PostFeed';
import Metatags from '../components/Metatags';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';

import { useState } from 'react';

// post query limit
const LIMIT = 10;


// query firestore posts
export async function getServerSideProps(context) {
  // collectionGroup: any subcollection with ('name')
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // passed as props
  };
}


export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  // end of posts list
  const [postsEnd, setPostsEnd] = useState(false); 

  // get next page in pagination qry
  const getMorePosts = async () => {
    setLoading(true);
    // last post = length -1 
    const last = posts[posts.length - 1];
    // createdAt could be a number or firestore timestamp... if fs timestamp, convert...
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt
    
    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());
    // concat newPosts to existing displayed
    setPosts(posts.concat(newPosts));
    setLoading(false);
    // if # of posts is maxed, set end... 
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }

  }

  return (
    <main>
      <Metatags title="Jules Home Page" description="Hot new posts!" />
      <div className="card card-info">
        <h2>Next & Firebase, making it happen!</h2>
        <p>Welcome!</p>
      </div>
      <PostFeed posts={posts} />
      {/* if not loading or at end... */}
      {!loading && !postsEnd && <button onClick={getMorePosts}>Load More...</button>}
      {/* show loading */}
      <Loader show={loading} /> 
      {/* posts end */}
      {postsEnd && "You've reached the end!"}
    </main>
  );
}



/*
    <main>
      <h1>Hello there.</h1>
      <Loader show />
      <button onClick={() => toast.success('so toasty!')}>
        toasty?
      </button>
    </main>
*/