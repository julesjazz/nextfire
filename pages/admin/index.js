import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

export default function AdminPostsPage({}) {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  )
}

function PostList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);
  // also see useCollectionData() hook
  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage Your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter(); // is this needed?
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // ensure slug is url safe, kebob strips ?!/ chars
  const slug = encodeURI(kebabCase(title));
  // validate length 3-100 chars
  const isValid = title.length > 3 && title.length < 100;

  // create firestore post
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data); // commit to firestore
    toast.success('Post created!')
    // imparative nav after doc set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Don't write a good post, write a great one."
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type='submit' disabled={!isValid} className="btn-green">
        Submit Post
      </button>
    </form>
  );
}