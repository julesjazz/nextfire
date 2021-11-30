import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
// hydrate: if content changes, reflect automatically
// ! requires extra doc reads !

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    // new req time interval
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // more efficient: use admin sdk to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
  // fall back to regular SSR
  return {
    // must be in this format:
    // paths: [
    //     { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}


export default function Post(props) {
  // 1. path to document
  // 2. firebase hook to get feed in real time 
  // 3. if realtime data hasn't loaded, fallback to prerendered server data from props post
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);


  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className='card'>
        <p>
          <strong>{post.heartCount || 0} ♥️ </strong>
        </p>
      </aside>

    </main>
  )
}